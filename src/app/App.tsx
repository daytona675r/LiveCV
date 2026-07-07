import { useEffect, useState } from "react";
import { Document, Page as PdfPage, PDFDownloadLink, StyleSheet, Text, View, Link } from "@react-pdf/renderer";
import { Download } from "lucide-react";

const PAGE_W = 794;
const PAGE_H = 1123;

// react-pdf uses PDF points. A4 is 595.28 × 841.89 pt.
const PDF_SCALE = 595.28 / PAGE_W;
const pt = (value: number) => value * PDF_SCALE;

const ACCENT = "#2563EB";
const TEXT = "#111827";
const TEXT_SEC = "#4B5563";
const TEXT_MUT = "#9CA3AF";
const TEXT_QUOTE = "#C4C9D1";
const BORDER = "#E5E7EB";
const BORDER_LIGHT = "#F3F4F6";
const FONT = "'Inter', sans-serif";

const capabilities = [
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

const caseStudies = [
  {
    title: "Designed the model delivery platform",
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

const schlegelHighlights = [
  "Developed enterprise desktop and SaaS applications throughout the complete software lifecycle.",
  "Established CI/CD pipelines, containerised deployments, and automated development workflows.",
  "Worked directly with customers to translate complex engineering requirements into maintainable software solutions.",
  "Built a strong foundation in designing software intended to remain maintainable over many years.",
];

const earlierRoles = [
  { company: "Indanet AG", role: "Software Engineer", desc: "Security and disruption management solutions for public transportation." },
  { company: "MAP&GUIDE GmbH", role: "Software Engineer", desc: "Navigation software and GPS systems." },
  { company: "M.ABLE GmbH", role: "Software Engineer", desc: "Mobile CRM solutions for BMW." },
  { company: "SOFiSTiK AG", role: "Software Engineer", desc: "Structural engineering and BIM software." },
];

const projects = [
  {
    name: "PULSE ContentAgent",
    desc: "Designed to transform fragmented content creation into a structured, repeatable workflow through agent orchestration and evaluation.",
    pattern: "State-machine based orchestration",
    tags: ["LangGraph", "Python", "FastAPI", "OpenAI"],
  },
  {
    name: "Production Knowledge Platform",
    desc: "Enterprise RAG architecture separating ingestion, indexing, retrieval and generation into independent services.",
    pattern: "Decoupled ingestion–retrieval services",
    tags: ["RAG", "LangChain", "PostgreSQL", "AWS"],
  },
  {
    name: "StartupCoach",
    desc: "Context-aware AI coaching using retrieval augmentation and function calling for personalised guidance.",
    pattern: "Retrieval-augmented generation with tool calling",
    tags: ["OpenAI", "RAG", "FastAPI", "Python"],
  },
  {
    name: "InterviewCoach",
    desc: "Adaptive interview simulation using structured LLM workflows with dynamic follow-up generation.",
    pattern: "Graph-based adaptive dialogue flow",
    tags: ["LangGraph", "OpenAI", "React", "TypeScript"],
  },
];

const education = [
  {
    school: "Turing College",
    degree: "AI Engineering",
    desc: "Modern LLM applications, retrieval systems, agentic workflows, production AI engineering, and end-to-end AI application development.",
    accent: true,
  },
  { school: "Academy of Administration and Economics, Munich", degree: "Business Information Systems", desc: null, accent: false },
  { school: "Eckert Schools", degree: "IT Specialist – Application Development", desc: null, accent: false },
];

const stack = [
  { cat: "AI / ML", items: ["MLflow", "LangGraph", "LangChain", "OpenAI API", "DVC"] },
  { cat: "Infrastructure", items: ["Kubernetes", "Terraform", "Docker", "AWS", "S3"] },
  { cat: "Languages", items: ["Python", "TypeScript", ".NET"] },
  { cat: "Frameworks & Tools", items: ["FastAPI", "React", "PostgreSQL", "Pixi", "Git"] },
];

const sLabel: React.CSSProperties = {
  fontSize: 8.5,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.13em",
  color: TEXT_MUT,
  fontFamily: FONT,
  display: "block",
  marginBottom: 16,
};

const bodyStyle: React.CSSProperties = {
  fontSize: 10.5,
  lineHeight: 1.8,
  color: TEXT_SEC,
  fontFamily: FONT,
  margin: 0,
};

const profileBodyStyle: React.CSSProperties = {
  ...bodyStyle,
  lineHeight: 2,
};

const contactItemStyle: React.CSSProperties = {
  fontSize: 10,
  color: TEXT_MUT,
  fontFamily: FONT,
  textDecoration: "none",
};

function ContactLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      style={{
        ...contactItemStyle,
        color: hovered ? ACCENT : TEXT_MUT,
        textDecoration: hovered ? "underline" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span style={sLabel}>{children}</span>;
}

function Page1() {
  const PH = 52;
  const PV = 44;
  const BODY_W = PAGE_W - PH * 2;
  const LEFT_W = Math.floor(BODY_W * 0.648);
  const RIGHT_W = BODY_W - LEFT_W - 36;

  return (
    <div
      style={{
        width: PAGE_W,
        height: PAGE_H,
        background: "#FFFFFF",
        boxSizing: "border-box",
        padding: `${PV}px ${PH}px`,
        fontFamily: FONT,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 500, color: TEXT, letterSpacing: "-0.03em", lineHeight: 1, margin: "0 0 11px", fontFamily: FONT }}>
          Mario Wangen
        </h1>
        <p style={{ fontSize: 14.5, fontWeight: 400, color: TEXT_SEC, margin: "0 0 5px", lineHeight: 1.45, fontFamily: FONT, maxWidth: 500 }}>
          Building the engineering platforms that enable AI teams to ship reliable software.
        </p>
        <p style={{ fontSize: 11, color: TEXT_MUT, margin: "0 0 18px", fontFamily: FONT, letterSpacing: "0.01em" }}>
          Senior Software Engineer · AI Platform Engineering · Production AI Systems · MLOps
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 22px", alignItems: "center" }}>
          <ContactLink href="https://linkedin.com/in/mariowangen" label="linkedin.com/in/mariowangen" external />
          <ContactLink href="https://github.com/daytona675r" label="github.com/daytona675r" external />
          <ContactLink href="mailto:mario.wangen@live.de" label="mario.wangen@live.de" />
          <span style={contactItemStyle}>Dresden, Germany</span>
        </div>
      </div>

      <div style={{ height: 1, background: BORDER, marginBottom: 28 }} />

      <div style={{ display: "flex", gap: 36, alignItems: "flex-start" }}>
        <div style={{ width: LEFT_W, flexShrink: 0 }}>
          <div style={{ marginBottom: 30 }}>
            <SectionLabel>Professional Profile</SectionLabel>
            <p style={profileBodyStyle}>
              I've spent more than twenty years building software platforms for environments where reliability matters. Today, I build the engineering platforms and workflows that help AI teams turn ideas into reliable production systems.
            </p>
            <p style={{ ...profileBodyStyle, marginTop: 9, marginBottom: 60, fontWeight: 300, fontSize: 11, color: TEXT_QUOTE, fontStyle: "italic" }}>
              Helping machine learning teams move from experimentation to production through engineering discipline, automation, and platform thinking.
            </p>
          </div>

          <div>
            <SectionLabel>Professional Experience</SectionLabel>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: TEXT, fontFamily: FONT, letterSpacing: "-0.01em" }}>Senior Software Engineer – AI Platform Engineering</span>
                <span style={{ fontSize: 10, color: TEXT_MUT, fontFamily: FONT }}>2026 — Present</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ fontSize: 11.5, color: ACCENT, fontWeight: 600, fontFamily: FONT }}>Cancilico</span>
                <span style={{ fontSize: 10, color: TEXT_MUT, fontFamily: FONT }}>· AI Infrastructure for Medical Computer Vision · Hybrid</span>
              </div>
            </div>

            <p style={{ ...bodyStyle, marginBottom: 20 }}>
              Designed and evolved the engineering platform supporting production AI systems in healthcare, enabling machine learning teams to move from research to reliable production through automation, reproducibility, and platform engineering.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 17 }}>
              {caseStudies.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <div style={{ width: 2, flexShrink: 0, background: ACCENT, borderRadius: 2, alignSelf: "stretch", minHeight: 40 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, fontFamily: FONT, marginBottom: 3, letterSpacing: "-0.005em" }}>{item.title}</div>
                    <div style={bodyStyle}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: RIGHT_W, flexShrink: 0 }}>
          <SectionLabel>Core Capabilities</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {capabilities.map(({ cat, items }) => (
              <div key={cat}>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: TEXT, fontFamily: FONT, marginBottom: 8, letterSpacing: "-0.005em" }}>{cat}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {items.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, padding: "3.5px 0", borderBottom: `1px solid ${BORDER_LIGHT}` }}>
                      <div style={{ width: 3, height: 3, borderRadius: "50%", background: BORDER, flexShrink: 0 }} />
                      <span style={{ fontSize: 10.5, color: TEXT_SEC, fontFamily: FONT, lineHeight: 1.7 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Page2() {
  const PH = 52;
  const PV = 44;

  return (
    <div
      style={{
        width: PAGE_W,
        height: PAGE_H,
        background: "#FFFFFF",
        boxSizing: "border-box",
        padding: `${PV}px ${PH}px`,
        fontFamily: FONT,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: TEXT_MUT, fontFamily: FONT }}>Mario Wangen</span>
        <span style={{ fontSize: 9, color: TEXT_MUT, fontFamily: FONT, letterSpacing: "0.08em" }}>2 / 2</span>
      </div>
      <div style={{ height: 1, background: BORDER, marginBottom: 24 }} />

      <div style={{ marginBottom: 24 }}>
        <SectionLabel>Professional Experience (continued)</SectionLabel>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 2 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: TEXT, fontFamily: FONT, letterSpacing: "-0.01em" }}>Senior Software Engineer</span>
            <span style={{ fontSize: 10, color: TEXT_MUT, fontFamily: FONT }}>2010 — 2025</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: ACCENT, fontWeight: 600, fontFamily: FONT }}>Ingenieurbüro Schlegel</span>
            <span style={{ fontSize: 10, color: TEXT_MUT, fontFamily: FONT }}>· Engineering Software · Structural Analysis</span>
          </div>
          <p style={{ ...bodyStyle, fontSize: 10.5, marginBottom: 10 }}>
            Designed and delivered engineering software for structural analysis and civil engineering projects over fifteen years. My role naturally expanded to encompass architecture, DevOps, automation, and technical leadership across the full software lifecycle.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {schlegelHighlights.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: BORDER, flexShrink: 0, marginTop: 6 }} />
                <span style={{ fontSize: 10.5, color: TEXT_SEC, fontFamily: FONT, lineHeight: 1.65 }}>{h}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: TEXT_MUT, fontFamily: FONT, marginBottom: 10 }}>Earlier Experience</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {earlierRoles.map((r, i) => (
              <div key={r.company} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "0 20px", padding: "6px 0", borderBottom: i < earlierRoles.length - 1 ? `1px solid ${BORDER_LIGHT}` : "none", alignItems: "baseline" }}>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: TEXT, fontFamily: FONT }}>{r.company}</span>
                <span style={{ fontSize: 10.5, color: TEXT_SEC, fontFamily: FONT, lineHeight: 1.55 }}>{r.desc}</span>
              </div>
            ))}
          </div>
          <p style={{ ...bodyStyle, fontSize: 10, marginTop: 8, color: TEXT_MUT }}>
            Earlier roles established a broad foundation across enterprise software, embedded systems, GIS, mobile applications, and customer-focused product development.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <SectionLabel>Selected Engineering Systems</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 36px" }}>
          {projects.map((p) => (
            <div key={p.name}>
              <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, fontFamily: FONT, marginBottom: 3, letterSpacing: "-0.01em" }}>{p.name}</div>
              <div style={{ fontSize: 10, color: TEXT_SEC, fontFamily: FONT, lineHeight: 1.6, marginBottom: 5 }}>{p.desc}</div>
              <div style={{ fontSize: 9.5, fontFamily: FONT, lineHeight: 1.5, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: TEXT_MUT }}>Design Pattern: </span>
                <span style={{ color: TEXT_SEC }}>{p.pattern}</span>
              </div>
              <div style={{ fontSize: 8.5, color: TEXT_MUT, fontFamily: FONT, letterSpacing: "0.01em" }}>{p.tags.join(" • ")}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <SectionLabel>Education &amp; Professional Development</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {education.map((e, i) => (
            <div key={e.school} style={{ padding: "8px 0", borderBottom: i < education.length - 1 ? `1px solid ${BORDER_LIGHT}` : "none" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: TEXT, fontFamily: FONT, letterSpacing: "-0.01em" }}>{e.degree}</span>
                <span style={{ fontSize: 10, color: e.accent ? ACCENT : TEXT_MUT, fontFamily: FONT, fontWeight: e.accent ? 600 : 400 }}>· {e.school}</span>
              </div>
              {e.desc && <p style={{ ...bodyStyle, fontSize: 10, marginTop: 3, color: TEXT_MUT }}>{e.desc}</p>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Technology Stack</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0 40px" }}>
          {stack.map(({ cat, items }) => (
            <div key={cat}>
              <div style={{ fontSize: 9, fontWeight: 500, color: TEXT, fontFamily: FONT, marginBottom: 9, letterSpacing: "0.01em" }}>{cat}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {items.map((item) => (
                  <div key={item} style={{ fontSize: 10.5, color: TEXT_SEC, fontFamily: FONT, lineHeight: 1.95 }}>{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function usePageScale(pageWidth: number, horizontalPadding = 32) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      setScale(Math.min(1, (window.innerWidth - horizontalPadding) / pageWidth));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [pageWidth, horizontalPadding]);

  return scale;
}

function ScaledPage({ scale, children }: { scale: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        width: PAGE_W * scale,
        height: PAGE_H * scale,
        overflow: "hidden",
        boxShadow: "0 4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ width: PAGE_W, height: PAGE_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}

const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    paddingTop: pt(44),
    paddingRight: pt(52),
    paddingBottom: pt(44),
    paddingLeft: pt(52),
    fontFamily: "Helvetica",
  },
  header: { marginBottom: pt(24) },
  name: { fontSize: pt(28), fontWeight: 400, color: TEXT, letterSpacing: pt(-0.84), lineHeight: 1, marginBottom: pt(11) },
  headline: { fontSize: pt(14.5), fontWeight: 400, color: TEXT_SEC, lineHeight: 1.45, marginBottom: pt(5), width: pt(500) },
  subhead: { fontSize: pt(11), color: TEXT_MUT, marginBottom: pt(18), letterSpacing: pt(0.11) },
  contactRow: { flexDirection: "row", flexWrap: "wrap" },
  contactItem: { fontSize: pt(10), color: TEXT_MUT, textDecoration: "none", marginRight: pt(22), marginBottom: pt(6) },
  divider: { height: pt(1), backgroundColor: BORDER, marginBottom: pt(28) },
  twoColumn: { flexDirection: "row" },
  leftCol: { width: pt(447), marginRight: pt(36) },
  rightCol: { width: pt(207) },
  sectionLabel: { fontSize: pt(8.5), fontWeight: 700, textTransform: "uppercase", letterSpacing: pt(1.105), color: TEXT_MUT, marginBottom: pt(16) },
  body: { fontSize: pt(10.5), lineHeight: 1.8, color: TEXT_SEC },
  profileBody: { fontSize: pt(10.5), lineHeight: 2, color: TEXT_SEC },
  quote: { fontSize: pt(11), lineHeight: 2, color: TEXT_QUOTE, fontStyle: "italic", marginTop: pt(9), marginBottom: pt(60) },
  roleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: pt(3) },
  roleTitle: { fontSize: pt(13), fontWeight: 700, color: TEXT, letterSpacing: pt(-0.13) },
  date: { fontSize: pt(10), color: TEXT_MUT },
  metaRow: { flexDirection: "row", alignItems: "center" },
  company: { fontSize: pt(11.5), color: ACCENT, fontWeight: 700, marginRight: pt(7) },
  roleMeta: { fontSize: pt(10), color: TEXT_MUT },
  caseItem: { flexDirection: "row", marginBottom: pt(17) },
  accentBar: { width: pt(2), backgroundColor: ACCENT, borderRadius: pt(2), marginRight: pt(14) },
  caseContent: { flex: 1 },
  caseTitle: { fontSize: pt(11), fontWeight: 700, color: TEXT, marginBottom: pt(3), letterSpacing: pt(-0.055) },
  capBlock: { marginBottom: pt(22) },
  capTitle: { fontSize: pt(10.5), fontWeight: 700, color: TEXT, marginBottom: pt(8), letterSpacing: pt(-0.0525) },
  capItem: { flexDirection: "row", alignItems: "center", paddingTop: pt(3.5), paddingBottom: pt(3.5), borderBottomWidth: pt(1), borderBottomColor: BORDER_LIGHT },
  bullet: { width: pt(3), height: pt(3), borderRadius: pt(1.5), backgroundColor: BORDER, marginRight: pt(8) },
  capText: { fontSize: pt(10.5), color: TEXT_SEC, lineHeight: 1.7 },
  topMiniHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: pt(18) },
  miniName: { fontSize: pt(11.5), fontWeight: 700, color: TEXT_MUT },
  pageNum: { fontSize: pt(9), color: TEXT_MUT, letterSpacing: pt(0.72) },
  page2Divider: { height: pt(1), backgroundColor: BORDER, marginBottom: pt(24) },
  block24: { marginBottom: pt(24) },
  block22: { marginBottom: pt(22) },
  schlegelTitle: { fontSize: pt(12.5), fontWeight: 700, color: TEXT, letterSpacing: pt(-0.125) },
  smallCompany: { fontSize: pt(11), color: ACCENT, fontWeight: 700, marginRight: pt(7) },
  listItem: { flexDirection: "row", alignItems: "flex-start", marginBottom: pt(4) },
  listText: { fontSize: pt(10.5), color: TEXT_SEC, lineHeight: 1.65, flex: 1 },
  smallSectionLabel: { fontSize: pt(9), fontWeight: 700, textTransform: "uppercase", letterSpacing: pt(0.9), color: TEXT_MUT, marginBottom: pt(10) },
  earlierRow: { flexDirection: "row", paddingTop: pt(6), paddingBottom: pt(6), borderBottomWidth: pt(1), borderBottomColor: BORDER_LIGHT },
  earlierCompany: { width: pt(160), fontSize: pt(10.5), fontWeight: 700, color: TEXT },
  earlierDesc: { flex: 1, fontSize: pt(10.5), color: TEXT_SEC, lineHeight: 1.55 },
  mutedNote: { fontSize: pt(10), lineHeight: 1.8, color: TEXT_MUT, marginTop: pt(8) },
  projectGrid: { flexDirection: "row", flexWrap: "wrap" },
  projectCard: { width: pt(327), marginRight: pt(36), marginBottom: pt(14) },
  projectCardRight: { width: pt(327), marginBottom: pt(14) },
  projectName: { fontSize: pt(11), fontWeight: 700, color: TEXT, marginBottom: pt(3), letterSpacing: pt(-0.11) },
  projectDesc: { fontSize: pt(10), color: TEXT_SEC, lineHeight: 1.6, marginBottom: pt(5) },
  pattern: { fontSize: pt(9.5), lineHeight: 1.5, marginBottom: pt(6), color: TEXT_SEC },
  patternLabel: { fontWeight: 700, color: TEXT_MUT },
  tags: { fontSize: pt(8.5), color: TEXT_MUT, letterSpacing: pt(0.085) },
  educationItem: { paddingTop: pt(8), paddingBottom: pt(8), borderBottomWidth: pt(1), borderBottomColor: BORDER_LIGHT },
  educationRow: { flexDirection: "row", alignItems: "baseline" },
  degree: { fontSize: pt(11), fontWeight: 700, color: TEXT, letterSpacing: pt(-0.11), marginRight: pt(10) },
  school: { fontSize: pt(10), color: TEXT_MUT },
  schoolAccent: { fontSize: pt(10), color: ACCENT, fontWeight: 700 },
  educationDesc: { fontSize: pt(10), lineHeight: 1.8, color: TEXT_MUT, marginTop: pt(3) },
  stackRow: { flexDirection: "row" },
  stackCol: { width: pt(142.5), marginRight: pt(40) },
  stackColLast: { width: pt(142.5) },
  stackCat: { fontSize: pt(9), fontWeight: 400, color: TEXT, marginBottom: pt(9), letterSpacing: pt(0.09) },
  stackItem: { fontSize: pt(10.5), color: TEXT_SEC, lineHeight: 1.95 },
});

function PdfSectionLabel({ children }: { children: string }) {
  return <Text style={pdfStyles.sectionLabel}>{children}</Text>;
}

function PdfDocument() {
  return (
    <Document title="Mario Wangen CV" author="Mario Wangen" subject="CV" creator="Mario Wangen CV App">
      <PdfPage size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>Mario Wangen</Text>
          <Text style={pdfStyles.headline}>Building the engineering platforms that enable AI teams to ship reliable software.</Text>
          <Text style={pdfStyles.subhead}>Senior Software Engineer · AI Platform Engineering · Production AI Systems · MLOps</Text>
          <View style={pdfStyles.contactRow}>
            <Link src="https://linkedin.com/in/mariowangen" style={pdfStyles.contactItem}>linkedin.com/in/mariowangen</Link>
            <Link src="https://github.com/daytona675r" style={pdfStyles.contactItem}>github.com/daytona675r</Link>
            <Link src="mailto:mario.wangen@live.de" style={pdfStyles.contactItem}>mario.wangen@live.de</Link>
            <Text style={pdfStyles.contactItem}>Dresden, Germany</Text>
          </View>
        </View>

        <View style={pdfStyles.divider} />

        <View style={pdfStyles.twoColumn}>
          <View style={pdfStyles.leftCol}>
            <View style={{ marginBottom: pt(30) }}>
              <PdfSectionLabel>Professional Profile</PdfSectionLabel>
              <Text style={pdfStyles.profileBody}>
                I've spent more than twenty years building software platforms for environments where reliability matters. Today, I apply that experience to <Text style={{ fontWeight: 700 }}>production AI</Text>—designing the engineering systems that enable machine learning teams to build, validate, deploy, and operate AI with confidence.
              </Text>
              <Text style={pdfStyles.quote}>Helping machine learning teams move from experimentation to production through engineering discipline, automation, and platform thinking.</Text>
            </View>

            <View>
              <PdfSectionLabel>Professional Experience</PdfSectionLabel>
              <View style={{ marginBottom: pt(16) }}>
                <View style={pdfStyles.roleRow}>
                  <Text style={pdfStyles.roleTitle}>Senior Software Engineer – AI Platform Engineering</Text>
                  <Text style={pdfStyles.date}>2026 — Present</Text>
                </View>
                <View style={pdfStyles.metaRow}>
                  <Text style={pdfStyles.company}>Cancilico</Text>
                  <Text style={pdfStyles.roleMeta}>· AI Infrastructure for Medical Computer Vision · Hybrid</Text>
                </View>
              </View>

              <Text style={[pdfStyles.body, { marginBottom: pt(20) }]}>Designed and evolved the engineering platform supporting production AI systems in healthcare, enabling machine learning teams to move from research to reliable production through automation, reproducibility, and platform engineering.</Text>

              <View>
                {caseStudies.map((item, i) => (
                  <View key={i} style={pdfStyles.caseItem}>
                    <View style={pdfStyles.accentBar} />
                    <View style={pdfStyles.caseContent}>
                      <Text style={pdfStyles.caseTitle}>{item.title}</Text>
                      <Text style={pdfStyles.body}>{item.body}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={pdfStyles.rightCol}>
            <PdfSectionLabel>Core Capabilities</PdfSectionLabel>
            {capabilities.map(({ cat, items }) => (
              <View key={cat} style={pdfStyles.capBlock}>
                <Text style={pdfStyles.capTitle}>{cat}</Text>
                {items.map((item) => (
                  <View key={item} style={pdfStyles.capItem}>
                    <View style={pdfStyles.bullet} />
                    <Text style={pdfStyles.capText}>{item}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </PdfPage>

      <PdfPage size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.topMiniHeader}>
          <Text style={pdfStyles.miniName}>Mario Wangen</Text>
          <Text style={pdfStyles.pageNum}>2 / 2</Text>
        </View>
        <View style={pdfStyles.page2Divider} />

        <View style={pdfStyles.block24}>
          <PdfSectionLabel>Professional Experience (continued)</PdfSectionLabel>
          <View style={{ marginBottom: pt(16) }}>
            <View style={[pdfStyles.roleRow, { marginBottom: pt(2) }]}>
              <Text style={pdfStyles.schlegelTitle}>Senior Software Engineer</Text>
              <Text style={pdfStyles.date}>2010 — 2025</Text>
            </View>
            <View style={[pdfStyles.metaRow, { marginBottom: pt(8) }]}>
              <Text style={pdfStyles.smallCompany}>Ingenieurbüro Schlegel</Text>
              <Text style={pdfStyles.roleMeta}>· Engineering Software · Structural Analysis</Text>
            </View>
            <Text style={[pdfStyles.body, { fontSize: pt(10.5), marginBottom: pt(10) }]}>Designed and delivered engineering software for structural analysis and civil engineering projects over fifteen years. My role naturally expanded to encompass architecture, DevOps, automation, and technical leadership across the full software lifecycle.</Text>
            {schlegelHighlights.map((h, i) => (
              <View key={i} style={pdfStyles.listItem}>
                <View style={[pdfStyles.bullet, { marginTop: pt(6), marginRight: pt(9) }]} />
                <Text style={pdfStyles.listText}>{h}</Text>
              </View>
            ))}
          </View>

          <View>
            <Text style={pdfStyles.smallSectionLabel}>Earlier Experience</Text>
            {earlierRoles.map((r, i) => (
              <View key={r.company} style={[pdfStyles.earlierRow, i === earlierRoles.length - 1 ? { borderBottomWidth: 0 } : null]}>
                <Text style={pdfStyles.earlierCompany}>{r.company}</Text>
                <Text style={pdfStyles.earlierDesc}>{r.desc}</Text>
              </View>
            ))}
            <Text style={pdfStyles.mutedNote}>Earlier roles established a broad foundation across enterprise software, embedded systems, GIS, mobile applications, and customer-focused product development.</Text>
          </View>
        </View>

        <View style={pdfStyles.block22}>
          <PdfSectionLabel>Selected Engineering Systems</PdfSectionLabel>
          <View style={pdfStyles.projectGrid}>
            {projects.map((p, i) => (
              <View key={p.name} style={i % 2 === 0 ? pdfStyles.projectCard : pdfStyles.projectCardRight}>
                <Text style={pdfStyles.projectName}>{p.name}</Text>
                <Text style={pdfStyles.projectDesc}>{p.desc}</Text>
                <Text style={pdfStyles.pattern}><Text style={pdfStyles.patternLabel}>Design Pattern: </Text>{p.pattern}</Text>
                <Text style={pdfStyles.tags}>{p.tags.join(" • ")}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={pdfStyles.block22}>
          <PdfSectionLabel>Education &amp; Professional Development</PdfSectionLabel>
          {education.map((e, i) => (
            <View key={e.school} style={[pdfStyles.educationItem, i === education.length - 1 ? { borderBottomWidth: 0 } : null]}>
              <View style={pdfStyles.educationRow}>
                <Text style={pdfStyles.degree}>{e.degree}</Text>
                <Text style={e.accent ? pdfStyles.schoolAccent : pdfStyles.school}>· {e.school}</Text>
              </View>
              {e.desc ? <Text style={pdfStyles.educationDesc}>{e.desc}</Text> : null}
            </View>
          ))}
        </View>

        <View>
          <PdfSectionLabel>Technology Stack</PdfSectionLabel>
          <View style={pdfStyles.stackRow}>
            {stack.map(({ cat, items }, i) => (
              <View key={cat} style={i === stack.length - 1 ? pdfStyles.stackColLast : pdfStyles.stackCol}>
                <Text style={pdfStyles.stackCat}>{cat}</Text>
                {items.map((item) => <Text key={item} style={pdfStyles.stackItem}>{item}</Text>)}
              </View>
            ))}
          </View>
        </View>
      </PdfPage>
    </Document>
  );
}

export default function App() {
  const scale = usePageScale(PAGE_W);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-0 px-4 py-6 sm:px-6 sm:py-12"
      style={{ background: "#111827", overflowX: "hidden" }}
    >
      <ScaledPage scale={scale}>
        <Page1 />
      </ScaledPage>

      <div style={{ width: PAGE_W * scale, maxWidth: "100%", height: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.06)" }} />
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>PAGE 2</span>
        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.06)" }} />
      </div>

      <ScaledPage scale={scale}>
        <Page2 />
      </ScaledPage>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%", maxWidth: PAGE_W * scale }}>
        <PDFDownloadLink document={<PdfDocument />} fileName="mario-wangen-cv.pdf">
          {({ loading }) => (
            <button
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 22px",
                borderRadius: 8,
                background: loading ? "rgba(37,99,235,0.08)" : "rgba(37,99,235,0.15)",
                border: "1px solid rgba(37,99,235,0.35)",
                color: loading ? "#6B7280" : "#3B82F6",
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "-0.01em",
                maxWidth: "100%",
              }}
            >
              <Download size={14} />
              {loading ? "Preparing PDF…" : "Download CV as PDF"}
            </button>
          )}
        </PDFDownloadLink>
        <span style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.06em" }}>
          Two pages · A4 · Vector PDF
        </span>
      </div>
    </div>
  );
}
