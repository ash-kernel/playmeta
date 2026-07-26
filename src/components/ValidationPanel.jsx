import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ValidationPanel = ({ metadata }) => {
  const warnings = [];

  if (!metadata.title) warnings.push('Missing <title> tag.');
  else if (metadata.title.length > 60) warnings.push('Title is over 60 characters and may be truncated.');

  if (!metadata.description) warnings.push('Missing meta description.');
  else if (metadata.description.length > 160) warnings.push('Description is over 160 characters and may be truncated.');

  if (!metadata.ogImage) warnings.push('Missing og:image. Social platforms will not display an image preview.');
  if (!metadata.twitterCard) warnings.push('Missing twitter:card. Twitter may not display a rich preview.');
  if (!metadata.favicon) warnings.push('Missing favicon.');

  const hasWarnings = warnings.length > 0;

  return (
    <motion.div 
      className={`glass-panel p-6 ${hasWarnings ? 'border-yellow-500/20' : 'border-green-500/20'}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 flex items-center">
        Validation Check
        {!hasWarnings ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto flex items-center space-x-1.5 text-green-400 bg-green-500/10 px-3 py-1 rounded-full"
          >
            <CheckCircle2 size={16} />
            <span className="text-xs font-bold">Perfect</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto flex items-center space-x-1.5 text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.2)]"
          >
            <span className="text-xs font-bold">{warnings.length} Issues</span>
          </motion.div>
        )}
      </h3>
      
      {!hasWarnings ? (
        <p className="text-sm text-slate-400">All essential meta tags look perfectly optimized for sharing.</p>
      ) : (
        <ul className="space-y-3">
          {warnings.map((warn, i) => (
            <motion.li 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start text-sm text-yellow-200/80 bg-yellow-900/10 p-3 rounded-lg border border-yellow-700/20"
            >
              <AlertTriangle className="text-yellow-500/80 mr-3 shrink-0 mt-0.5" size={16} />
              <span className="leading-relaxed">{warn}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default ValidationPanel;
