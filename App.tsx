
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Generator from './components/Generator';
import { Features, UseCases, FAQ, Footer } from './components/LandingSections';
// Added Github to the import list from lucide-react
import { ChevronRight, ArrowRight, MousePointer2, Zap, Sparkles, X, Github } from 'lucide-react';

type PageState = 'home' | 'privacy' | 'terms' | 'cookies' | 'opensource';

const ModalPage: React.FC<{ title: string; children: React.ReactNode; onClose: () => void }> = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 overflow-y-auto animate-fade-in">
    <div className="bg-zinc-900 dark:bg-white border border-zinc-800 dark:border-zinc-200 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl p-2">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-zinc-800 dark:bg-zinc-100 hover:bg-rose-500 hover:text-white transition-all rounded-2xl z-20 shadow-lg group"
        aria-label="Close modal"
      >
        <X size={20} className="group-hover:rotate-90 transition-transform" />
      </button>
      <div className="p-8 md:p-14">
        <h2 className="text-4xl md:text-5xl font-black mb-8 dark:text-zinc-900 tracking-tighter">{title}</h2>
        <div className="prose prose-invert dark:prose-zinc max-w-none text-zinc-400 dark:text-zinc-600 leading-relaxed space-y-8 text-lg">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activePage, setActivePage] = useState<PageState>('home');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleHomeClick = () => {
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDarkMode]);

  const renderActivePageContent = () => {
    switch (activePage) {
      case 'privacy':
        return (
          <ModalPage title="Privacy Policy" onClose={() => setActivePage('home')}>
            <p className="font-medium text-zinc-200 dark:text-zinc-800">Your privacy is our highest priority.</p>
            <p>ASCIIForge is designed as a client-side only utility. All pixel parsing and character mapping occurs entirely within your browser environment.</p>
            <h3 className="text-2xl font-bold dark:text-zinc-900">Zero Data Transmission</h3>
            <p>We do not collect, store, share, or transmit any image data. Once you upload an image, it remains in your browser's local memory until processed or cleared.</p>
            <h3 className="text-2xl font-bold dark:text-zinc-900">No Analytics</h3>
            <p>We avoid invasive tracking scripts. Your interaction with the generator is private and anonymous.</p>
          </ModalPage>
        );
      case 'terms':
        return (
          <ModalPage title="Terms of Service" onClose={() => setActivePage('home')}>
            <p>By using ASCIIForge, you agree to these simple terms of fair use.</p>
            <h3 className="text-2xl font-bold dark:text-zinc-900">Creative Freedom</h3>
            <p>You are free to use generated ASCII art for personal or commercial projects. No attribution is required, though a shoutout to <a href="https://github.com/dr34m14" className="text-indigo-500 font-bold">dr34m14</a> is appreciated!</p>
            <h3 className="text-2xl font-bold dark:text-zinc-900">No Malicious Use</h3>
            <p>Users must not use the tool to generate offensive or illegal content. We provide the forge; you provide the artistic intent.</p>
          </ModalPage>
        );
      case 'cookies':
        return (
          <ModalPage title="Cookie Policy" onClose={() => setActivePage('home')}>
            <p>ASCIIForge is built to be as lean as possible.</p>
            <h3 className="text-2xl font-bold dark:text-zinc-900">Preference Persistence</h3>
            <p>We use standard <code>localStorage</code> to remember your theme choice and UI settings. These are stored locally and never sent to a server.</p>
            <h3 className="text-2xl font-bold dark:text-zinc-900">Third-Party Cookies</h3>
            <p>This site does not use third-party advertising or tracking cookies. We value a clean, distraction-free experience.</p>
          </ModalPage>
        );
      case 'opensource':
        return (
          <ModalPage title="Open Source" onClose={() => setActivePage('home')}>
            <p>ASCIIForge is an open-source project dedicated to the retro aesthetics community.</p>
            <h3 className="text-2xl font-bold dark:text-zinc-900">The Repository</h3>
            <p>We welcome contributions! Whether it's adding new character sets, improving rendering speed, or fixing UI bugs.</p>
            <div className="pt-6">
              <a href="https://github.com/dr34m14" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">
                <Github size={20} />
                Explore Source on GitHub
              </a>
            </div>
          </ModalPage>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'} selection:bg-indigo-500/30`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} onHomeClick={handleHomeClick} />

      {renderActivePageContent()}

      <main className={activePage !== 'home' ? 'blur-sm pointer-events-none' : ''}>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden px-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-600/10 dark:bg-indigo-600/5 blur-[120px] rounded-full -z-10" />
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 dark:text-indigo-600 text-xs font-bold mb-8 animate-fade-in stagger-1 shadow-sm">
              <Sparkles size={14} />
              <span>Enhanced with Original Color Mapping</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 animate-fade-in stagger-2 transition-all">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-600 dark:from-zinc-900 dark:to-zinc-500">
                Forge Beautiful <br className="hidden md:block" /> ASCII Art
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-400 dark:text-zinc-600 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in stagger-3">
              The fastest way to convert images into high-precision ASCII art. Built by <a href="https://github.com/dr34m14" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline font-bold">dr34m14</a> for the community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in stagger-3">
              <a 
                href="#generator" 
                className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-white transition-all bg-indigo-600 rounded-2xl hover:bg-indigo-700 shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95"
              >
                Launch Generator
                <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center px-10 py-5 font-bold text-zinc-400 dark:text-zinc-600 transition-all border border-zinc-800 dark:border-zinc-200 rounded-2xl hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-900 shadow-sm"
              >
                Learn More
              </a>
            </div>

            {/* Visual Demo Box */}
            <div className="mt-24 relative max-w-5xl mx-auto px-4 animate-fade-in stagger-3 group/hero">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl opacity-50" />
               <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-[100px] opacity-30" />
               <div className="bg-zinc-900 dark:bg-white border border-zinc-800 dark:border-zinc-200 rounded-[2.5rem] p-3 shadow-2xl transition-all duration-700 group-hover/hero:shadow-indigo-500/10">
                 <div className="bg-zinc-950 dark:bg-zinc-50 rounded-[2rem] overflow-hidden aspect-[21/9] relative border border-zinc-800 dark:border-zinc-200">
                    <img 
                      src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200" 
                      alt="Demo" 
                      className="w-full h-full object-cover opacity-20 dark:opacity-40 grayscale" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-[5px] md:text-[8px] text-indigo-400/30 dark:text-indigo-600/20 leading-[0.8] whitespace-pre select-none">
                      {Array.from({length: 40}).map((_, i) => (
                        <div key={i}>{"@#W$?!;:. ".repeat(40)}</div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 dark:from-white via-transparent to-transparent" />
                    <button 
                      onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 dark:bg-black/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 dark:border-black/5 text-xs font-mono font-bold tracking-widest text-white dark:text-zinc-900 shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                       <MousePointer2 size={14} className="text-indigo-500 animate-bounce" />
                       DRAG & DROP READY
                    </button>
                 </div>
               </div>
            </div>
          </div>
        </section>

        <Generator />
        <Features />
        <UseCases />

        <section className="py-24 px-4 bg-zinc-950 dark:bg-zinc-50 transition-colors duration-500 border-y border-zinc-900 dark:border-zinc-100">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-black dark:text-zinc-900 tracking-tight">Image to ASCII Forge Pro</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <p className="text-zinc-500 dark:text-zinc-600 leading-relaxed text-sm">
                ASCIIForge isn't just another <span className="text-zinc-300 dark:text-zinc-900 font-bold">free ascii art generator</span>. We've optimized our canvas parsing algorithms to preserve structural integrity, making it ideal for anime characters and complex diagrams.
              </p>
              <p className="text-zinc-500 dark:text-zinc-600 leading-relaxed text-sm">
                Maintain high fidelity with our <span className="text-zinc-300 dark:text-zinc-900 font-bold">github profile banner</span> presets. Your images stay private, processed 100% on your device. Repository maintained by <a href="https://github.com/dr34m14" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-500 hover:underline">dr34m14</a>.
              </p>
            </div>
          </div>
        </section>

        <FAQ />

        <section className="py-32 relative overflow-hidden bg-black">
          <div className="absolute inset-0 bg-indigo-600/10 blur-[150px] -z-10" />
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-indigo-600/20 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-indigo-600/30 shadow-inner">
              <Zap className="text-indigo-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter">Start Forging Now</h2>
            <p className="text-zinc-400 mb-12 text-xl leading-relaxed max-w-2xl mx-auto">Instant. Private. Professional. No signup needed for the ultimate ASCII creation experience.</p>
            <button 
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-6 bg-white hover:bg-indigo-50 text-black font-black rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              Get Started for Free
              <ArrowRight size={24} />
            </button>
          </div>
        </section>
      </main>

      <Footer onPageClick={setActivePage} />
    </div>
  );
};

export default App;
