import { careerData } from './careerData';
import type { CareerChapter, CareerRole, CvContent, CvLabels, CvView, StackGroup } from './cvTypes';

const profile = 'Senior software engineer with more than 20 years of experience building and evolving production systems across mobile applications, engineering software, enterprise SaaS and healthcare AI.\n\nI stay hands-on in implementation while taking ownership of complete systems, technical decisions and the engineering foundations other developers and teams depend on. In recent years, that scope has extended into cloud-native platforms, MLOps and AI-enabled systems.';
const germanLabels: CvLabels = {
  profile: 'PROFIL', experience: 'BERUFSERFAHRUNG', capabilities: 'ENGINEERING-KOMPETENZEN',
  technology: 'TECHNOLOGIEN', technologyPractice: 'TECHNOLOGIEN & PRAXIS',
  earlyExperience: 'WEITERE BERUFSERFAHRUNG', education: 'AUSBILDUNG & QUALIFIKATION',
  selectedWork: 'AUSGEWÄHLTE PROJEKTE', download: 'Lebenslauf als PDF herunterladen',
  preparing: 'PDF wird vorbereitet…', downloadError: 'PDF-Erstellung fehlgeschlagen — bitte Seite neu laden',
};

// German CV copy: write German as German. Heroes prefer compact nominal phrasing;
// role achievements may use Aufbau, Konzeption, Integration and Einführung where natural.
// Keep first-person profiles as complete sentences, retain standard technical terms,
// localize ordinary administrative metadata, and avoid translating English gerund syntax literally.

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
          'Built the CI/CD backbone for an existing multi-service healthcare AI application, integrating unit, integration and end-to-end validation with container builds, database-backed system startup and release gating to produce a tested deployment candidate. Harbor-based delivery completed the reproducible path from code change to deployable containerized system.',
          'Implemented much of the pipeline orchestration through Bash-based automation: preparing permissions and runtime environments, generating configuration dynamically, starting containers, executing build and application steps, evaluating logs and waiting for endpoint health before dependent stages could continue. The resulting pipeline exposed previously hidden stability defects and established automated validation as a continuous engineering feedback loop and release gate.',
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

const fullstackRoles = applyRoleOverrides(careerData.roles, {
  cancilico: {
    context: 'Healthcare AI · Software Engineering · Platform & MLOps',
    chapters: [
      {
        title: 'Product Reliability & Delivery Foundations',
        paragraphs: [
          'Built the CI/CD backbone for an existing multi-service healthcare AI application with two web frontends, backend services, a database and a separate inference service. Also contributed to a real-time physician chat using persistent WebSocket connections alongside the application’s REST-based services. Integrated unit, integration and end-to-end tests into a staged pipeline that validated the connected application, built its service containers, brought the system up against the database and produced a tested, deployment-ready release. Harbor-based delivery completed the reproducible path from code change to deployable containerized system.',
          'The resulting pipeline exposed previously hidden stability defects, turning testing from an isolated activity into a continuous engineering feedback loop and release gate.',
        ],
      },
      {
        title: 'MLOps Architecture & Model Delivery',
        paragraphs: [
          'Designed and built the delivery architecture around the ML team’s classification and detection models, connecting versioned model artifacts, validation workflows and a FastAPI-based inference service into a controlled delivery process. Separate smoke and full-training workflows and source-of-truth tracking cover code, environments, datasets, runs, models and deployments, with staged validation through deployability and golden-snapshot regression.',
          'Full training and hyperparameter sweeps remain initiated by the ML team; validation, candidate handling, promotion and downstream delivery are automated. Approved models and their FastAPI inference service are packaged into versioned Docker images, published through Harbor and delivered through reproducible TeamCity workflows.',
          'Extended the surrounding platform with Kubernetes-hosted services, Terraform-based Infrastructure as Code and Coder environments. MLflow provides run/metric visibility and traceability of automated model decisions; architecture and operating workflows were documented continuously.',
        ],
      },
    ],
  },
  schlegel: {
    context: 'Engineering-Software · Tragwerksplanung',
    paragraphs: [
      'Developed and evolved four core structural-engineering applications and several smaller products over fifteen years, translating complex engineering domains into maintainable software and data structures.',
      'Modernized tightly coupled .NET/WPF applications through MVVM and clearer separation of business logic, UI and data access. Co-designed and implemented the multi-year transition from desktop software to service-based web architectures: central engineering data, dedicated backend services and REST APIs, and application-specific web frontends. Existing desktop clients were progressively connected to the same backend calculation services, allowing the architecture to evolve without a disruptive rewrite.',
      'Established source control, automated builds and TeamCity CI/CD where those foundations had not previously existed; during the later SaaS transition, delivery evolved toward Git, Docker and automated deployment into Kubernetes/Azure environments.',
      'Hands-on implementation spanned C#/.NET, backend services and APIs, web/full-stack development, Python, Docker, databases and interactive 3D visualization. Alongside implementation, contributed to architecture decisions, code reviews, technical standards and documentation as the team grew from three developers to a distributed European group of around eight.',
    ],
  },
});

