export type CvVariant = "base" | "fullstack" | "ai" | "atlantic" | "bike24" | "fde";

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
    desc: "Personal reference implementation of production-oriented MLOps patterns, informed by practical experience building AI infrastructure and ML delivery systems.",
    pattern: "Reproducible training, validation, and model promotion",
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
    body: "Treated AI infrastructure as an engineering product, using CI datasets and CI/CD automation so a single alias change remained the only human step in model promotion.",
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
  currentRoleSummary: "Designed and evolved the MLOps and AI infrastructure foundation for production healthcare AI systems, connecting reproducible training, multi-stage validation, model lifecycle management, and deployment automation.",
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

const atlantic: CvContent = {
  ...ai,
  variant: "atlantic",
  route: "/ai/atlantic",
  pageTitle: "Mario Wangen — Senior Software Engineer | Applied AI, RAG & Cloud Systems",
  metaDescription: "Senior Software Engineer with experience across Applied AI, RAG, MLOps, cloud infrastructure and production software systems.",
  headline: "Senior Software Engineer | Applied AI, RAG & Cloud Systems",
  hero: "Building practical AI systems from retrieval and APIs to reliable cloud deployment.",
  profile: "For more than twenty years, I've built production software across engineering, enterprise SaaS, and healthcare. Today I apply that background to AI systems, combining RAG and agent workflows with Python APIs, cloud infrastructure, and the delivery practices required to run them reliably.",
  profileNote: "My professional work spans MLOps and AI infrastructure; personal projects explore retrieval, LLM orchestration, and evaluation across the complete system.",
  currentRoleSummary: "Designed and evolved MLOps and AI infrastructure supporting production healthcare AI systems, combining reproducible MLflow-based workflows with multi-stage validation, model lifecycle management, and cloud-native delivery on AWS.",
  capabilities: [
    { cat: "Applied AI & Retrieval", items: ["RAG architecture", "Retrieval pipelines", "LangChain · LangGraph", "LLM applications", "Agent workflows"] },
    { cat: "Software & APIs", items: ["Python · FastAPI", "REST API design", "PostgreSQL", "TypeScript · React", "System architecture"] },
    { cat: "MLOps & AI Infrastructure", items: ["MLflow model lifecycle", "Reproducible ML workflows", "Multi-stage validation", "Model promotion", "CI dataset architecture"] },
    { cat: "Cloud, Platform & Delivery", items: ["AWS · S3", "Kubernetes · Docker", "Terraform · IaC", "CI/CD automation", "Environment automation"] },
  ],
  caseStudies: [baseCaseStudies[0], baseCaseStudies[1], baseCaseStudies[2], baseCaseStudies[3]],
  projects: [
    {
      ...projectCatalog.knowledge,
      desc: "RAG system separating document ingestion, indexing, retrieval, and contextual generation into independent services for clear API integration.",
      pattern: "Decoupled document ingestion and retrieval",
    },
    {
      ...projectCatalog.pulse,
      desc: "Structured LLM workflow with staged orchestration and evaluation, designed to keep complex content generation repeatable and easier to validate.",
      pattern: "State-machine orchestration with evaluation stages",
    },
    {
      ...projectCatalog.atlas,
      desc: "Personal MLOps reference implementation demonstrating reproducible training, validation, model lifecycle management, infrastructure as code, and automated delivery.",
    },
    projectCatalog.startupCoach,
  ],
  stack: [
    { cat: "Applied AI & Retrieval", items: ["RAG", "LangChain", "LangGraph", "OpenAI API", "Agent workflows"] },
    { cat: "Software & APIs", items: ["Python", "FastAPI", "REST APIs", "PostgreSQL", "TypeScript"] },
    { cat: "MLOps & AI Infrastructure", items: ["MLflow", "Reproducible workflows", "Validation gates", "DVC", "Model promotion"] },
    { cat: "Cloud, Platform & Delivery", items: ["AWS", "Kubernetes", "Terraform", "Docker", "CI/CD"] },
  ],
  pdfFileName: "Mario_Wangen_CV_Atlantic_AI.pdf",
};

