import type { PDFChartDefinition } from '../../../types/pdf/interfaces';
import { Chart } from 'chart.js/auto';
import html2canvas from 'html2canvas';

export async function createChart(definition: PDFChartDefinition): Promise<string> {
  // Create a temporary canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 400;
  document.body.appendChild(canvas);

  // Create and render the chart
  new Chart(canvas, {
    type: definition.type,
    data: definition.data,
    options: {
      ...definition.options,
      animation: false,
      responsive: false
    }
  });

  // Convert canvas to image
  const imageData = await html2canvas(canvas);
  const imageUrl = imageData.toDataURL('image/png');

  // Clean up
  document.body.removeChild(canvas);

  return imageUrl;
}