// Gera o ENTREGAS.md: situação de cada requisito para o cliente, a partir do Jira.
// Uma história conta como entregue quando tem uma versão publicada (fixVersion),
// marcada pelo workflow de release do front ou do back.
//
// Variáveis: JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN
import { writeFileSync } from 'node:fs';

const { JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PROJECT_KEY = 'SCRUM', OUTPUT = 'ENTREGAS.md' } = process.env;
const README = 'README.md';

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

async function main() {
  const versions = await jira(`/rest/api/3/project/${JIRA_PROJECT_KEY}/versions`);
  const versionLink = new Map(versions.map((v) => [v.name, v.description?.startsWith('https://') ? v.description : null]));

  const epics = await searchAll(`project = ${JIRA_PROJECT_KEY} AND issuetype = Epic AND summary ~ "RF*"`, ['summary']);
  const stories = await searchAll(`project = ${JIRA_PROJECT_KEY} AND issuetype != Epic AND parent is not EMPTY`, [
    'summary', 'parent', 'status', 'fixVersions', 'customfield_10020',
  ]);

  const rfNumber = (s) => Number(s.match(/^RF(\d+)/)?.[1] ?? 999);
  const issueNumber = (k) => Number(k.split('-')[1]);
  const released = (i) => i.fields.fixVersions.filter((v) => v.released);
  const sprintOf = (i) => (i.fields.customfield_10020 ?? []).map((s) => s.name).pop() ?? 'sem sprint';
  const link = (name) => (versionLink.get(name) ? `[${name}](${versionLink.get(name)})` : name);

  const storyState = (i) => {
    const rel = released(i);
    if (rel.length) return { icon: '✅', text: `Entregue em ${rel.map((v) => link(v.name)).join(', ')}` };
    const cat = i.fields.status.statusCategory.key;
    if (cat === 'done') return { icon: '📦', text: 'Pronto, aguardando publicação' };
    if (cat === 'indeterminate') return { icon: '🔧', text: `Em desenvolvimento (${sprintOf(i)})` };
    return { icon: '⏳', text: `Planejado (${sprintOf(i)})` };
  };

  const rows = epics
    .sort((a, b) => rfNumber(a.fields.summary) - rfNumber(b.fields.summary))
    .map((e) => {
      const list = stories.filter((s) => s.fields.parent?.key === e.key).sort((a, b) => issueNumber(a.key) - issueNumber(b.key));
      const done = list.filter((s) => released(s).length).length;
      const working = list.some((s) => s.fields.status.statusCategory.key !== 'new');
      let status;
      if (list.length && done === list.length) status = '✅ Entregue';
      else if (done) status = '🟡 Parcial';
      else if (working) status = '🔧 Em desenvolvimento';
      else status = '⏳ Planejado';
      const vers = [...new Set(list.flatMap((s) => released(s).map((v) => v.name)))];
      const rf = e.fields.summary.match(/^RF\d+/)?.[0] ?? '';
      return { e, rf, list, done, status, vers };
    });

  const today = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'short', timeStyle: 'short' });
  const total = rows.reduce((n, r) => n + r.list.length, 0);
  const delivered = rows.reduce((n, r) => n + r.done, 0);

  const out = [
    '# Entregas',
    '',
    'Situação de cada requisito do projeto. Esta página é gerada automaticamente a partir do Jira e das releases do front e do back: não edite à mão.',
    '',
    `**Atualizado em:** ${today} · **Histórias entregues:** ${delivered} de ${total}`,
    '',
    '| Requisito | Situação | Histórias entregues | Versões |',
    '|---|---|---|---|',
    ...rows.map((r) =>
      `| [${r.e.fields.summary.replace(/\s*-\s*/, ' – ')}](${README}#${r.rf.toLowerCase()}) | ${r.status} | ${r.done} de ${r.list.length} | ${r.vers.map(link).join(', ') || '–'} |`),
    '',
    '**Legenda:** ✅ entregue em uma versão publicada · 📦 pronto, aguardando publicação · 🔧 em desenvolvimento · ⏳ planejado',
    '',
    '## Detalhe por requisito',
    '',
  ];
  for (const r of rows) {
    out.push(`### ${r.e.fields.summary.replace(/\s*-\s*/, ' – ')}`, '');
    if (!r.list.length) out.push('Nenhuma história cadastrada.', '');
    for (const s of r.list) {
      const st = storyState(s);
      out.push(`- ${st.icon} ${s.fields.summary.replace(/^RF\d+\s*-\s*/, '')} ([${s.key}](${JIRA_BASE_URL}/browse/${s.key})): ${st.text}`);
    }
    out.push('');
  }

  writeFileSync(OUTPUT, out.join('\n'));
  console.log(`${OUTPUT} gerado: ${delivered} de ${total} histórias entregues em ${rows.length} requisitos.`);
}

await main();
