export type CvView = "mlops" | "fullstack" | "applied-ai" | "fde";

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
  variant: CvView;
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

export const careerFacts = {
  person: {
    name: "Mario Wangen",
    location: "Dresden, Germany",
    email: "mario.wangen@live.de",
    linkedin: "https://linkedin.com/in/mariowangen",
    github: "https://github.com/daytona675r",
  },
  currentRole: {
    title: "Senior Software Engineer – AI Platform Engineering",
    company: "Cancilico",
    dates: "2026 — Present",
    context: "AI Infrastructure for Medical Computer Vision · Hybrid",
  },
  previousRole: {
    title: "Senior Software Engineer",
    company: "Ingenieurbüro Schlegel",
    dates: "2010 — 2025",
    context: "Engineering Software · Structural Analysis",
  },
  earlierRoles: [
    { company: "Indanet AG", role: "Software Engineer", desc: "Security and disruption management solutions for public transportation." },
    { company: "MAP&GUIDE GmbH", role: "Software Engineer", desc: "Navigation software and GPS systems." },
    { company: "M.ABLE GmbH", role: "Software Engineer", desc: "Mobile CRM solutions for BMW." },
    { company: "SOFiSTiK AG", role: "Software Engineer", desc: "Structural engineering and BIM software." },
  ],
  education: [
    {
      school: "Turing College",
      degree: "AI Engineering",
      desc: "Modern LLM applications, retrieval systems, agentic workflows, production AI engineering, and end-to-end AI application development.",
      accent: true,
    },
    { school: "Academy of Administration and Economics, Munich", degree: "Business Information Systems", desc: null, accent: false },
    { school: "Eckert Schools", degree: "IT Specialist – Application Development", desc: null, accent: false },
  ],
};

export const earlierRoles = careerFacts.earlierRoles;
export const education = careerFacts.education;

const projectCatalog = {
  atlas: {
    name: "Atlas",
    desc: "Personal reference implementation of production-oriented MLOps patterns, informed by practical experience building AI infrastructure and ML delivery systems.",
    pattern: "Reproducible training, validation, and model promotion",
    tags: ["MLflow", "Kubernetes", "Terraform", "DVC"],
  },
  pulse: {
    name: "PULSE ContentAgent",
    desc: "Designed to transform fragmented content creation into a structured, repeatable workflow through LangGraph orchestration, structured outputs, ChromaDB-backed retrieval, and evaluation boundaries.",
    pattern: "Staged orchestration with retrieval and evaluation",
    tags: ["LangGraph", "ChromaDB", "Python", "FastAPI"],
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
    items: ["MLflow model lifecycle", "Validation gate design", "Golden snapshot testing", "Reproducible pipelines", "Model promotion"],
  },
  {
    cat: "AI Systems",
    items: ["LangGraph / agent orchestration", "RAG architecture", "LLM integration", "Retrieval pipeline design"],
  },
  {
    cat: "Cloud & Infrastructure",
    items: ["Kubernetes", "Terraform · IaC", "Docker / container ops", "AWS · S3", "CPU/GPU environments"],
  },
  {
    cat: "Platform Engineering",
    items: ["Python", "TeamCity · CI/CD", "FastAPI · REST", "System architecture"],
  },
];

