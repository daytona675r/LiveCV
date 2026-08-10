export type CvVariant = "base" | "fullstack" | "ai" | "fde";

export type CapabilityGroup = {
  cat: string;
  items: string[];
};

export type CaseStudy = {
  title: string;
  body: string;
};

export type Project = {
  name: string;
  desc: string;
  pattern: string;
  tags: string[];
};

export type StackGroup = {
  cat: string;
  items: string[];
};

export type CvContent = {
  variant: CvVariant;
  route: string;
  pageTitle: string;
  metaDescription: string;
  headline: string;
  hero: string;
  profile: string;
  profileNote: string;
  currentRoleSummary: string;
  capabilities: CapabilityGroup[];
  caseStudies: CaseStudy[];
  schlegelSummary: string;
  schlegelHighlights: string[];
  earlierExperienceSummary: string;
  projects: Project[];
  stack: StackGroup[];
  pdfFileName: string;
};

export const earlierRoles = [
  { company: "Indanet AG", role: "Software Engineer", desc: "Security and disruption management solutions for public transportation." },
  { company: "MAP&GUIDE GmbH", role: "Software Engineer", desc: "Navigation software and GPS systems." },
  { company: "M.ABLE GmbH", role: "Software Engineer", desc: "Mobile CRM solutions for BMW." },
  { company: "SOFiSTiK AG", role: "Software Engineer", desc: "Structural engineering and BIM software." },
];

export const education = [
  {
    school: "Turing College",
    degree: "AI Engineering",
    desc: "Modern LLM applications, retrieval systems, agentic workflows, production AI engineering, and end-to-end AI application development.",
    accent: true,
  },
  { school: "Academy of Administration and Economics, Munich", degree: "Business Information Systems", desc: null, accent: false },
  { school: "Eckert Schools", degree: "IT Specialist – Application Development", desc: null, accent: false },
];

const projectCatalog = {
  atlas: {
    name: "Atlas",
    desc: "Model delivery platform supporting production AI workflows through reproducible release artifacts, validation gates, and automated deployment.",
    pattern: "Versioned model lifecycle with automated validation",
    tags: ["MLflow", "Kubernetes", "Terraform", "DVC"],
  },
  pulse: {
    name: "PULSE ContentAgent",
    desc: "Designed to transform fragmented content creation into a structured, repeatable workflow through agent orchestration and evaluation.",
    pattern: "State-machine based orchestration",
    tags: ["LangGraph", "Python", "FastAPI", "OpenAI"],
  },
  knowledge: {
    name: "Production Knowledge Platform",
    desc: "Enterprise RAG architecture separating ingestion, indexing, retrieval and generation into independent services.",
    pattern: "Decoupled ingestion–retrieval services",
    tags: ["RAG", "LangChain", "PostgreSQL", "AWS"],
  },
  startupCoach: {
    name: "StartupCoach",
    desc: "Context-aware AI coaching using retrieval augmentation and function calling for personalised guidance.",
    pattern: "Retrieval-augmented generation with tool calling",
    tags: ["OpenAI", "RAG", "FastAPI", "Python"],
  },
  interviewCoach: {
    name: "InterviewCoach",
    desc: "Adaptive interview simulation using structured LLM workflows with dynamic follow-up generation.",
    pattern: "Graph-based adaptive dialogue flow",
    tags: ["LangGraph", "OpenAI", "React", "TypeScript"],
  },
} satisfies Record<string, Project>;

const baseCapabilities: CapabilityGroup[] = [
  {
    cat: "AI Platforms",
    items: ["MLflow model lifecycle", "Validation gate design", "Golden snapshot testing", "Reproducible pipelines", "CI dataset architecture"],
  },
  {
    cat: "AI Systems",
    items: ["LangGraph / agent orchestration", "RAG architecture", "LLM integration", "Retrieval pipeline design"],
  },
  {
    cat: "Cloud & Infrastructure",
    items: ["Kubernetes", "Terraform", "Docker / container ops", "AWS · S3"],
  },
  {
    cat: "Platform Engineering",
    items: ["Python", "CI/CD design", "FastAPI · REST", "System architecture"],
  },
];

const baseCaseStudies: CaseStudy[] = [
  {
    title: "Atlas — model delivery platform",
    body: "Partnered with ML engineers to design automated model delivery workflows based on MLflow, replacing manual promotion workflows with reproducible, version-controlled release artifacts.",
  },
  {
    title: "Built confidence into production releases",
    body: "Introduced multi-stage validation gates and golden snapshot testing — a per-sample behavioral baseline that catches prediction regressions that aggregate metrics miss entirely.",
  },
  {
    title: "Infrastructure as an engineering product",
    body: "Built Kubernetes- and Terraform-based infrastructure supporting production AI workloads, designed to be maintained by the next engineer rather than operated through tribal knowledge.",
  },
  {
    title: "Reduced operational friction",
    body: "Treated internal AI infrastructure as an engineering product: CI datasets, automated deployment pipelines, and a single alias flip as the only human step in promoting a model to production.",
  },
];

