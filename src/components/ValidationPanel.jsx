import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ValidationPanel = ({ metadata }) => {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'issues', 'passed'

  const errors = [];
  const warnings = [];
  const passed = [];

  // 1. TITLE CHECKS (Total Weight: 25)
  if (!metadata.title) {
    errors.push({ id: 'title-missing', text: 'Missing <title> tag. Search engines and platforms will display empty or fallback text.' });
  } else {
    passed.push({ id: 'title-exists', text: 'Page title tag is present.' });
    if (metadata.title.length > 60) {
      warnings.push({ id: 'title-long', text: `Title is too long (${metadata.title.length} chars). It will likely be truncated on search engines and social feeds (max ~60).` });
    } else if (metadata.title.length < 20) {
      warnings.push({ id: 'title-short', text: `Title is very short (${metadata.title.length} chars). Try adding more descriptive keywords (optimal 30-60).` });
    } else {
      passed.push({ id: 'title-optimal', text: `Title length is optimal (${metadata.title.length} chars).` });
    }
  }

  // 2. DESCRIPTION CHECKS (Total Weight: 35)
  if (!metadata.description) {
    errors.push({ id: 'desc-missing', text: 'Missing meta description. Search engines will auto-generate text which may look messy.' });
  } else {
    passed.push({ id: 'desc-exists', text: 'Meta description tag is present.' });
    if (metadata.description.length > 160) {
      warnings.push({ id: 'desc-long', text: `Description is too long (${metadata.description.length} chars). Search snippets will truncate it (optimal 50-160).` });
    } else if (metadata.description.length < 40) {
      warnings.push({ id: 'desc-short', text: `Description is very short (${metadata.description.length} chars). Expand it to provide more context (optimal 50-160).` });
    } else {
      passed.push({ id: 'desc-optimal', text: `Description length is optimal (${metadata.description.length} chars).` });
    }
  }

  // 3. IMAGE CHECKS (Total Weight: 20)
  if (!metadata.ogImage) {
    errors.push({ id: 'ogimage-missing', text: 'Missing og:image. Social platforms (Facebook, Slack, Discord) will not display visual previews.' });
  } else {
    passed.push({ id: 'ogimage-exists', text: 'og:image preview image tag is present.' });
    if (!metadata.ogImage.startsWith('http')) {
      warnings.push({ id: 'ogimage-relative', text: 'og:image URL is relative. Image must have an absolute URL (starting with https://) to render on external platforms.' });
    } else {
      passed.push({ id: 'ogimage-absolute', text: 'og:image has a valid absolute URL.' });
    }
  }

  // 4. URL & SITE NAME CHECKS (Total Weight: 10)
  if (!metadata.ogUrl) {
    warnings.push({ id: 'ogurl-missing', text: 'Missing og:url. Hardcoding this tag helps platforms group likes and shares to the correct canonical URL.' });
  } else {
    passed.push({ id: 'ogurl-exists', text: 'og:url canonical tag is present.' });
  }

  if (!metadata.ogSiteName) {
    passed.push({ id: 'ogsitename-missing', text: 'No og:site_name. Mapped to default brand name.' });
  } else {
    passed.push({ id: 'ogsitename-exists', text: 'og:site_name tag is present.' });
  }

  // 5. TWITTER CARD CHECKS (Total Weight: 5)
  if (!metadata.twitterCard) {
    warnings.push({ id: 'twittercard-missing', text: 'Missing twitter:card. X/Twitter will fallback to standard text and may not display a rich media preview.' });
  } else {
    passed.push({ id: 'twittercard-exists', text: `twitter:card is configured as "${metadata.twitterCard}".` });
  }

  // 6. FAVICON CHECKS (Total Weight: 5)
  if (!metadata.favicon) {
    warnings.push({ id: 'favicon-missing', text: 'Missing website favicon. Browser tabs and Google search listings will show a default globe icon.' });
  } else {
    passed.push({ id: 'favicon-exists', text: 'Favicon shortcut link is configured.' });
  }

  // SCORE CALCULATION
  let score = 0;
  // title: missing (-25), sub-optimal (-10), optimal (0)
  if (metadata.title) {
    score += 15;
    if (metadata.title.length >= 20 && metadata.title.length <= 60) score += 10;
    else score += 5;
  }
  // desc: missing (-35), sub-optimal (-15), optimal (0)
  if (metadata.description) {
    score += 20;
    if (metadata.description.length >= 40 && metadata.description.length <= 160) score += 15;
    else score += 5;
  }
  // og:image: missing (-20), relative (-5), absolute (0)
  if (metadata.ogImage) {
    score += 15;
    if (metadata.ogImage.startsWith('http')) score += 5;
  }
  // og:url: missing (-5)
  if (metadata.ogUrl) score += 5;
  // og:site_name: exists (+5)
  if (metadata.ogSiteName) score += 5;
  // twitter:card: exists (+5)
  if (metadata.twitterCard) score += 5;
  // favicon: exists (+5)
  if (metadata.favicon) score += 5;

  // Circle SVG math
  const circleRadius = 34;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine health color theme
  let healthColor = 'text-green-400';
  let healthStroke = '#4ade80';

  if (score < 50) {
    healthColor = 'text-red-400 animate-pulse';
    healthStroke = '#f87171';
  } else if (score < 85) {
    healthColor = 'text-yellow-400';
    healthStroke = '#facc15';
  }

  // Filter items
  const renderIssuesList = () => {
    const items = [];
    if (activeFilter === 'all' || activeFilter === 'issues') {
      errors.forEach(e => items.push({ ...e, type: 'error' }));
      warnings.forEach(w => items.push({ ...w, type: 'warning' }));
    }
    if (activeFilter === 'all' || activeFilter === 'passed') {
      passed.forEach(p => items.push({ ...p, type: 'passed' }));
    }
    return items;
  };

  const filteredItems = renderIssuesList();

  return (
    <motion.div 
      className="glass-panel p-6 border-white/5 relative"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Score Header */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/5">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">SEO Health Check</h3>
          <span className="text-[11px] text-slate-500 mt-0.5">Automated validation guidelines</span>
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative flex items-center justify-center w-20 h-20 shrink-0">
          <svg className="w-full h-full -rotate-90">
            {/* Background Circle */}
            <circle
              cx="40"
              cy="40"
              r={circleRadius}
              className="stroke-dark-800"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Foreground Score Circle */}
            <motion.circle
              cx="40"
              cy="40"
              r={circleRadius}
              stroke={healthStroke}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center leading-none">
            <span className={`text-[17px] font-black ${healthColor}`}>{score}%</span>
            <span className="text-[8px] text-slate-500 uppercase mt-0.5 font-bold">Health</span>
          </div>
        </div>
      </div>

      {/* Issues categorization summaries */}
      <div className="flex space-x-2 mb-4 p-1 bg-dark-950/80 rounded-xl border border-white/5">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeFilter === 'all' ? 'bg-dark-700 text-white' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          All ({errors.length + warnings.length + passed.length})
        </button>
        <button
          onClick={() => setActiveFilter('issues')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
            activeFilter === 'issues' 
              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' 
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <span>Issues ({errors.length + warnings.length})</span>
          {errors.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />}
        </button>
        <button
          onClick={() => setActiveFilter('passed')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeFilter === 'passed' 
              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Passed ({passed.length})
        </button>
      </div>

      {/* Validation items list */}
      <div className="max-h-[220px] overflow-y-auto pr-1 space-y-2.5">
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-6 text-sm text-slate-500"
            >
              No items to display.
            </motion.div>
          ) : (
            filteredItems.map((item) => {
              let icon = <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={15} />;
              let styleClass = 'bg-green-500/5 text-green-300/80 border-green-950/20';

              if (item.type === 'error') {
                icon = <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={15} />;
                styleClass = 'bg-red-500/5 text-red-300/80 border-red-950/20';
              } else if (item.type === 'warning') {
                icon = <AlertTriangle className="text-yellow-400 shrink-0 mt-0.5" size={15} />;
                styleClass = 'bg-yellow-500/5 text-yellow-300/80 border-yellow-950/20';
              }

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start text-xs p-3 rounded-xl border leading-relaxed ${styleClass}`}
                >
                  <span className="mr-2.5 mt-0.5">{icon}</span>
                  <span className="flex-1">{item.text}</span>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ValidationPanel;
