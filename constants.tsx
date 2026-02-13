
import { Preset } from './types';

export const PRESETS: Record<string, Preset> = {
  default: {
    name: 'Standard',
    charSet: '@#W$?!;:. ',
    description: 'Clean, balanced look for most images.'
  },
  dense: {
    name: 'Detailed',
    charSet: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. ',
    description: 'High detail density for complex photos.'
  },
  blocks: {
    name: 'Terminal Blocks',
    charSet: '█▓▒░ ',
    description: 'Retro terminal and Linux console vibe.'
  },
  shades: {
    name: 'Braille/Dots',
    charSet: '⣿⣷⣯⣟⡿⢿⣻⣽⣾⣀⡀ ',
    description: 'Modern minimalist dot-based pattern.'
  },
  anime: {
    name: 'Anime Line-Art',
    charSet: ' .:-=+*#%@',
    description: 'Optimized for high-contrast character art.'
  }
};

export const FAQ_DATA = [
  {
    question: "Is ASCIIForge really free?",
    answer: "Yes, 100%. We built this as a tool for the community. No signups, no paywalls, just pure ASCII creation."
  },
  {
    question: "Are my images uploaded to a server?",
    answer: "Never. All image processing happens locally in your browser using JavaScript and Canvas. Your privacy is baked into the architecture."
  },
  {
    question: "What formats can I export?",
    answer: "You can copy the raw text to your clipboard, download a .txt file, or export a high-quality .png image of your ASCII art."
  },
  {
    question: "Does it work on mobile?",
    answer: "Absolutely. ASCIIForge is fully responsive, though for the best editing experience we recommend a desktop screen for previewing large ASCII widths."
  }
];
