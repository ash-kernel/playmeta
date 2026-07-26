import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GooglePreview from './previews/GooglePreview';
import TwitterPreview from './previews/TwitterPreview';
import FacebookPreview from './previews/FacebookPreview';
import LinkedInPreview from './previews/LinkedInPreview';
import DiscordPreview from './previews/DiscordPreview';
import SlackPreview from './previews/SlackPreview';
import WhatsAppPreview from './previews/WhatsAppPreview';

const PREVIEW_TABS = [
  { id: 'google', label: 'Google' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'discord', label: 'Discord' },
  { id: 'slack', label: 'Slack' },
  { id: 'whatsapp', label: 'WhatsApp' },
];

const PreviewSection = ({ metadata }) => {
  const [activeTab, setActiveTab] = useState('google');

  const renderPreview = () => {
    switch (activeTab) {
      case 'google': return <GooglePreview metadata={metadata} />;
      case 'twitter': return <TwitterPreview metadata={metadata} />;
      case 'facebook': return <FacebookPreview metadata={metadata} />;
      case 'linkedin': return <LinkedInPreview metadata={metadata} />;
      case 'discord': return <DiscordPreview metadata={metadata} />;
      case 'slack': return <SlackPreview metadata={metadata} />;
      case 'whatsapp': return <WhatsAppPreview metadata={metadata} />;
      default: return null;
    }
  };

  return (
    <div className="glass-panel overflow-visible relative flex flex-col h-full min-h-[500px]">
      <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
      
      {/* Sleek Segmented Control Header */}
      <div className="px-4 py-5 border-b border-white/5 relative z-10 w-full">
        <div className="flex w-full bg-dark-900/50 backdrop-blur-sm p-1 rounded-xl border border-white/5 shadow-inner">
          {PREVIEW_TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors z-10 ${
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
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Preview Content Area */}
      <div className="flex-1 p-8 bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center">
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        
        <div className="relative z-10 w-full max-w-2xl flex justify-center">
          {renderPreview()}
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