const fullstackStack: StackGroup[] = [
  { cat: 'Software Engineering', items: ['C# / .NET', 'Python', 'TypeScript', 'React', 'Angular', 'Nuxt', 'FastAPI', 'REST APIs'] },
  { cat: 'Delivery & Platform', items: ['Git / GitHub', 'TeamCity', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'Harbor', 'Coder'] },
  { cat: 'AI / ML Integration', items: ['PyTorch', 'MLflow', 'MLOps', 'FastAPI', 'LangGraph', 'RAG'] },
  { cat: 'Architecture / Engineering Practice', items: ['System design', 'service-based architecture', 'relational modeling', 'SQL', 'REST APIs', 'RPC', 'WebSockets', 'distributed state', 'automated testing', 'architecture documentation', 'code review', 'technical standards', 'reproducibility', 'recovery', 'TLS / certificate trust'] },
];

const fullstack: CvContent = {
  ...canonical,
  variant: 'fullstack', route: '/fullstack',
  pageTitle: 'Mario Wangen — Senior Software Engineer | Full-Stack & Architecture',
  metaDescription: 'Senior Software Engineer with more than 20 years of experience across system architecture, APIs, full-stack development, CI/CD, cloud-native delivery and production AI integration.',
  hero: 'Building and evolving complex software systems across architecture, APIs, full-stack implementation and reliable delivery.',
  profile: 'Senior software engineer with more than 20 years of experience building and evolving production systems across mobile applications, engineering software, enterprise SaaS and healthcare AI. My work spans system architecture, domain and data models, backend APIs, web applications and the engineering foundations required for reliable delivery.\n\nI stay hands-on in implementation while taking ownership of complete systems, technical decisions and the engineering foundations other developers and teams depend on. In recent years, that scope has extended into cloud-native platforms, MLOps and AI-enabled systems.',
  roles: fullstackRoles,
  projects: [careerData.projects.pulse, careerData.projects.spurwerk],
  stack: fullstackStack,
  capabilityRail: ['System Architecture', 'API & Integration Design', 'Full-Stack Engineering', 'Data & Domain Modeling', 'Testing & Quality Systems', 'Code Review & Technical Standards', 'CI/CD & Delivery', 'Production AI / ML Integration'],
  page1StackCategories: ['Software Engineering', 'Delivery & Platform', 'AI / ML Integration'],
  page2StackCategories: ['Architecture / Engineering Practice'],
  pdfFileName: 'Mario_Wangen_CV_Fullstack.pdf',
};

