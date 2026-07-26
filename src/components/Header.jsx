import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import config from '../config.json';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.8 5.8 0 0 0 19 5.3 5.5 5.5 0 0 0 19 2.5s-1.4-.4-4.5 1.7a15.8 15.8 0 0 0-8 0C3.4 2.1 2 2.5 2 2.5a5.5 5.5 0 0 0 .2 2.8 5.8 5.8 0 0 0-1.5 2.5c0 5.77 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 6 18v4"></path>
    <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
  </svg>
);

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between py-6 px-4 md:px-8 max-w-7xl mx-auto relative z-10 border-b border-white/5 mb-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center shadow-glow">
          <Sparkles className="text-primary-400 w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          Metadata <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-500">Playground</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
