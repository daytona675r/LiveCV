import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Use an existing local Python installation with pypdf; no service or uploads.
const python = process.env.PYTHON || 'python';
const result = spawnSync(python, [fileURLToPath(new URL('./merge-pdfs.py', import.meta.url)), ...process.argv.slice(2)], { stdio: 'inherit' });
if (result.error) throw new Error(`Cannot run ${python}. Set PYTHON to a Python executable with pypdf installed.`, { cause: result.error });
process.exitCode = result.status ?? 1;
