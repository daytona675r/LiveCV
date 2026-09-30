export const PAGE_W = 794;
export const PAGE_H = 1123;

// react-pdf uses PDF points. A4 is 595.28 × 841.89 pt.
export const PDF_SCALE = 595.28 / PAGE_W;
export const pt = (value: number) => value * PDF_SCALE;

export const ACCENT = "#2563EB";
export const TEXT = "#111827";
export const TEXT_SEC = "#4B5563";
export const TEXT_MUT = "#9CA3AF";
export const TEXT_QUOTE = "#C4C9D1";
export const BORDER = "#E5E7EB";
export const BORDER_LIGHT = "#F3F4F6";
export const FONT = "'Inter', sans-serif";