const germanRoles = applyRoleOverrides(careerData.roles, {
  cancilico: {
    context: 'Healthcare AI · Software Engineering · Platform & MLOps',
    chapters: [
      {
        title: 'Produktstabilität & CI/CD',
        paragraphs: [
          'Aufbau des CI/CD-Backbones für eine bestehende Multi-Service-Healthcare-AI-Anwendung. Integration von Unit-, Integrations- und End-to-End-Tests in eine gestufte Pipeline zur Validierung der Anwendung, zum Bau der Service-Container, zum Start des Systems gegen die Datenbank und zur Erzeugung eines getesteten, auslieferbaren Release-Kandidaten. Die Veröffentlichung der Container-Images über Harbor schloss den reproduzierbaren Weg von der Codeänderung bis zum containerisierten System.',
          'Sichtbarmachung zuvor verborgener Stabilitätsprobleme durch die Pipeline und Etablierung von Tests als kontinuierliche Engineering-Feedbackschleife und Release-Gate.',
        ],
      },
      {
        title: 'MLOps-Architektur & Modellbereitstellung',
        paragraphs: [
          'Entwurf und Aufbau der Bereitstellungsarchitektur rund um die Klassifikations- und Detektionsmodelle des ML-Teams. Separate Smoke- und Full-Training-Workflows sowie die durchgängige Nachverfolgbarkeit von Code, Umgebungen, Datensätzen, Runs, Modellen und Deployments bilden die Grundlage; die gestufte Validierung reicht bis zur Deployability und Golden-Snapshot-Regression.',
          'Vollständige Trainingsläufe und Hyperparameter-Sweeps werden vom ML-Team gestartet; Validierung, Verwaltung der Modellkandidaten, Freigabe und nachgelagerte Auslieferung sind automatisiert. Freigegebene Modelle und ihr FastAPI-Inference-Service werden als versionierte Docker-Images paketiert, über Harbor veröffentlicht und über reproduzierbare TeamCity-Workflows ausgeliefert.',
          'Erweiterung der Plattform um Services in Kubernetes, Terraform-basiertes Infrastructure as Code und Coder-Umgebungen. MLflow schafft Run-/Metrik-Transparenz und Nachvollziehbarkeit automatisierter Modellentscheidungen; Architektur und Betriebsabläufe wurden fortlaufend dokumentiert.',
        ],
      },
    ],
  },
  schlegel: {
    paragraphs: [
      'Entwicklung und kontinuierliche Weiterentwicklung von vier zentralen Anwendungen für die Tragwerksplanung sowie mehreren kleineren Produkten über fünfzehn Jahre. Überführung komplexer Engineering-Domänen in wartbare Software- und Datenstrukturen.',
      'Eng gekoppelte .NET/WPF-Anwendungen durch MVVM und eine klarere Trennung von Geschäftslogik, UI und Datenzugriff modernisiert. Den mehrjährigen Übergang von Desktop-Software zu servicebasierten Webarchitekturen mitgestaltet und umgesetzt: zentrale Engineering-Daten, dedizierte Backend-Services und REST-APIs sowie anwendungsspezifische Web-Frontends. Bestehende Desktop-Clients wurden schrittweise an dieselben Backend-Berechnungsservices angebunden, sodass sich die Architektur ohne disruptiven Rewrite weiterentwickeln konnte.',
      'Quellcodeverwaltung, automatisierte Builds und TeamCity CI/CD dort eingeführt, wo diese Grundlagen zuvor fehlten; während der späteren SaaS-Transformation entwickelte sich die Auslieferung weiter in Richtung Git, Docker und automatisierter Deployments in Kubernetes-/Azure-Umgebungen.',
      'Hands-on-Entwicklung mit C#/.NET, Backend-Services und APIs, Web-/Full-Stack-Technologien, Python, Docker, Datenbanken und interaktiver 3D-Visualisierung. Parallel dazu Mitwirkung an Architekturentscheidungen, Code Reviews, technischen Standards und Dokumentation, während das Team von drei Entwicklern zu einer verteilten europäischen Gruppe von rund acht Personen wuchs.',
    ],
  },
  indanet: {
    context: 'Leitstellen- und Störungsmanagement im öffentlichen Nahverkehr',
    paragraphs: [
      'Entwicklung operativer Leitstellen- und Störungsmanagementsysteme für den öffentlichen Nahverkehr, in denen Vorfälle, Notrufe, Kameras, Einsatzpersonal und Ereignishistorien koordiniert und dokumentiert wurden. Aufbau des GIS als zentrale Bedien- und Systemschicht für Stationen, Vorfälle, Kameras und mobiles Einsatzpersonal.',
      'Konzeption und Implementierung RPC-basierter Backup-, Replikations- und Wiederherstellungsmechanismen mit Behandlung von Verbindungsabbrüchen, redundanten oder widersprüchlichen Datenzuständen und wiederholten Wiederherstellungsversuchen bis zum wiederhergestellten Betriebszustand. Produktive Einführungen erforderten umfangreiche Tests, Code Reviews und kontrollierte Wartungsfenster, da Fehler den laufenden ÖPNV-Betrieb unmittelbar beeinträchtigen konnten.',
    ],
  },
  mapguide: { context: '', paragraphs: ['Mitarbeit an der Feature-Entwicklung mobiler Navigationssoftware und GPS-Produkte.'] },
  mable: { context: 'Mobile CRM', paragraphs: ['Entwicklung eines frühen mobilen CRM-Systems für den Außendienst im Startup-Umfeld. Konzeption und Implementierung der Synchronisation zwischen Mobilgeräten und zentralem Datenbestand unter unzuverlässigen 2G-Netzbedingungen. Umsetzung eines datensatzbezogenen Abgleichs mit Vorrang zentraler Daten und zeitstempelbasierter Konfliktbehandlung zur konsistenten Zusammenführung unterbrochener oder verzögerter mobiler Aktualisierungen.'] },
});

const germanFullstackRoles = applyRoleOverrides(germanRoles, {
  cancilico: {
    chapters: [
      {
        title: 'Produktstabilität & CI/CD',
        paragraphs: [
          'Aufbau des CI/CD-Backbones für eine bestehende Multi-Service-Healthcare-AI-Anwendung mit zwei Web-Frontends, Backend-Services, Datenbank und separatem Inference-Service. Mitarbeit an einem Echtzeit-Chat für Ärzte auf Basis persistenter WebSocket-Verbindungen neben den REST-basierten Services. Integration von Unit-, Integrations- und End-to-End-Tests in eine gestufte Pipeline zur Validierung der verbundenen Anwendung, zum Bau der Service-Container, zum Start des Systems gegen die Datenbank und zur Erzeugung eines getesteten, auslieferbaren Release-Kandidaten. Die Veröffentlichung der Container-Images über Harbor schloss den reproduzierbaren Weg bis zum containerisierten System.',
          'Sichtbarmachung zuvor verborgener Stabilitätsprobleme durch die Pipeline und Etablierung von Tests als kontinuierliche Engineering-Feedbackschleife und Release-Gate.',
        ],
      },
      germanRoles[0].chapters![1],
    ],
  },
});

