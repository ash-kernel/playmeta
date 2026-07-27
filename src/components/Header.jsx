import React from 'react';

const Header = () => {
  return (
    <header className="w-full relative z-10 pt-6 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="glass-panel flex flex-row items-center justify-between p-4 md:px-6 md:py-4 rounded-2xl bg-dark-900/40 backdrop-blur-md border border-white/5 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-dark-950/80 border border-white/10 flex items-center justify-center p-1.5 overflow-hidden shadow-inner">
            <img src="/image.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-none">
            Play<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-500">meta</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-white transition-colors cursor-pointer hover:scale-105 duration-200"
            title="View Code on GitHub"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.3-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
