import React from 'react';
import config from '../config.json';
import { BookOpen } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.8 5.8 0 0 0 19 5.3 5.5 5.5 0 0 0 19 2.5s-1.4-.4-4.5 1.7a15.8 15.8 0 0 0-8 0C3.4 2.1 2 2.5 2 2.5a5.5 5.5 0 0 0 .2 2.8 5.8 5.8 0 0 0-1.5 2.5c0 5.77 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 6 18v4"></path>
    <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
  </svg>
);

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 mt-16 py-8 relative z-10 bg-dark-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-center text-sm text-slate-500">
        <div className="flex items-center space-x-6">
          {config.footer.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center space-x-1.5"
            >
              {link.label === 'GitHub' && <GithubIcon size={16} />}
              {link.label === 'Docs' && <BookOpen size={16} />}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
