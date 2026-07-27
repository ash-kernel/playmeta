import React from 'react';
import { ThumbsUp, MessageSquare, Share2, Globe, MoreHorizontal } from 'lucide-react';

const focusInput = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.focus();
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('ring-2', 'ring-primary-500/50', 'border-primary-500');
    setTimeout(() => {
      el.classList.remove('ring-2', 'ring-primary-500/50');
    }, 1500);
  }
};

const FacebookPreview = ({ metadata, device }) => {
  const title = metadata.ogTitle || metadata.title || 'Untitled Page';
  const description = metadata.ogDescription || metadata.description || 'No description available.';
  const image = metadata.ogImage || '';
  
  let domain = 'EXAMPLE.COM';
  try {
    domain = new URL(metadata.ogUrl || 'https://example.com').hostname.toUpperCase().replace('WWW.', '');
  } catch {
    domain = 'EXAMPLE.COM';
  }

  const isMobile = device === 'mobile';

  return (
    <div className={`bg-white border border-[#ced0d4] rounded-xl overflow-hidden font-sans text-left text-black shadow-sm select-none mx-auto w-full ${isMobile ? 'max-w-[375px]' : 'max-w-[500px]'}`}>
      {/* Post Header */}
      <div className="p-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          {/* Mock Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1877f2] to-[#1857c2] flex items-center justify-center text-white font-bold text-sm shrink-0 border border-black/5">
            <span>FB</span>
          </div>
          
          <div className="flex flex-col leading-snug">
            <span className="font-semibold text-[15px] hover:underline cursor-pointer text-[#050505]">Playmeta Web Tools</span>
            <div className="flex items-center space-x-1.5 text-[12px] text-[#65676b]">
              <span>Sponsored</span>
              <span>·</span>
              <Globe size={11} className="text-[#65676b]" />
            </div>
          </div>
        </div>
        
        <button className="text-[#65676b] hover:bg-black/5 p-1.5 rounded-full cursor-pointer">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Post text */}
      <p className="px-3.5 pb-3.5 text-[14px] text-[#050505] leading-normal font-normal">
        Build high-fidelity social previews for Facebook, LinkedIn, Discord, and more! Get real-time feedback on Open Graph issues. Check out details:
      </p>

      {/* Main Link Card */}
      <div className="border-y border-[#e5e5e5] cursor-pointer flex flex-col">
        {image ? (
          <div 
            onClick={() => focusInput('input-ogImage')}
            className="w-full aspect-[1.91/1] bg-gray-100 overflow-hidden relative editable-preview-image"
            title="Click to edit Image"
          >
            <img src={image} alt="Facebook Preview" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div 
            onClick={() => focusInput('input-ogImage')}
            className="w-full aspect-[1.91/1] bg-[#f2f3f5] flex items-center justify-center text-gray-400 text-xs cursor-pointer hover:bg-[#e4e6eb]"
            title="Click to edit Image"
          >
            No Image Available
          </div>
        )}
        
        <div className="bg-[#f0f2f5] px-4 py-3 flex flex-col justify-center border-t border-[#e5e5e5]">
          <span 
            onClick={() => focusInput('input-ogUrl')}
            className="text-[#65676b] text-[11px] uppercase tracking-wider mb-0.5 cursor-pointer hover:underline hover:text-primary-500"
            title="Click to edit URL"
          >
            {domain}
          </span>
          <h3 
            onClick={() => focusInput('input-ogTitle')}
            className="text-[15px] font-semibold text-[#050505] leading-snug mb-1 line-clamp-2 editable-preview-field"
            title="Click to edit OG Title"
          >
            {title}
          </h3>
          <p 
            onClick={() => focusInput('input-ogDescription')}
            className="text-[#65676b] text-[13px] line-clamp-1 leading-normal editable-preview-field"
            title="Click to edit OG Description"
          >
            {description}
          </p>
        </div>
      </div>

      {/* Actions Toolbar */}
      <div className="px-3 py-1 flex items-center justify-between text-[#65676b] text-[13px] font-medium border-t border-[#e5e5e5]">
        <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-black/5 rounded-md cursor-pointer transition-colors">
          <ThumbsUp size={16} />
          <span>Like</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-black/5 rounded-md cursor-pointer transition-colors">
          <MessageSquare size={16} />
          <span>Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-black/5 rounded-md cursor-pointer transition-colors">
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default FacebookPreview;
