import type { CareerRole, Education, Project, CapabilityGroup } from './cvTypes';

// Applicant-confirmed career facts. Views select/order these records; they do not
// redefine employers, titles, dates or the substance of an engineering chapter.
export const person = {
  name: 'Mario Wangen', title: 'Senior Software Engineer', location: 'Dresden, Germany',
  email: 'mario.wangen@live.de', linkedin: 'https://linkedin.com/in/mariowangen',
  github: 'https://github.com/daytona675r',
};

export const roles: CareerRole[] = [
  {
    id: 'cancilico', company: 'Cancilico GmbH', title: 'Senior Software Engineer',
    dates: '01/2026 — Present', context: 'Healthcare AI · Medical Computer Vision · Platform & MLOps',
    paragraphs: [],
    chapters: [
      {
        title: 'Product Reliability & Delivery Foundations',
        paragraphs: [
          'Joined an already feature-rich healthcare AI platform whose main constraint was reliability. Built the unit, integration and end-to-end testing foundation, introduced robust Playwright interaction and locator conventions, and integrated the suites into TeamCity CI/CD as delivery gates.',
          'The tests exposed a substantial stability backlog and became an engineering feedback system and dependable baseline for subsequent development.',
        ],
      },
      {
        title: 'MLOps Architecture & Model Delivery',
        paragraphs: [
          'Designed and built the delivery system around the ML team’s classification and detection models: separate smoke and full-training workflows, source-of-truth tracking across code, environments, datasets, runs, models and deployments, and staged validation from data integrity through deployability and golden-snapshot regression.',
          'Full training and hyperparameter sweeps remain manually initiated by the ML team; validation, candidate handling, promotion and downstream delivery are automated. Approved models and their FastAPI inference service are packaged into versioned Docker images, published through Harbor and delivered through reproducible CI/CD workflows.',
          'Extended the platform with Kubernetes-hosted services, Terraform-based Infrastructure as Code and Coder environments: CPU for lightweight validation, GPU for full training. Documented architecture decisions continuously; an operational handbook enables the ML team to use the workflows independently.',
        ],
      },
    ],
    technologies: ['MLflow', 'TeamCity', 'Python', 'PyTorch', 'FastAPI', 'Docker', 'Harbor', 'Kubernetes', 'Terraform', 'Coder', 'AWS', 'Playwright'],
  },
  {
    id: 'schlegel', company: 'Ing. Büro Schlegel', title: 'Senior Software Development Engineer',
    dates: '2010 — 2025', context: 'Engineering Software · Structural Analysis',
    paragraphs: [
      'Developed and evolved four core structural-engineering applications and several smaller products over fifteen years, translating components, load cases, forces, moments and calculation results into maintainable software and data structures.',
      'Modernized tightly coupled .NET/WPF applications through MVVM and cleaner separation of business logic, UI and data access. Introduced SVN, automated builds and TeamCity CI/CD where these foundations had not previously existed.',
      'Co-designed and implemented the multi-year transition to service-based web architectures: central engineering data, dedicated backend APIs and application-specific frontends. Desktop development continued in parallel, progressively reusing backend calculation services instead of requiring a disruptive rewrite.',
      'Hands-on implementation spanned C#/.NET, web/full-stack development, APIs, Python, Docker, databases and interactive 3D visualization, alongside architecture decisions, reviews, standards and documentation as the team grew from three developers to a distributed European group of around eight.',
    ],
  },
  {
    id: 'indanet', company: 'Indanet AG', title: 'Software Engineer', dates: '2008 — 2010',
    context: 'Public Transport Control & Incident Management Systems',
    paragraphs: [
      'Developed control-center systems coordinating incidents, emergency calls, personnel, cameras and event histories. Built the GIS layer as the primary operational interface: inspecting stations and incidents, accessing/switching camera feeds and dispatching moving response personnel directly from the map.',
      'Designed RPC-based backup, replication and recovery for control-center data, handling interrupted connections, redundant data and conflicting state, with repeated recovery attempts until a center reported healthy. Live public-transport operations required extensive testing, code review and controlled deployment windows.',
    ],
  },
  {
    id: 'mapguide', company: 'MAP&GUIDE GmbH', title: 'Software Developer', dates: '2006 — 2007', context: '',
    paragraphs: ['Contributed to feature development for mobile navigation and GPS products.'],
  },
  {
    id: 'mable', company: 'M.ABLE GmbH', title: 'Software Developer', dates: '2004 — 2006', context: 'Mobile CRM',
    paragraphs: ['Worked on an early mobile CRM for field sales in a startup environment. Designed device-to-central-store synchronization over unreliable 2G connections, with record-level reconciliation, central-data precedence and timestamp-based conflict handling to safely reconcile interrupted or delayed updates.'],
  },
];

