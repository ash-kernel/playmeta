import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Smartphone } from 'lucide-react';
import GooglePreview from './previews/GooglePreview';
import TwitterPreview from './previews/TwitterPreview';
import FacebookPreview from './previews/FacebookPreview';
import LinkedInPreview from './previews/LinkedInPreview';
import DiscordPreview from './previews/DiscordPreview';
import SlackPreview from './previews/SlackPreview';
import WhatsAppPreview from './previews/WhatsAppPreview';

const PREVIEW_TABS = [
  { 
    id: 'google', 
    label: 'Google',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.73 0 3.3.63 4.52 1.76l2.39-2.39C17.38 1.69 14.97 1 12.24 1 6.58 1 2 5.58 2 11.24S6.58 21.48 12.24 21.48c5.92 0 9.85-4.16 9.85-10.02 0-.67-.06-1.3-.18-1.92H12.24z"/>
      </svg>
    ),
    color: 'text-[#4285F4]'
  },
  { 
    id: 'twitter', 
    label: 'Twitter',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: 'text-sky-400'
  },
  { 
    id: 'facebook', 
    label: 'Facebook',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: 'text-[#1877F2]'
  },
  { 
    id: 'linkedin', 
    label: 'LinkedIn',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
      </svg>
    ),
    color: 'text-[#0A66C2]'
  },
  { 
    id: 'discord', 
    label: 'Discord',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
      </svg>
    ),
    color: 'text-[#5865F2]'
  },
  { 
    id: 'slack', 
    label: 'Slack',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523 2.528 2.528 0 01-2.522-2.523 2.528 2.528 0 012.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 012.52-2.52h5.043a2.528 2.528 0 012.522 2.52v5.042a2.528 2.528 0 01-2.522 2.52H8.824a2.528 2.528 0 01-2.52-2.52v-5.042zM8.824 5.043a2.528 2.528 0 012.522-2.52 2.528 2.528 0 012.52 2.52v2.52h-2.52a2.528 2.528 0 01-2.522-2.52zm0 1.261a2.528 2.528 0 012.522 2.52v5.043a2.528 2.528 0 01-2.52 2.522H3.782a2.528 2.528 0 01-2.52-2.522V8.824a2.528 2.528 0 012.52-2.52h5.042zm10.134 3.738a2.528 2.528 0 012.52-2.522 2.528 2.528 0 012.522 2.522 2.528 2.528 0 01-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 01-2.52 2.52h-5.043a2.528 2.528 0 01-2.522-2.52V3.782a2.528 2.528 0 012.522-2.52h5.043a2.528 2.528 0 012.52 2.52v5.041zm-3.78 10.134a2.528 2.528 0 01-2.52 2.522 2.528 2.528 0 01-2.522-2.522v-2.52h2.522a2.528 2.528 0 012.52 2.52zm0-1.262a2.528 2.528 0 01-2.52-2.52v-5.043a2.528 2.528 0 012.52-2.522h5.043a2.528 2.528 0 012.52 2.522v5.043h-5.043z"/>
      </svg>
    ),
    color: 'text-[#36C5F0]'
  },
  { 
    id: 'whatsapp', 
    label: 'WhatsApp',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.008c6.56 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: 'text-[#25D366]'
  }
];

const PreviewSection = ({ metadata }) => {
  const [activeTab, setActiveTab] = useState('google');
  const [previewTheme, setPreviewTheme] = useState('dark'); // 'light' or 'dark'
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' or 'mobile'

  const renderPreview = () => {
    const props = { metadata, theme: previewTheme, device: previewDevice };
    switch (activeTab) {
      case 'google': return <GooglePreview {...props} />;
      case 'twitter': return <TwitterPreview {...props} />;
      case 'facebook': return <FacebookPreview {...props} />;
      case 'linkedin': return <LinkedInPreview {...props} />;
      case 'discord': return <DiscordPreview {...props} />;
      case 'slack': return <SlackPreview {...props} />;
      case 'whatsapp': return <WhatsAppPreview {...props} />;
      default: return null;
    }
  };

  // Determine which controls are applicable for the current platform
  const hasThemeControl = ['twitter', 'slack', 'discord'].includes(activeTab);
  const hasDeviceControl = ['google', 'twitter', 'facebook'].includes(activeTab);

  return (
    <div className="glass-panel overflow-visible relative flex flex-col h-full min-h-[500px]">
      <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
      
      {/* Sleek Segmented Control Header */}
      <div className="px-4 pt-5 pb-3 border-b border-white/5 relative z-10 w-full bg-dark-950/20">
        <div className="flex w-full bg-dark-900/50 backdrop-blur-sm p-1 rounded-xl border border-white/5 shadow-inner mb-3 overflow-x-auto scrollbar-none">
          <div className="flex space-x-1 w-full min-w-[580px]">
            {PREVIEW_TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'google') setPreviewDevice('desktop');
                    if (tab.id === 'discord') setPreviewTheme('dark');
                    if (tab.id === 'whatsapp') setPreviewDevice('mobile');
                  }}
                  className={`relative flex-1 flex items-center justify-center space-x-1.5 py-2 px-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 z-10 cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-primary-500 rounded-lg shadow-glow"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  <span className={`transition-transform duration-300 ${isActive ? 'text-white scale-110' : tab.color}`}>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden text-[9px]">{tab.label.substring(0, 3)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic platform tools sub-bar */}
        {(hasThemeControl || hasDeviceControl) && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between px-2 text-[11px] text-slate-400 border-t border-white/5 pt-3"
          >
            {/* Device Toggles */}
            {hasDeviceControl ? (
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Device:</span>
                <div className="flex bg-dark-900 rounded-lg p-0.5 border border-white/5">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      previewDevice === 'desktop' 
                        ? 'bg-primary-500/10 text-primary-400 font-medium' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Monitor size={12} />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      previewDevice === 'mobile' 
                        ? 'bg-primary-500/10 text-primary-400 font-medium' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Smartphone size={12} />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>
            ) : <div />}

            {/* Theme Toggles */}
            {hasThemeControl ? (
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Theme:</span>
                <div className="flex bg-dark-900 rounded-lg p-0.5 border border-white/5">
                  <button
                    onClick={() => setPreviewTheme('light')}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      previewTheme === 'light' 
                        ? 'bg-primary-500/10 text-primary-400 font-medium' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Sun size={12} />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => setPreviewTheme('dark')}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      previewTheme === 'dark' 
                        ? 'bg-primary-500/10 text-primary-400 font-medium' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Moon size={12} />
                    <span>Dark</span>
                  </button>
                </div>
              </div>
            ) : <div />}
          </motion.div>
        )}
      </div>
      
      {/* Preview Content Area */}
      <div className="flex-1 p-4 md:p-8 bg-[#080808] relative overflow-hidden flex items-center justify-center">
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        
        <div className="relative z-10 w-full max-w-2xl flex justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${previewTheme}-${previewDevice}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex justify-center"
            >
              {renderPreview()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
