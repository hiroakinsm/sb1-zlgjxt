import { TFontDictionary } from 'pdfmake/interfaces';
import axios from 'axios';

const FONT_URL = 'https://moji.or.jp/wp-content/ipafont/IPAexfont/ipaexg.ttf';

export async function loadFont(): Promise<ArrayBuffer> {
  try {
    const response = await axios.get(FONT_URL, { 
      responseType: 'arraybuffer',
      headers: {
        'Accept-Encoding': 'identity'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Font loading error:', error);
    throw new Error('フォントの読み込みに失敗しました');
  }
}

export async function loadFonts(): Promise<TFontDictionary> {
  try {
    const fontData = await loadFont();
    
    return {
      IPAexGothic: {
        normal: { content: fontData },
        bold: { content: fontData },
        italics: { content: fontData },
        bolditalics: { content: fontData }
      }
    };
  } catch (error) {
    console.error('Fonts loading error:', error);
    throw new Error('フォントの初期化に失敗しました');
  }
}