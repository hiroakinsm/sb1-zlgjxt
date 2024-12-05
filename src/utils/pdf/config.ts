import { fonts, fontConfig } from './fonts';
import { defaultStyles, tableLayouts } from './styleConfig';
import type { PDFConfig } from './types';

export const pdfConfig: PDFConfig = {
  fonts,
  defaultStyle: {
    font: fontConfig.defaultFont,
    fontSize: 10,
    lineHeight: 1.2
  },
  styles: defaultStyles,
  pageSize: 'A4',
  pageMargins: [40, 60, 40, 60],
  header: (currentPage: number, pageCount: number) => ({
    text: 'COBOLソース解析レポート',
    alignment: 'center',
    margin: [40, 20],
    fontSize: 10,
    font: fontConfig.defaultFont
  }),
  footer: (currentPage: number, pageCount: number) => ({
    text: `${currentPage} / ${pageCount}`,
    alignment: 'center',
    margin: [0, 20],
    font: fontConfig.defaultFont
  })
};

export const tableConfig = tableLayouts;