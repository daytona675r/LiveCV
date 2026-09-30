import { careerData } from './careerData';
import type { CareerChapter, CareerRole, CvContent, CvView, StackGroup } from './cvTypes';

const profile = 'Senior software engineer with more than 20 years of experience building and evolving production systems across mobile applications, engineering software, enterprise SaaS and healthcare AI.\n\nI stay hands-on in implementation while taking ownership of complete systems, technical decisions and the engineering foundations other developers and teams depend on. In recent years, that scope has extended into cloud-native platforms, MLOps and AI-enabled systems.';

type RoleNarrativeOverride = { context?: string; paragraphs?: string[]; chapters?: CareerChapter[] };
function applyRoleOverrides(roles: CareerRole[], overrides: Record<string, RoleNarrativeOverride>): CareerRole[] {
  return roles.map(role => {
    const override = overrides[role.id];
    return override ? { ...role, ...override } : role;
  });
}

const canonical: CvContent = {
  variant: 'canonical', route: '/',
  pageTitle: 'Mario Wangen — Senior Software Engineer',
  metaDescription: 'Senior Software Engineer with more than 20 years of experience across software architecture, product engineering, reliable delivery, platform systems and production AI.',
  headline: careerData.person.title,
  hero: 'Building and evolving complex software systems from architecture and implementation to reliable delivery and production.',
  profile, profileNote: '', roles: careerData.roles,
  projects: [careerData.projects.spurwerk, careerData.projects.pulse],
  capabilities: careerData.capabilities, stack: careerData.capabilities,
  pdfFileName: 'Mario_Wangen_CV.pdf',
  // Derived compatibility fields for existing private application profiles.
  currentRoleSummary: careerData.roles[0].chapters![0].paragraphs[0],
  caseStudies: careerData.roles[0].chapters!.map(c => ({ title: c.title, body: c.paragraphs.join(' ') })),
  schlegelSummary: careerData.roles[1].paragraphs[0],
  schlegelHighlights: careerData.roles[1].paragraphs.slice(1),
  earlierExperienceSummary: '',
};

const devopsRoles = applyRoleOverrides(careerData.roles, {
  cancilico: {
    context: 'Healthcare AI · Software Engineering · Platform & MLOps',
    chapters: [
      {
        title: 'Product Reliability & CI/CD',
        paragraphs: [
          'Joined an already feature-rich, containerized healthcare AI platform whose immediate engineering constraint was reliability rather than missing functionality. Built the testing foundation across unit, integration and end-to-end levels, introduced robust UI/test conventions and integrated the suites into TeamCity CI/CD as automated quality and delivery gates. The resulting coverage exposed a substantial stability backlog and became a dependable feedback system for subsequent development.',
          'Implemented much of the CI/CD orchestration through Bash-based automation: preparing permissions and runtime environments, generating configuration dynamically, starting containers, executing build and application steps, evaluating logs and waiting for endpoint health before dependent stages could continue.',
        ],
      },
      {
        title: 'Platform Engineering & Automated Model Delivery',
        paragraphs: [
          'Designed and built the MLOps delivery system around the ML team’s classification and detection models. Established separate smoke and full-training workflows, source-of-truth tracking across code, environments, datasets, runs, models and deployments, and staged validation from data integrity through deployment and golden-snapshot regression.',
          'Full training and hyperparameter sweeps remain initiated by the ML team; validation, candidate handling, promotion and downstream delivery are automated. Approved models and their FastAPI inference service are packaged into versioned Docker images, published through Harbor and delivered through reproducible TeamCity workflows.',
          'Extended the surrounding platform with Kubernetes-hosted services, Terraform-based Infrastructure as Code and Coder environments for CPU and GPU workloads. MLflow provides run/metric visibility and traceability of automated model decisions. Architecture and operating workflows were documented continuously and consolidated into a handbook for the ML team.',
        ],
      },
    ],
  },
  schlegel: {
    paragraphs: [
      'Developed and evolved four core structural-engineering applications and several smaller products over fifteen years, translating complex structural-engineering domains into maintainable software and data structures.',
      'Modernized tightly coupled .NET/WPF applications through MVVM and clearer separation of business logic, UI and data access, while introducing engineering infrastructure that had not previously existed.',
      'Established Subversion-based source control, automated builds and TeamCity CI/CD, including automated/nightly production of installable application builds. During the later SaaS transition, evolved these delivery practices toward Git, Docker and service-based applications, with automated TeamCity build/deployment workflows targeting Kubernetes/Azure environments.',
      'Hands-on application development continued throughout: C#/.NET, backend APIs, web/full-stack development, Python components, databases and interactive 3D visualization, alongside architecture decisions, reviews, technical standards and documentation as the team grew from three developers to a distributed European group of around eight.',
    ],
  },
  indanet: {
    paragraphs: [
      'Developed operational control-center and incident-management systems for public transport. Built the GIS layer as the central operational interface for stations, events, cameras and mobile response personnel.',
      'Designed RPC-based backup, replication and recovery mechanisms, including handling interrupted connections, redundant or conflicting state and automated retries until the affected system returned healthy. Production rollouts were operationally sensitive and required extensive testing, code review and controlled deployment windows because failures could directly affect live public-transport operations.',
    ],
  },
});

