import React, { useState } from 'react';
import { Copy, Check, Terminal, Download, FileCode } from 'lucide-react';
import { motion } from 'framer-motion';

const CodeSnippet = ({ metadata }) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'og', 'twitter'
  const [copied, setCopied] = useState(false);

  const generateMetaTags = (type = 'all') => {
    let tags = [];
    
    // Base SEO
    if (type === 'all' || type === 'base') {
      if (metadata.title) tags.push(`  <title>${metadata.title}</title>`);
      if (metadata.description) tags.push(`  <meta name="description" content="${metadata.description}" />`);
      if (metadata.favicon) tags.push(`  <link rel="icon" href="${metadata.favicon}" />`);
    }

    // Open Graph
    if (type === 'all' || type === 'og') {
      const ogTags = [];
      if (metadata.ogTitle) ogTags.push(`  <meta property="og:title" content="${metadata.ogTitle}" />`);
      if (metadata.ogDescription) ogTags.push(`  <meta property="og:description" content="${metadata.ogDescription}" />`);
      if (metadata.ogImage) ogTags.push(`  <meta property="og:image" content="${metadata.ogImage}" />`);
      if (metadata.ogUrl) ogTags.push(`  <meta property="og:url" content="${metadata.ogUrl}" />`);
      if (metadata.ogSiteName) ogTags.push(`  <meta property="og:site_name" content="${metadata.ogSiteName}" />`);
      
      if (ogTags.length > 0) {
        if (type === 'all') tags.push(`\n  <!-- Open Graph / Facebook -->`);
        tags.push(...ogTags);
      }
    }

    // Twitter
    if (type === 'all' || type === 'twitter') {
      const twTags = [];
      if (metadata.twitterCard) twTags.push(`  <meta name="twitter:card" content="${metadata.twitterCard}" />`);
      if (metadata.twitterTitle) twTags.push(`  <meta name="twitter:title" content="${metadata.twitterTitle}" />`);
      if (metadata.twitterDescription) twTags.push(`  <meta name="twitter:description" content="${metadata.twitterDescription}" />`);
      if (metadata.twitterImage) twTags.push(`  <meta name="twitter:image" content="${metadata.twitterImage}" />`);
      
      if (twTags.length > 0) {
        if (type === 'all') tags.push(`\n  <!-- Twitter / X -->`);
        tags.push(...twTags);
      }
    }
    
    return tags.join('\n');
  };

  const handleCopy = () => {
    const code = generateMetaTags(activeTab);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
${generateMetaTags('all')}
</head>
<body>
  <h1>Metadata Optimization Complete</h1>
  <p>Place the head tags generated above inside your web application's index.html or document layouts.</p>
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'metadata-tags.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      className="glass-panel p-6 border-white/5"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center text-slate-400">
          <Terminal size={16} className="mr-2 text-primary-500" />
          Generated Code
        </h3>
        
        <div className="flex space-x-2">
          {/* Download button */}
          <button
            onClick={handleDownload}
            title="Download full index.html file"
            className="flex items-center space-x-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Export</span>
          </button>
          
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 text-xs bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/20 text-primary-400 px-3 py-1.5 rounded-lg transition-colors shadow-sm cursor-pointer font-semibold"
          >
            {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Code category tabs */}
      <div className="flex space-x-1 mb-3 p-0.5 bg-dark-950/80 rounded-lg border border-white/5 text-[11px]">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1 rounded-md transition-colors cursor-pointer ${
            activeTab === 'all' ? 'bg-dark-700 text-white font-semibold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          All Tags
        </button>
        <button
          onClick={() => setActiveTab('og')}
          className={`flex-1 py-1 rounded-md transition-colors cursor-pointer ${
            activeTab === 'og' ? 'bg-dark-700 text-white font-semibold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Open Graph
        </button>
        <button
          onClick={() => setActiveTab('twitter')}
          className={`flex-1 py-1 rounded-md transition-colors cursor-pointer ${
            activeTab === 'twitter' ? 'bg-dark-700 text-white font-semibold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Twitter Cards
        </button>
      </div>

      {/* Code Display Container */}
      <div className="bg-[#030303] rounded-xl p-5 overflow-x-auto text-[13px] text-slate-300 font-mono border border-white/5 shadow-inner relative group select-all">
        <div className="absolute top-3 right-3 text-slate-700 opacity-30 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <FileCode size={16} />
        </div>
        <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
        <pre className="whitespace-pre-wrap leading-relaxed">
          {activeTab === 'all' && <span className="text-slate-600">&lt;head&gt;{'\n'}</span>}
          <span className="text-slate-200">{generateMetaTags(activeTab)}</span>
          {activeTab === 'all' && <span className="text-slate-600">{'\n'}&lt;/head&gt;</span>}
        </pre>
      </div>
    </motion.div>
  );
};

export default CodeSnippet;
