import { careerData } from './careerData';
import type { CvContent, CvView } from './cvTypes';

const profile = 'Senior software engineer with more than 20 years of experience building and evolving production systems across mobile applications, engineering software, enterprise SaaS and healthcare AI.\n\nI stay hands-on in implementation while taking ownership of complete systems, technical decisions and the engineering foundations other developers and teams depend on. In recent years, that scope has extended into cloud-native platforms, MLOps and AI-enabled systems.';

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

// Public views are emphasis overlays, never alternate employment histories.
// Keeping the same role references prevents factual divergence between routes.
export const cvViews: Record<CvView, CvContent> = {
  canonical,
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

export const cvRoutes = { '/': 'canonical', '/fullstack': 'fullstack', '/applied-ai': 'applied-ai', '/fde': 'fde' } satisfies Record<string, CvView>;
const normalizePath = (p: string) => p.length > 1 ? p.replace(/\/+$/, '') : p;
export function getCvRedirect(p: string): string | undefined { return normalizePath(p) === '/ai' ? '/applied-ai' : undefined; }
export function getCvContent(p: string): CvContent | undefined {
  const key = cvRoutes[normalizePath(p) as keyof typeof cvRoutes];
  return key ? cvViews[key] : undefined;
}
