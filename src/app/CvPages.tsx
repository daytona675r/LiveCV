import type { ComponentType, ReactNode } from 'react';
import { careerData } from './careerData';
import type { CareerRole, CvContent, CapabilityGroup, CvLabels } from './cvTypes';

// One editorial tree in PDF points for both HTML preview and React-PDF.
export type LayoutStyle = Record<string, string | number>;
type PrimitiveProps = { children?: ReactNode; style?: LayoutStyle; inline?: boolean; heading?: 1 | 2 | 3; href?: string; pageNumber?: number; src?: string };
export type CvPrimitives = { Box: ComponentType<PrimitiveProps>; Text: ComponentType<PrimitiveProps>; Link: ComponentType<PrimitiveProps>; Image: ComponentType<PrimitiveProps>; Page: ComponentType<PrimitiveProps> };
export const A4 = { width: 595.28, height: 841.89 };
export const layout = {
  page: { paddingTop: 30, paddingBottom: 30, paddingLeft: 37, paddingRight: 37, backgroundColor: '#ffffff', color: '#414B59', fontFamily: 'Helvetica' },
  name: { fontSize: 24, color: '#111827', letterSpacing: -0.6, marginBottom: 5 },
  title: { fontSize: 13, color: '#111827', marginBottom: 7 },
  value: { fontSize: 11, lineHeight: 1.4, marginBottom: 12 },
  contacts: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 14, rowGap: 4, marginBottom: 16 },
  contact: { fontSize: 8.5, color: '#6B7280', textDecoration: 'none' },
  rule: { height: .6, backgroundColor: '#E2E6EB', marginBottom: 17 },
  label: { fontSize: 8, fontWeight: 700, letterSpacing: 1, color: '#8993A2', marginBottom: 10 },
  body: { fontSize: 10, lineHeight: 1.4, marginBottom: 8 },
  chapter: { fontSize: 10.5, fontWeight: 700, color: '#18212F', lineHeight: 1.3, marginBottom: 7, marginTop: 9 },
  employer: { fontSize: 11.5, fontWeight: 700, color: '#2563EB', marginBottom: 4 },
  dates: { fontSize: 8.5, color: '#6B7280', marginBottom: 4 },
  roleTitle: { fontSize: 10.5, fontWeight: 700, color: '#18212F', marginBottom: 4 },
  context: { fontSize: 8.5, lineHeight: 1.35, color: '#6B7280', marginBottom: 10 },
  mini: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  minor: { fontSize: 8.5, lineHeight: 1.4, color: '#6B7280' },
  railTitle: { fontSize: 9.5, fontWeight: 700, color: '#505B6B', marginBottom: 6 },
  railText: { fontSize: 9.2, lineHeight: 1.6, color: '#6B7280', marginBottom: 3 },
  columns: { flexDirection: 'row', columnGap: 24 },
  main: { width: 335 },
  rail: { width: 162.28 },
  portrait: { width: 64, height: 80, objectFit: 'cover', borderRadius: 2 },
} satisfies Record<string, LayoutStyle>;

