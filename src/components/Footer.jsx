import React from 'react';

const Footer = ({ onOpenPrivacy, onOpenTos }) => {
  return (
    <footer className="w-full border-t border-white/5 mt-16 py-8 relative z-10 bg-dark-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
        <div>
          © 2026 Playmeta. Open source tool.
        </div>
        <div className="flex items-center space-x-6">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors"
          >
            Docs
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <button 
            onClick={onOpenPrivacy} 
            className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-xs text-slate-500 font-sans"
          >
            Privacy Policy
          </button>
          <button 
            onClick={onOpenTos} 
            className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-xs text-slate-500 font-sans"
          >
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
