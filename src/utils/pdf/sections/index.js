import { generateTitlePage } from './titlePage';
import { generateTableOfContents } from './tableOfContents';
import { generateProgramInfo } from './programInfo';
import { generateStructureAnalysis } from './structureAnalysis';
import { generateDataFlowAnalysis } from './dataFlowAnalysis';
import { generateControlFlowAnalysis } from './controlFlowAnalysis';
import { generateQualityAnalysis } from './qualityAnalysis';
import { generateSecurityAnalysis } from './securityAnalysis';
import { generateDependencyAnalysis } from './dependencyAnalysis';

export async function generateContent(analysis, settings) {
  const content = [];

  // タイトルページ
  content.push(...generateTitlePage(analysis));

  // 目次
  if (settings.showTableOfContents) {
    content.push(...generateTableOfContents());
  }

  // 各セクション
  const sections = [
    generateProgramInfo,
    generateStructureAnalysis,
    generateDataFlowAnalysis,
    generateControlFlowAnalysis,
    generateQualityAnalysis,
    generateSecurityAnalysis,
    generateDependencyAnalysis
  ];

  for (const generateSection of sections) {
    content.push({ pageBreak: 'before' });
    content.push(...(await generateSection(analysis)));
  }

  return content;
}