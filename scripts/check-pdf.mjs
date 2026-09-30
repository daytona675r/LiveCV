import { mkdir, readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'output/qa');
await mkdir(output, { recursive: true });
const filenames = { canonical: 'Mario_Wangen_CV.pdf', fullstack: 'Mario_Wangen_CV_Fullstack.pdf', 'applied-ai': 'Mario_Wangen_CV_Applied_AI.pdf', fde: 'Mario_Wangen_CV_AI_Solutions.pdf' };

for (const view of Object.keys(filenames)) {
  const pdf = await readFile(path.join(root, 'output', filenames[view]));
  assert.ok(pdf.subarray(0, 5).equals(Buffer.from('%PDF-')));
  assert.equal((pdf.toString('latin1').match(/\/Type \/Page\b/g) ?? []).length, 3);
  if (view === 'canonical') await writeFile(path.join(output, 'canonical-checked.pdf'), pdf);
  console.log(`${view}: three-page PDF container verified`);
}
