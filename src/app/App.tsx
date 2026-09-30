import { createElement, useEffect, useState, type CSSProperties } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CvPages, A4, type CvPrimitives, type LayoutStyle } from './CvPages';
import { getCvContent } from './cvViews';
import { PdfDocument } from './PdfDocument';
import './cv.css';

function css(style?: LayoutStyle): CSSProperties {
  return { ...style, fontFamily: style?.fontFamily ? 'Helvetica, Arial, sans-serif' : undefined } as CSSProperties;
}
function useScale() {
  const [scale, setScale] = useState(() => Math.min(4 / 3, (window.innerWidth - 32) / A4.width));
  useEffect(() => {
    const update = () => setScale(Math.min(4 / 3, (window.innerWidth - 32) / A4.width));
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return scale;
}
export default function App() {
  const content = getCvContent(window.location.pathname);
  const scale = useScale();
  useEffect(() => {
    document.title = content?.pageTitle ?? 'CV view not found — Mario Wangen';
    document.querySelector('meta[name="description"]')?.setAttribute('content', content?.metaDescription ?? 'This CV view is not available.');
  }, [content]);
  if (!content) return <main className="not-found"><h1>CV view not found</h1><a href="/">Open the canonical CV</a></main>;
  const primitives: CvPrimitives = {
    Box: ({ style, children }) => <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, ...css(style) }}>{children}</div>,
    Text: ({ style, children, inline, heading }) => heading
      ? createElement(`h${heading}`, { 'data-cv-text': true, style: { margin: 0, fontWeight: 400, lineHeight: 1.2, whiteSpace: 'pre-wrap', flexShrink: 0, ...css(style) } }, children)
      : inline
      ? <span style={css(style)}>{children}</span>
      : <div data-cv-text style={{ whiteSpace: 'pre-wrap', flexShrink: 0, ...css(style) }}>{children}</div>,
    Link: ({ style, children, href }) => <a href={href} style={css(style)}>{children}</a>,
    Page: ({ style, children, pageNumber }) => <section className="page-frame" aria-label={`CV page ${pageNumber}`} style={{ width: A4.width * scale, height: A4.height * scale }}>
      <div data-cv-page={pageNumber} className="cv-page" style={{ ...css(style), width: A4.width, height: A4.height, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    </section>,
  };
  return <main className="cv-preview" data-cv-variant={content.variant}>
    <CvPages content={content} primitives={primitives} />
    <PDFDownloadLink className="download-cv" document={<PdfDocument content={content} />} fileName={content.pdfFileName}>
      {({ loading, error }) => error ? 'PDF generation failed — reload to retry' : loading ? 'Preparing PDF…' : 'Download CV as PDF'}
    </PDFDownloadLink>
  </main>;
}