export const projects: Record<string, Project> = {
  spurwerk: {
    name: 'Spurwerk',
    desc: 'Engineering journal in development, designed to turn fragmented project notes, debugging history and architectural decisions into reusable knowledge. The design starts with a structured project/data model; selective AI-assisted organization and retrieval are planned.',
    pattern: 'In development · project design',
    tags: ['Planned: FastAPI', 'PostgreSQL', 'Docker', 'web frontend', 'LLM-assisted knowledge processing'],
  },
  pulse: {
    name: 'PULSE',
    desc: 'Agentic workflow system built around explicit stage responsibilities, evaluation boundaries, observability and controlled failure behavior rather than a single autonomous agent loop.',
    pattern: '', tags: ['LangGraph', 'Python', 'FastAPI', 'ChromaDB'],
  },
  atlas: {
    name: 'Atlas',
    desc: 'Independent reference implementation for reproducible ML delivery, staged validation and automated model promotion, exploring production-oriented MLOps patterns independently from professional codebases.',
    pattern: '', tags: ['MLflow', 'Terraform', 'DVC', 'FastAPI'],
  },
};

// A searchable toolbox, not proficiency ratings or a claim of equal depth.
export const capabilities: CapabilityGroup[] = [
  { cat: 'Software Engineering', items: ['C# / .NET', 'Python', 'TypeScript', 'React', 'Angular', 'Nuxt', 'FastAPI', 'REST'] },
  { cat: 'Architecture & Data', items: ['System design', 'relational modeling', 'SQL Server', 'PostgreSQL', 'MySQL', 'REST APIs', 'RPC', 'vector databases', 'distributed state'] },
  { cat: 'Delivery & Platform', items: ['TeamCity', 'CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'Harbor', 'Coder', 'Playwright'] },
  { cat: 'AI Systems', items: ['PyTorch', 'MLflow', 'MLOps', 'RAG', 'LangGraph', 'LLM APIs', 'vector databases'] },
  { cat: 'Engineering Practice', items: ['Automated testing', 'architecture documentation', 'code review', 'reproducibility', 'recovery', 'technical standards'] },
];

// Dates/results retained from the verified local career record. No private
// application module is imported into the public source graph.
export const education: Education[] = [
  { school: 'Turing College', degree: 'AI Engineering', dates: '04/2025 — 08/2025', result: '96/100', desc: null, accent: false },
  { school: 'Academy of Administration and Economics, Munich', degree: 'Business Information Systems', dates: '2005 — 2008 · part-time', qualification: 'Wirtschaftsinformatiker (VWA)', desc: null, accent: false },
  { school: 'Eckert Schools', degree: 'IT Specialist – Application Development', dates: '2000 — 2004', result: 'Final grade: 1.09', desc: null, accent: false },
];

export const engineeringScope = [
  'System Architecture', 'Data & Domain Modeling', 'Reliability & Recovery',
  'Testing & Quality Systems', 'CI/CD & Delivery', 'Platform Engineering',
  'Cloud / Infrastructure', 'Production AI / MLOps',
];

export const careerData = { person, roles, projects, capabilities, engineeringScope, education };

// Derived adapters keep existing local application profiles source-compatible.
export const earlierRoles = roles.slice(2).map(r => ({ ...r, role: r.title, desc: r.paragraphs.join(' ') }));
export const careerFacts = { person, currentRole: roles[0], previousRole: roles[1], earlierRoles, education };
