import type { TFontDictionary } from 'pdfmake/interfaces';

export const fonts: TFontDictionary = {
  IPAexGothic: {
    normal: { content: null },
    bold: { content: null },
    italics: { content: null },
    bolditalics: { content: null }
  }
};

export const fontConfig = {
  defaultFont: 'IPAexGothic'
};