const baseCaseStudies: CaseStudy[] = [
  {
    title: "Built the MLOps delivery workflow",
    body: "Built MLflow-based workflows spanning reproducible training, validation, model promotion, and deployment, replacing manual handoffs with version-controlled release artifacts.",
  },
  {
    title: "Built validation into the ML lifecycle",
    body: "Introduced gates across data, engineering pipelines, trained-model quality, and deployment, including golden snapshot testing to catch behavioral regressions before production.",
  },
  {
    title: "Infrastructure as an engineering product",
    body: "Built Kubernetes infrastructure and Terraform-based infrastructure as code for production AI workloads, with Docker and environment automation designed for long-term maintainability.",
  },
  {
    title: "Reduced operational friction",
    body: "Used TeamCity automation and CI datasets to streamline model promotion, and designed CPU- and GPU-specific Coder environments around validation and training workloads.",
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
  variant: "mlops",
  route: "/",
  pageTitle: "Mario Wangen — Senior Software Engineer | AI Infrastructure & MLOps",
  metaDescription: "Mario Wangen, Senior Software Engineer focused on AI infrastructure, MLOps, and reliable production systems.",
  headline: "Senior Software Engineer | AI Infrastructure & MLOps",
  hero: "Building the engineering platforms that enable AI teams to ship reliable software.",
  profile: "I've spent more than twenty years building software platforms for environments where reliability matters. Today I work at the intersection of software engineering and AI, designing reliable platforms and products that turn complex requirements into production-ready systems.",
  profileNote: "Helping machine learning teams move from experimentation to production through engineering discipline, automation, and platform thinking.",
  currentRoleSummary: "Designed and evolved the MLOps and AI infrastructure supporting production healthcare AI systems, spanning reproducible training, validation, model promotion, deployment, and the platform automation around that lifecycle.",
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
  currentRoleSummary: "Designed and evolved the software, MLOps, and infrastructure platform behind production healthcare AI systems, applying architecture, APIs, automation, and infrastructure as code to move demanding workflows into reliable production.",
  capabilities: [
    { cat: "Software Engineering", items: ["C# · .NET", "Python", "TypeScript", "System architecture", "REST APIs"] },
    { cat: "Web & Product Engineering", items: ["React", "Angular", "FastAPI", "PostgreSQL", "Enterprise SaaS"] },
    { cat: "Cloud & Delivery", items: ["AWS · S3", "Docker", "Kubernetes", "Terraform", "TeamCity · CI/CD"] },
    { cat: "Applied AI", items: ["LLM integration", "RAG architecture", "Agent orchestration", "MLflow lifecycle"] },
  ],
  caseStudies: [baseCaseStudies[2], baseCaseStudies[0], baseCaseStudies[3], baseCaseStudies[1]],
  projects: [projectCatalog.interviewCoach, projectCatalog.pulse, projectCatalog.knowledge, projectCatalog.startupCoach],
  stack: [
    { cat: "Software Engineering", items: ["C# · .NET", "Python", "TypeScript", "System architecture", "REST APIs"] },
    { cat: "Web & Product", items: ["React", "Angular", "FastAPI", "PostgreSQL", "SaaS applications"] },
    { cat: "Cloud & Delivery", items: ["AWS", "Docker", "Kubernetes", "Terraform", "TeamCity · CI/CD"] },
    { cat: "Applied AI", items: ["OpenAI API", "LangGraph", "LangChain", "RAG", "MLflow"] },
  ],
  pdfFileName: "Mario_Wangen_CV_Fullstack.pdf",
};

const appliedAi: CvContent = {
  ...base,
  variant: "applied-ai",
  route: "/applied-ai",
  pageTitle: "Mario Wangen — Senior Software Engineer | Applied AI, RAG & LLM Systems",
  metaDescription: "Mario Wangen, Senior Software Engineer building practical LLM, RAG, agent, evaluation, and production AI systems.",
  headline: "Senior Software Engineer | Applied AI, RAG & LLM Systems",
  hero: "Building practical AI systems around retrieval, agents and production-grade software engineering.",
  profile: "For more than twenty years, I've built production software; today I apply that engineering discipline to modern AI systems. I design RAG applications, agent workflows, evaluation and orchestration layers, plus the APIs and infrastructure around them, with a focus on turning promising prototypes into reliable products.",
  profileNote: "My focus is engineering useful systems around foundation models—not building the models themselves.",
  currentRoleSummary: "Designed and evolved the MLOps and AI infrastructure foundation for production healthcare AI systems, connecting reproducible training, multi-stage validation, model lifecycle management, and deployment automation.",
  capabilities: [
    { cat: "Applied AI", items: ["LLM applications", "LangGraph orchestration", "Agent workflows", "Tool calling"] },
    { cat: "RAG & Retrieval", items: ["RAG architecture", "Vector retrieval", "ChromaDB", "LangChain"] },
    { cat: "AI Quality", items: ["Evaluation workflows", "Structured outputs", "Validation gates", "MLflow lifecycle"] },
    { cat: "Software & Production", items: ["Python · FastAPI", "TypeScript · React", "Docker · Kubernetes", "AWS · CI/CD"] },
  ],
  caseStudies: [baseCaseStudies[1], baseCaseStudies[0], baseCaseStudies[3], baseCaseStudies[2]],
  projects: [projectCatalog.pulse, projectCatalog.knowledge, projectCatalog.startupCoach, projectCatalog.atlas],
  stack: [
    { cat: "Applied AI", items: ["OpenAI API", "LangGraph", "LangChain", "Tool calling", "Agent workflows"] },
    { cat: "RAG & Quality", items: ["RAG", "ChromaDB", "Vector retrieval", "Evaluation", "Structured outputs"] },
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
  currentRoleSummary: "Turned complex ML delivery and operational requirements into a maintainable MLOps system for production healthcare AI, spanning validation, model promotion, infrastructure automation, and deployment.",
  capabilities: [
    { cat: "Solution Engineering", items: ["Requirements analysis", "Problem decomposition", "System architecture", "Customer collaboration"] },
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

export const cvViews = {
  mlops: base,
  fullstack,
  "applied-ai": appliedAi,
  fde,
} satisfies Record<CvView, CvContent>;

export const cvRoutes = {
  "/": "mlops",
  "/fullstack": "fullstack",
  "/applied-ai": "applied-ai",
  "/fde": "fde",
} satisfies Record<string, CvView>;

function normalizePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function getCvRedirect(pathname: string): string | undefined {
  return normalizePath(pathname) === "/ai" ? "/applied-ai" : undefined;
}

export function getCvContent(pathname: string): CvContent | undefined {
  const view = cvRoutes[normalizePath(pathname) as keyof typeof cvRoutes];
  return view ? cvViews[view] : undefined;
}
