import { TFontDictionary } from 'pdfmake/interfaces';

// フォントデータは実行時にロードされる
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