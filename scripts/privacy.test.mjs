import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

test('public route inventory and unknown-profile behavior stay closed', async () => {
  const result = await build({ absWorkingDir: root, entryPoints: ['src/app/cvContent.ts'], bundle: true, write: false, format: 'esm' });
  const { cvRoutes, getCvContent } = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].contents).toString('base64')}`);
  assert.deepEqual(Object.keys(cvRoutes), ['/', '/fullstack', '/applied-ai', '/fde']);
  assert.equal(getCvContent('/private/example'), undefined);
  assert.equal(getCvContent('/example-application'), undefined);
});

test('public import graph never includes private profiles or generated output', async () => {
  const result = await build({ absWorkingDir: root, entryPoints: ['src/app/App.tsx'], outdir: 'output/qa/import-graph', bundle: true, packages: 'external', write: false, metafile: true, jsx: 'automatic' });
  for (const input of Object.keys(result.metafile.inputs)) {
    assert.doesNotMatch(input.replaceAll('\\', '/'), /(^|\/)(profiles\/private|output)\//);
  }
});

test('local inputs and outputs are ignored by Git and Vercel', async () => {
  const paths = ['profiles/private/example.ts', 'output/example.pdf'];
  const ignored = execFileSync('git', ['check-ignore', '--no-index', ...paths], { cwd: root, encoding: 'utf8' });
  for (const path of paths) assert.ok(ignored.includes(path));
  const vercelIgnore = await readFile(new URL('../.vercelignore', import.meta.url), 'utf8');
  assert.ok(vercelIgnore.split(/\r?\n/).includes('profiles/private/'));
  assert.ok(vercelIgnore.split(/\r?\n/).includes('output/'));
});
