
export type PresetType = 'default' | 'dense' | 'blocks' | 'shades' | 'anime' | 'custom';
export type ColorMode = 'monochrome' | 'original' | 'custom-solid';

export interface ASCIIOptions {
  width: number;
  contrast: number;
  brightness: number;
  charSet: string;
  isInverse: boolean;
  colorMode: ColorMode;
  customColor: string;
  customBgColor: string;
}

export interface Preset {
  name: string;
  charSet: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ColoredChar {
  char: string;
  color: string;
}
