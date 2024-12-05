import type { PDFSection, PDFGenerationContext } from '../../../types/pdf/types';
import { formatDate } from '../utils';

export function generateTitlePage(context: PDFGenerationContext): PDFSection {
  const { analysis } = context;
  
  return {
    title: '',
    content: [
      {
        text: 'COBOLソース解析レポート',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      {
        text: `ファイル名: ${analysis.fileName}`,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      {
        text: `作成日: ${formatDate(new Date())}`,
        alignment: 'center',
        margin: [0, 0, 0, 40]
      }
    ]
  };
}