const bike24: CvContent = {
  ...base,
  variant: "bike24",
  route: "/mlops/bike24",
  pageTitle: "Mario Wangen — Senior Software Engineer | MLOps & Applied AI Systems",
  metaDescription: "Senior Software Engineer combining MLOps, AI infrastructure, RAG and production software engineering.",
  headline: "Senior Software Engineer | MLOps & Applied AI Systems",
  hero: "Engineering the infrastructure and workflows that move AI from experimentation to reliable production.",
  profile: "For more than twenty years, I've built software systems where reliability and maintainability matter. Today I work across MLOps, AI infrastructure, and applied AI, building the engineering systems that move machine-learning workloads from experimentation into reliable production.",
  profileNote: "My professional work covers reproducible MLflow workflows, multi-stage validation, Kubernetes, Terraform, Docker, AWS, and CI/CD; personal projects explore RAG, retrieval, LLM orchestration, and evaluation.",
  currentRoleSummary: "Designed and evolved MLOps and AI infrastructure supporting production healthcare AI systems, combining reproducible MLflow-based workflows with automated validation, model lifecycle management, and cloud-native delivery on AWS.",
  capabilities: [
    { cat: "MLOps & AI Infrastructure", items: ["MLflow model lifecycle", "Reproducible ML workflows", "Multi-stage validation", "Model promotion", "Deployment automation"] },
    { cat: "Applied AI & Retrieval", items: ["RAG architecture", "Retrieval pipelines", "LangChain · LangGraph", "LLM applications", "Agent workflows"] },
    { cat: "Cloud & Platform Engineering", items: ["Kubernetes · Docker", "Terraform · IaC", "AWS · S3", "Environment automation"] },
    { cat: "Software & Delivery", items: ["Python · FastAPI", "PostgreSQL · SQL", "REST API design", "CI/CD automation", "System architecture"] },
  ],
  caseStudies: [
    baseCaseStudies[0],
    {
      title: "Built validation into the ML lifecycle",
      body: "Built multi-stage validation into the ML delivery lifecycle, preventing models from progressing toward production before data, engineering pipeline, trained-model quality, and deployment checks succeeded.",
    },
    baseCaseStudies[2],
    baseCaseStudies[3],
  ],
  projects: [
    {
      ...projectCatalog.knowledge,
      desc: "RAG system separating document ingestion, indexing, retrieval, and contextual generation into independent services with API-backed retrieval workflows.",
      pattern: "Decoupled document ingestion and retrieval",
    },
    {
      ...projectCatalog.pulse,
      desc: "Structured LLM workflow with staged orchestration and evaluation, designed to keep complex content generation repeatable and easier to validate.",
      pattern: "State-machine orchestration with evaluation stages",
    },
    {
      ...projectCatalog.atlas,
      desc: "Personal MLOps reference implementation demonstrating reproducible training, validation, model lifecycle management, infrastructure as code, and automated delivery.",
    },
    projectCatalog.startupCoach,
  ],
  stack: [
    { cat: "MLOps & AI Infrastructure", items: ["MLflow", "Reproducible workflows", "Validation gates", "DVC", "Model promotion"] },
    { cat: "Applied AI & Retrieval", items: ["RAG", "Retrieval pipelines", "LangChain", "LangGraph", "OpenAI API"] },
    { cat: "Cloud & Platform", items: ["Kubernetes", "Terraform", "Docker", "AWS", "S3"] },
    { cat: "Software & Delivery", items: ["Python", "FastAPI", "PostgreSQL", "REST APIs", "CI/CD"] },
  ],
  pdfFileName: "Mario_Wangen_CV_BIKE24_MLOps.pdf",
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

export const cvVariants: Record<CvVariant, CvContent> = { base, fullstack, ai, atlantic, bike24, fde };

const routeVariants: Record<string, CvVariant> = {
  "/": "base",
  "/fullstack": "fullstack",
  "/ai": "ai",
  "/ai/atlantic": "atlantic",
  "/mlops/bike24": "bike24",
  "/fde": "fde",
};

export function getCvContent(pathname: string): CvContent {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return cvVariants[routeVariants[normalizedPath] ?? "base"];
}
