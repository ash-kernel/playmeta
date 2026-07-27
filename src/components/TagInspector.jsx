import React, { useState } from 'react';
import { Search, Copy, Check, Download, FileJson, FileSpreadsheet, Code2 } from 'lucide-react';

const TagInspector = ({ metadata }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAllType, setCopiedAllType] = useState(null);

  // Helper to determine if a tag content is an image URL
  const isImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    const cleanUrl = url.split('?')[0].toLowerCase();
    return (
      cleanUrl.endsWith('.png') ||
      cleanUrl.endsWith('.jpg') ||
      cleanUrl.endsWith('.jpeg') ||
      cleanUrl.endsWith('.gif') ||
      cleanUrl.endsWith('.svg') ||
      cleanUrl.endsWith('.ico') ||
      cleanUrl.endsWith('.webp') ||
      (url.startsWith('http') && (
        cleanUrl.includes('avatar') ||
        cleanUrl.includes('logo') ||
        cleanUrl.includes('icon') ||
        cleanUrl.includes('image')
      ))
    );
  };

  // Handler to download remote image asset client-side
  const handleDownloadMedia = async (url, tagName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      // Deduce file extension from URL path
      let ext = 'png';
      const cleanUrl = url.split('?')[0].toLowerCase();
      if (cleanUrl.endsWith('.jpg') || cleanUrl.endsWith('.jpeg')) ext = 'jpg';
      else if (cleanUrl.endsWith('.gif')) ext = 'gif';
      else if (cleanUrl.endsWith('.svg')) ext = 'svg';
      else if (cleanUrl.endsWith('.ico')) ext = 'ico';
      else if (cleanUrl.endsWith('.webp')) ext = 'webp';
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${tagName.replace(/:/g, '-')}-asset.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // CORS protection fallback: open image in a new tab so user can right-click save
      window.open(url, '_blank');
    }
  };

  // If no rawTags parsed, fall back to extracting from metadata properties
  const getTagsList = () => {
    if (metadata.rawTags && metadata.rawTags.length > 0) {
      return metadata.rawTags;
    }
    
    const fallbackKeys = [
      { key: 'title', attr: 'name', value: metadata.title },
      { key: 'description', attr: 'name', value: metadata.description },
      { key: 'og:title', attr: 'property', value: metadata.ogTitle },
      { key: 'og:description', attr: 'property', value: metadata.ogDescription },
      { key: 'og:image', attr: 'property', value: metadata.ogImage },
      { key: 'og:url', attr: 'property', value: metadata.ogUrl },
      { key: 'og:site_name', attr: 'property', value: metadata.ogSiteName },
      { key: 'twitter:card', attr: 'name', value: metadata.twitterCard },
      { key: 'twitter:title', attr: 'name', value: metadata.twitterTitle },
      { key: 'twitter:description', attr: 'name', value: metadata.twitterDescription },
      { key: 'twitter:image', attr: 'name', value: metadata.twitterImage },
    ];
    
    return fallbackKeys
      .filter(item => item.value)
      .map(item => ({
        name: item.key,
        content: item.value,
        attribute: item.attr
      }));
  };

  const allTags = getTagsList();

  // Filter tags based on search query
  const filteredTags = allTags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getHTMLString = (tag) => {
    if (tag.name === 'charset') {
      return `<meta charset="${tag.content}" />`;
    }
    return `<meta ${tag.attribute}="${tag.name}" content="${tag.content}" />`;
  };

  const handleCopyTag = (tag, index) => {
    const htmlString = getHTMLString(tag);
    navigator.clipboard.writeText(htmlString);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleCopyAll = (type) => {
    let content = '';
    if (type === 'html') {
      content = allTags.map(tag => getHTMLString(tag)).join('\n');
    } else {
      content = JSON.stringify(allTags, null, 2);
    }
    navigator.clipboard.writeText(content);
    setCopiedAllType(type);
    setTimeout(() => setCopiedAllType(null), 1500);
  };

  const handleDownload = (format) => {
    let fileContent = '';
    let fileName = `metadata-export.${format}`;
    let mimeType = 'text/plain';

    if (format === 'json') {
      fileContent = JSON.stringify(allTags, null, 2);
      mimeType = 'application/json';
    } else if (format === 'csv') {
      fileContent = 'Attribute,Tag Name,Content Value\n' + 
        allTags.map(tag => `"${tag.attribute}","${tag.name}","${tag.content.replace(/"/g, '""')}"`).join('\n');
      mimeType = 'text/csv';
    } else if (format === 'html') {
      fileContent = allTags.map(tag => getHTMLString(tag)).join('\n');
      mimeType = 'text/html';
    }

    const blob = new Blob([fileContent], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel p-5 space-y-4">
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/5 pb-4 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🔍</span>
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-semibold text-slate-200">Metadata Tag Inspector</h3>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">
              {allTags.length} tags detected in page headers
            </span>
          </div>
        </div>

        {/* Global Export Options */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => handleCopyAll('html')}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-dark-900 border border-white/5 text-[10px] text-slate-400 hover:text-white cursor-pointer transition-all"
            title="Copy all tags as HTML code"
          >
            {copiedAllType === 'html' ? <Check size={12} className="text-green-400" /> : <Code2 size={12} />}
            <span>{copiedAllType === 'html' ? 'Copied HTML' : 'Copy HTML'}</span>
          </button>
          
          <button
            onClick={() => handleCopyAll('json')}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-dark-900 border border-white/5 text-[10px] text-slate-400 hover:text-white cursor-pointer transition-all"
            title="Copy all tags as JSON array"
          >
            {copiedAllType === 'json' ? <Check size={12} className="text-green-400" /> : <FileJson size={12} />}
            <span>{copiedAllType === 'json' ? 'Copied JSON' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={() => handleDownload('csv')}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-primary-500/10 border border-primary-500/20 text-[10px] text-primary-400 hover:bg-primary-500/20 cursor-pointer transition-all"
            title="Download tags list as CSV spreadsheet"
          >
            <FileSpreadsheet size={12} />
            <span>CSV</span>
          </button>

          <button
            onClick={() => handleDownload('json')}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-primary-500/10 border border-primary-500/20 text-[10px] text-primary-400 hover:bg-primary-500/20 cursor-pointer transition-all"
            title="Download tags list as JSON"
          >
            <Download size={12} />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Real-time Filter Bar */}
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
          <Search size={14} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter tags by name or content value..."
          className="w-full pl-9 pr-4 py-2.5 bg-dark-950/60 border border-white/5 rounded-xl text-slate-200 text-xs focus:ring-1 focus:ring-primary-500 focus:outline-none placeholder-slate-600 transition-all shadow-inner"
        />
      </div>

      {/* Tags List Container */}
      <div className="max-h-[300px] overflow-y-auto pr-1 border border-white/5 rounded-xl bg-dark-950/20">
        {filteredTags.length > 0 ? (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                <th className="px-4 py-2.5 w-1/4">Attribute & Tag Name</th>
                <th className="px-4 py-2.5">Value Content</th>
                <th className="px-4 py-2.5 w-20 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTags.map((tag, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-400 select-all break-all shrink-0">
                    <span className="text-[10px] text-slate-600 font-semibold px-1 py-0.5 rounded bg-dark-900 border border-white/5 mr-1.5">
                      {tag.attribute}
                    </span>
                    {tag.name}
                  </td>
                  <td className="px-4 py-3 text-slate-300 font-sans break-all select-all leading-normal max-w-sm">
                    {tag.content}
                  </td>
                  <td className="px-4 py-3 text-center shrink-0">
                    <div className="flex items-center justify-center space-x-1.5">
                      <button
                        onClick={() => handleCopyTag(tag, idx)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          copiedIndex === idx 
                            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                            : 'bg-dark-900 border-white/5 text-slate-500 hover:text-white hover:border-white/10'
                        }`}
                        title="Copy full HTML tag code"
                      >
                        {copiedIndex === idx ? <Check size={12} /> : <Copy size={12} />}
                      </button>
                      {isImageUrl(tag.content) && (
                        <button
                          onClick={() => handleDownloadMedia(tag.content, tag.name)}
                          className="p-1.5 rounded-lg border bg-dark-900 border-white/5 text-slate-500 hover:text-white hover:border-white/10 cursor-pointer transition-all"
                          title="Download this image asset"
                        >
                          <Download size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-slate-600 text-xs">
            No metadata tags matched your search filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default TagInspector;
