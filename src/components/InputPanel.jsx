import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Send, Loader2, Link2, Sliders, Image as ImageIcon, Eye, FileText, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_IMAGES = [
  "/image.png"
];

const InputPanel = ({ 
  mode, 
  urlInput, 
  setUrlInput, 
  htmlInput, 
  setHtmlInput, 
  onSubmitUrl, 
  loading,
  metadata,
  setMetadata
}) => {
  const [syncWithBase, setSyncWithBase] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  // Sync effect when syncWithBase is true and base fields change
  const handleFieldChange = (field, value) => {
    if (!setMetadata) return;

    setMetadata(prev => {
      if (!prev) return prev;
      const updated = { ...prev, [field]: value };

      if (syncWithBase) {
        if (field === 'title') {
          updated.ogTitle = value;
          updated.twitterTitle = value;
        } else if (field === 'description') {
          updated.ogDescription = value;
          updated.twitterDescription = value;
        } else if (field === 'ogImage') {
          updated.twitterImage = value;
        }
      }
      return updated;
    });
  };

  const handleCycleMockImage = () => {
    const nextIdx = (imageIndex + 1) % MOCK_IMAGES.length;
    setImageIndex(nextIdx);
    const selectedUrl = MOCK_IMAGES[nextIdx];
    
    setMetadata(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ogImage: selectedUrl };
      if (syncWithBase) {
        updated.twitterImage = selectedUrl;
      }
      return updated;
    });
  };

  if (mode === 'url') {
    return (
      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        onSubmit={onSubmitUrl} 
        className="flex flex-col space-y-3"
      >
        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider ml-1">Website URL</label>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-500">
            <Link2 size={18} />
          </div>
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com"
            className="glass-input flex-1 pl-12 pr-28 text-slate-200 placeholder-slate-600 bg-dark-950 border-white/5 focus:bg-dark-800 w-full"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary-500 hover:bg-primary-400 text-white px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 text-sm font-medium shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Send className="mr-2" size={16} />}
            {loading ? 'Fetching' : 'Extract'}
          </button>
        </div>
      </motion.form>
    );
  }

  if (mode === 'html') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex flex-col space-y-3 h-[280px]"
      >
        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider ml-1">Raw HTML Tags</label>
        <div className="flex-1 rounded-xl overflow-hidden border border-white/10 bg-dark-900/50 shadow-inner relative group">
          <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
          <Editor
            height="100%"
            defaultLanguage="html"
            theme="vs-dark"
            value={htmlInput}
            onChange={(value) => setHtmlInput(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              padding: { top: 20, bottom: 20 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
            }}
          />
        </div>
      </motion.div>
    );
  }

  // Edit Mode Form
  if (!metadata) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col space-y-5 max-h-[500px] overflow-y-auto pr-1"
    >
      {/* Synchronization Control */}
      <div className="flex items-center justify-between p-3 bg-dark-900/85 rounded-xl border border-white/5">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-200">Auto-Sync Tags</span>
          <span className="text-[10px] text-slate-500">Syncs base inputs into OG & Twitter tags</span>
        </div>
        <button
          onClick={() => setSyncWithBase(!syncWithBase)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer ${
            syncWithBase 
              ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' 
              : 'bg-dark-950 text-slate-400 border border-white/5'
          }`}
        >
          {syncWithBase ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      {/* SECTION 1: BASE METADATA */}
      <div className="space-y-3">
        <div className="flex items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <FileText size={14} className="mr-2 text-primary-400" />
          <span>Base Metadata</span>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">Page Title</label>
            <input
              id="input-title"
              type="text"
              value={metadata.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="e.g. Acme SaaS — The modern database stack"
              className="w-full glass-input bg-dark-950/50 border-white/5 text-slate-200 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">Description</label>
            <textarea
              id="input-description"
              value={metadata.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="e.g. Build fast applications with Acme's distributed serverless database."
              rows={3}
              className="w-full glass-input bg-dark-950/50 border-white/5 text-slate-200 resize-none font-sans focus:border-primary-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">Favicon URL</label>
            <input
              id="input-favicon"
              type="text"
              value={metadata.favicon || ''}
              onChange={(e) => handleFieldChange('favicon', e.target.value)}
              placeholder="e.g. https://acme.com/favicon.ico"
              className="w-full glass-input bg-dark-950/50 border-white/5 text-slate-200 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: OPEN GRAPH */}
      <div className="space-y-3 border-t border-white/5 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <Eye size={14} className="mr-2 text-purple-400" />
            <span>Open Graph Tags (Social)</span>
          </div>
          <span className="text-[9px] text-slate-600 uppercase">Facebook / LinkedIn / Discord</span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">og:title</label>
            <input
              id="input-ogTitle"
              type="text"
              value={metadata.ogTitle}
              onChange={(e) => handleFieldChange('ogTitle', e.target.value)}
              placeholder="Open Graph Title"
              className="w-full glass-input bg-dark-950/50 border-white/5 text-slate-200 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">og:description</label>
            <textarea
              id="input-ogDescription"
              value={metadata.ogDescription}
              onChange={(e) => handleFieldChange('ogDescription', e.target.value)}
              placeholder="Open Graph Description"
              rows={2}
              className="w-full glass-input bg-dark-950/50 border-white/5 text-slate-200 resize-none font-sans focus:border-primary-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1 flex items-center justify-between">
              <span>og:image (Shared Image URL)</span>
              <button
                type="button"
                onClick={handleCycleMockImage}
                className="text-[9px] text-primary-400 hover:text-primary-300 flex items-center cursor-pointer"
              >
                <RefreshCw size={8} className="mr-1 animate-pulse" /> Cycle Mock Image
              </button>
            </label>
            <div className="relative flex items-center">
              <input
                id="input-ogImage"
                type="text"
                value={metadata.ogImage}
                onChange={(e) => handleFieldChange('ogImage', e.target.value)}
                placeholder="https://example.com/social-preview.jpg"
                className="w-full glass-input bg-dark-950/50 border-white/5 text-slate-200 pr-10 focus:border-primary-500"
              />
              <div className="absolute right-3 text-slate-600">
                <ImageIcon size={14} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-500 font-medium block mb-1">og:url</label>
              <input
                id="input-ogUrl"
                type="text"
                value={metadata.ogUrl}
                onChange={(e) => handleFieldChange('ogUrl', e.target.value)}
                placeholder="https://acme.com"
                className="w-full glass-input bg-dark-950/50 border-white/5 text-slate-200 text-xs focus:border-primary-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-500 font-medium block mb-1">og:site_name</label>
              <input
                id="input-ogSiteName"
                type="text"
                value={metadata.ogSiteName}
                onChange={(e) => handleFieldChange('ogSiteName', e.target.value)}
                placeholder="Acme Inc."
                className="w-full glass-input bg-dark-950/50 border-white/5 text-slate-200 text-xs focus:border-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: TWITTER */}
      <div className="space-y-3 border-t border-white/5 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <Sliders size={14} className="mr-2 text-sky-400" />
            <span>X / Twitter Cards</span>
          </div>
          <span className="text-[9px] text-slate-600 uppercase">Twitter Mockups</span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">twitter:card Type</label>
            <select
              id="input-twitterCard"
              value={metadata.twitterCard || 'summary_large_image'}
              onChange={(e) => handleFieldChange('twitterCard', e.target.value)}
              className="w-full glass-input bg-dark-950/50 border-white/5 text-slate-200 text-xs py-2 h-10 focus:border-primary-500"
            >
              <option value="summary">Summary Card (Small Thumbnail)</option>
              <option value="summary_large_image">Summary Card with Large Image</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">twitter:title</label>
            <input
              id="input-twitterTitle"
              type="text"
              value={metadata.twitterTitle}
              onChange={(e) => handleFieldChange('twitterTitle', e.target.value)}
              placeholder="Twitter Title"
              className="w-full glass-input bg-dark-950/50 border-white/5 text-slate-200 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">twitter:description</label>
            <textarea
              id="input-twitterDescription"
              value={metadata.twitterDescription}
              onChange={(e) => handleFieldChange('twitterDescription', e.target.value)}
              placeholder="Twitter Description"
              rows={2}
              className="w-full glass-input bg-dark-950/50 border-white/5 text-slate-200 resize-none font-sans focus:border-primary-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">twitter:image</label>
            <input
              id="input-twitterImage"
              type="text"
              value={metadata.twitterImage}
              onChange={(e) => handleFieldChange('twitterImage', e.target.value)}
              placeholder="Twitter Image URL"
              className="w-full glass-input bg-dark-950/50 border-white/5 text-slate-200 focus:border-primary-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InputPanel;
