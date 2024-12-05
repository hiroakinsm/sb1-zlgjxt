import axios from 'axios';

const FONT_URL = 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@4.5.12/files/noto-sans-jp-all-400-normal.woff';

export async function loadFonts() {
  try {
    const response = await axios.get(FONT_URL, {
      responseType: 'arraybuffer'
    });

    return {
      NotoSansJP: {
        normal: {
          data: response.data,
          format: 'woff'
        },
        bold: {
          data: response.data,
          format: 'woff'
        },
        italics: {
          data: response.data,
          format: 'woff'
        },
        bolditalics: {
          data: response.data,
          format: 'woff'
        }
      }
    };
  } catch (error) {
    console.error('Font loading error:', error);
    throw new Error('フォントの読み込みに失敗しました');
  }
}