const germanProjects = {
  spurwerk: { ...careerData.projects.spurwerk, pattern: 'In Umsetzung · AI-gestütztes Engineering-Knowledge-System', desc: 'System zur kontinuierlichen Erfassung von Architekturentscheidungen, Debugging-Erkenntnissen, Fehlerursachen und technischen Learnings direkt während der Projektarbeit. Ein strukturiertes Projekt- und Datenmodell schafft die Grundlage, um dieses Wissen später über einen RAG-basierten Assistenten kontextbezogen wiederzufinden und weiterzuverwenden.', tags: ['FastAPI', 'PostgreSQL', 'Docker', 'RAG', 'LLM APIs'] },
  pulse: { ...careerData.projects.pulse, desc: 'Multi-Agenten-System zur Recherche, Bewertung und Erstellung von Social-Media-Inhalten. Spezialisierte Agenten analysieren Themen und Nachfrage über mehrere Quellen, erzeugen Inhalte und verfeinern diese iterativ über einen LLM-as-a-Judge-Workflow, bis definierte Qualitäts- und Relevanzschwellen erreicht sind. Anschließend erfolgt die kanalspezifische Auslieferung.', tags: ['LangGraph', 'Python', 'FastAPI', 'ChromaDB', 'LLM APIs', 'LangSmith'] },
};

const germanStack = [
  { cat: 'Software Engineering', items: ['C# / .NET', 'Python', 'TypeScript', 'React', 'Angular', 'Nuxt', 'FastAPI', 'REST-APIs'] },
  { cat: 'Delivery & Plattform', items: ['Git / GitHub', 'TeamCity', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'Harbor', 'Coder'] },
  { cat: 'AI-/ML-Integration', items: ['PyTorch', 'MLflow', 'MLOps', 'FastAPI', 'LangGraph', 'RAG'] },
  { cat: 'Architektur & Engineering-Praxis', items: ['Systemdesign', 'servicebasierte Architektur', 'relationale Modellierung', 'SQL', 'REST-APIs', 'RPC', 'WebSockets', 'verteilte Zustände', 'automatisierte Tests', 'Architekturdokumentation', 'Code Reviews', 'technische Standards', 'Reproduzierbarkeit', 'Recovery', 'TLS / Zertifikatsvertrauen'] },
];

const germanCapabilityRail = ['Systemarchitektur', 'API- & Integrationsdesign', 'Full-Stack Engineering', 'Daten- & Domänenmodellierung', 'Testing & Qualitätssysteme', 'Code Reviews & technische Standards', 'CI/CD & Delivery', 'Produktive AI-/ML-Integration'];
const germanCanonicalStack = germanStack.map(group => ({ ...group, cat: group.cat === 'AI-/ML-Integration' ? 'AI-/ML-Integration' : group.cat }));

const germanCanonical: CvContent = {
  ...canonical,
  locale: 'de', route: '/de', variant: 'canonical',
  pageTitle: 'Mario Wangen — Senior Software Engineer',
  metaDescription: 'Senior Software Engineer mit mehr als 20 Jahren Erfahrung in Softwarearchitektur, Produktentwicklung, zuverlässiger Auslieferung, Plattformen und produktiven AI-Systemen.',
  hero: 'Entwicklung komplexer Softwaresysteme – von Architektur und Implementierung bis zur zuverlässigen Auslieferung und zum produktiven Betrieb.',
  profile: 'Senior Software Engineer mit mehr als 20 Jahren Erfahrung in der Entwicklung und Weiterentwicklung produktiver Systeme – von mobilen Anwendungen über Engineering-Software und Enterprise-SaaS bis zu Healthcare AI. Mein Arbeitsfeld reicht von Systemarchitektur, Domänen- und Datenmodellen über Backend-APIs und Webanwendungen bis zu den Engineering-Grundlagen für eine zuverlässige Auslieferung.\n\nIch bleibe dabei hands-on in der Implementierung und übernehme zugleich Verantwortung für Gesamtsysteme, technische Entscheidungen und die Engineering-Grundlagen, auf denen andere Entwickler und Teams aufbauen. In den vergangenen Jahren hat sich dieser Verantwortungsbereich um cloud-native Plattformen, MLOps und AI-gestützte Systeme erweitert.',
  roles: germanRoles,
  projects: [germanProjects.spurwerk, germanProjects.pulse],
  stack: germanCanonicalStack,
  capabilityRail: ['Systemarchitektur', 'Daten- & Domänenmodellierung', 'Zuverlässigkeit & Recovery', 'Testing & Qualitätssysteme', 'CI/CD & Delivery', 'Plattform Engineering', 'Cloud / Infrastruktur', 'Produktive AI / MLOps'],
  page1StackCategories: ['Software Engineering', 'Delivery & Plattform', 'AI-/ML-Integration'],
  page2StackCategories: ['Architektur & Engineering-Praxis'],
  labels: germanLabels,
  portraitSrc: 'mario-wangen-portrait-cv.jpg',
  location: 'Dresden, Deutschland',
  displayDates: { cancilico: '01/2026 — heute' },
  educationMeta: { 'Turing College': '04/2025 — 08/2025 · 516 Stunden · 96/100', 'Academy of Administration and Economics, Munich': '2005 — 2008 · berufsbegleitend · Wirtschaftsinformatiker (VWA)', 'Eckert Schools': '2000 — 2004 · Abschlussnote: 1,09' },
  pdfFileName: 'Mario_Wangen_CV_DE.pdf',
};

