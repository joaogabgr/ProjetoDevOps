// Gera os dados do portal de entregas (data.json) a partir do Jira e copia a página
// de portal/ para a pasta de saída. O workflow entregas.yml publica essa pasta no GitHub Pages.
//
// Uma história conta como entregue quando foi publicada numa versão (fixVersion, marcada
// pelo workflow de release) e todas as subtarefas estão concluídas (história em Concluído).
//
// Variáveis: JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN, OUTPUT_DIR (padrão _site)
import { copyFileSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const { JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PROJECT_KEY = 'SCRUM', OUTPUT_DIR = '_site' } = process.env;
const DOCS = 'https://github.com/joaogabgr/ProjetoDevOps/blob/main/docs/requisitos';

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

const rfNumber = (s) => Number(s.match(/^RF(\d+)/)?.[1] ?? 999);
const issueNumber = (k) => Number(k.split('-')[1]);

// Arquivo de cada requisito em docs/requisitos (RF06-... → RF6).
const reqFiles = new Map(
  readdirSync('docs/requisitos')
    .map((f) => [f.match(/^RF(\d+)-/)?.[1], f])
    .filter(([n]) => n)
    .map(([n, f]) => [`RF${Number(n)}`, `${DOCS}/${f}`]),
);

async function main() {
  const jiraVersions = await jira(`/rest/api/3/project/${JIRA_PROJECT_KEY}/versions`);
  const epics = await searchAll(`project = ${JIRA_PROJECT_KEY} AND issuetype = Epic AND summary ~ "RF*"`, ['summary']);
  const epicByKey = new Map(epics.map((e) => [e.key, e]));
  const issues = await searchAll(`project = ${JIRA_PROJECT_KEY} AND parent is not EMPTY`, [
    'summary', 'parent', 'status', 'fixVersions', 'customfield_10020', 'customfield_10016', 'issuetype',
  ]);

  const stories = issues.filter((i) => epicByKey.has(i.fields.parent?.key));
  const storyKeys = new Set(stories.map((s) => s.key));
  const sprints = new Map();

  const storyData = stories.map((s) => {
    const f = s.fields;
    const released = f.fixVersions.filter((v) => v.released).map((v) => v.name);
    const done = f.status.statusCategory.key === 'done';
    let state;
    if (released.length && done) state = 'done';
    else if (released.length) state = 'partial';
    else if (done) state = 'ready';
    else if (f.status.statusCategory.key === 'indeterminate') state = 'wip';
    else state = 'todo';

    const sprint = (f.customfield_10020 ?? []).at(-1);
    if (sprint) sprints.set(sprint.id, { id: sprint.id, name: sprint.name, state: sprint.state, start: sprint.startDate ?? null, end: sprint.endDate ?? null });

    const subtasks = issues
      .filter((i) => i.fields.parent?.key === s.key && !storyKeys.has(i.key))
      .sort((a, b) => issueNumber(a.key) - issueNumber(b.key))
      .map((st) => ({
        key: st.key,
        layer: st.fields.summary.match(/^\[(BACK|FRONT)\]/)?.[1] ?? 'OUTRA',
        title: st.fields.summary.replace(/^\[(BACK|FRONT)\]\s*/, ''),
        status: st.fields.status.name,
        done: st.fields.status.statusCategory.key === 'done',
      }));

    return {
      key: s.key,
      rf: epicByKey.get(f.parent.key).fields.summary.match(/^RF\d+/)?.[0] ?? '',
      title: f.summary.replace(/^RF\d+\s*-\s*/, ''),
      status: f.status.name,
      state,
      sprint: sprint?.name ?? null,
      points: f.customfield_10016 ?? null,
      versions: released,
      subtasks,
    };
  }).sort((a, b) => issueNumber(a.key) - issueNumber(b.key));

  const requirements = epics
    .map((e) => {
      const rf = e.fields.summary.match(/^RF\d+/)?.[0] ?? '';
      return { rf, title: e.fields.summary.replace(/^RF\d+\s*-\s*/, ''), epic: e.key, doc: reqFiles.get(rf) ?? null };
    })
    .sort((a, b) => rfNumber(a.rf) - rfNumber(b.rf));

  const usedVersions = new Set(storyData.flatMap((s) => s.versions));
  const versions = jiraVersions
    .filter((v) => usedVersions.has(v.name))
    .map((v) => ({ name: v.name, date: v.releaseDate ?? null, url: v.description?.startsWith('https://') ? v.description : null }))
    .sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));

  const data = {
    updatedAt: new Date().toISOString(),
    jira: `${JIRA_BASE_URL}/browse/`,
    requirements,
    stories: storyData,
    sprints: [...sprints.values()].sort((a, b) => (a.start ?? '').localeCompare(b.start ?? '')),
    versions,
  };

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, 'data.json'), JSON.stringify(data, null, 2));
  copyFileSync('portal/index.html', join(OUTPUT_DIR, 'index.html'));

  const delivered = storyData.filter((s) => s.state === 'done').length;
  console.log(`Portal gerado em ${OUTPUT_DIR}: ${delivered} de ${storyData.length} histórias entregues, ${requirements.length} requisitos, ${data.sprints.length} sprints.`);
}

await main();
