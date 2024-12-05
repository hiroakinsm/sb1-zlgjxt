import type { PDFSection, PDFGenerationContext } from '../../../types/pdf/types';
import { createTable } from '../utils';

export function generateProgramInfo(context: PDFGenerationContext): PDFSection {
  const { analysis } = context;
  
  return {
    title: '1. プログラム基本情報',
    content: [
      {
        text: '1. プログラム基本情報',
        style: 'sectionHeader',
        pageBreak: 'before'
      },
      createTable({
        headers: ['項目', '内容'],
        rows: [
          ['プログラム名', analysis.fileName],
          ['目的', analysis.structure.programInfo.purpose],
          ['作成者', analysis.structure.programInfo.author || ''],
          ['最終更新日', analysis.structure.programInfo.lastModified?.toLocaleDateString('ja-JP') || '']
        ],
        widths: ['30%', '70%']
      })
    ]
  };
}