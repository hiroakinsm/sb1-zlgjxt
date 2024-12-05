export function createTable(headers, data, widths) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: widths || Array(headers.length).fill(`${100 / headers.length}%`),
      body: [
        headers.map(header => ({
          text: header,
          style: 'tableHeader'
        })),
        ...data
      ]
    }
  };
}

export function createSection(title, content) {
  return [
    {
      text: title,
      style: 'sectionHeader',
      tocItem: true
    },
    ...content
  ];
}

export function createSubsection(title, content) {
  return [
    {
      text: title,
      style: 'subsectionHeader'
    },
    ...content
  ];
}