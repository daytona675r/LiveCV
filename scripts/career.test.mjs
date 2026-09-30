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
  for (const view of Object.values(cvViews)) {
    assert.equal(view.roles, careerData.roles);
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
  assert.doesNotMatch(current, /Atlas/);
  assert.match(c.projects[0].desc, /in development/);
  assert.match(c.projects[0].desc, /planned/);
});

test('root is canonical and legacy redirect preserves its route contract', async () => {
  const { cvViews, getCvContent, getCvRedirect } = await model();
  assert.equal(getCvContent('/'), cvViews.canonical);
  assert.equal(getCvContent('/fullstack/'), cvViews.fullstack);
  assert.equal(getCvContent('/mlops'), undefined);
  assert.equal(getCvRedirect('/ai/'), '/applied-ai');
});
