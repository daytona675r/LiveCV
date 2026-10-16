import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

const root = new URL('../', import.meta.url).pathname;
async function model() {
  const result = await build({ absWorkingDir: root, stdin: { contents: "export * from './src/app/careerData'; export * from './src/app/cvViews';", resolveDir: root }, bundle: true, format: 'esm', write: false });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].contents).toString('base64')}`);
}

test('all public presentations share the same factual career records and identity', async () => {
  const { careerData, cvViews } = await model();
  for (const [name, view] of Object.entries(cvViews)) {
    if (name === 'devops' || name === 'fullstack') {
      assert.notEqual(view.roles, careerData.roles);
      assert.deepEqual(view.roles.map(r => [r.company, r.title, r.dates]), careerData.roles.map(r => [r.company, r.title, r.dates]));
    } else assert.equal(view.roles, careerData.roles);
    assert.equal(view.headline, 'Senior Software Engineer');
  }
  assert.deepEqual(careerData.roles.map(r => [r.company, r.title, r.dates]), [
    ['Cancilico GmbH', 'Senior Software Engineer', '01/2026 — Present'],
    ['Ing. Büro Schlegel', 'Senior Software Development Engineer', '2010 — 2025'],
    ['Indanet AG', 'Software Engineer', '2008 — 2010'],
    ['MAP&GUIDE GmbH', 'Software Developer', '2006 — 2007'],
    ['M.ABLE GmbH', 'Software Developer', '2004 — 2006'],
  ]);
});

test('canonical preserves the training boundary and preserves unfinished project status', async () => {
  const { cvViews } = await model();
  const c = cvViews.canonical;
  assert.equal(c.pdfFileName, 'Mario_Wangen_CV.pdf');
  assert.equal(c.profileNote, '');
  assert.deepEqual(c.projects.map(p => p.name), ['Spurwerk', 'PULSE']);
  assert.deepEqual(c.roles[0].chapters.map(c => c.title), ['Product Reliability & Delivery Foundations', 'MLOps Architecture & Model Delivery']);
  const current = JSON.stringify(c.roles[0]);
  assert.match(current, /manually initiated by the ML team/);
  assert.match(current, /classification and detection/);
  assert.match(current, /golden-snapshot/i);
  assert.match(current, /CI\/CD backbone/);
  assert.doesNotMatch(current, /Atlas/);
  assert.match(c.projects[0].desc, /in development/);
  assert.match(c.projects[0].desc, /planned/);
});

test('root is canonical and legacy redirect preserves its route contract', async () => {
  const { cvViews, getCvContent, getCvRedirect } = await model();
  assert.equal(getCvContent('/'), cvViews.canonical);
  assert.equal(getCvContent('/fullstack/'), cvViews.fullstack);
  assert.equal(getCvContent('/devops/'), cvViews.devops);
  assert.equal(getCvContent('/mlops'), undefined);
  assert.equal(getCvRedirect('/ai/'), '/applied-ai');
});

test('fullstack is a reusable architecture and delivery overlay', async () => {
  const { cvViews } = await model();
  const view = cvViews.fullstack;
  assert.equal(view.route, '/fullstack');
  assert.equal(view.pdfFileName, 'Mario_Wangen_CV_Fullstack.pdf');
  assert.match(view.hero, /architecture, APIs, full-stack implementation/);
  assert.match(view.profile, /system architecture, domain and data models, backend APIs/);
  assert.deepEqual(view.projects.map(p => p.name), ['PULSE', 'Spurwerk']);
  const roles = JSON.stringify(view.roles);
  assert.match(roles, /CI\/CD backbone/);
  assert.match(roles, /FastAPI-based inference service/);
  assert.match(roles, /service-based web architectures/);
  assert.match(roles, /REST APIs/);
  assert.match(roles, /WebSocket/);
  assert.doesNotMatch(roles, /Rust|gRPC|GraphQL|OpenShift|Edge AI|Team Lead|Engineering Manager/);
});

test('German locale overlays preserve facts while localizing canonical and Full-Stack views', async () => {
  const { careerData, localizedCvViews, getCvContent } = await model();
  const canonicalDe = getCvContent('/de/');
  const fullstackDe = getCvContent('/de/fullstack/');
  const devopsDe = getCvContent('/de/devops/');
  const appliedAiDe = getCvContent('/de/applied-ai/');
  assert.equal(canonicalDe, localizedCvViews['de:canonical']);
  assert.equal(fullstackDe, localizedCvViews['de:fullstack']);
  assert.notEqual(canonicalDe, getCvContent('/'));
  assert.equal(canonicalDe?.pdfFileName, 'Mario_Wangen_CV_DE.pdf');
  assert.equal(fullstackDe?.pdfFileName, 'Mario_Wangen_CV_Fullstack_DE.pdf');
  assert.equal(devopsDe, localizedCvViews['de:devops']);
  assert.equal(devopsDe?.variant, 'devops');
  assert.equal(devopsDe?.locale, 'de');
  assert.equal(devopsDe?.pdfFileName, 'Mario_Wangen_CV_DevOps_DE.pdf');
  assert.match(devopsDe?.hero ?? '', /^Entwicklung zuverlässiger Softwaresysteme/);
  assert.match(JSON.stringify(devopsDe?.roles), /Bash\/Shell/);
  assert.doesNotMatch(JSON.stringify(devopsDe), /OpenShift|Ansible|ArgoCD|GitLab CI|Jenkins|Nexus|Quay|SonarQube|Backstage|Eggplant/);
  assert.equal(appliedAiDe, localizedCvViews['de:applied-ai']);
  assert.equal(appliedAiDe?.variant, 'applied-ai');
  assert.equal(appliedAiDe?.locale, 'de');
  assert.equal(appliedAiDe?.pdfFileName, 'Mario_Wangen_CV_Applied_AI_DE.pdf');
  assert.match(appliedAiDe?.hero ?? '', /^Produktive AI-Systeme entwickeln/);
  assert.doesNotMatch(`${appliedAiDe?.hero}\n${appliedAiDe?.profile}`, /Coding Agents|coding-agent/);
  assert.match(JSON.stringify(appliedAiDe?.roles), /RAG-basierten Assistenzsystems für den technischen Vertrieb/);
  assert.deepEqual(appliedAiDe?.projects.map(p => p.name), ['PULSE', 'Spurwerk']);
  assert.match(appliedAiDe?.projects[0]?.desc ?? '', /Multi-Agenten-System/);
  assert.match(appliedAiDe?.projects[0]?.tags.join(' ') ?? '', /LangSmith/);
  assert.match(appliedAiDe?.projects[1]?.pattern ?? '', /In Umsetzung/);
  assert.match(JSON.stringify(appliedAiDe?.roles), /Freelance AI Engineer/);
  assert.match(appliedAiDe?.educationMeta?.['Turing College'] ?? '', /516 Stunden · 96\/100/);
  assert.doesNotMatch(JSON.stringify(appliedAiDe?.capabilityRail), /Coding Agents|AI-gestützte Softwareentwicklung/);
  assert.doesNotMatch(JSON.stringify(appliedAiDe?.stack), /Coding Agents|Codex|Claude Code|Cursor/);
  assert.match(JSON.stringify(appliedAiDe?.roles), /intensiver Nutzung und Steuerung moderner Coding Agents/);
  assert.match(JSON.stringify(appliedAiDe?.roles), /Klassifikations- und Detektionsmodelle/);
  assert.doesNotMatch(JSON.stringify(appliedAiDe), /3\+ Jahre|Master|OpenShift|Ansible|ArgoCD/);
  assert.match(canonicalDe?.hero ?? '', /^Entwicklung komplexer Softwaresysteme/);
  assert.match(fullstackDe?.hero ?? '', /^Entwicklung komplexer Softwaresysteme/);
  assert.doesNotMatch(`${canonicalDe?.hero}\n${fullstackDe?.hero}`, /entwickeln und weiterentwickeln/);
  assert.equal(canonicalDe?.location, 'Dresden, Deutschland');
  assert.equal(fullstackDe?.displayDates?.cancilico, '01/2026 — heute');
  assert.match(JSON.stringify(canonicalDe?.educationMeta), /berufsbegleitend/);
  assert.equal(canonicalDe?.portraitSrc, 'mario-wangen-portrait-cv.jpg');
  assert.equal(fullstackDe?.portraitSrc, canonicalDe?.portraitSrc);
  assert.equal(getCvContent('/')?.portraitSrc, undefined);
  assert.match(fullstackDe?.profile ?? '', /mehr als 20 Jahren Erfahrung/);
  assert.match(fullstackDe?.profile ?? '', /hands-on/);
  assert.match(JSON.stringify(fullstackDe?.roles), /WebSocket/);
  assert.deepEqual(fullstackDe?.roles.map(r => [r.id, r.company, r.title, r.dates]), careerData.roles.map(r => [r.id, r.company, r.title, r.dates]));
  assert.deepEqual(canonicalDe?.projects.map(p => p.name), ['Spurwerk', 'PULSE']);
  assert.deepEqual(fullstackDe?.projects.map(p => p.name), ['PULSE', 'Spurwerk']);
  assert.doesNotMatch(JSON.stringify(fullstackDe), /Rust|gRPC|GraphQL|OpenShift|Edge AI|Team Lead|Engineering Manager/);
});
