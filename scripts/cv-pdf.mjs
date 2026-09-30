import { build } from 'esbuild';
import { mkdir, writeFile, unlink, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { randomUUID } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
let profileImport;
if (args.length === 0 || (args.length === 2 && args[0] === '--view' && ['canonical', 'devops', 'fullstack', 'applied-ai', 'fde'].includes(args[1]))) {
  const view = args[1] ?? 'canonical';
  profileImport = `import { cvViews } from './src/app/cvViews'; const profile = { content: cvViews[${JSON.stringify(view)}] };`;
} else if (args.length === 2 && args[0] === '--profile' && /^[a-z0-9][a-z0-9-]*$/.test(args[1])) {
  const privateRoot = await realpath(path.join(root, 'profiles/private'));
  const profile = await realpath(path.join(privateRoot, `${args[1]}.ts`));
  if (path.dirname(profile) !== privateRoot) throw new Error('Profile must be inside profiles/private.');
  profileImport = `import profile from ${JSON.stringify(profile)};`;
} else {
  throw new Error('Usage: npm run cv:pdf -- [--view canonical|devops|fullstack|applied-ai|fde | --profile <local-profile-name>]');
}
const output = path.join(root, 'output');
await mkdir(output, { recursive: true });
const temporary = path.join(output, `.render-${randomUUID()}.mjs`);
try {
  // Node-only entry: no server, browser route, or production import of private data.
  const result = await build({
    stdin: {
      contents: `import React from 'react';
        import { renderToFile } from '@react-pdf/renderer';
        import { PdfDocument } from './src/app/PdfDocument';
        ${profileImport}
        import path from 'node:path';
        const name = profile.content.pdfFileName;
        if (!name || path.basename(name) !== name || !/^[\\w.-]+\\.pdf$/.test(name)) throw new Error('Invalid PDF filename');
        const destination = path.join(${JSON.stringify(output)}, name);
        await renderToFile(React.createElement(PdfDocument, profile), destination);
        console.log(destination);`,
      resolveDir: root, loader: 'tsx', sourcefile: 'local-pdf-entry.tsx',
    },
    bundle: true, packages: 'external', platform: 'node', format: 'esm', jsx: 'automatic', write: false,
  });
  await writeFile(temporary, result.outputFiles[0].contents);
  await import(pathToFileURL(temporary).href);
} finally {
  await unlink(temporary).catch(() => {});
}
