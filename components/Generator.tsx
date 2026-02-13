
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Upload, 
  Settings, 
  Copy, 
  Download, 
  Image as ImageIcon, 
  RefreshCcw, 
  Sun, 
  Moon,
  CheckCircle2,
  FileText,
  AlertCircle,
  Palette,
  Maximize2,
  Trash2,
  Sparkles
} from 'lucide-react';
import { convertToASCII, downloadAsTxt, downloadAsPng } from '../utils/asciiUtils';
import { ASCIIOptions, PresetType, ColorMode, ColoredChar } from '../types';
import { PRESETS } from '../constants';

const COLOR_PRESETS = [
  { name: 'Classic', text: '#fafafa', bg: '#09090b' },
  { name: 'Matrix', text: '#10b981', bg: '#020617' },
  { name: 'Amber', text: '#f59e0b', bg: '#09090b' },
  { name: 'Cyberpunk', text: '#f472b6', bg: '#1e1b4b' },
  { name: 'Terminal', text: '#6366f1', bg: '#000000' },
];

const Generator: React.FC = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [asciiText, setAsciiText] = useState<string>('');
  const [coloredData, setColoredData] = useState<ColoredChar[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPreviewDark, setIsPreviewDark] = useState(true);
  const [activePreset, setActivePreset] = useState<PresetType>('default');
  
  const [options, setOptions] = useState<ASCIIOptions>({
    width: 80,
    contrast: 100,
    brightness: 100,
    charSet: PRESETS.default.charSet,
    isInverse: false,
    colorMode: 'monochrome',
    customColor: '#fafafa',
    customBgColor: '#09090b'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        processImage(img, options);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const processImage = useCallback((img: HTMLImageElement, opts: ASCIIOptions) => {
    setIsProcessing(true);
    requestAnimationFrame(() => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const { text, coloredData } = convertToASCII(canvas, opts);
        setAsciiText(text);
        setColoredData(coloredData);
      }
      setIsProcessing(false);
    });
  }, []);

  useEffect(() => {
    if (image) {
      processImage(image, options);
    }
  }, [options, image, processImage]);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
      // Auto-scroll to preview on drop for better mobile/tablet experience
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(asciiText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyColorPreset = (text: string, bg: string) => {
    setOptions(prev => ({ 
      ...prev, 
      colorMode: 'custom-solid', 
      customColor: text, 
      customBgColor: bg 
    }));
    setIsPreviewDark(true);
  };

  const clearImage = () => {
    setImage(null);
    setAsciiText('');
    setColoredData([]);
  };

  return (
    <section id="generator" ref={containerRef} className="py-20 px-4 animate-fade-in stagger-2 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Controls Panel */}
          <div className="xl:col-span-4 space-y-6">
            <div className="bg-zinc-900 dark:bg-zinc-50 border border-zinc-800 dark:border-zinc-200 rounded-3xl p-6 shadow-xl transition-colors duration-300 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Settings size={18} className="text-indigo-400" />
                  <h3 className="font-semibold text-lg dark:text-zinc-900">Forge Settings</h3>
                </div>
                {image && (
                  <button 
                    onClick={clearImage}
                    className="p-1.5 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                    title="Clear Image"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {/* Upload Box with "Ready to Forge" Visuals */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-4 min-h-[160px] ${
                  isDragging ? 'drop-zone-active scale-[1.05] ring-4 ring-indigo-500/20' : ''
                } ${
                  image ? 'border-zinc-700 bg-zinc-800/30 dark:bg-zinc-100/50' : 'border-zinc-800 dark:border-zinc-300 hover:border-indigo-500/50 hover:bg-zinc-800/20'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} 
                />
                {isDragging ? (
                  <div className="flex flex-col items-center animate-bounce">
                    <Sparkles size={32} className="text-indigo-500" />
                    <p className="text-sm font-bold text-indigo-500 mt-2">READY TO FORGE</p>
                  </div>
                ) : image ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-zinc-700 mb-2 shadow-lg">
                      <img src={image.src} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-500 transition-colors">
                      <RefreshCcw size={16} className={isProcessing ? 'animate-spin' : ''} />
                      <span className="text-xs font-medium">Change Original</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-indigo-500/10 p-4 rounded-full text-indigo-400 group-hover:scale-110 transition-transform shadow-inner">
                      <Upload size={28} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold dark:text-zinc-900">Drag & Drop Image</p>
                      <p className="text-xs text-zinc-500 mt-1">or click to browse local files</p>
                    </div>
                  </>
                )}
              </div>

              {/* Sliders and Configuration */}
              <div className="space-y-6 mt-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Width (Characters)</label>
                    <span className="text-xs font-mono font-bold text-indigo-500">{options.width}</span>
                  </div>
                  <input 
                    type="range" min="20" max="250" step="1"
                    value={options.width}
                    onChange={(e) => setOptions(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                    className="w-full h-1.5 bg-zinc-800 dark:bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Contrast</label>
                    <input 
                      type="range" min="50" max="200" step="1"
                      value={options.contrast}
                      onChange={(e) => setOptions(prev => ({ ...prev, contrast: parseInt(e.target.value) }))}
                      className="w-full h-1 bg-zinc-800 dark:bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Brightness</label>
                    <input 
                      type="range" min="50" max="200" step="1"
                      value={options.brightness}
                      onChange={(e) => setOptions(prev => ({ ...prev, brightness: parseInt(e.target.value) }))}
                      className="w-full h-1 bg-zinc-800 dark:bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-800 dark:border-zinc-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Palette size={14} className="text-indigo-400" />
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Color & Theme</label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setOptions(prev => ({ ...prev, colorMode: 'monochrome' }))}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        options.colorMode === 'monochrome' 
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                          : 'bg-zinc-800 dark:bg-zinc-100 border-zinc-700 dark:border-zinc-200 text-zinc-400 dark:text-zinc-600 hover:border-zinc-500'
                      }`}
                    >
                      B&W
                    </button>
                    <button
                      onClick={() => setOptions(prev => ({ ...prev, colorMode: 'original' }))}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        options.colorMode === 'original' 
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                          : 'bg-zinc-800 dark:bg-zinc-100 border-zinc-700 dark:border-zinc-200 text-zinc-400 dark:text-zinc-600 hover:border-zinc-500'
                      }`}
                    >
                      Original
                    </button>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {COLOR_PRESETS.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => applyColorPreset(p.text, p.bg)}
                        className="w-8 h-8 rounded-full border border-zinc-700 transition-transform hover:scale-125 shadow-lg relative group/preset"
                        style={{ background: `linear-gradient(135deg, ${p.text} 50%, ${p.bg} 50%)` }}
                      >
                         <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 text-[10px] text-white rounded opacity-0 group-hover/preset:opacity-100 transition-opacity whitespace-nowrap z-20">
                           {p.name}
                         </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Character Set</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(PRESETS).map((pKey) => (
                      <button
                        key={pKey}
                        onClick={() => {
                          setActivePreset(pKey as PresetType);
                          setOptions(prev => ({ ...prev, charSet: PRESETS[pKey].charSet }));
                        }}
                        className={`text-[10px] px-3 py-1.5 rounded-lg border transition-all ${
                          activePreset === pKey 
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm' 
                            : 'bg-zinc-800 dark:bg-zinc-100 border-zinc-700 dark:border-zinc-200 text-zinc-400 dark:text-zinc-600 hover:bg-zinc-700 dark:hover:bg-zinc-200'
                        }`}
                      >
                        {PRESETS[pKey].name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="xl:col-span-8 flex flex-col min-h-[500px] h-[70vh] xl:h-[740px]">
             <div className="flex items-center justify-between mb-4 bg-zinc-900 dark:bg-zinc-50 border border-zinc-800 dark:border-zinc-200 rounded-2xl p-4 px-6 shadow-lg transition-colors duration-300">
                <div className="hidden lg:flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">output.ascii</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 active:scale-95"
                      disabled={!asciiText}
                    >
                      {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button 
                      onClick={() => downloadAsTxt(asciiText, 'ascii-forge')}
                      className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 dark:bg-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-200 text-zinc-300 dark:text-zinc-900 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                      disabled={!asciiText}
                    >
                      <FileText size={14} />
                      <span className="hidden xs:inline">TXT</span>
                    </button>
                    <button 
                      onClick={() => downloadAsPng(coloredData, 'ascii-forge', options.customBgColor, options)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 dark:bg-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-200 text-zinc-300 dark:text-zinc-900 rounded-xl text-xs font-bold transition-all disabled:opacity-50 shadow-sm"
                      disabled={!asciiText}
                    >
                      <Download size={14} />
                      <span className="hidden xs:inline">PNG</span>
                    </button>
                  </div>
                  
                  <div className="h-6 w-px bg-zinc-800 dark:bg-zinc-200 mx-1 hidden sm:block" />
                  
                  <button 
                    onClick={() => setIsPreviewDark(!isPreviewDark)}
                    className="p-2.5 bg-zinc-800 dark:bg-zinc-100 border border-zinc-700 dark:border-zinc-200 rounded-xl text-zinc-400 dark:text-zinc-600 hover:text-white dark:hover:text-zinc-900 transition-colors shadow-sm"
                    title="Toggle Preview Light"
                  >
                    {isPreviewDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>
             </div>

             <div 
               className={`flex-grow border border-zinc-800 dark:border-zinc-200 rounded-3xl overflow-auto relative transition-all duration-500 shadow-2xl ${
                 isPreviewDark ? '' : 'bg-zinc-50'
               }`}
               style={{ backgroundColor: isPreviewDark ? options.customBgColor : '#f9fafb' }}
             >
               {!image && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 dark:text-zinc-400 px-6 text-center animate-fade-in">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-800/50 dark:bg-zinc-200/50 flex items-center justify-center mb-6 shadow-inner">
                      <ImageIcon size={32} className="opacity-40" />
                    </div>
                    <h4 className="text-xl font-bold mb-2 dark:text-zinc-800">Start Forging</h4>
                    <p className="text-sm max-w-xs leading-relaxed">Drop an image here or use the settings panel to upload.</p>
                  </div>
               )}
               
               {isProcessing && (
                 <div className="absolute inset-0 backdrop-blur-[4px] bg-zinc-950/30 flex items-center justify-center z-10 transition-all duration-500">
                    <div className="bg-zinc-900 dark:bg-white p-8 rounded-[2rem] shadow-[0_0_50px_rgba(79,70,229,0.2)] border border-zinc-800 dark:border-zinc-100 flex flex-col items-center gap-6 animate-fade-in">
                      <div className="relative">
                        <RefreshCcw size={48} className="text-indigo-500 animate-spin" />
                        <div className="absolute inset-0 blur-xl bg-indigo-500/30 animate-pulse" />
                      </div>
                      <span className="text-sm font-black tracking-[0.2em] text-indigo-400 uppercase">Generating Art</span>
                    </div>
                 </div>
               )}

               <div 
                 className={`ascii-container p-6 font-mono transition-all duration-300 origin-top-left`}
                 style={{ 
                    width: 'max-content',
                    fontSize: `${Math.max(3, 12 - (options.width / 40))}px`,
                    lineHeight: '1.0',
                    color: options.colorMode === 'monochrome' ? (isPreviewDark ? '#fafafa' : '#09090b') : 'inherit'
                 }}
               >
                 {options.colorMode === 'original' ? (
                    coloredData.map((row, y) => (
                      <div key={y} className="flex">
                        {row.map((cell, x) => (
                          <span key={x} style={{ color: cell.color }}>{cell.char}</span>
                        ))}
                      </div>
                    ))
                 ) : (
                    <div style={{ color: options.colorMode === 'custom-solid' ? options.customColor : 'inherit' }}>
                      {asciiText}
                    </div>
                 )}
               </div>
             </div>
             
             <div className="mt-4 flex items-center gap-3 text-[10px] text-zinc-500 justify-center">
               <Maximize2 size={12} className="opacity-50" />
               <span className="font-medium tracking-tight">Pan or zoom to inspect the details of your forge</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Generator;