const devopsStack: StackGroup[] = [
  { cat: 'Delivery & Platform', items: ['TeamCity', 'Bash / Shell', 'Linux', 'Git / GitHub', 'Docker', 'Kubernetes', 'Terraform', 'IaC', 'Harbor', 'Coder'] },
  { cat: 'Cloud & Infrastructure', items: ['Azure', 'AWS', 'self-managed environments', 'Storage integration', 'TLS / certificates'] },
  { cat: 'Software Engineering', items: ['C# / .NET', 'Python', 'TypeScript', 'React', 'Angular', 'Nuxt', 'FastAPI', 'REST'] },
  { cat: 'Operations & Quality', items: ['Unit / Integration / E2E', 'Endpoint Health Checks', 'Log-based Validation', 'Recovery', 'MLflow Metrics & Tracking'] },
  { cat: 'AI Systems', items: ['PyTorch', 'MLflow', 'MLOps', 'LangGraph', 'RAG', 'LLM APIs'] },
];

const devops: CvContent = {
  ...canonical,
  variant: 'devops', route: '/devops',
  pageTitle: 'Mario Wangen — Senior Software Engineer | Platform & DevOps',
  metaDescription: 'Senior Software Engineer with long-standing experience across software engineering, CI/CD, platform automation, Kubernetes, Infrastructure as Code and reliable production systems.',
  hero: 'Building reliable software systems across architecture, implementation, delivery, platform automation and production.',
  profile: 'Senior software engineer with more than 20 years of experience building and evolving production systems across enterprise software, engineering applications, operational systems and healthcare AI. Alongside application development, my work has repeatedly included the delivery and platform foundations required to run those systems reliably: automated testing, CI/CD, container platforms, Infrastructure as Code, recovery and reproducible deployments.\n\nI stay hands-on in implementation while taking ownership of complete systems, technical decisions and the engineering foundations other developers and teams depend on. In recent years, that scope has extended further into cloud-native platforms, MLOps and AI-enabled systems.',
  roles: devopsRoles,
  stack: devopsStack,
  capabilities: [{ cat: 'Engineering Capabilities', items: ['System Architecture', 'CI/CD & Delivery', 'Platform Engineering', 'Infrastructure as Code', 'Container Platforms', 'Deployment Automation', 'Reliability & Recovery', 'Testing & Quality Systems', 'Cloud Infrastructure', 'Production AI / MLOps'] }],
  capabilityRail: ['System Architecture', 'CI/CD & Delivery', 'Platform Engineering', 'Infrastructure as Code', 'Container Platforms', 'Deployment Automation', 'Reliability & Recovery', 'Testing & Quality Systems', 'Cloud Infrastructure', 'Production AI / MLOps'],
  page1StackCategories: ['Delivery & Platform', 'Cloud & Infrastructure', 'Software Engineering'],
  page2StackCategories: ['Operations & Quality', 'AI Systems'],
  pdfFileName: 'Mario_Wangen_CV_DevOps.pdf',
};

// Public views are emphasis overlays, never alternate employment histories.
// Keeping the same role references prevents factual divergence between routes.
export const cvViews: Record<CvView, CvContent> = {
  canonical,
  devops,
  fullstack: { ...canonical, variant: 'fullstack', route: '/fullstack',
    hero: 'Building and evolving software products across domain models, user interfaces, backend services and reliable delivery.',
    pdfFileName: 'Mario_Wangen_CV_Fullstack.pdf' },
  'applied-ai': { ...canonical, variant: 'applied-ai', route: '/applied-ai',
    hero: 'Bringing long-standing software engineering discipline to practical AI systems, workflows and reliable model delivery.',
    stack: [careerData.capabilities[3], ...careerData.capabilities.filter(c => c !== careerData.capabilities[3])],
    pdfFileName: 'Mario_Wangen_CV_Applied_AI.pdf' },
  fde: { ...canonical, variant: 'fde', route: '/fde',
    hero: 'Turning complex domain requirements into working systems, with ownership across architecture, implementation and production.',
    pdfFileName: 'Mario_Wangen_CV_AI_Solutions.pdf' },
};

export const cvRoutes = { '/': 'canonical', '/devops': 'devops', '/fullstack': 'fullstack', '/applied-ai': 'applied-ai', '/fde': 'fde' } satisfies Record<string, CvView>;
const normalizePath = (p: string) => p.length > 1 ? p.replace(/\/+$/, '') : p;
export function getCvRedirect(p: string): string | undefined { return normalizePath(p) === '/ai' ? '/applied-ai' : undefined; }
export function getCvContent(p: string): CvContent | undefined {
  const key = cvRoutes[normalizePath(p) as keyof typeof cvRoutes];
  return key ? cvViews[key] : undefined;
}
