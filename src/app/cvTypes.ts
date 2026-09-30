export type CareerChapter = { title: string; paragraphs: string[] };
export type CareerRole = {
  id: string; company: string; title: string; dates: string; context: string;
  paragraphs: string[]; chapters?: CareerChapter[]; technologies?: string[];
};
export type Education = {
  school: string; degree: string; dates: string; result?: string; qualification?: string;
  desc: string | null; accent: boolean;
};

export type CvView = "canonical" | "devops" | "fullstack" | "applied-ai" | "fde";

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
  roles: CareerRole[];
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
  capabilityRail?: string[];
  page1StackCategories?: string[];
  page2StackCategories?: string[];
};
