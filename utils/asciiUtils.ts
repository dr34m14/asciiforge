
import { ASCIIOptions, ColoredChar } from '../types';

export const convertToASCII = (
  canvas: HTMLCanvasElement,
  options: ASCIIOptions
): { text: string; coloredData: ColoredChar[][] } => {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { text: '', coloredData: [] };

  const { width: targetWidth, charSet, isInverse, contrast, brightness, colorMode } = options;
  
  const charAspectRatio = 0.55; 
  const scale = targetWidth / canvas.width;
  const targetHeight = Math.floor(canvas.height * scale * charAspectRatio);

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = targetWidth;
  tempCanvas.height = targetHeight;
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return { text: '', coloredData: [] };

  // For luminosity calculation, we use a filtered grayscale image
  tempCtx.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(100%)`;
  tempCtx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
  const grayscaleData = tempCtx.getImageData(0, 0, targetWidth, targetHeight).data;

  // For original colors, we draw the original image without the grayscale filter
  tempCtx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
  tempCtx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
  const originalColorData = tempCtx.getImageData(0, 0, targetWidth, targetHeight).data;

  let asciiText = '';
  const coloredData: ColoredChar[][] = [];
  const chars = isInverse ? charSet.split('').reverse().join('') : charSet;

  for (let y = 0; y < targetHeight; y++) {
    const row: ColoredChar[] = [];
    for (let x = 0; x < targetWidth; x++) {
      const offset = (y * targetWidth + x) * 4;
      
      // Grayscale value for character mapping
      const gray = grayscaleData[offset];
      const charIndex = Math.floor((gray / 255) * (chars.length - 1));
      const char = chars[charIndex];
      
      asciiText += char;

      // Color extraction
      let color = '#ffffff';
      if (colorMode === 'original') {
        const r = originalColorData[offset];
        const g = originalColorData[offset + 1];
        const b = originalColorData[offset + 2];
        color = `rgb(${r},${g},${b})`;
      } else if (colorMode === 'custom-solid') {
        color = options.customColor;
      }

      row.push({ char, color });
    }
    asciiText += '\n';
    coloredData.push(row);
  }

  return { text: asciiText, coloredData };
};

export const downloadAsTxt = (text: string, filename: string) => {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.txt`;
  link.click();
  URL.revokeObjectURL(url);
};

export const downloadAsPng = (
  coloredData: ColoredChar[][], 
  filename: string, 
  bgColor: string,
  options: ASCIIOptions
) => {
  if (coloredData.length === 0) return;

  const fontSize = 12;
  const charWidth = 7.2; 
  const charHeight = 12;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rows = coloredData.length;
  const cols = coloredData[0].length;

  canvas.width = cols * charWidth;
  canvas.height = rows * charHeight;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;
  ctx.textBaseline = 'top';

  coloredData.forEach((row, y) => {
    row.forEach((cell, x) => {
      ctx.fillStyle = options.colorMode === 'monochrome' 
        ? (bgColor === '#09090b' ? '#fafafa' : '#09090b') 
        : cell.color;
      ctx.fillText(cell.char, x * charWidth, y * charHeight);
    });
  });

  const url = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.png`;
  link.click();
};
