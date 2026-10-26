// Gera o portal de entregas (HTML) com a situação de cada requisito, a partir do Jira.
// O workflow entregas.yml publica a pasta de saída no GitHub Pages; nada é commitado.
//
// Uma história conta como entregue quando tem uma versão publicada (fixVersion),
// marcada pelo workflow de release do front ou do back.
//
// Variáveis: JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN, OUTPUT_DIR (padrão _site)
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const { JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PROJECT_KEY = 'SCRUM', OUTPUT_DIR = '_site' } = process.env;
const REPO = 'https://github.com/joaogabgr/ProjetoDevOps/blob/main/docs/requisitos';

async function jira(path, body) {
  const res = await fetch(JIRA_BASE_URL + path, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64'),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Jira ${path} -> ${res.status}: ${text}`);
  return JSON.parse(text);
}

async function searchAll(jql, fields) {
  const all = [];
  let nextPageToken;
  do {
    const page = await jira('/rest/api/3/search/jql', { jql, fields, maxResults: 100, nextPageToken });
    all.push(...page.issues);
    nextPageToken = page.nextPageToken;
  } while (nextPageToken);
  return all;
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const rfNumber = (s) => Number(s.match(/^RF(\d+)/)?.[1] ?? 999);
const issueNumber = (k) => Number(k.split('-')[1]);

// Arquivo de cada requisito em docs/requisitos (RF06-... → RF6).
const reqFiles = new Map(
  readdirSync('docs/requisitos')
    .map((f) => [f.match(/^RF(\d+)-/)?.[1], f])
    .filter(([n]) => n)
    .map(([n, f]) => [`RF${Number(n)}`, `${REPO}/${f}`]),
);

async function main() {
  const versions = await jira(`/rest/api/3/project/${JIRA_PROJECT_KEY}/versions`);
  const versionLink = new Map(versions.map((v) => [v.name, v.description?.startsWith('https://') ? v.description : null]));

  const epics = await searchAll(`project = ${JIRA_PROJECT_KEY} AND issuetype = Epic AND summary ~ "RF*"`, ['summary']);
  const epicKeys = new Set(epics.map((e) => e.key));
  const issues = await searchAll(`project = ${JIRA_PROJECT_KEY} AND parent is not EMPTY`, [
    'summary', 'parent', 'status', 'fixVersions', 'customfield_10020', 'issuetype',
  ]);
  const stories = issues.filter((i) => epicKeys.has(i.fields.parent?.key));
  const storyKeys = new Set(stories.map((s) => s.key));
  const subtasksOf = (key) => issues.filter((i) => i.fields.parent?.key === key && !storyKeys.has(i.key));

  const released = (i) => i.fields.fixVersions.filter((v) => v.released);
  const sprintOf = (i) => (i.fields.customfield_10020 ?? []).map((s) => s.name).pop() ?? 'sem sprint';
  const versionHtml = (name) =>
    versionLink.get(name) ? `<a href="${esc(versionLink.get(name))}">${esc(name)}</a>` : esc(name);

  // Entregue = publicada numa versão E com todas as subtarefas concluídas (status da história Concluído).
  const isDone = (i) => i.fields.status.statusCategory.key === 'done';
  const isDelivered = (i) => released(i).length > 0 && isDone(i);
  const storyState = (i) => {
    const rel = released(i);
    const versionsHtml = rel.map((v) => versionHtml(v.name)).join(', ');
    if (isDelivered(i)) return { cls: 'done', label: 'Entregue', detail: versionsHtml };
    if (rel.length) return { cls: 'partial', label: 'Entrega parcial', detail: `${versionsHtml} · falta concluir subtarefas` };
    const cat = i.fields.status.statusCategory.key;
    if (cat === 'done') return { cls: 'ready', label: 'Pronto, aguardando publicação', detail: '' };
    if (cat === 'indeterminate') return { cls: 'wip', label: 'Em desenvolvimento', detail: esc(sprintOf(i)) };
    return { cls: 'todo', label: 'Planejado', detail: esc(sprintOf(i)) };
  };

  const rows = epics
    .sort((a, b) => rfNumber(a.fields.summary) - rfNumber(b.fields.summary))
    .map((e) => {
      const list = stories.filter((s) => s.fields.parent.key === e.key).sort((a, b) => issueNumber(a.key) - issueNumber(b.key));
      const done = list.filter(isDelivered).length;
      const anyReleased = list.some((s) => released(s).length);
      const working = list.some((s) => s.fields.status.statusCategory.key !== 'new');
      let status;
      if (list.length && done === list.length) status = { cls: 'done', label: 'Entregue' };
      else if (done || anyReleased) status = { cls: 'partial', label: 'Parcial' };
      else if (working) status = { cls: 'wip', label: 'Em desenvolvimento' };
      else status = { cls: 'todo', label: 'Planejado' };
      const vers = [...new Set(list.flatMap((s) => released(s).map((v) => v.name)))];
      const rf = e.fields.summary.match(/^RF\d+/)?.[0] ?? '';
      const title = e.fields.summary.replace(/^RF\d+\s*-\s*/, '');
      return { e, rf, title, list, done, status, vers };
    });

  const total = rows.reduce((n, r) => n + r.list.length, 0);
  const delivered = rows.reduce((n, r) => n + r.done, 0);
  const pct = total ? Math.round((delivered / total) * 100) : 0;
  const updated = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'short', timeStyle: 'short' });

  const reqLink = (r) => (reqFiles.get(r.rf) ? `<a href="${reqFiles.get(r.rf)}">${esc(r.rf)}</a>` : esc(r.rf));
  const subChips = (s) =>
    subtasksOf(s.key)
      .map((st) => {
        const layer = st.fields.summary.match(/^\[(BACK|FRONT)\]/)?.[1] ?? 'TAREFA';
        const ok = st.fields.status.statusCategory.key === 'done';
        return `<span class="chip ${ok ? 'ok' : ''}" title="${esc(st.key)} – ${esc(st.fields.status.name)}">${layer} ${ok ? '✓' : '…'}</span>`;
      })
      .join('');

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Entregas – Vigia das Águas</title>
<style>
:root { --bg:#f5f7f9; --card:#fff; --fg:#14202b; --muted:#5b6876; --line:#dbe2e8; --accent:#1f6f8b;
  --done:#1d7a4f; --ready:#2f6db5; --partial:#a76b00; --wip:#7a4fb0; --todo:#6b7783; }
@media (prefers-color-scheme: dark) { :root { --bg:#0f161c; --card:#16202a; --fg:#e4ebf0; --muted:#9aa8b4; --line:#26323d; --accent:#5fb3d1;
  --done:#4cc38a; --ready:#6fa2f0; --partial:#e2a845; --wip:#b294ea; --todo:#97a3ad; } }
* { box-sizing: border-box; }
body { margin:0; background:var(--bg); color:var(--fg); font:15px/1.55 system-ui, -apple-system, "Segoe UI", sans-serif; padding:32px 16px 64px; }
main { max-width:960px; margin:0 auto; display:grid; gap:28px; }
h1 { margin:0; font-size:clamp(24px,4vw,32px); }
h2 { margin:0 0 4px; font-size:18px; }
.muted { color:var(--muted); }
a { color:var(--accent); }
.summary { display:flex; flex-wrap:wrap; gap:12px 24px; align-items:center; }
.bar { flex:1 1 240px; height:10px; background:var(--line); border-radius:99px; overflow:hidden; }
.bar span { display:block; height:100%; background:var(--done); }
.table { overflow-x:auto; background:var(--card); border:1px solid var(--line); border-radius:10px; }
table { width:100%; border-collapse:collapse; min-width:560px; }
th, td { padding:10px 14px; text-align:left; border-bottom:1px solid var(--line); vertical-align:top; }
th { font-size:12px; text-transform:uppercase; letter-spacing:.05em; color:var(--muted); }
tr:last-child td { border-bottom:0; }
.badge { display:inline-block; font-size:12px; font-weight:600; padding:3px 8px; border-radius:99px; border:1px solid currentColor; white-space:nowrap; }
.done { color:var(--done); } .ready { color:var(--ready); } .partial { color:var(--partial); } .wip { color:var(--wip); } .todo { color:var(--todo); }
section.req { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:16px 18px; }
section.req ul { list-style:none; margin:10px 0 0; padding:0; display:grid; gap:8px; }
section.req li { display:flex; flex-wrap:wrap; gap:6px 10px; align-items:baseline; }
.chip { font:11px/1 ui-monospace, Consolas, monospace; padding:3px 6px; border-radius:4px; background:var(--bg); color:var(--muted); }
.chip.ok { color:var(--done); }
.legend { display:flex; flex-wrap:wrap; gap:8px 16px; font-size:13px; }
</style>
</head>
<body>
<main>
<header>
  <h1>Entregas do projeto</h1>
  <p class="muted">Instituto Vigia das Águas · situação de cada requisito, gerada automaticamente a partir do Jira e das releases. Atualizado em ${esc(updated)}.</p>
</header>

<div class="summary">
  <strong>${delivered} de ${total} histórias entregues (${pct}%)</strong>
  <div class="bar" role="img" aria-label="${pct}% entregue"><span style="width:${pct}%"></span></div>
</div>

<div class="table">
<table>
<thead><tr><th>Requisito</th><th>Situação</th><th>Histórias entregues</th><th>Versões</th></tr></thead>
<tbody>
${rows.map((r) => `<tr><td>${reqLink(r)} – ${esc(r.title)}</td><td><span class="badge ${r.status.cls}">${r.status.label}</span></td><td>${r.done} de ${r.list.length}</td><td>${r.vers.map(versionHtml).join(', ') || '–'}</td></tr>`).join('\n')}
</tbody>
</table>
</div>

<div class="legend">
  <span class="done">● Entregue: publicado numa versão, back e front concluídos</span>
  <span class="partial">● Entrega parcial: parte publicada, falta concluir subtarefas</span>
  <span class="ready">● Pronto, aguardando publicação</span>
  <span class="wip">● Em desenvolvimento</span>
  <span class="todo">● Planejado</span>
  <span class="muted">BACK / FRONT: andamento das subtarefas</span>
</div>

${rows.map((r) => `<section class="req">
  <h2>${reqLink(r)} – ${esc(r.title)} <span class="badge ${r.status.cls}">${r.status.label}</span></h2>
  ${r.list.length ? `<ul>${r.list.map((s) => {
    const st = storyState(s);
    return `<li><span class="badge ${st.cls}">${st.label}</span> ${esc(s.fields.summary.replace(/^RF\d+\s*-\s*/, ''))} <a href="${JIRA_BASE_URL}/browse/${s.key}">${s.key}</a> ${st.detail ? `<span class="muted">${st.detail}</span>` : ''} ${subChips(s)}</li>`;
  }).join('')}</ul>` : '<p class="muted">Nenhuma história cadastrada.</p>'}
</section>`).join('\n')}
</main>
</body>
</html>
`;

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, 'index.html'), html);
  console.log(`Portal gerado em ${OUTPUT_DIR}/index.html: ${delivered} de ${total} histórias entregues em ${rows.length} requisitos.`);
}

await main();
