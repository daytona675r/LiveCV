import { useRef, useState, useCallback, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download } from "lucide-react";

const PAGE_W = 794;
const PAGE_H = 1123;
const EXPORT_SCALE = 2;

const ACCENT = "#2563EB";
const TEXT = "#111827";
const TEXT_SEC = "#4B5563";
const TEXT_MUT = "#9CA3AF";
const TEXT_QUOTE = "#C4C9D1";
const BORDER = "#E5E7EB";
const BORDER_LIGHT = "#F3F4F6";
const FONT = "'Inter', sans-serif";

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

// ─── Page 1 ────────────────────────────────────────────────────────────────

function Page1() {
  const PH = 52; // horizontal pad
  const PV = 44; // vertical pad
  const BODY_W = PAGE_W - PH * 2;
  const LEFT_W = Math.floor(BODY_W * 0.648);
  const RIGHT_W = BODY_W - LEFT_W - 36;

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
      {/* ── Header ── */}
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: TEXT,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            margin: "0 0 11px",
            fontFamily: FONT,
          }}
        >
          Mario Wangen
        </h1>
        <p
          style={{
            fontSize: 14.5,
            fontWeight: 400,
            color: TEXT_SEC,
            margin: "0 0 5px",
            lineHeight: 1.45,
            fontFamily: FONT,
            maxWidth: 500,
          }}
        >
          Building the engineering platforms that enable AI teams to ship reliable software.
        </p>
        <p style={{ fontSize: 11, color: TEXT_MUT, margin: "0 0 18px", fontFamily: FONT, letterSpacing: "0.01em" }}>
          Senior Software Engineer · AI Platform Engineering · Production AI Systems · MLOps
        </p>

        {/* Contact row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 22px", alignItems: "center" }}>
          <ContactLink href="https://linkedin.com/in/mariowangen" label="linkedin.com/in/mariowangen" external />
          <ContactLink href="https://github.com/daytona675r" label="github.com/daytona675r" external />
          <ContactLink href="mailto:mario.wangen@live.de" label="mario.wangen@live.de" />
          <span style={contactItemStyle}>Dresden, Germany</span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: BORDER, marginBottom: 28 }} />

      {/* ── Two columns ── */}
      <div style={{ display: "flex", gap: 36, alignItems: "flex-start" }}>

        {/* LEFT */}
        <div style={{ width: LEFT_W, flexShrink: 0 }}>

          {/* Professional Profile */}
          <div style={{ marginBottom: 30 }}>
            <span style={sLabel}>Professional Profile</span>
            <p style={profileBodyStyle}>
              I've spent more than twenty years building software platforms for environments where reliability matters. Today, I apply that experience to{" "}
              <strong style={{ fontWeight: 700 }}>production AI</strong>
              —designing the engineering systems that enable machine learning teams to build, validate, deploy, and operate AI with confidence.
            </p>

            <p
              style={{
                ...profileBodyStyle,
                marginTop: 9,
                marginBottom: 60,
                fontWeight: 300,
                fontSize: 11,
                color: TEXT_QUOTE,
                fontStyle: "italic",
              }}
            >
              Helping machine learning teams move from experimentation to production through engineering discipline, automation, and platform thinking.
            </p>
          </div>
          
          {/* Professional Experience */}
          <div>
            <span style={sLabel}>Professional Experience</span>

            {/* Role header */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: 3,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: TEXT,
                    fontFamily: FONT,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Senior Software Engineer – AI Platform Engineering
                </span>
                <span style={{ fontSize: 10, color: TEXT_MUT, fontFamily: FONT }}>
                  2026 — Present
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span
                  style={{
                    fontSize: 11.5,
                    color: ACCENT,
                    fontWeight: 600,
                    fontFamily: FONT,
                  }}
                >
                  Cancilico
                </span>
                <span style={{ fontSize: 10, color: TEXT_MUT, fontFamily: FONT }}>
                  · AI Infrastructure for Medical Computer Vision · Hybrid
                </span>
              </div>
            </div>

            {/* Lead sentence */}
            <p style={{ ...bodyStyle, marginBottom: 20 }}>
              Designed and evolved the engineering platform supporting production AI systems in healthcare, enabling machine learning teams to move from research to reliable production through automation, reproducibility, and platform engineering.
            </p>

            {/* Case studies */}
            <div style={{ display: "flex", flexDirection: "column", gap: 17 }}>
              {caseStudies.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <div
                    style={{
                      width: 2,
                      flexShrink: 0,
                      background: ACCENT,
                      borderRadius: 2,
                      alignSelf: "stretch",
                      minHeight: 40,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: TEXT,
                        fontFamily: FONT,
                        marginBottom: 3,
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={bodyStyle}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ width: RIGHT_W, flexShrink: 0 }}>
          <span style={sLabel}>Core Capabilities</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {capabilities.map(({ cat, items }) => (
              <div key={cat}>
                <div
                  style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    color: TEXT,
                    fontFamily: FONT,
                    marginBottom: 8,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {cat}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {items.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "3.5px 0",
                        borderBottom: `1px solid ${BORDER_LIGHT}`,
                      }}
                    >
                      <div
                        style={{
                          width: 3,
                          height: 3,
                          borderRadius: "50%",
                          background: BORDER,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 10.5,
                          color: TEXT_SEC,
                          fontFamily: FONT,
                          lineHeight: 1.7,
                        }}
                      >
                        {item}
                      </span>
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

// ─── Page 2 ────────────────────────────────────────────────────────────────

function Page2() {
  const PH = 52;
  const PV = 44;

  const schlegelHighlights = [
    "Developed enterprise desktop and SaaS applications throughout the complete software lifecycle.",
    "Established CI/CD pipelines, containerised deployments, and automated development workflows.",
    "Worked directly with customers to translate complex engineering requirements into maintainable software solutions.",
    "Built a strong foundation in designing software intended to remain maintainable over many years.",
  ];

  const earlierRoles = [
    { company: "Indanet AG",      role: "Software Engineer", desc: "Security and disruption management solutions for public transportation." },
    { company: "MAP&GUIDE GmbH",  role: "Software Engineer", desc: "Navigation software and GPS systems." },
    { company: "M.ABLE GmbH",     role: "Software Engineer", desc: "Mobile CRM solutions for BMW." },
    { company: "SOFiSTiK AG",     role: "Software Engineer", desc: "Structural engineering and BIM software." },
  ];

  const projects = [
    {
      name: "PULSE ContentAgent",
      desc: "Production-oriented multi-agent orchestration platform exploring how complex AI workflows can be engineered as maintainable software systems.",
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
    {
      school: "Academy of Administration and Economics, Munich",
      degree: "Business Information Systems",
      desc: null,
      accent: false,
    },
    {
      school: "Eckert Schools",
      degree: "IT Specialist – Application Development",
      desc: null,
      accent: false,
    },
  ];

  const stack = [
    { cat: "AI / ML", items: ["MLflow", "LangGraph", "LangChain", "OpenAI API", "DVC"] },
    { cat: "Infrastructure", items: ["Kubernetes", "Terraform", "Docker", "AWS", "S3"] },
    { cat: "Languages", items: ["Python", "TypeScript", ".NET"] },
    { cat: "Frameworks & Tools", items: ["FastAPI", "React", "PostgreSQL", "Pixi", "Git"] },
  ];

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
      {/* Page header reprise */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: TEXT_MUT, fontFamily: FONT }}>Mario Wangen</span>
        <span style={{ fontSize: 9, color: TEXT_MUT, fontFamily: FONT, letterSpacing: "0.08em" }}>2 / 2</span>
      </div>
      <div style={{ height: 1, background: BORDER, marginBottom: 24 }} />

      {/* ── Professional Experience (continued) ── */}
      <div style={{ marginBottom: 24 }}>
        <span style={sLabel}>Professional Experience (continued)</span>

        {/* Schlegel */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 2 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: TEXT, fontFamily: FONT, letterSpacing: "-0.01em" }}>
              Senior Software Engineer
            </span>
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

        {/* Earlier Experience */}
        <div>
          <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: TEXT_MUT, fontFamily: FONT, marginBottom: 10 }}>
            Earlier Experience
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {earlierRoles.map((r, i) => (
              <div
                key={r.company}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  gap: "0 20px",
                  padding: "6px 0",
                  borderBottom: i < earlierRoles.length - 1 ? `1px solid ${BORDER_LIGHT}` : "none",
                  alignItems: "baseline",
                }}
              >
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

      {/* ── Selected Engineering Systems ── */}
      <div style={{ marginBottom: 22 }}>
        <span style={sLabel}>Selected Engineering Systems</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 36px" }}>
          {projects.map((p) => (
            <div key={p.name}>
              <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, fontFamily: FONT, marginBottom: 3, letterSpacing: "-0.01em" }}>
                {p.name}
              </div>
              <div style={{ fontSize: 10, color: TEXT_SEC, fontFamily: FONT, lineHeight: 1.6, marginBottom: 5 }}>
                {p.desc}
              </div>
              <div style={{ fontSize: 9.5, fontFamily: FONT, lineHeight: 1.5, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: TEXT_MUT }}>Design Pattern: </span>
                <span style={{ color: TEXT_SEC }}>{p.pattern}</span>
              </div>
              <div style={{ fontSize: 8.5, color: TEXT_MUT, fontFamily: FONT, letterSpacing: "0.01em" }}>
                {p.tags.join(" • ")}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ── Education & Professional Development ── */}
      <div style={{ marginBottom: 22 }}>
        <span style={sLabel}>Education &amp; Professional Development</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {education.map((e, i) => (
            <div
              key={e.school}
              style={{
                padding: "8px 0",
                borderBottom: i < education.length - 1 ? `1px solid ${BORDER_LIGHT}` : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: TEXT, fontFamily: FONT, letterSpacing: "-0.01em" }}>
                  {e.degree}
                </span>
                <span style={{ fontSize: 10, color: e.accent ? ACCENT : TEXT_MUT, fontFamily: FONT, fontWeight: e.accent ? 600 : 400 }}>
                  · {e.school}
                </span>
              </div>
              {e.desc && (
                <p style={{ ...bodyStyle, fontSize: 10, marginTop: 3, color: TEXT_MUT }}>
                  {e.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div>
        <span style={sLabel}>Technology Stack</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0 40px",
          }}
        >
          {stack.map(({ cat, items }) => (
            <div key={cat}>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  color: TEXT,
                  fontFamily: FONT,
                  marginBottom: 9,
                  letterSpacing: "0.01em",
                }}
              >
                {cat}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {items.map((item) => (
                  <div
                    key={item}
                    style={{
                      fontSize: 10.5,
                      color: TEXT_SEC,
                      fontFamily: FONT,
                      lineHeight: 1.95,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Responsive scaling ──────────────────────────────────────────────────────

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

function ScaledPage({
  pageRef,
  scale,
  children,
}: {
  pageRef: React.RefObject<HTMLDivElement | null>;
  scale: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: PAGE_W * scale,
        height: PAGE_H * scale,
        overflow: "hidden",
        boxShadow: "0 4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          width: PAGE_W,
          height: PAGE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div ref={pageRef}>{children}</div>
      </div>
    </div>
  );
}

// ─── App shell ─────────────────────────────────────────────────────────────

export default function App() {
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const scale = usePageScale(PAGE_W);
  const displayScale = exporting ? 1 : scale;

  const exportPDF = useCallback(async () => {
    setExporting(true);
    try {
      const refs = [page1Ref.current, page2Ref.current];
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [PAGE_W, PAGE_H],
        hotfixes: ["px_scaling"],
      });

      for (let i = 0; i < refs.length; i++) {
        const el = refs[i];
        if (!el) continue;
        const canvas = await html2canvas(el, {
          scale: EXPORT_SCALE,
          useCORS: true,
          backgroundColor: "#FFFFFF",
          width: PAGE_W,
          height: PAGE_H,
          logging: false,
        });
        const imgData = canvas.toDataURL("image/png");
        if (i > 0) pdf.addPage([PAGE_W, PAGE_H], "portrait");
        pdf.addImage(imgData, "PNG", 0, 0, PAGE_W, PAGE_H);
      }

      pdf.save("mario-wangen-cv.pdf");
    } finally {
      setExporting(false);
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-0 px-4 py-6 sm:px-6 sm:py-12"
      style={{ background: "#111827", overflowX: "hidden" }}
    >
      <ScaledPage pageRef={page1Ref} scale={displayScale}>
        <Page1 />
      </ScaledPage>

      {/* Page break */}
      <div
        style={{
          width: PAGE_W * displayScale,
          maxWidth: "100%",
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.06)" }} />
        <span
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.2)",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.08em",
          }}
        >
          PAGE 2
        </span>
        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.06)" }} />
      </div>

      <ScaledPage pageRef={page2Ref} scale={displayScale}>
        <Page2 />
      </ScaledPage>

      {/* Export */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          width: "100%",
          maxWidth: PAGE_W * displayScale,
        }}
      >
        <button
          onClick={exportPDF}
          disabled={exporting}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "11px 22px",
            borderRadius: 8,
            background: exporting ? "rgba(37,99,235,0.08)" : "rgba(37,99,235,0.15)",
            border: "1px solid rgba(37,99,235,0.35)",
            color: exporting ? "#6B7280" : "#3B82F6",
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 600,
            cursor: exporting ? "not-allowed" : "pointer",
            letterSpacing: "-0.01em",
            maxWidth: "100%",
          }}
        >
          <Download size={14} />
          {exporting ? "Generating PDF…" : "Download CV as PDF"}
        </button>
        <span
          style={{
            color: "rgba(255,255,255,0.2)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.06em",
          }}
        >
          Two pages · A4 · Print-ready
        </span>
      </div>
    </div>
  );
}