const baseSchlegelHighlights = [
  "Developed enterprise desktop and SaaS applications throughout the complete software lifecycle.",
  "Established CI/CD pipelines, containerised deployments, and automated development workflows.",
  "Worked directly with customers to translate complex engineering requirements into maintainable software solutions.",
  "Built a strong foundation in designing software intended to remain maintainable over many years.",
];

const baseStack: StackGroup[] = [
  { cat: "AI / ML", items: ["MLflow", "LangGraph", "LangChain", "OpenAI API", "DVC"] },
  { cat: "Infrastructure", items: ["Kubernetes", "Terraform", "Docker", "AWS", "S3"] },
  { cat: "Languages", items: ["Python", "TypeScript", ".NET"] },
  { cat: "Frameworks & Tools", items: ["FastAPI", "React", "Angular", "PostgreSQL", "Pixi", "Git"] },
];

const base: CvContent = {
  variant: "base",
  route: "/",
  pageTitle: "Mario Wangen — Senior Software Engineer",
  metaDescription: "Mario Wangen, Senior Software Engineer focused on AI infrastructure, MLOps, and reliable production systems.",
  headline: "Senior Software Engineer | AI Infrastructure & MLOps",
  hero: "Building the engineering platforms that enable AI teams to ship reliable software.",
  profile: "I've spent more than twenty years building software platforms for environments where reliability matters. Today I work at the intersection of software engineering and AI, designing reliable platforms and products that turn complex requirements into production-ready systems.",
  profileNote: "Helping machine learning teams move from experimentation to production through engineering discipline, automation, and platform thinking.",
  currentRoleSummary: "Designed and evolved the engineering platform supporting production AI systems in healthcare, enabling machine learning teams to move from research to reliable production through automation, reproducibility, and platform engineering.",
  capabilities: baseCapabilities,
  caseStudies: baseCaseStudies,
  schlegelSummary: "Designed and delivered engineering software for structural analysis and civil engineering projects over fifteen years. My role naturally expanded to encompass architecture, DevOps, automation, and technical leadership across the full software lifecycle.",
  schlegelHighlights: baseSchlegelHighlights,
  earlierExperienceSummary: "Earlier roles established a broad foundation across enterprise software, embedded systems, GIS, mobile applications, and customer-focused product development.",
  projects: [projectCatalog.atlas, projectCatalog.pulse, projectCatalog.knowledge, projectCatalog.startupCoach],
  stack: baseStack,
  pdfFileName: "Mario_Wangen_CV.pdf",
};

