
import React from 'react';
import { Terminal, Github, Heart, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, onHomeClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 dark:bg-white/80 backdrop-blur-md border-b border-zinc-800 dark:border-zinc-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={onHomeClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
            title="Go to Home"
          >
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Terminal size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 dark:from-indigo-600 dark:to-indigo-400">
              ASCIIForge
            </span>
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-indigo-500 dark:text-zinc-600 dark:hover:text-indigo-600 transition-colors">Features</a>
            <a href="#generator" className="text-sm font-medium text-zinc-400 hover:text-indigo-500 dark:text-zinc-600 dark:hover:text-indigo-600 transition-colors">Forge</a>
            <a href="#faq" className="text-sm font-medium text-zinc-400 hover:text-indigo-500 dark:text-zinc-600 dark:hover:text-indigo-600 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-zinc-400 hover:text-indigo-500 dark:text-zinc-600 dark:hover:text-indigo-600 transition-colors rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-100"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a 
              href="https://github.com/dr34m14" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-indigo-500 dark:text-zinc-600 dark:hover:text-indigo-600 transition-colors"
              title="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <button className="hidden sm:flex items-center gap-2 bg-zinc-800 dark:bg-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-sm font-medium py-2 px-4 rounded-full border border-zinc-700 dark:border-zinc-300 transition-all">
              <Heart size={14} className="text-rose-500 fill-rose-500" />
              Support
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