const germanFullstack: CvContent = {
  ...germanCanonical,
  route: '/de/fullstack',
  pageTitle: 'Mario Wangen — Senior Software Engineer | Full-Stack & Architektur',
  metaDescription: 'Senior Software Engineer mit mehr als 20 Jahren Erfahrung in Systemarchitektur, APIs, Full-Stack-Entwicklung, CI/CD, cloud-nativer Auslieferung und der Integration produktiver AI-/ML-Systeme.',
  hero: 'Entwicklung komplexer Softwaresysteme – von Architektur und APIs über Full-Stack-Implementierung bis zur zuverlässigen Auslieferung.',
  roles: germanFullstackRoles,
  projects: [germanProjects.pulse, germanProjects.spurwerk],
  capabilityRail: germanCapabilityRail,
  page1StackCategories: ['Software Engineering', 'Delivery & Plattform', 'AI-/ML-Integration'],
  page2StackCategories: ['Architektur & Engineering-Praxis'],
  pdfFileName: 'Mario_Wangen_CV_Fullstack_DE.pdf',
};

const germanDevopsRoles = applyRoleOverrides(careerData.roles, {
  cancilico: {
    context: 'Healthcare AI · Software Engineering · Plattform & MLOps',
    chapters: [
      {
        title: 'Produktstabilität & CI/CD',
        paragraphs: [
          'Aufbau des CI/CD-Backbones für eine bestehende Multi-Service-Healthcare-AI-Anwendung. Integration von Unit-, Integrations- und End-to-End-Validierung mit Container-Builds, datenbankgestütztem Systemstart und Release-Gates zu einem durchgängigen, getesteten Auslieferungskandidaten. Die Veröffentlichung der Container-Images über Harbor schloss den reproduzierbaren Weg von der Codeänderung bis zum auslieferbaren System.',
          'Umsetzung großer Teile der Pipeline-Orchestrierung mit Bash/Shell: Vorbereitung von Berechtigungen und Laufzeitumgebungen, dynamische Konfiguration, Start von Containern, Ausführung von Build- und Anwendungsschritten, Log-Auswertung sowie Warten auf Endpoint-Health-Checks vor abhängigen Stufen. Die Pipeline machte zuvor verborgene Stabilitätsprobleme sichtbar und etablierte automatisierte Validierung als kontinuierliche Feedbackschleife und Release-Gate.',
        ],
      },
      {
        title: 'Plattform Engineering & automatisierte Modellbereitstellung',
        paragraphs: [
          'Entwurf und Aufbau des MLOps-Delivery-Systems rund um die Klassifikations- und Detektionsmodelle des ML-Teams. Separate Smoke- und Full-Training-Workflows, die durchgängige Nachverfolgbarkeit von Code, Umgebungen, Datensätzen, Runs, Modellen und Deployments sowie gestufte Validierung von der Datenintegrität bis zur Bereitstellung und Golden-Snapshot-Regression.',
          'Vollständige Trainingsläufe und Hyperparameter-Sweeps werden vom ML-Team gestartet; Validierung, Verwaltung der Modellkandidaten, Freigabe und nachgelagerte Auslieferung sind automatisiert. Freigegebene Modelle und ihr FastAPI-Inference-Service werden als versionierte Docker-Images paketiert, über Harbor veröffentlicht und über reproduzierbare TeamCity-Workflows ausgeliefert.',
          'Erweiterung der Plattform um Services in Kubernetes, Terraform-basiertes Infrastructure as Code und Coder-Umgebungen für CPU- und GPU-Workloads. MLflow schafft Run-/Metrik-Transparenz und Nachvollziehbarkeit automatisierter Modellentscheidungen. Architektur und Betriebsabläufe wurden fortlaufend dokumentiert und in einem Handbuch für das ML-Team zusammengeführt.',
        ],
      },
    ],
  },
  schlegel: {
    context: 'Engineering-Software · Tragwerksplanung',
    paragraphs: [
      'Entwicklung und kontinuierliche Weiterentwicklung von vier zentralen Anwendungen für die Tragwerksplanung sowie mehreren kleineren Produkten über fünfzehn Jahre. Überführung komplexer Engineering-Domänen in wartbare Software- und Datenstrukturen.',
      'Modernisierung eng gekoppelter .NET/WPF-Anwendungen durch MVVM und eine klarere Trennung von Geschäftslogik, UI und Datenzugriff sowie Einführung zuvor fehlender Engineering-Grundlagen.',
      'Einführung von Subversion-basierter Quellcodeverwaltung, automatisierten Builds und TeamCity CI/CD einschließlich automatisierter nächtlicher Erstellung installierbarer Anwendungs-Builds. Während der späteren SaaS-Transformation Weiterentwicklung dieser Auslieferung in Richtung Git, Docker und servicebasierter Anwendungen mit automatisierten TeamCity-Builds und -Deployments für Kubernetes-/Azure-Umgebungen.',
      'Hands-on-Entwicklung mit C#/.NET, Backend-APIs, Web-/Full-Stack-Technologien, Python, Datenbanken und interaktiver 3D-Visualisierung. Parallel dazu Mitwirkung an Architekturentscheidungen, Reviews, technischen Standards und Dokumentation, während das Team von drei Entwicklern zu einer verteilten europäischen Gruppe von rund acht Personen wuchs.',
    ],
  },
  indanet: {
    context: 'Leitstellen- und Störungsmanagement im öffentlichen Nahverkehr',
    paragraphs: [
      'Entwicklung operativer Leitstellen- und Störungsmanagementsysteme für den öffentlichen Nahverkehr. Aufbau des GIS als zentrale Bedien- und Systemschicht für Stationen, Ereignisse, Kameras und mobiles Einsatzpersonal.',
      'Konzeption und Implementierung RPC-basierter Backup-, Replikations- und Wiederherstellungsmechanismen mit Behandlung von Verbindungsabbrüchen, redundanten oder widersprüchlichen Datenzuständen und automatisierten Wiederholungsversuchen bis zum wiederhergestellten Betriebszustand. Produktive Einführungen erforderten umfangreiche Tests, Code Reviews und kontrollierte Wartungsfenster, da Fehler den laufenden ÖPNV-Betrieb unmittelbar beeinträchtigen konnten.',
    ],
  },
  mapguide: { context: '', paragraphs: ['Mitarbeit an der Feature-Entwicklung mobiler Navigationssoftware und GPS-Produkte.'] },
  mable: { context: 'Mobile CRM', paragraphs: ['Entwicklung eines frühen mobilen CRM-Systems für den Außendienst im Startup-Umfeld. Konzeption und Implementierung der Synchronisation zwischen Mobilgeräten und zentralem Datenbestand unter unzuverlässigen 2G-Netzbedingungen. Umsetzung eines datensatzbezogenen Abgleichs mit Vorrang zentraler Daten und zeitstempelbasierter Konfliktbehandlung zur konsistenten Zusammenführung unterbrochener oder verzögerter mobiler Aktualisierungen.'] },
});

