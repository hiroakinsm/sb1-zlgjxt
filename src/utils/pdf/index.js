import { PDFGenerator } from './PDFGenerator';

export async function generatePDF(analysis, settings) {
  const generator = await PDFGenerator.getInstance();
  return generator.generate(analysis, settings);
}