import opentype from 'opentype.js';
import axios from 'axios';

const FONT_URL = 'https://moji.or.jp/wp-content/ipafont/IPAexfont/ipaexg00401.ttf';

export async function loadFonts() {
  try {
    // フォントファイルのダウンロード
    const response = await axios.get(FONT_URL, {
      responseType: 'arraybuffer'
    });

    // フォントの解析
    const font = await opentype.parse(response.data);

    // フォントデータをBase64エンコード
    const fontBase64 = arrayBufferToBase64(response.data);

    // vfs (Virtual File System) の作成
    const vfs = {
      'ipaexg.ttf': fontBase64
    };

    return {
      IPAexGothic: {
        normal: {
          data: fontBase64,
          format: 'truetype',
          name: 'IPAexGothic',
          style: 'normal',
          vfs
        }
      }
    };
  } catch (error) {
    console.error('Font loading error:', error);
    throw new Error('フォントの読み込みに失敗しました');
  }
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}