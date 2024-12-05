```typescript
import axios from 'axios';
import { encode } from 'encoding-japanese';
import type { TFontDictionary } from 'pdfmake/interfaces';

export class FontLoader {
  private static instance: FontLoader;
  private fontsLoaded: boolean = false;
  private readonly FONT_URL = 'https://moji.or.jp/wp-content/ipafont/IPAexfont/ipaexg00401.ttf';

  private constructor() {}

  public static getInstance(): FontLoader {
    if (!FontLoader.instance) {
      FontLoader.instance = new FontLoader();
    }
    return FontLoader.instance;
  }

  public async loadFonts(): Promise<TFontDictionary> {
    try {
      if (this.fontsLoaded) {
        return this.getFontDefinition();
      }

      const response = await axios.get(this.FONT_URL, {
        responseType: 'arraybuffer',
        headers: {
          'Accept-Encoding': 'identity'
        }
      });

      // フォントデータをUTF-8にエンコード
      const fontData = encode(new Uint8Array(response.data), 'UTF8');

      this.fontsLoaded = true;

      return {
        IPAexGothic: {
          normal: {
            data: fontData,
            format: 'truetype',
            name: 'IPAexGothic',
            style: 'normal',
            encoding: 'Identity-H',
            subset: true,
            characterSpacing: 0.5
          },
          bold: {
            data: fontData,
            format: 'truetype',
            name: 'IPAexGothic',
            style: 'bold',
            encoding: 'Identity-H',
            subset: true,
            characterSpacing: 0.5
          }
        }
      };
    } catch (error) {
      console.error('Font loading error:', error);
      throw new Error('フォントの読み込みに失敗しました');
    }
  }

  private getFontDefinition(): TFontDictionary {
    return {
      IPAexGothic: {
        normal: {
          data: null,
          format: 'truetype',
          name: 'IPAexGothic',
          style: 'normal',
          encoding: 'Identity-H'
        },
        bold: {
          data: null,
          format: 'truetype',
          name: 'IPAexGothic',
          style: 'bold',
          encoding: 'Identity-H'
        }
      }
    };
  }
}