# LiveCV

[![Live Demo](https://img.shields.io/badge/Live%20Demo-livecv--mariowangen.vercel.app-000?style=flat&logo=vercel&logoColor=white)](https://livecv-mariowangen.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

Interactive online CV for Mario Wangen — Senior Software Engineer — with focused variants built from one shared career history and design.

View the live site at [livecv-mariowangen.vercel.app](https://livecv-mariowangen.vercel.app), or download a print-ready two-page PDF directly from the page.

## CV variants

LiveCV uses one factual career model with four role-oriented views.

The underlying employment history, projects, dates, and experience remain the same. Only emphasis and presentation change depending on the type of engineering problem.

- `/` — AI Infrastructure & MLOps — Production AI platforms, infrastructure, and reliable delivery.

- `/fullstack` — Full-Stack & Product Engineering — The broader software-engineering foundation: products, architecture, APIs, and delivery.

- `/applied-ai` — Applied AI, RAG & LLM Systems — Engineering useful applications around modern models: retrieval, agents, evaluation, and orchestration.

- `/fde` — AI Solutions & Product Delivery — Problem-driven engineering: understanding requirements, shaping solutions, and carrying them into production.

The variants are not different professional identities. They are different views of the same engineering background.

The engineering principle is simple: keep one factual source of truth for career data, while the presentation layer emphasizes different parts of the experience for different roles. The underlying experience does not change.

Each route provides matching neutral metadata and a view-specific PDF download. Vercel rewrites direct route requests to the single-page application entry point. The legacy `/ai` route redirects to `/applied-ai`.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

## Deployment

Production releases use the repository-backed Vercel workflow:

1. Validate the application locally.
2. After explicit approval, commit and push the release to `main` on GitHub.
3. Let the linked Vercel project build and deploy from that GitHub commit.

Direct production deployments from a local working tree are reserved for recovery scenarios.