const fullstack: CvContent = {
  ...base,
  variant: "fullstack",
  route: "/fullstack",
  pageTitle: "Mario Wangen — Senior Software Engineer | Full-Stack & Product Engineering",
  metaDescription: "Mario Wangen, Senior Software Engineer focused on full-stack product engineering, architecture, APIs, cloud platforms, and reliable delivery.",
  headline: "Senior Software Engineer | Full-Stack & Product Engineering",
  hero: "Building reliable software products from architecture to production.",
  profile: "For more than twenty years, I've built and evolved software products across engineering, enterprise SaaS, and healthcare. My background spans full-stack development, architecture, APIs, cloud platforms, and CI/CD, with a focus on maintainability, reliability, and taking features from requirements through production.",
  profileNote: "AI is now another part of that toolbox—not a replacement for solid software engineering.",
  currentRoleSummary: "Designed and evolved the engineering platform behind production AI systems in healthcare, applying software architecture, automation, APIs, and infrastructure engineering to move demanding workflows into reliable production.",
  capabilities: [
    { cat: "Software Engineering", items: [".NET", "Python", "TypeScript", "System architecture", "REST APIs"] },
    { cat: "Web & Product Engineering", items: ["React", "Angular", "FastAPI", "PostgreSQL", "Enterprise SaaS"] },
    { cat: "Cloud & Delivery", items: ["AWS · S3", "Docker", "Kubernetes", "Terraform", "CI/CD design"] },
    { cat: "Applied AI", items: ["LLM integration", "RAG architecture", "Agent orchestration", "MLflow lifecycle"] },
  ],
  caseStudies: [baseCaseStudies[2], baseCaseStudies[0], baseCaseStudies[3], baseCaseStudies[1]],
  projects: [projectCatalog.interviewCoach, projectCatalog.pulse, projectCatalog.knowledge, projectCatalog.startupCoach],
  stack: [
    { cat: "Software Engineering", items: [".NET", "Python", "TypeScript", "System architecture", "REST APIs"] },
    { cat: "Web & Product", items: ["React", "Angular", "FastAPI", "PostgreSQL", "SaaS applications"] },
    { cat: "Cloud & Delivery", items: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"] },
    { cat: "Applied AI", items: ["OpenAI API", "LangGraph", "LangChain", "RAG", "MLflow"] },
  ],
  pdfFileName: "Mario_Wangen_CV_Fullstack.pdf",
};

const ai: CvContent = {
  ...base,
  variant: "ai",
  route: "/ai",
  pageTitle: "Mario Wangen — Senior Software Engineer | Applied AI & LLM Systems",
  metaDescription: "Mario Wangen, Senior Software Engineer building practical LLM, RAG, agent, evaluation, and production AI systems.",
  headline: "Senior Software Engineer | Applied AI & LLM Systems",
  hero: "Building practical AI systems around retrieval, agents and production-grade software engineering.",
  profile: "For more than twenty years, I've built production software; today I apply that engineering discipline to modern AI systems. I design RAG applications, agent workflows, evaluation and orchestration layers, plus the APIs and infrastructure around them, with a focus on turning promising prototypes into reliable products.",
  profileNote: "My focus is engineering useful systems around foundation models—not building the models themselves.",
  currentRoleSummary: "Designed and evolved the engineering platform supporting production AI systems in healthcare, connecting model lifecycle, validation, automation, and infrastructure so machine learning work can move reliably from research into production.",
  capabilities: [
    { cat: "Applied AI", items: ["LLM applications", "LangGraph orchestration", "Agent workflows", "Tool calling"] },
    { cat: "RAG & Retrieval", items: ["RAG architecture", "Retrieval pipelines", "LangChain", "PostgreSQL"] },
    { cat: "AI Quality", items: ["Evaluation workflows", "Validation gates", "Golden snapshot testing", "MLflow lifecycle"] },
    { cat: "Software & Production", items: ["Python · FastAPI", "TypeScript · React", "Docker · Kubernetes", "AWS · CI/CD"] },
  ],
  caseStudies: [baseCaseStudies[1], baseCaseStudies[0], baseCaseStudies[3], baseCaseStudies[2]],
  projects: [projectCatalog.pulse, projectCatalog.knowledge, projectCatalog.startupCoach, projectCatalog.atlas],
  stack: [
    { cat: "Applied AI", items: ["OpenAI API", "LangGraph", "LangChain", "Tool calling", "Agent workflows"] },
    { cat: "RAG & Quality", items: ["RAG", "Retrieval pipelines", "Evaluation", "Validation gates", "DVC"] },
    { cat: "Software Engineering", items: ["Python", "FastAPI", "TypeScript", "React", "PostgreSQL"] },
    { cat: "Production", items: ["MLflow", "Docker", "Kubernetes", "AWS", "CI/CD"] },
  ],
  pdfFileName: "Mario_Wangen_CV_Applied_AI.pdf",
};

const fde: CvContent = {
  ...base,
  variant: "fde",
  route: "/fde",
  pageTitle: "Mario Wangen — Senior Software Engineer | AI Solutions & Product Delivery",
  metaDescription: "Mario Wangen, Senior Software Engineer turning complex requirements into practical software and AI solutions.",
  headline: "Senior Software Engineer | AI Solutions & Product Delivery",
  hero: "Turning complex requirements into reliable software and AI solutions.",
  profile: "For more than twenty years, I've worked on complex software products where understanding the problem is as important as writing the code. I shape ambiguous technical or domain requirements into practical solutions and carry them through architecture, integration, and production.",
  profileNote: "Production AI and ML systems now extend a broad software, infrastructure, and delivery toolbox.",
  currentRoleSummary: "Designed and evolved the engineering platform supporting production AI systems in healthcare, translating model-delivery and validation needs into maintainable workflows, infrastructure, and production operations.",
  capabilities: [
    { cat: "Solution Engineering", items: ["Requirements analysis", "Problem decomposition", "System architecture", "Maintainable solution design"] },
    { cat: "Product Delivery", items: ["End-to-end implementation", "Full software lifecycle", "CI/CD design", "Workflow automation"] },
    { cat: "Software & Integration", items: ["Python · .NET · TypeScript", "FastAPI · REST", "React · PostgreSQL", "Enterprise SaaS"] },
    { cat: "AI & Production", items: ["LLM · RAG systems", "MLflow lifecycle", "Kubernetes · Terraform", "AWS · Docker"] },
  ],
  caseStudies: [baseCaseStudies[0], baseCaseStudies[3], baseCaseStudies[1], baseCaseStudies[2]],
  projects: [projectCatalog.pulse, projectCatalog.knowledge, projectCatalog.atlas, projectCatalog.startupCoach],
  stack: [
    { cat: "Solution Engineering", items: ["Requirements analysis", "System architecture", "REST APIs", "Integration"] },
    { cat: "Product Delivery", items: ["Full lifecycle", "CI/CD", "Automation", "Git", "SaaS applications"] },
    { cat: "Software", items: ["Python", ".NET", "TypeScript", "React", "FastAPI"] },
    { cat: "AI & Platform", items: ["RAG", "LangGraph", "MLflow", "Kubernetes", "AWS"] },
  ],
  pdfFileName: "Mario_Wangen_CV_AI_Solutions.pdf",
};

export const cvVariants: Record<CvVariant, CvContent> = { base, fullstack, ai, fde };

const routeVariants: Record<string, CvVariant> = {
  "/": "base",
  "/fullstack": "fullstack",
  "/ai": "ai",
  "/fde": "fde",
};

export function getCvContent(pathname: string): CvContent {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return cvVariants[routeVariants[normalizedPath] ?? "base"];
}
