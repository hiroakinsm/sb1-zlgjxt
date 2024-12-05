import ipaexfont from 'ipaexfont';

export async function loadFont(doc) {
  try {
    doc.addFileToVFS('IPAexGothic.ttf', ipaexfont.ipaexg);
    doc.addFont('IPAexGothic.ttf', 'IPAexGothic', 'normal');
    return true;
  } catch (error) {
    console.error('Font loading error:', error);
    throw new Error('フォントの読み込みに失敗しました');
  }
}