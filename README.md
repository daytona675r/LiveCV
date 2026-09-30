# LiveCV

Mario Wangen's canonical career narrative, rendered as a React web preview and a selectable three-page A4 PDF.

The primary identity is **Senior Software Engineer**. Experience leads: ownership of systems, architecture evolution, reliable delivery and the foundations other engineers depend on. AI/MLOps is the newest domain in that trajectory. Technologies remain a compact reference section rather than the main narrative.

## One factual source of truth

- `src/app/careerData.ts` holds the person, employers, official titles, dates, engineering chapters, education, project facts and capability inventory.
- `src/app/cvTypes.ts` defines the shared records and view contract.
- `src/app/cvViews.ts` contains presentation overlays: value statements, emphasis, selection/order and PDF filenames. Every public view references the same factual role records. Tailoring changes emphasis, not career identity or facts.
- `src/app/CvPages.tsx` defines one three-page content tree and layout in PDF points. Both the browser and React-PDF render this tree, keeping copy, hierarchy and page boundaries aligned.
- `src/app/App.tsx` adapts that tree to HTML, scales A4 pages responsively, updates metadata and provides the PDF download.
- `src/app/PdfDocument.tsx` adapts it to `@react-pdf/renderer`. `LegacyPdfDocument.tsx` retains compatibility with existing private application profiles.
- `src/app/cvContent.ts` is a compatibility export facade for older local profiles; it no longer owns career copy.

The canonical layout uses a roughly 67/33 narrative/supporting-rail split. Page one presents identity, profile and current engineering experience; page two covers long-term product modernization and operational systems; page three contains early engineering foundations and education in the main column, with selected work in the supporting rail. Capabilities, technologies and engineering practices remain supporting evidence. No photo, progress bars or proficiency scores.

## Public views

| Route | Presentation |
| --- | --- |
| `/` | Canonical career narrative (`canonical`) |
| `/fullstack` | Product and full-stack emphasis |
| `/applied-ai` | Applied AI emphasis within the same engineering career |
| `/fde` | Requirements-to-production emphasis |

The former root identifier `mlops` is replaced by `canonical`. The retained routes are presentation overlays, not separate factual histories or professional identities. `/ai` continues to redirect to `/applied-ai`, preserving query strings and fragments. Unknown paths show a not-found page. Vercel rewrites route requests to the SPA entry point.

## Development and validation

```bash
npm install
npm run dev
npm run build
npm test
```

The preview is normally at http://localhost:5173. Tests check the route contract, shared career facts, canonical content invariants and the public/private import boundary. Run the PDF checks where Poppler (`pdfinfo`, `pdftotext`) is installed:

```bash
npm run test:pdf
```

After content changes, inspect all PDF pages and the browser preview. Do not hide overflow or reduce type size to make additional content fit: edit hierarchy and wording, or make an explicit pagination decision. Narrative body text is 10 pt throughout; the supporting rail uses 9.2 pt, with smaller metadata.

## Generate PDFs locally

```bash
# Canonical: output/Mario_Wangen_CV.pdf
npm run cv:pdf

# Other public presentations
npm run cv:pdf -- --view fullstack
npm run cv:pdf -- --view applied-ai
npm run cv:pdf -- --view fde

# Private application profile
npm run cv:pdf -- --profile <name>
```

Generation uses React-PDF directly in Node, with no server or browser route. Temporary compiled entries are removed afterwards. The named PDF is replaced on regeneration.

## Private application profiles

**No company-specific application routes belong in the public repository.** Do not put applicant-company names or application copy in public configuration, metadata, navigation, source files or this README.

Private profiles belong in `profiles/private/<name>.ts`; generated documents belong in `output/`, and supporting documents in `documents/`. These directories are Git-ignored and excluded from Vercel uploads. Back them up privately: a clone will not restore them.

A profile exports `{ content, presentation, careerDetails? }`. Start with an entry from `cvViews` and override emphasis, language, selected work and the filename. Public factual records remain authoritative; corrections should be verified and made centrally, not contradicted by an overlay.

Existing local profiles importing `cvContent.ts` remain source-compatible. With `presentation.application: true`, the compatibility renderer supports their translated labels, factual-text translations, preferred work location, capability ordering and project tiles. Optional verified `careerDetails` support residence, earlier-role dates/notes and education details. Old translations keyed by changed titles, employers or context strings may need updating after a factual correction; never rely on stale wording to override the canonical history. Existing PDFs are not automatically regenerated.

For future editorial profiles, use the canonical content contract and shared layout. Do not import private modules into the public application graph. Test privacy and pagination before publishing code.

To combine existing documents locally, install Python with `pypdf` (or set `PYTHON` to a suitable executable):

```bash
npm run application:merge -- --output output/application.pdf output/cv.pdf /path/to/reference.pdf /path/to/certificate.pdf
```

The merge command refuses existing outputs and encrypted inputs. It does not preserve cryptographic signatures; retain originals.

## Deployment

Validate locally first. Commit/push and production deployment require explicit authorization. The normal release path is the repository-backed Vercel workflow; this refactor does not itself publish a release.
