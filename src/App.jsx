import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search, Globe, Code2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InputPanel from './components/InputPanel';
import ValidationPanel from './components/ValidationPanel';
import CodeSnippet from './components/CodeSnippet';
import PreviewSection from './components/PreviewSection';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [inputMode, setInputMode] = useState('url'); // 'url' or 'html'
  const [urlInput, setUrlInput] = useState('');
  const [htmlInput, setHtmlInput] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const extractFromHtml = useCallback((html) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const getMetaTag = (name) => {
        return (
          doc.querySelector(`meta[name="${name}"]`)?.getAttribute('content') ||
          doc.querySelector(`meta[property="${name}"]`)?.getAttribute('content') ||
          doc.querySelector(`meta[name="twitter:${name}"]`)?.getAttribute('content') ||
          doc.querySelector(`meta[property="twitter:${name}"]`)?.getAttribute('content')
        );
      };

      const meta = {
        title: doc.querySelector('title')?.textContent || getMetaTag('title') || getMetaTag('og:title') || '',
        description: getMetaTag('description') || getMetaTag('og:description') || '',
        ogTitle: getMetaTag('og:title') || '',
        ogDescription: getMetaTag('og:description') || '',
        ogImage: getMetaTag('og:image') || '',
        ogUrl: getMetaTag('og:url') || '',
        ogSiteName: getMetaTag('og:site_name') || '',
        twitterCard: getMetaTag('twitter:card') || '',
        twitterTitle: getMetaTag('twitter:title') || '',
        twitterDescription: getMetaTag('twitter:description') || '',
        twitterImage: getMetaTag('twitter:image') || '',
        favicon: doc.querySelector('link[rel="icon"]')?.getAttribute('href') || doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') || '',
      };
      setMetadata(meta);
      setError(null);
    } catch (err) {
      setError('Failed to parse HTML.');
    }
  }, []);

  const fetchMetadata = async (targetUrl) => {
    if (!targetUrl) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3001/api/fetch-metadata?url=${encodeURIComponent(targetUrl)}`);
      setMetadata(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch URL. Site may block bots or URL is invalid.');
      setMetadata(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputMode === 'html' && htmlInput) {
      const debounceTimeout = setTimeout(() => {
        extractFromHtml(htmlInput);
      }, 500);
      return () => clearTimeout(debounceTimeout);
    }
  }, [htmlInput, inputMode, extractFromHtml]);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    fetchMetadata(urlInput);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-200 font-sans relative overflow-x-hidden flex flex-col">
      {/* Subtle radial gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <Header />

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 space-y-8 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Inputs and Validations */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              className="glass-panel p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex space-x-2 mb-6 p-1 bg-dark-900 rounded-lg border border-white/5">
                <button
                  onClick={() => setInputMode('url')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all duration-300 text-sm font-medium ${
                    inputMode === 'url' ? 'bg-dark-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800'
                  }`}
                >
                  <Search size={16} />
                  <span>Enter URL</span>
                </button>
                <button
                  onClick={() => setInputMode('html')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all duration-300 text-sm font-medium ${
                    inputMode === 'html' ? 'bg-dark-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800'
                  }`}
                >
                  <Code2 size={16} />
                  <span>Paste HTML</span>
                </button>
              </div>

              <InputPanel 
                mode={inputMode}
                urlInput={urlInput}
                setUrlInput={setUrlInput}
                htmlInput={htmlInput}
                setHtmlInput={setHtmlInput}
                onSubmitUrl={handleUrlSubmit}
                loading={loading}
              />
              
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 bg-red-950/40 border border-red-500/20 text-red-300 rounded-xl text-sm flex items-start"
                  >
                    <span className="mt-0.5 block">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {metadata && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  <ValidationPanel metadata={metadata} />
                  <CodeSnippet metadata={metadata} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Previews */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {metadata ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <PreviewSection metadata={metadata} />
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel p-12 flex flex-col items-center justify-center text-slate-500 min-h-[400px] lg:min-h-[600px] border-dashed border-2 border-white/5 bg-dark-900/20"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  >
                    <Globe size={48} className="mb-6 opacity-30" />
                  </motion.div>
                  <p className="text-center max-w-sm">Enter a URL or paste raw HTML tags to instantly generate high-fidelity previews across major social platforms.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </motion.main>

      <Footer />
    </div>
  );
}

export default App;