const germanDevopsStack: StackGroup[] = [
  { cat: 'Delivery & Plattform', items: ['TeamCity', 'Bash / Shell', 'Linux', 'Git / GitHub', 'Docker', 'Kubernetes', 'Terraform', 'Infrastructure as Code', 'Harbor', 'Coder'] },
  { cat: 'Cloud & Infrastruktur', items: ['Azure', 'AWS', 'selbstverwaltete Umgebungen', 'Storage-Integration', 'TLS / Zertifikate'] },
  { cat: 'Software Engineering', items: ['C# / .NET', 'Python', 'TypeScript', 'React', 'Angular', 'Nuxt', 'FastAPI', 'REST'] },
  { cat: 'Betrieb & Qualität', items: ['Unit / Integration / E2E', 'Endpoint Health Checks', 'Log-basierte Validierung', 'Recovery', 'MLflow Metrics & Tracking'] },
  { cat: 'AI-Systeme', items: ['PyTorch', 'MLflow', 'MLOps', 'LangGraph', 'RAG', 'LLM APIs'] },
];

const germanDevops: CvContent = {
  ...germanCanonical,
  variant: 'devops', route: '/de/devops',
  pageTitle: 'Mario Wangen — Senior Software Engineer | Platform & DevOps',
  metaDescription: 'Senior Software Engineer mit langjähriger Erfahrung in Softwareentwicklung, CI/CD, Plattformautomatisierung, Kubernetes, Infrastructure as Code und zuverlässigen produktiven Systemen.',
  hero: 'Entwicklung zuverlässiger Softwaresysteme – von Architektur und Implementierung über CI/CD und Plattformautomatisierung bis zum produktiven Betrieb.',
  profile: 'Senior Software Engineer mit mehr als 20 Jahren Erfahrung in der Entwicklung und Weiterentwicklung produktiver Systeme. Neben der Anwendungsentwicklung gehörten dabei wiederholt auch die Engineering- und Plattformgrundlagen zu meinem Verantwortungsbereich: automatisierte Tests, CI/CD, Container-Plattformen, Infrastructure as Code, Recovery und reproduzierbare Deployments.\n\nIch bleibe hands-on in der Implementierung und übernehme zugleich Verantwortung für Gesamtsysteme, technische Entscheidungen und die Engineering-Grundlagen, auf denen andere Entwickler und Teams aufbauen. In den vergangenen Jahren hat sich dieser Schwerpunkt weiter in Richtung cloud-native Plattformen, MLOps und AI-gestützte Systeme entwickelt.',
  roles: germanDevopsRoles,
  projects: [germanProjects.spurwerk, germanProjects.pulse],
  stack: germanDevopsStack,
  capabilityRail: ['Systemarchitektur', 'CI/CD & Delivery', 'Plattform Engineering', 'Infrastructure as Code', 'Container-Plattformen', 'Deployment-Automatisierung', 'Zuverlässigkeit & Recovery', 'Testing & Qualitätssysteme', 'Cloud-Infrastruktur', 'Produktive AI / MLOps'],
  page1StackCategories: ['Delivery & Plattform', 'Cloud & Infrastruktur', 'Software Engineering'],
  page2StackCategories: ['Betrieb & Qualität', 'AI-Systeme'],
  pdfFileName: 'Mario_Wangen_CV_DevOps_DE.pdf',
};

