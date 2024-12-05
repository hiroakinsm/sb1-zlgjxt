```typescript
import type { AnalysisResult, DocumentSettings, DocumentDefinition } from '../../../types/analysisTypes';
import { SectionGenerator } from '../sections/SectionGenerator';
import { documentConfig } from '../config/documentConfig';

export class DocumentBuilder {
  private sectionGenerator: SectionGenerator;

  constructor() {
    this.sectionGenerator = new SectionGenerator();
  }

  public async build(analysis: AnalysisResult, settings: DocumentSettings): Promise<DocumentDefinition> {
    const content = await this.generateContent(analysis, settings);
    
    return {
      ...documentConfig,
      content,
      info: {
        title: `${analysis.fileName} - COBOLソース解析レポート`,
        author: 'COBOLソース解析システム',
        subject: 'ソース解析結果',
        keywords: 'COBOL, ソース解析, レポート',
        creationDate: new Date()
      },
      header: settings.headerFooter ? this.createHeader : null,
      footer: settings.pageNumbers ? this.createFooter : null
    };
  }

  private async generateContent(analysis: AnalysisResult, settings: DocumentSettings) {
    const content = [];

    // タイトルページ
    content.push(await this.sectionGenerator.generateTitlePage(analysis));

    // 目次
    if (settings.showTableOfContents) {
      content.push(await this.sectionGenerator.generateTableOfContents());
    }

    // 各セクション
    content.push(await this.sectionGenerator.generateProgramInfo(analysis));
    content.push(await this.sectionGenerator.generateStructureAnalysis(analysis));
    content.push(await this.sectionGenerator.generateDataFlowAnalysis(analysis));
    content.push(await this.sectionGenerator.generateControlFlowAnalysis(analysis));
    content.push(await this.sectionGenerator.generateQualityAnalysis(analysis));

    return content;
  }

  private createHeader(currentPage: number, pageCount: number) {
    return {
      text: 'COBOLソース解析レポート',
      alignment: 'center',
      margin: [40, 20],
      fontSize: 10
    };
  }

  private createFooter(currentPage: number, pageCount: number) {
    return {
      text: `${currentPage} / ${pageCount}`,
      alignment: 'center',
      margin: [0, 20]
    };
  }
}
```