```typescript
import { encode } from 'encoding-japanese';

export class TextEncoder {
  public static encodeText(text: string): string {
    return encode(text, 'UTF8');
  }

  public static encodeContent(content: any[]): any[] {
    return content.map(item => {
      if (typeof item === 'string') {
        return this.encodeText(item);
      }
      
      if (typeof item === 'object') {
        if (item.text) {
          item.text = this.encodeText(item.text);
        }
        if (item.content) {
          item.content = this.encodeContent(item.content);
        }
        if (item.table && item.table.body) {
          item.table.body = item.table.body.map((row: any[]) =>
            row.map(cell => {
              if (typeof cell === 'string') {
                return this.encodeText(cell);
              }
              if (cell.text) {
                cell.text = this.encodeText(cell.text);
              }
              return cell;
            })
          );
        }
      }
      return item;
    });
  }
}
```