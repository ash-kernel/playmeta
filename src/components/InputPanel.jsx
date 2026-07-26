import React from 'react';
import Editor from '@monaco-editor/react';
import { Send, Loader2, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';

const InputPanel = ({ mode, urlInput, setUrlInput, htmlInput, setHtmlInput, onSubmitUrl, loading }) => {
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
            className="glass-input flex-1 pl-12 pr-28 text-slate-200 placeholder-slate-600 bg-dark-900 border-white/5 focus:bg-dark-800"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary-500 hover:bg-primary-400 text-white px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 text-sm font-medium shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Send className="mr-2" size={16} />}
            {loading ? 'Fetching' : 'Extract'}
          </button>
        </div>
      </motion.form>
    );
  }

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
};

export default InputPanel;