const germanAppliedAiRoleBase = applyRoleOverrides(germanRoles, {
  cancilico: {
    context: 'Healthcare AI · Software Engineering · Platform & MLOps',
    chapters: [
      {
        title: 'Produktive AI-Integration & Delivery',
        paragraphs: [
          'Aufbau der Delivery-, Integrations- und Plattformarchitektur rund um bestehende Klassifikations- und Detektionsmodelle des ML-Teams und deren FastAPI-Inference-Service. Versionierte Modellartefakte und Container-Images werden über Harbor und TeamCity reproduzierbar validiert, freigegeben und ausgeliefert; Kubernetes, Terraform und Release-Gates verbinden Anwendung, Modell und Infrastruktur.',
          'Aufbau der Test- und Delivery-Grundlagen über Unit-, Integrations- und End-to-End-Validierung. Die Pipeline startet die verbundene Anwendung gegen die Datenbank, prüft die Service-Container und macht Stabilitätsprobleme vor der Auslieferung sichtbar.',
          'Konzeption und Umsetzung dieser Delivery-, MLOps- und Validierungssysteme erfolgten mit intensiver Nutzung und Steuerung moderner Coding Agents über Architektur, Implementierung, Testing, Debugging und Refactoring hinweg. Architekturentscheidungen, Änderungen und Qualitätssicherung blieben dabei bewusst in meiner Verantwortung.',
        ],
      },
      {
        title: 'MLOps-Architektur & Modellbereitstellung',
        paragraphs: [
          'Entwurf und Aufbau der Delivery-Architektur mit separaten Smoke- und Full-Training-Workflows, durchgängiger Nachverfolgbarkeit von Code, Umgebungen, Datensätzen, Runs, Modellen und Deployments sowie gestufter Validierung bis zur Deployability und Golden-Snapshot-Regression.',
          'Vollständige Trainingsläufe und Hyperparameter-Sweeps werden vom ML-Team gestartet; Validierung, Verwaltung der Modellkandidaten, Freigabe und nachgelagerte Auslieferung sind automatisiert. MLflow schafft Run-/Metrik-Transparenz und Nachvollziehbarkeit automatisierter Modellentscheidungen; Coder-Umgebungen unterstützen CPU-Validierung und GPU-Training.',
        ],
      },
    ],
  },
  schlegel: { context: 'Engineering-Software · Tragwerksplanung' },
  indanet: { context: 'Leitstellen- und Störungsmanagement im öffentlichen Nahverkehr' },
});
const germanFreelanceRag = applyRoleOverrides(careerData.freelanceEngagements, {
  'freelance-rag-sales-assistant': {
    paragraphs: ['Konzeption und Umsetzung eines RAG-basierten Assistenzsystems für den technischen Vertrieb eines Solarunternehmens. Produkthandbücher, Spezifikationen und technische Dokumentation zu Solarmodulen, Wechselrichtern und weiteren Komponenten wurden als Wissensbasis erschlossen. Vertriebsmitarbeiter konnten während Kundengesprächen technische Produkt- und Kompatibilitätsfragen stellen; das System recherchierte relevante Informationen und stellte sie kontextbezogen für den laufenden Sales-Prozess bereit.'],
  },
})[0];
const germanAppliedAiRoles = [germanAppliedAiRoleBase[0], germanFreelanceRag, ...germanAppliedAiRoleBase.slice(1)];

