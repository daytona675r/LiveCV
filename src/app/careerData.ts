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
    dates: '01/2026 — 08/2026', context: 'Healthcare AI · Medical Computer Vision · Platform & MLOps',
    paragraphs: [],
    chapters: [
      {
        title: 'Product Reliability & Delivery Foundations',
        paragraphs: [
          'Built the CI/CD backbone for an existing multi-service healthcare AI application, integrating unit, integration and end-to-end tests into a staged pipeline that validated the application, built its service containers, brought the connected system up against the database and produced a tested, deployment-ready release. Harbor-based delivery then completed the reproducible path from code change to deployable containerized system.',
          'Also contributed to a real-time physician chat feature using persistent WebSocket connections alongside REST-based backend services.',
          'The resulting pipeline exposed previously hidden stability defects, turning testing from an isolated activity into a continuous engineering feedback loop and release gate.',
        ],
      },
      {
        title: 'MLOps Architecture & Model Delivery',
        paragraphs: [
          'Designed and built the delivery system around the ML team’s classification and detection models: separate smoke and full-training workflows, source-of-truth tracking across code, environments, datasets, runs, models and deployments, and staged validation from data integrity through deployability and golden-snapshot regression.',
          'Golden-snapshot regression compares fixed reference inputs and predictions to detect unexpected case-level changes between model versions before deployment, complementing aggregate performance metrics.',
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
      'Developed and evolved four core structural-engineering applications and several smaller products over fifteen years. These were essential professional tools for demanding civil and structural engineers. The software modeled structural components, load cases, forces, moments and calculation results, supporting engineering decisions about real buildings and structures where accuracy and reliable behavior mattered.',
      'Built sophisticated engineering interfaces combining extensive parameter input, configurable calculation workflows, real-time progress reporting, interactive 2D/3D visualization and direct editing of structural components and properties within graphical views, complemented by detailed PDF calculation reports.',
      'Co-designed and implemented the gradual modernization of tightly coupled .NET/WPF applications through MVVM and clearer separation of domain logic, UI and data access. The architecture evolved toward centralized engineering data, shared calculation services, backend APIs and application-specific web frontends, allowing existing desktop applications to reuse the same services without a disruptive rewrite.',
      'In parallel, evolved the engineering delivery infrastructure from SVN, automated builds and TeamCity CI/CD toward Git, Docker and cloud-based deployment workflows targeting Kubernetes on Azure. Remained hands-on in full-stack development while contributing architectural decisions, code reviews, technical standards and documentation across a growing distributed engineering team.',
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

export const freelanceEngagements: CareerRole[] = [
  {
    id: 'freelance-rag-sales-assistant', company: 'Freelance AI Engineer', title: 'RAG Sales Assistant', dates: '2025', context: 'Solar / Technical Sales',
    paragraphs: ['Designed and implemented a RAG-based assistant for the technical sales team of a solar company. Product manuals, specifications and technical documentation for solar modules, inverters and related components formed the knowledge base; sales staff could ask questions about technical characteristics and compatibility during customer conversations and receive context-aware information for the sales process.'],
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
    desc: 'Two LangGraph workflows for business/context research and social-content generation, with provider/LLM integration, structured evaluation, conditional refinement and re-evaluation through explicit workflow states.',
    pattern: '', tags: ['LangGraph', 'Python', 'FastAPI', 'ChromaDB'],
    links: [
      { label: 'Source: github.com/daytona675r/ContentAgent', url: 'https://github.com/daytona675r/ContentAgent' },
      { label: 'Live demo: pulse-demo-web.onrender.com', url: 'https://pulse-demo-web.onrender.com' },
    ],
  },
  signalloop: {
    name: 'SignalLoop',
    desc: 'Evidence-driven product discovery: investigate product ideas through versioned hypotheses, attributable research findings and explicit human review. The goal is to preserve what was learned, what changed between iterations and why a product decision was made.',
    pattern: '', tags: ['FastAPI', 'PostgreSQL', 'versioned evidence', 'provenance'],
    links: [{ label: 'Source: github.com/daytona675r/signal-loop', url: 'https://github.com/daytona675r/signal-loop' }],
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

export const careerData = { person, roles, freelanceEngagements, projects, capabilities, engineeringScope, education };

// Derived adapters keep existing local application profiles source-compatible.
export const earlierRoles = roles.slice(2).map(r => ({ ...r, role: r.title, desc: r.paragraphs.join(' ') }));
export const careerFacts = { person, currentRole: roles[0], previousRole: roles[1], earlierRoles, education };
