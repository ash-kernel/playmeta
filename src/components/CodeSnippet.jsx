import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const CodeSnippet = ({ metadata }) => {
  const [copied, setCopied] = useState(false);

  const generateMetaTags = () => {
    let tags = [];
    if (metadata.title) tags.push(`  <title>${metadata.title}</title>`);
    if (metadata.description) tags.push(`  <meta name="description" content="${metadata.description}" />`);
    
    // Open Graph
    if (metadata.ogTitle) tags.push(`\n  <!-- Open Graph -->\n  <meta property="og:title" content="${metadata.ogTitle}" />`);
    if (metadata.ogDescription) tags.push(`  <meta property="og:description" content="${metadata.ogDescription}" />`);
    if (metadata.ogImage) tags.push(`  <meta property="og:image" content="${metadata.ogImage}" />`);
    if (metadata.ogUrl) tags.push(`  <meta property="og:url" content="${metadata.ogUrl}" />`);
    if (metadata.ogSiteName) tags.push(`  <meta property="og:site_name" content="${metadata.ogSiteName}" />`);
    
    // Twitter
    if (metadata.twitterCard) tags.push(`\n  <!-- Twitter -->\n  <meta name="twitter:card" content="${metadata.twitterCard}" />`);
    if (metadata.twitterTitle) tags.push(`  <meta name="twitter:title" content="${metadata.twitterTitle}" />`);
    if (metadata.twitterDescription) tags.push(`  <meta name="twitter:description" content="${metadata.twitterDescription}" />`);
    if (metadata.twitterImage) tags.push(`  <meta name="twitter:image" content="${metadata.twitterImage}" />`);
    
    return tags.join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className="glass-panel p-6"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center">
          <Terminal size={16} className="mr-2 text-primary-500" />
          Generated Tags
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center space-x-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </motion.button>
      </div>
      <div className="bg-[#050505] rounded-xl p-5 overflow-x-auto text-[13px] text-slate-300 font-mono border border-white/5 shadow-inner relative group">
        <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
        <pre className="whitespace-pre-wrap leading-relaxed"><span className="text-slate-500">&lt;head&gt;</span>{'\n'}{generateMetaTags()}{'\n'}<span className="text-slate-500">&lt;/head&gt;</span></pre>
      </div>
    </motion.div>
  );
};

export default CodeSnippet;
