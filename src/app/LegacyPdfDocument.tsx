import React from "react";
import { Document, Page as PdfPage, StyleSheet, Text, View, Link } from "@react-pdf/renderer";
import { careerFacts, CvContent, education, earlierRoles } from "./cvContent";
import { pt, ACCENT, TEXT, TEXT_SEC, TEXT_MUT, TEXT_QUOTE, BORDER, BORDER_LIGHT } from "./cvDesign";

// Compatibility renderer for existing private application profiles only.
export type PdfPresentation = {
  application?: boolean;
  // Optional document hierarchy; public views retain their existing layout.
  projectsFirst?: boolean;
  language?: string;
  labels?: Record<string, string>;
  translations?: Record<string, string>;
  earlierRoleSelection?: string[];
  preferredWorkLocation?: string;
};

// Optional verified details for local documents; public views retain their defaults.
export type PdfCareerDetails = {
  residence?: string;
  earlierRoles?: Record<string, { dates: string; note?: string }>;
  education?: Record<string, { dates: string; qualification?: string; result?: string }>;
};

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
  block18: { marginBottom: pt(18) },
  block12: { marginBottom: pt(12) },
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

export function LegacyPdfDocument({ content, presentation, careerDetails }: { content: CvContent; presentation?: PdfPresentation; careerDetails?: PdfCareerDetails }) {
  const application = presentation?.application ?? false;
  const projectsFirst = application && (presentation?.projectsFirst ?? false);
  const label = (text: string) => presentation?.labels?.[text] ?? text;
  const local = (text: string) => presentation?.translations?.[text] ?? text;
  const selectedEarlierRoles = earlierRoles.filter(r => !presentation?.earlierRoleSelection || presentation.earlierRoleSelection.includes(r.company));
  const currentExperience = (
            <View>
              <PdfSectionLabel>{label("Professional Experience")}</PdfSectionLabel>
              <View style={{ marginBottom: pt(16) }}>
                <View style={application ? [pdfStyles.roleRow, { flexDirection: "column", gap: pt(4) }] : pdfStyles.roleRow}>
                  <Text style={pdfStyles.roleTitle}>{careerFacts.currentRole.title}</Text>
                  <Text style={pdfStyles.date}>{local(careerFacts.currentRole.dates)}</Text>
                </View>
                <View style={application ? [pdfStyles.metaRow, { flexWrap: "wrap", gap: pt(3) }] : pdfStyles.metaRow}>
                  <Text style={pdfStyles.company}>{careerFacts.currentRole.company}</Text>
                  <Text style={pdfStyles.roleMeta}>· {local(careerFacts.currentRole.context)}</Text>
                </View>
              </View>

              <Text style={[pdfStyles.body, { marginBottom: pt(20) }]}>{content.currentRoleSummary}</Text>

              <View>
                {content.caseStudies.map((item, i) => (
                  <View key={i} wrap={application ? false : undefined} style={pdfStyles.caseItem}>
                    <View style={pdfStyles.accentBar} />
                    <View style={pdfStyles.caseContent}>
                      <Text style={pdfStyles.caseTitle}>{item.title}</Text>
                      <Text style={pdfStyles.body}>{item.body}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
  );
  const projectsSection = (
        <View style={pdfStyles.block18}>
          <PdfSectionLabel>{label("Selected Engineering Systems")}</PdfSectionLabel>
          <View style={pdfStyles.projectGrid}>
            {content.projects.map((p, i) => (
              <View key={p.name} wrap={projectsFirst ? false : undefined} style={projectsFirst ? { width: "100%", marginBottom: pt(18) } : i % 2 === 0 ? pdfStyles.projectCard : pdfStyles.projectCardRight}>
                <Text style={pdfStyles.projectName}>{p.name}</Text>
                <Text style={pdfStyles.projectDesc}>{p.desc}</Text>
                {p.pattern ? <Text style={pdfStyles.pattern}><Text style={pdfStyles.patternLabel}>{projectsFirst ? "Integration: " : "Design Pattern: "}</Text>{p.pattern}</Text> : null}
                <Text style={pdfStyles.tags}>{p.tags.join(" • ")}</Text>
              </View>
            ))}
          </View>
        </View>
  );
  return (
    <Document language={presentation?.language ?? "en"} title={content.pageTitle} author={careerFacts.person.name} subject="CV" creator="Mario Wangen CV App">
      <PdfPage size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>{careerFacts.person.name}</Text>
          <Text style={application ? [pdfStyles.headline, { width: "100%" }] : pdfStyles.headline}>{application ? content.headline : content.hero}</Text>
          <Text style={pdfStyles.subhead}>{application ? content.hero : content.headline}</Text>
          <View style={pdfStyles.contactRow}>
            <Link src={careerFacts.person.linkedin} style={pdfStyles.contactItem}>linkedin.com/in/mariowangen</Link>
            <Link src={careerFacts.person.github} style={pdfStyles.contactItem}>github.com/daytona675r</Link>
            <Link src={`mailto:${careerFacts.person.email}`} style={pdfStyles.contactItem}>{careerFacts.person.email}</Link>
            <Text style={pdfStyles.contactItem}>{careerDetails?.residence ?? local(careerFacts.person.location)}{presentation?.preferredWorkLocation ? ` · ${label("Preferred work location")}: ${presentation.preferredWorkLocation}` : ""}</Text>
          </View>
        </View>

        <View style={pdfStyles.divider} />

        <View style={pdfStyles.twoColumn}>
          <View style={pdfStyles.leftCol}>
            <View style={{ marginBottom: pt(30) }}>
              <PdfSectionLabel>{label("Professional Profile")}</PdfSectionLabel>
              <Text style={pdfStyles.profileBody}>
                {content.profile}
              </Text>
              {content.profileNote ? <Text style={application ? [pdfStyles.body, { marginTop: pt(9) }] : pdfStyles.quote}>{content.profileNote}</Text> : null}
            </View>

            {projectsFirst ? projectsSection : currentExperience}
          </View>

          <View style={pdfStyles.rightCol}>
            <PdfSectionLabel>{label("Core Capabilities")}</PdfSectionLabel>
            {content.capabilities.map(({ cat, items }) => (
              <View key={cat} style={pdfStyles.capBlock}>
                <Text style={pdfStyles.capTitle}>{cat}</Text>
                {items.map((item) => (
                  <View key={item} style={pdfStyles.capItem}>
                    <View style={pdfStyles.bullet} />
                    <Text style={application ? [pdfStyles.capText, { flex: 1 }] : pdfStyles.capText}>{item}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </PdfPage>

      <PdfPage size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.topMiniHeader}>
          <Text style={pdfStyles.miniName}>{careerFacts.person.name}</Text>
          <Text style={pdfStyles.pageNum} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
        <View style={pdfStyles.page2Divider} />

        {projectsFirst && <View style={pdfStyles.block18}>{currentExperience}</View>}

        <View style={pdfStyles.block24}>
          {!projectsFirst && <PdfSectionLabel>{label("Professional Experience (continued)")}</PdfSectionLabel>}
          <View style={{ marginBottom: pt(16) }}>
            <View style={[pdfStyles.roleRow, { marginBottom: pt(2) }]}>
                <Text style={pdfStyles.schlegelTitle}>{local(careerFacts.previousRole.title)}</Text>
                <Text style={pdfStyles.date}>{local(careerFacts.previousRole.dates)}</Text>
            </View>
            <View style={[pdfStyles.metaRow, { marginBottom: pt(8) }]}>
              <Text style={pdfStyles.smallCompany}>{local(careerFacts.previousRole.company)}</Text>
              <Text style={pdfStyles.roleMeta}>· {local(careerFacts.previousRole.context)}</Text>
            </View>
            <Text style={[pdfStyles.body, { fontSize: pt(10.5), marginBottom: pt(10) }]}>{content.schlegelSummary}</Text>
            {content.schlegelHighlights.map((h, i) => (
              <View key={i} style={pdfStyles.listItem}>
                <View style={[pdfStyles.bullet, { marginTop: pt(6), marginRight: pt(9) }]} />
                <Text style={pdfStyles.listText}>{h}</Text>
              </View>
            ))}
          </View>

          <View>
            <Text style={pdfStyles.smallSectionLabel}>{label("Earlier Experience")}</Text>
            {selectedEarlierRoles.map((r, i) => (
              <View key={r.company} wrap={false} style={[pdfStyles.earlierRow, i === selectedEarlierRoles.length - 1 ? { borderBottomWidth: 0 } : null]}>
                <View style={{ width: pt(160) }}>
                  <Text style={pdfStyles.earlierCompany}>{local(r.company)}</Text>
                  {careerDetails?.earlierRoles?.[r.company]?.dates ? <Text style={[pdfStyles.date, { marginTop: pt(3) }]}>{careerDetails.earlierRoles[r.company].dates}</Text> : null}
                </View>
                <Text style={pdfStyles.earlierDesc}>{local(r.desc)}{careerDetails?.earlierRoles?.[r.company]?.note ? ` ${careerDetails.earlierRoles[r.company].note}` : ""}</Text>
              </View>
            ))}
            <Text style={pdfStyles.mutedNote}>{content.earlierExperienceSummary}</Text>
          </View>
        </View>

        {!projectsFirst && projectsSection}

        <View style={pdfStyles.block12}>
          <PdfSectionLabel>{label("Education & Professional Development")}</PdfSectionLabel>
          {education.map((e, i) => (
            <View key={local(e.school)} wrap={false} style={[pdfStyles.educationItem, i === education.length - 1 ? { borderBottomWidth: 0 } : null]}>
              <View style={pdfStyles.educationRow}>
                <Text style={pdfStyles.degree}>{careerDetails?.education?.[e.school]?.qualification ?? local(e.degree)}</Text>
                <Text style={e.accent ? pdfStyles.schoolAccent : pdfStyles.school}>· {local(e.school)}</Text>
              </View>
              {careerDetails?.education?.[e.school] ? <Text style={pdfStyles.educationDesc}>{careerDetails.education[e.school].dates}{careerDetails.education[e.school].result ? ` · ${careerDetails.education[e.school].result}` : ""}</Text> : null}
              {e.desc ? <Text style={pdfStyles.educationDesc}>{local(e.desc)}</Text> : null}
            </View>
          ))}
        </View>

        {content.stack.length > 0 && <View>
          <PdfSectionLabel>{label("Technology Stack")}</PdfSectionLabel>
          <View style={pdfStyles.stackRow}>
            {content.stack.map(({ cat, items }, i) => (
              <View key={cat} style={i === content.stack.length - 1 ? pdfStyles.stackColLast : pdfStyles.stackCol}>
                <Text style={pdfStyles.stackCat}>{cat}</Text>
                {items.map((item) => <Text key={item} style={pdfStyles.stackItem}>{item}</Text>)}
              </View>
            ))}
          </View>
        </View>}
      </PdfPage>
    </Document>
  );
}
