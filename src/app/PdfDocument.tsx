import React from 'react';
import { Document, Page, Text, View, Link } from '@react-pdf/renderer';
import { CvPages, type CvPrimitives } from './CvPages';
import { careerData } from './careerData';
import type { CvContent } from './cvTypes';
import { LegacyPdfDocument, type PdfPresentation, type PdfCareerDetails } from './LegacyPdfDocument';
export type { PdfPresentation, PdfCareerDetails } from './LegacyPdfDocument';

const primitives: CvPrimitives = {
  Box: ({ style, children }) => <View style={style}>{children}</View>,
  Text: ({ style, children }) => <Text style={style}>{children}</Text>,
  Link: ({ style, children, href }) => <Link src={href} style={style}>{children}</Link>,
  Page: ({ style, children }) => <Page size="A4" style={style}>{children}</Page>,
};
export function PdfDocument(props: { content: CvContent; presentation?: PdfPresentation; careerDetails?: PdfCareerDetails }) {
  if (props.presentation?.application) return <LegacyPdfDocument {...props} />;
  return <Document title={props.content.pageTitle} author={careerData.person.name} language="en" subject="Curriculum Vitae">
    <CvPages content={props.content} primitives={primitives} />
  </Document>;
}
