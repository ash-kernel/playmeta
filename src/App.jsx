import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search, Globe, Code2, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InputPanel from './components/InputPanel';
import ValidationPanel from './components/ValidationPanel';
import CodeSnippet from './components/CodeSnippet';
import PreviewSection from './components/PreviewSection';
import Header from './components/Header';
import Footer from './components/Footer';
import TagInspector from './components/TagInspector';

const PRESETS = [
  {
    id: 'youtube',
    name: 'YouTube',
    icon: (
      <svg className="w-8 h-8 text-[#FF0000] fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.556a3.003 3.003 0 0 0-2.11 2.107C0 8.028 0 12 0 12s0 3.972.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.482 20.5 12 20.5 12 20.5s7.52 0 9.388-.556a3.003 3.003 0 0 0 2.11-2.107C24 15.972 24 12 24 12s0-3.972-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    url: 'https://www.youtube.com'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: (
      <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    url: 'https://github.com'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: (
      <svg className="w-8 h-8 text-[#1DB954] fill-current" viewBox="0 0 24 24">
        <path d="M12 .007c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.49 17.31c-.196.3-.585.393-.886.198-2.454-1.5-5.543-1.84-9.178-1.01-.343.077-.678-.137-.756-.48-.077-.343.137-.678.48-.756 4-1.04 7.42-.48 10.15 1.185.302.19.397.58.19 1.163zm1.464-3.26c-.247.38-.745.5-1.125.26-2.81-1.73-7.093-2.23-10.407-1.22-.428.13-.874-.11-1.003-.54-.13-.426.11-.875.54-1.003 3.8-1.15 8.52-.59 11.74 1.385.38.23.5.73.26 1.12zm.126-3.39c-3.37-2-8.93-2.67-12.14-1.69-.518.156-1.062-.137-1.218-.656-.156-.518.138-1.062.657-1.218 3.73-1.13 9.84-.39 13.72 1.91.467.27.618.88.347 1.347-.27.466-.88.618-1.346.347z"/>
      </svg>
    ),
    url: 'https://open.spotify.com'
  }
];

function App() {
  const [inputMode, setInputMode] = useState('url'); // 'url' or 'html'
  const [urlInput, setUrlInput] = useState('');
  const [htmlInput, setHtmlInput] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTosModal, setShowTosModal] = useState(false);

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

      const rawTags = [];
      doc.querySelectorAll('meta').forEach((metaEl) => {
        const name = metaEl.getAttribute('name') || metaEl.getAttribute('property') || metaEl.getAttribute('http-equiv') || metaEl.getAttribute('charset');
        const content = metaEl.getAttribute('content');
        if (name || content) {
          rawTags.push({
            name: name || '',
            content: content || '',
            attribute: metaEl.getAttribute('name') ? 'name' : metaEl.getAttribute('property') ? 'property' : metaEl.getAttribute('http-equiv') ? 'http-equiv' : metaEl.getAttribute('charset') ? 'charset' : 'other'
          });
        }
      });

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
        rawTags
      };
      setMetadata(meta);
      setError(null);
    } catch {
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
      setInputMode('edit');
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
        className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 space-y-8 relative z-10 mb-12"
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
                <button
                  onClick={() => {
                    if (!metadata) {
                      setMetadata({
                        title: '',
                        description: '',
                        ogTitle: '',
                        ogDescription: '',
                        ogImage: '/image.png',
                        ogUrl: '',
                        ogSiteName: '',
                        twitterCard: 'summary_large_image',
                        twitterTitle: '',
                        twitterDescription: '',
                        twitterImage: '/image.png',
                        favicon: '/image.png'
                      });
                    }
                    setInputMode('edit');
                  }}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all duration-300 text-sm font-medium ${
                    inputMode === 'edit' ? 'bg-dark-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800'
                  }`}
                >
                  <Edit3 size={16} />
                  <span>Edit Tags</span>
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
                metadata={metadata}
                setMetadata={setMetadata}
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
                  <TagInspector metadata={metadata} />
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
                  className="glass-panel p-8 md:p-12 flex flex-col items-center justify-center text-slate-500 min-h-[450px] lg:min-h-[600px] border-dashed border-2 border-white/5 bg-dark-900/20 text-center"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  >
                    <Globe size={48} className="mb-6 opacity-30 text-primary-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-2">No Metadata Loaded</h3>
                  <p className="max-w-md text-sm text-slate-500 mb-8 leading-relaxed">
                    Enter a website URL above, paste raw HTML tags, or select one of our premium startup presets to instantly generate high-fidelity platform previews.
                  </p>
                  
                  <div className="w-full max-w-xl">
                    <div className="text-xs uppercase tracking-wider font-semibold text-slate-600 mb-4">Quick Testing Presets</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setUrlInput(preset.url);
                            setInputMode('url');
                            fetchMetadata(preset.url);
                          }}
                          className="glass-panel p-4 hover:border-primary-500/30 hover:bg-dark-800/80 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer border border-white/5 bg-dark-900/40 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{preset.icon}</span>
                          <span className="text-sm font-semibold text-slate-300 group-hover:text-primary-400 transition-colors duration-300">{preset.name}</span>
                          <span className="text-[10px] text-slate-500 mt-1">Click to preview</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </motion.main>

      <Footer onOpenPrivacy={() => setShowPrivacyModal(true)} onOpenTos={() => setShowTosModal(true)} />

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 md:p-8 bg-dark-900 border border-white/10 shadow-2xl relative">
            <button 
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-500 mr-2">Playmeta</span> Privacy Policy
            </h2>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans text-left">
              <p className="font-semibold text-slate-200">Last Updated: July 2026</p>
              <p>
                At Playmeta, we take user privacy and security seriously. Please read our policy details carefully:
              </p>
              <h3 className="font-semibold text-white mt-4">1. Data Scraped and Processed</h3>
              <p>
                All website scraping and metadata extraction is executed on-demand in real-time. We query the target page proxy and parse social tags (Open Graph, Twitter Cards, SEO tags). We **do not store, cache, or log** the contents of the scraped websites or user metadata logs on our servers.
              </p>
              <h3 className="font-semibold text-white mt-4">2. Cookies and Tracking</h3>
              <p>
                Playmeta does not use tracking cookies, advertiser pixels, or persistent user tracking. We use local browser storage purely to temporarily keep your current active tab selection or configuration on your local device.
              </p>
              <h3 className="font-semibold text-white mt-4">3. Security</h3>
              <p>
                We use secure HTTPS transport layers for all API endpoints. Our serverless architecture minimizes database attack vectors by keeping the application purely transactional.
              </p>
              <h3 className="font-semibold text-white mt-4">4. Third-Party Links</h3>
              <p>
                Scraped links and mock pages contain references to third-party CDNs and platforms. We do not control and are not responsible for the privacy practices of external websites.
              </p>
              <p className="pt-4 text-xs text-slate-500">
                For questions regarding this policy, contact support@playmeta.io.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 md:p-8 bg-dark-900 border border-white/10 shadow-2xl relative">
            <button 
              onClick={() => setShowTosModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-500 mr-2">Playmeta</span> Terms of Service
            </h2>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans text-left">
              <p className="font-semibold text-slate-200">Last Updated: July 2026</p>
              <p>
                By accessing and using Playmeta, you acknowledge and agree to the following terms:
              </p>
              <h3 className="font-semibold text-white mt-4">1. Permitted Use</h3>
              <p>
                You may use this tool for validation and testing of public metadata. You agree not to use the automated extraction scripts for crawling, scraping, or spamming third-party sites in an abusive manner, or attempting to trigger DDoS conditions.
              </p>
              <h3 className="font-semibold text-white mt-4">2. Scraper Disclaimers</h3>
              <p>
                We fetch live HTML directly as returned by target web hosts. We do not guarantee the completeness, accuracy, or formatting reliability of parsed third-party pages.
              </p>
              <h3 className="font-semibold text-white mt-4">3. Limitation of Liability</h3>
              <p>
                Playmeta is provided "as is" and "as available". We are not liable for any service interruptions, data inaccuracies, or indirect damages resulting from the use or inability to use this platform.
              </p>
              <h3 className="font-semibold text-white mt-4">4. Modifications</h3>
              <p>
                We reserve the right to modify these terms or release newer software updates at any time. Continuing to use the platform constitutes acceptance of modifications.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
