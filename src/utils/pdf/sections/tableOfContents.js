export function generateTableOfContents() {
  return [
    {
      text: '目次',
      style: 'tocHeader',
      margin: [0, 0, 0, 20]
    },
    {
      toc: {
        title: { text: '', style: 'tocTitle' }
      }
    },
    { pageBreak: 'after' }
  ];
}