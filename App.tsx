
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Generator from './components/Generator';
import { Features, UseCases, FAQ, Footer } from './components/LandingSections';
import { ChevronRight, ArrowRight, MousePointer2, Zap, Sparkles, X } from 'lucide-react';

type PageState = 'home' | 'privacy' | 'terms' | 'cookies' | 'opensource';

const ModalPage: React.FC<{ title: string; children: React.ReactNode; onClose: () => void }> = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 overflow-y-auto">
    <div className="bg-zinc-900 dark:bg-white border border-zinc-800 dark:border-zinc-200 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-fade-in">
      <button 
        onClick={onClose}
        className="sticky top-6 float-right mr-6 p-3 bg-zinc-800 dark:bg-zinc-100 hover:bg-rose-500 hover:text-white transition-all rounded-2xl z-10"
        aria-label="Close modal"
      >
        <X size={20} />
      </button>
      <div className="p-8 md:p-12">
        <h2 className="text-4xl font-black mb-8 dark:text-zinc-900">{title}</h2>
        <div className="prose prose-invert dark:prose-zinc max-w-none text-zinc-400 dark:text-zinc-600 leading-relaxed space-y-6">
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
            <p>Your privacy is important to us. ASCIIForge is built as a client-side only tool. This means all image processing happens directly in your browser.</p>
            <h3 className="text-xl font-bold dark:text-zinc-900">Data Collection</h3>
            <p>We do not collect, store, or transmit any images you upload. Our server-side footprint is minimal, mainly serving the static assets required to run the application.</p>
            <h3 className="text-xl font-bold dark:text-zinc-900">Local Processing</h3>
            <p>The magic happens on your machine. JavaScript and Canvas APIs are used to read pixel data and map them to characters. No data is sent to external APIs during the forging process.</p>
          </ModalPage>
        );
      case 'terms':
        return (
          <ModalPage title="Terms of Service" onClose={() => setActivePage('home')}>
            <p>By using ASCIIForge, you agree to use the tool for creative and lawful purposes.</p>
            <h3 className="text-xl font-bold dark:text-zinc-900">Usage Limits</h3>
            <p>ASCIIForge is free for everyone. There are no limits on how many images you can forge. We just ask that you don't use our resources for malicious scraping or DDOS attempts.</p>
            <h3 className="text-xl font-bold dark:text-zinc-900">No Warranty</h3>
            <p>The software is provided "as is", without warranty of any kind. We are not responsible for how you choose to use the generated ASCII art.</p>
          </ModalPage>
        );
      case 'cookies':
        return (
          <ModalPage title="Cookie Policy" onClose={() => setActivePage('home')}>
            <p>We keep it simple: ASCIIForge uses minimal cookies.</p>
            <h3 className="text-xl font-bold dark:text-zinc-900">Functional Cookies</h3>
            <p>We may use local storage to remember your theme preference (Light/Dark mode) and preferred ASCII presets so your experience is consistent next time you visit.</p>
            <h3 className="text-xl font-bold dark:text-zinc-900">Third-Party Cookies</h3>
            <p>We do not use invasive tracking pixels or third-party advertising cookies. Your browsing habits are yours alone.</p>
          </ModalPage>
        );
      case 'opensource':
        return (
          <ModalPage title="Open Source" onClose={() => setActivePage('home')}>
            <p>ASCIIForge is built on the spirit of open-source collaboration.</p>
            <h3 className="text-xl font-bold dark:text-zinc-900">Contribute</h3>
            <p>Check out the repository on GitHub to report bugs, suggest features, or submit pull requests. We love community involvement!</p>
            <a href="https://github.com/dr34m14" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-indigo-500 font-bold hover:underline">
              Visit dr34m14 on GitHub <ArrowRight size={16} />
            </a>
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

      <main>
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
              The fastest way to convert images into high-precision ASCII art. Built by <a href="https://github.com/dr34m14" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">dr34m14</a> for developers.
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
                className="inline-flex items-center justify-center px-10 py-5 font-bold text-zinc-400 dark:text-zinc-600 transition-all border border-zinc-800 dark:border-zinc-200 rounded-2xl hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-900"
              >
                Learn More
              </a>
            </div>

            {/* Floating Visual Elements */}
            <div className="mt-24 relative max-w-5xl mx-auto px-4 animate-fade-in stagger-3">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl opacity-50" />
               <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-[100px] opacity-30" />
               <div className="bg-zinc-900 dark:bg-white border border-zinc-800 dark:border-zinc-200 rounded-[2.5rem] p-3 shadow-2xl transition-all hover:shadow-indigo-500/10">
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
                      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 dark:bg-black/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 dark:border-black/5 text-xs font-mono font-bold tracking-widest text-white dark:text-zinc-900 shadow-2xl hover:scale-105 transition-transform"
                    >
                       <MousePointer2 size={14} className="text-indigo-500 animate-bounce" />
                       READY TO FORGE
                    </button>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* The Generator App */}
        <Generator />

        {/* Features Grid */}
        <Features />

        {/* Use Cases */}
        <UseCases />

        {/* SEO Content Section */}
        <section className="py-24 px-4 bg-zinc-950 dark:bg-zinc-50 transition-colors duration-500 border-y border-zinc-900 dark:border-zinc-100">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-black dark:text-zinc-900">Advanced Image to ASCII Conversion</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <p className="text-zinc-500 dark:text-zinc-600 leading-relaxed">
                ASCIIForge isn't just another <span className="text-zinc-300 dark:text-zinc-900 font-bold">free ascii art generator</span>. We've optimized our algorithms to prioritize structural integrity in images, especially for complex subjects like anime characters and technical diagrams. By processing everything locally, we ensure your data stays on your machine.
              </p>
              <p className="text-zinc-500 dark:text-zinc-600 leading-relaxed">
                Whether you're crafting a <span className="text-zinc-300 dark:text-zinc-900 font-bold">github ascii header</span> for your next repository or generating <span className="text-zinc-300 dark:text-zinc-900 font-bold">anime ascii art</span> for a retro-themed Discord community, our color mapping and custom density tools provide unmatched fidelity. Project maintained by <a href="https://github.com/dr34m14" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-500 hover:underline">dr34m14</a>.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Final CTA */}
        <section className="py-32 relative overflow-hidden bg-black">
          <div className="absolute inset-0 bg-indigo-600/10 blur-[150px] -z-10" />
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-indigo-600/20 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-indigo-600/30">
              <Zap className="text-indigo-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-white">Start Forging Now</h2>
            <p className="text-zinc-400 mb-12 text-xl leading-relaxed">No account, no fees, no limits. Just pure creativity at the speed of light.</p>
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
