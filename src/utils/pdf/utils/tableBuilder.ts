import type { PDFTableDefinition } from '../../../types/pdf/interfaces';

export function createTable(definition: PDFTableDefinition): any {
  return {
    table: {
      headerRows: 1,
      widths: definition.widths || Array(definition.headers.length).fill('*'),
      body: [
        definition.headers.map(header => ({
          text: header,
          style: 'tableHeader',
          ...definition.headerStyle
        })),
        ...definition.rows.map(row =>
          row.map(cell => ({
            text: cell,
            ...definition.rowStyle
          }))
        )
      ]
    },
    layout: {
      hLineWidth: () => 1,
      vLineWidth: () => 1,
      hLineColor: () => '#E5E7EB',
      vLineColor: () => '#E5E7EB',
      paddingLeft: () => 8,
      paddingRight: () => 8,
      paddingTop: () => 6,
      paddingBottom: () => 6
    }
  };
}

export function createSection(title: string, content: any[]): any {
  return {
    text: title,
    style: 'sectionHeader',
    margin: [0, 20, 0, 10],
    pageBreak: 'before',
    content
  };
}

export function createSubsection(title: string, content: any[]): any {
  return {
    text: title,
    style: 'subsectionHeader',
    margin: [0, 15, 0, 8],
    content
  };
}