export function CvPages({ content, primitives }: { content: CvContent; primitives: CvPrimitives }) {
  const { Box, Text, Link, Image, Page } = primitives;
  const { person, education, engineeringScope } = careerData;
  const labels: CvLabels = content.labels ?? { profile: 'PROFESSIONAL PROFILE', experience: 'PROFESSIONAL EXPERIENCE', capabilities: 'ENGINEERING CAPABILITIES', technology: 'TECHNOLOGY', technologyPractice: 'TECHNOLOGY & PRACTICE', earlyExperience: 'EARLY ENGINEERING FOUNDATIONS', education: 'EDUCATION', selectedWork: 'SELECTED ENGINEERING WORK', download: 'Download CV as PDF', preparing: 'Preparing PDF…', downloadError: 'PDF generation failed — reload to retry' };
  const capabilityRail = content.capabilityRail ?? engineeringScope;
  const page1StackCategories = content.page1StackCategories ?? ['Software Engineering', 'Delivery & Platform', 'AI Systems'];
  const page2StackCategories = content.page2StackCategories ?? ['Architecture & Data', 'Engineering Practice'];
  const bodyStyle = content.locale === 'de' ? { ...layout.body, fontSize: 8.9, lineHeight: 1.2, marginBottom: 4 } : content.variant === 'devops' ? { ...layout.body, fontSize: 9.1, lineHeight: 1.24, marginBottom: 5 } : content.variant === 'fullstack' ? { ...layout.body, fontSize: 9.3, lineHeight: 1.28, marginBottom: 6 } : { ...layout.body, fontSize: 9.6, lineHeight: 1.34, marginBottom: 7 };
  const chapterStyle = content.locale === 'de' ? { ...layout.chapter, fontSize: 9.8, marginTop: 6, marginBottom: 4 } : { ...layout.chapter, fontSize: 10.2, marginTop: 7, marginBottom: 5 };
  const Label = ({ children }: { children: string }) => <Text heading={2} style={layout.label}>{children}</Text>;
  const Role = ({ role }: { role: CareerRole }) => <Box style={{ marginBottom: 18 }}>
    <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Text heading={3} style={layout.employer}>{role.company}</Text>
      <Text style={layout.dates}>{content.displayDates?.[role.id] ?? role.dates}</Text>
    </Box>
    <Text style={layout.roleTitle}>{role.title}</Text>
    {Boolean(role.context) && <Text style={layout.context}>{role.context}</Text>}
    {role.paragraphs.map((p, i) => <Text key={i} style={bodyStyle}>{p}</Text>)}
    {role.chapters?.map(ch => <Box key={ch.title}>
      <Text heading={3} style={chapterStyle}>{ch.title}</Text>
      {ch.paragraphs.map((p, i) => <Text key={i} style={i === 1 && ch.title.startsWith('Product') ? { ...bodyStyle, color: '#667182' } : bodyStyle}>{p}</Text>)}
    </Box>)}
  </Box>;
  const Group = ({ group }: { group: CapabilityGroup }) => <Box style={{ marginBottom: 20 }}>
    <Text heading={3} style={layout.railTitle}>{group.cat}</Text>
    {Array.from({ length: Math.ceil(group.items.length / 2) }, (_, i) => <Text key={i} style={layout.railText}>{group.items.slice(i * 2, i * 2 + 2).join(' · ')}</Text>)}
  </Box>;
  const MiniHeader = ({ page }: { page: number }) => <>
    <Box style={layout.mini}><Text style={layout.minor}>{person.name} · {person.title}</Text><Text style={layout.minor}>{page} / 3</Text></Box>
    <Box style={layout.rule} />
  </>;
  return <>
    <Page pageNumber={1} style={layout.page}>
      <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box style={{ width: content.portraitSrc ? 450 : '100%' }}>
          <Text heading={1} style={layout.name}>{person.name}</Text>
          <Text style={layout.title}>{content.headline}</Text>
          <Text style={content.route === '/de/fullstack' ? { ...layout.value, fontSize: 10.2, letterSpacing: -0.1 } : layout.value}>{content.hero}</Text>
          <Box style={layout.contacts}>
            <Link style={layout.contact} href={person.linkedin}>linkedin.com/in/mariowangen</Link>
            <Link style={layout.contact} href={person.github}>github.com/daytona675r</Link>
            <Link style={layout.contact} href={`mailto:${person.email}`}>{person.email}</Link>
            <Text style={layout.contact}>{content.location ?? person.location}</Text>
          </Box>
        </Box>
        {content.portraitSrc && <Image src={content.portraitSrc} style={layout.portrait} />}
      </Box>
      <Box style={layout.rule} />
      <Box style={layout.columns}>
        <Box style={layout.main}>
          <Box style={{ marginBottom: 12 }}>
            <Label>{labels.profile}</Label>
            {content.profile.split('\n\n').map((p, i) => <Text key={i} style={bodyStyle}>{p}</Text>)}
          </Box>
          <Label>{labels.experience}</Label>
          <Role role={content.roles[0]} />
        </Box>
        <Box style={layout.rail}>
          <Box style={{ marginBottom: 24 }}>
            <Label>{labels.capabilities}</Label>
            {capabilityRail.map(s => <Text key={s} style={layout.railText}>{s}</Text>)}
          </Box>
          <Label>{labels.technology}</Label>
          {content.stack.filter(g => page1StackCategories.includes(g.cat)).map(g => <Group key={g.cat} group={g} />)}
        </Box>
      </Box>
    </Page>
    <Page pageNumber={2} style={layout.page}>
      <MiniHeader page={2} />
      <Box style={layout.columns}>
        <Box style={layout.main}>
          {content.roles.slice(1, 3).map(r => <Role key={r.id} role={r} />)}
        </Box>
        <Box style={layout.rail}>
          <Label>{labels.technologyPractice}</Label>
          {content.stack.filter(g => page2StackCategories.includes(g.cat)).map(g => <Group key={g.cat} group={g} />)}

        </Box>
      </Box>

    </Page>
    <Page pageNumber={3} style={layout.page}>
      <MiniHeader page={3} />
      <Box style={layout.columns}>
        <Box style={layout.main}>
          <Label>{labels.earlyExperience}</Label>
          {content.roles.slice(3).map(r => <Role key={r.id} role={r} />)}
          <Box style={{ marginTop: 8 }}>
            <Label>{labels.education}</Label>
            {education.map(e => <Text key={e.school} style={{ ...layout.minor, marginBottom: 5 }}>
              <Text inline style={{ fontWeight: 700, color: '#505B6B' }}>{e.degree}</Text>{` · ${e.school}\n${content.educationMeta?.[e.school] ?? `${e.dates}${e.qualification ? ` · ${e.qualification}` : ''}${e.result ? ` · ${e.result}` : ''}`}`}
            </Text>)}
          </Box>
        </Box>
        <Box style={layout.rail}>
          <Box style={{ marginTop: 7 }}>
            <Label>{labels.selectedWork}</Label>
            {content.projects.map(p => <Box key={p.name} style={{ borderLeftWidth: 2, borderLeftColor: '#2563EB', borderLeftStyle: 'solid', paddingLeft: 9, marginBottom: 22 }}>
              <Text heading={3} style={{ ...layout.railTitle, color: '#263244' }}>{p.name}</Text>
              {Boolean(p.pattern) && <Text style={{ ...layout.minor, color: '#8993A2', marginBottom: 6 }}>{p.pattern}</Text>}
              <Text style={{ ...layout.railText, color: '#414B59' }}>{p.desc}</Text>
              <Text style={{ ...layout.minor, color: '#8993A2', marginTop: 6 }}>{p.tags.join(' · ')}</Text>
            </Box>)}
          </Box>
        </Box>
      </Box>
    </Page>
  </>;
}
