
import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Sliders, 
  Terminal, 
  Monitor, 
  Share2, 
  Github, 
  MessageSquare, 
  ChevronDown,
  Layout,
  Code2
} from 'lucide-react';
import { FAQ_DATA } from '../constants';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap className="text-amber-400" />,
      title: "Real-time Processing",
      description: "Fast client-side rendering ensures immediate feedback as you tweak your settings."
    },
    {
      icon: <ShieldCheck className="text-emerald-400" />,
      title: "Private & Secure",
      description: "Your images never leave your computer. We believe in 100% local processing."
    },
    {
      icon: <Sliders className="text-indigo-400" />,
      title: "Granular Control",
      description: "Fine-tune contrast, brightness, and character sets for pixel-perfect ASCII output."
    },
    {
      icon: <Terminal className="text-zinc-400" />,
      title: "Developer Ready",
      description: "Export directly for GitHub READMEs, terminal banners, and source code comments."
    },
    {
      icon: <Share2 className="text-rose-400" />,
      title: "Versatile Export",
      description: "Download in .txt or .png formats, or just copy-paste with a single click."
    },
    {
      icon: <Layout className="text-sky-400" />,
      title: "Original Colors",
      description: "Map the original image colors directly onto your characters for stunning visual depth."
    }
  ];

  return (
    <section id="features" className="py-24 bg-zinc-950 dark:bg-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black mb-6 dark:text-zinc-900">Crafting Visual Code</h2>
          <p className="text-zinc-400 dark:text-zinc-600 max-w-2xl mx-auto text-lg">The most powerful suite of features for the discerning ASCII artist.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-zinc-900/40 dark:bg-zinc-50 border border-zinc-800 dark:border-zinc-200 p-8 rounded-[2rem] hover:border-indigo-500/50 dark:hover:border-indigo-500/30 transition-all hover:-translate-y-2 group shadow-sm">
              <div className="bg-zinc-800 dark:bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-zinc-700 dark:border-zinc-200 shadow-inner group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-zinc-900">{f.title}</h3>
              <p className="text-zinc-400 dark:text-zinc-600 leading-relaxed text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const UseCases: React.FC = () => {
  return (
    <section className="py-24 border-y border-zinc-800 dark:border-zinc-200 bg-black dark:bg-zinc-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight dark:text-zinc-900">Built for the <br/><span className="text-indigo-500">Digital Pioneer</span></h2>
            <div className="space-y-10">
              {[
                { icon: <Github />, title: "GitHub Profiles", desc: "Level up your profile README with custom header art that renders perfectly in markdown." },
                { icon: <Monitor />, title: "Terminal MOTDs", desc: "Greet yourself every time you login with custom ASCII banners for your server splash screen." },
                { icon: <MessageSquare />, title: "Social Status", desc: "Stand out on Discord or Reddit with character-based art that captures your brand's essence." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="mt-1 shrink-0 bg-zinc-900 dark:bg-white p-3 rounded-2xl border border-zinc-800 dark:border-zinc-200 group-hover:border-indigo-500/50 transition-colors">
                    {React.cloneElement(item.icon as React.ReactElement, { className: 'text-indigo-500', size: 24 })}
                  </div>
                  <div>
                    <h4 className="font-black text-xl mb-2 dark:text-zinc-900">{item.title}</h4>
                    <p className="text-zinc-400 dark:text-zinc-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group animate-fade-in">
             <div className="absolute -inset-10 bg-indigo-500/20 blur-[100px] rounded-full group-hover:bg-indigo-500/30 transition-all" />
             <div className="relative bg-zinc-900 dark:bg-white border border-zinc-800 dark:border-zinc-200 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
                <div className="font-mono text-[6px] sm:text-[9px] text-indigo-400 dark:text-indigo-600 leading-none whitespace-pre select-none">
{`       _    ____   ____ ___ ___ _____                   
      / \\  / ___| / ___|_ _|_ _|  ___|__  _ __ __ _  ___ 
     / _ \\ \\___ \\| |    | | | || |_ / _ \\| '__/ _\` |/ _ \\
    / ___ \\ ___) | |___ | | | ||  _| (_) | | | (_| |  __/
   /_/   \\_\\____/ \\____|___|___|_|  \\___/|_|  \\__, |\\___|
                                              |___/      `}
                </div>
                <div className="mt-12 pt-12 border-t border-zinc-800 dark:border-zinc-200">
                  <p className="text-lg italic text-zinc-400 dark:text-zinc-500 mb-6 font-medium leading-relaxed">"ASCIIForge transformed our repo's visual identity. The performance is incredible and the dark mode is stunning."</p>
                  <div className="flex items-center gap-4">
                    <img src="https://i.pravatar.cc/150?u=dev_m" className="w-12 h-12 rounded-2xl border-2 border-indigo-500/20 p-0.5" alt="User" />
                    <div>
                      <p className="font-black text-zinc-200 dark:text-zinc-900">@dev_martha</p>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Principal Engineer</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-zinc-950 dark:bg-white transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-black mb-16 text-center dark:text-zinc-900">Common Queries</h2>
        <div className="space-y-4">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="bg-zinc-900/50 dark:bg-zinc-50 border border-zinc-800 dark:border-zinc-200 rounded-[1.5rem] overflow-hidden transition-all shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
              >
                <span className="font-bold text-lg dark:text-zinc-800">{item.question}</span>
                <ChevronDown className={`text-indigo-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} size={24} />
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-8 pb-8 pt-2 text-zinc-400 dark:text-zinc-600 leading-relaxed text-base border-t border-zinc-800 dark:border-zinc-200 mx-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface FooterProps {
  onPageClick: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPageClick }) => {
  return (
    <footer className="bg-zinc-950 dark:bg-zinc-100 border-t border-zinc-900 dark:border-zinc-200 pt-32 pb-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <Terminal size={24} className="text-white" />
              </div>
              <span className="text-3xl font-black dark:text-zinc-900">ASCIIForge</span>
            </div>
            <p className="text-zinc-400 dark:text-zinc-600 max-w-md mb-10 text-lg leading-relaxed">
              We're on a mission to bring classic ASCII aesthetics to the modern web. Built with 100% privacy and developer happiness in mind.
            </p>
            <div className="flex gap-4">
               <a href="https://github.com/dr34m14" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 dark:bg-white border border-zinc-800 dark:border-zinc-200 rounded-2xl text-zinc-400 dark:text-zinc-600 hover:text-white dark:hover:text-zinc-900 hover:border-indigo-500 transition-all shadow-md"><Github size={20} /></a>
               <a href="#" className="p-3 bg-zinc-900 dark:bg-white border border-zinc-800 dark:border-zinc-200 rounded-2xl text-zinc-400 dark:text-zinc-600 hover:text-white dark:hover:text-zinc-900 hover:border-indigo-500 transition-all shadow-md"><Zap size={20} /></a>
            </div>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-black mb-8 text-zinc-300 dark:text-zinc-900 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-zinc-500 dark:text-zinc-600 font-bold">
              <li><a href="#generator" className="hover:text-indigo-400 transition-colors">Generator</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
              <li><button onClick={() => onPageClick('opensource')} className="hover:text-indigo-400 transition-colors text-left">Open Source</button></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-black mb-8 text-zinc-300 dark:text-zinc-900 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4 text-zinc-500 dark:text-zinc-600 font-bold">
              <li><button onClick={() => onPageClick('privacy')} className="hover:text-indigo-400 transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => onPageClick('terms')} className="hover:text-indigo-400 transition-colors text-left">Terms of Service</button></li>
              <li><button onClick={() => onPageClick('cookies')} className="hover:text-indigo-400 transition-colors text-left">Cookies</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-zinc-900 dark:border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm font-bold text-zinc-600 dark:text-zinc-500 italic">Built by <a href="https://github.com/dr34m14" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 underline decoration-indigo-500/30">dr34m14</a> for the community.</p>
          <div className="flex items-center gap-4 bg-zinc-900 dark:bg-white px-5 py-2.5 rounded-2xl border border-zinc-800 dark:border-zinc-200 shadow-inner">
            <span className="text-xs font-black dark:text-zinc-900 uppercase tracking-tighter">System Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-500 font-black text-xs uppercase">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
