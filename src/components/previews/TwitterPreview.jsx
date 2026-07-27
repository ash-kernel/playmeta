import React from 'react';
import { MessageCircle, Repeat2, Heart, Bookmark, Share, Check } from 'lucide-react';

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

const TwitterPreview = ({ metadata, theme }) => {
  const isLargeCard = metadata.twitterCard === 'summary_large_image';
  
  const title = metadata.twitterTitle || metadata.ogTitle || metadata.title || 'Untitled';
  const description = metadata.twitterDescription || metadata.ogDescription || metadata.description || 'No description available.';
  const image = metadata.twitterImage || metadata.ogImage || '';
  
  let domain = 'example.com';
  try {
    domain = new URL(metadata.ogUrl || 'https://example.com').hostname.replace('www.', '');
  } catch {
    domain = 'example.com';
  }

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-black text-[#e7e9ea] border-[#2f3336]' : 'bg-white text-[#0f1419] border-[#eff3f4]';
  const textGray = isDark ? 'text-[#71767b]' : 'text-[#536471]';
  const borderClass = isDark ? 'border-[#2f3336]' : 'border-[#cfd9de]';
  const hoverBgClass = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5';

  return (
    <div className={`w-full max-w-[500px] border rounded-2xl p-4 font-sans text-left transition-colors duration-300 ${bgClass} shadow-md select-none`}>
      {/* Tweet Header: User Profile details */}
      <div className="flex items-center space-x-3 mb-3">
        {/* Mock Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm relative">
          <span>A</span>
          {/* Small online badge */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 rounded-full border-black" />
        </div>
        
        <div className="flex flex-col leading-snug flex-1 min-w-0">
          <div className="flex items-center space-x-1">
            <span className="font-bold truncate text-[15px] hover:underline cursor-pointer">Ash Dev</span>
            {/* Verified badge */}
            <div className="w-4 h-4 rounded-full bg-[#1d9bf0] flex items-center justify-center shrink-0">
              <Check size={10} className="text-white stroke-[4]" />
            </div>
            <span className={`text-sm truncate ${textGray}`}>@ash_codes</span>
            <span className={`text-sm ${textGray}`}>· 2h</span>
          </div>
          <span className={`text-[13px] ${textGray} leading-none`}>Full-stack AI developer</span>
        </div>
      </div>

      {/* Tweet Body Caption */}
      <p className="text-[15px] leading-normal mb-3 whitespace-pre-wrap font-normal">
        Just shipped some updates to my new project! Checking the social preview metadata is looking absolute fire. 🔥 Check it out here:
      </p>

      {/* Tweet Meta Card Preview */}
      <div className={`border rounded-2xl overflow-hidden cursor-pointer hover:bg-opacity-95 transition-all ${borderClass} ${isLargeCard ? 'flex flex-col' : 'flex h-[120px]'}`}>
        
        {/* Thumbnail or Large Image */}
        {image ? (
          isLargeCard ? (
            <div 
              onClick={() => focusInput('input-twitterImage')}
              className={`w-full aspect-[1.91/1] overflow-hidden border-b bg-dark-900/40 relative ${borderClass} editable-preview-image`}
              title="Click to edit Twitter Image"
            >
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div 
              onClick={() => focusInput('input-twitterImage')}
              className={`w-[120px] h-full overflow-hidden border-r shrink-0 bg-dark-900/40 relative ${borderClass} editable-preview-image`}
              title="Click to edit Twitter Image"
            >
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )
        ) : (
          <div 
            onClick={() => focusInput('input-twitterImage')}
            className={`${isLargeCard ? 'w-full aspect-[1.91/1]' : 'w-[120px] h-full'} bg-dark-900/40 flex items-center justify-center text-xs ${textGray} shrink-0 cursor-pointer hover:bg-dark-800`}
            title="Click to edit Twitter Image"
          >
            No Image
          </div>
        )}

        {/* Card Details Text */}
        <div className="p-3 flex flex-col justify-center overflow-hidden flex-1 select-none">
          <span 
            onClick={() => focusInput('input-ogUrl')}
            className={`text-[13px] truncate ${textGray} mb-0.5 cursor-pointer hover:underline hover:text-primary-500`}
            title="Click to edit URL"
          >
            {domain}
          </span>
          <h4 
            onClick={() => focusInput('input-twitterTitle')}
            className="text-[14px] font-semibold truncate mb-0.5 leading-snug editable-preview-field"
            title="Click to edit Twitter Title"
          >
            {title}
          </h4>
          <p 
            onClick={() => focusInput('input-twitterDescription')}
            className={`text-[13px] line-clamp-2 leading-relaxed ${textGray} editable-preview-field`}
            title="Click to edit Twitter Description"
          >
            {description}
          </p>
        </div>
      </div>

      {/* Tweet Actions Toolbar */}
      <div className={`flex items-center justify-between mt-4 pt-1 border-t ${borderClass} ${textGray} text-xs`}>
        <button className={`flex items-center space-x-1.5 p-2 rounded-full cursor-pointer transition-colors ${hoverBgClass} hover:text-[#1d9bf0]`}>
          <MessageCircle size={15} />
          <span>12</span>
        </button>
        <button className={`flex items-center space-x-1.5 p-2 rounded-full cursor-pointer transition-colors ${hoverBgClass} hover:text-[#00ba7c]`}>
          <Repeat2 size={15} />
          <span>4</span>
        </button>
        <button className={`flex items-center space-x-1.5 p-2 rounded-full cursor-pointer transition-colors ${hoverBgClass} hover:text-[#f91880]`}>
          <Heart size={15} />
          <span>48</span>
        </button>
        <button className={`flex items-center space-x-1.5 p-2 rounded-full cursor-pointer transition-colors ${hoverBgClass} hover:text-[#1d9bf0]`}>
          <Bookmark size={15} />
          <span>3</span>
        </button>
        <button className={`flex items-center p-2 rounded-full cursor-pointer transition-colors ${hoverBgClass} hover:text-[#1d9bf0]`}>
          <Share size={15} />
        </button>
      </div>
    </div>
  );
};

export default TwitterPreview;
