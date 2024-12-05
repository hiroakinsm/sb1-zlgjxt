import { encode } from 'encoding-japanese';
import ipaexfont from 'ipaexfont';
import opentype from 'opentype.js';

export async function loadFonts() {
  try {
    // フォントデータの取得とデコード
    const fontBuffer = Buffer.from(ipaexfont.ipaexg, 'base64');
    
    // フォントの解析
    const font = await opentype.parse(fontBuffer);
    
    // フォントデータをUTF-8に変換
    const fontData = encode(fontBuffer, 'UTF8');

    return {
      IPAexGothic: {
        normal: {
          data: fontData,
          format: 'truetype',
          name: font.names.fullName.en,
          style: 'normal',
          encoding: 'Identity-H',
          subset: true,
          characterSpacing: 0.5
        },
        bold: {
          data: fontData,
          format: 'truetype',
          name: font.names.fullName.en,
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