const germanAppliedAiStack: StackGroup[] = [
  { cat: 'AI & Agentic Systems', items: ['LangGraph', 'RAG', 'LLM APIs', 'ChromaDB / Vektordatenbanken', 'PyTorch', 'MLflow', 'MLOps'] },
  { cat: 'Software Engineering', items: ['Python', 'TypeScript', 'C# / .NET', 'FastAPI', 'REST-APIs', 'React', 'Angular', 'Nuxt'] },
  { cat: 'Delivery & Plattform', items: ['TeamCity', 'Docker', 'Kubernetes', 'Terraform', 'Harbor', 'AWS', 'Coder'] },
  { cat: 'Engineering-Praxis', items: ['Systemarchitektur', 'automatisierte Tests', 'Evaluationsgrenzen', 'Observability', 'Reproduzierbarkeit', 'Code Reviews', 'technische Standards', 'kontrollierte Fehlerbehandlung'] },
];

const germanAppliedAi: CvContent = {
  ...germanCanonical,
  variant: 'applied-ai', route: '/de/applied-ai',
  pageTitle: 'Mario Wangen — Senior Software Engineer | Applied AI & Agentic Development',
  metaDescription: 'Senior Software Engineer mit mehr als 20 Jahren Engineering-Erfahrung und Schwerpunkt auf produktiven AI-Systemen, MLOps, RAG, agentischen Workflows und coding-agent-gestützter Softwareentwicklung.',
  hero: 'Entwicklung produktiver AI-Systeme – von Architektur und Integration über MLOps und Evaluation bis zur zuverlässigen Auslieferung.',
  profile: 'Senior Software Engineer mit mehr als 20 Jahren Erfahrung in produktiven Softwaresystemen. Mein Schwerpunkt liegt auf Architektur, Implementierung, Qualität und zuverlässiger Auslieferung. In den vergangenen Jahren habe ich diese Engineering-Erfahrung gezielt auf AI-Systeme, MLOps, RAG und agentische Workflows erweitert.',
  roles: germanAppliedAiRoles,
  projects: [germanProjects.pulse, germanProjects.spurwerk],
  stack: germanAppliedAiStack,
  capabilityRail: ['Systemarchitektur', 'Applied AI / LLM Systems', 'RAG & Agent Workflows', 'MLOps & Model Delivery', 'APIs & Integration', 'Testing & Evaluation', 'CI/CD & Production Delivery'],
  page1StackCategories: ['AI & Agentic Systems', 'Software Engineering'],
  page2StackCategories: ['Delivery & Plattform', 'Engineering-Praxis'],
  page2RoleEnd: 4,
  page3RoleStart: 4,
  pdfFileName: 'Mario_Wangen_CV_Applied_AI_DE.pdf',
};

// Public views are emphasis overlays, never alternate employment histories.
// Keeping the same role references prevents factual divergence between routes.
export const cvViews: Record<CvView, CvContent> = {
  canonical,
  devops,
  fullstack,
  'applied-ai': { ...canonical, variant: 'applied-ai', route: '/applied-ai',
    hero: 'Bringing long-standing software engineering discipline to practical AI systems, workflows and reliable model delivery.',
    stack: [careerData.capabilities[3], ...careerData.capabilities.filter(c => c !== careerData.capabilities[3])],
    pdfFileName: 'Mario_Wangen_CV_Applied_AI.pdf' },
  fde: { ...canonical, variant: 'fde', route: '/fde',
    hero: 'Turning complex domain requirements into working systems, with ownership across architecture, implementation and production.',
    pdfFileName: 'Mario_Wangen_CV_AI_Solutions.pdf' },
};

export const cvRoutes = { '/': 'canonical', '/devops': 'devops', '/fullstack': 'fullstack', '/applied-ai': 'applied-ai', '/fde': 'fde' } satisfies Record<string, CvView>;
export const localizedCvViews = { 'de:canonical': germanCanonical, 'de:fullstack': germanFullstack, 'de:devops': germanDevops, 'de:applied-ai': germanAppliedAi } satisfies Record<string, CvContent>;
const normalizePath = (p: string) => p.length > 1 ? p.replace(/\/+$/, '') : p;
export function getCvRedirect(p: string): string | undefined { return normalizePath(p) === '/ai' ? '/applied-ai' : undefined; }
export function getCvContent(p: string): CvContent | undefined {
  const path = normalizePath(p);
  if (path === '/de' || path === '/de/fullstack' || path === '/de/devops' || path === '/de/applied-ai') return localizedCvViews[path === '/de' ? 'de:canonical' : path === '/de/fullstack' ? 'de:fullstack' : path === '/de/devops' ? 'de:devops' : 'de:applied-ai'];
  const key = cvRoutes[path as keyof typeof cvRoutes];
  return key ? cvViews[key] : undefined;
}
