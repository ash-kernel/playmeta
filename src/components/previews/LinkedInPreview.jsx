import React from 'react';
import { ThumbsUp, MessageSquare, Repeat2, Send, Globe, MoreHorizontal } from 'lucide-react';

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

const LinkedInPreview = ({ metadata }) => {
  const title = metadata.ogTitle || metadata.title || 'Untitled Page';
  const domain = metadata.ogUrl ? (new URL(metadata.ogUrl).hostname) : 'example.com';
  const image = metadata.ogImage || '';

  return (
    <div className="bg-white border border-[#e0e0e0] rounded-xl overflow-hidden font-sans text-left text-black shadow-sm select-none mx-auto w-full max-w-[500px]">
      {/* LinkedIn Post Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center space-x-2.5">
          {/* Creator Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0a66c2] to-[#004182] flex items-center justify-center text-white font-bold text-base shrink-0 border border-black/5">
            <span>LD</span>
          </div>
          
          <div className="flex flex-col leading-tight">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-[14px] text-[rgba(0,0,0,0.9)] hover:underline cursor-pointer">Ash Dev</span>
              <span className="text-[12px] text-[rgba(0,0,0,0.6)] font-normal">• 1st</span>
            </div>
            <span className="text-[12px] text-[rgba(0,0,0,0.6)] font-normal truncate max-w-[300px]">Software Engineer | Building AI Interfaces</span>
            <div className="flex items-center space-x-1.5 text-[11px] text-[rgba(0,0,0,0.5)] mt-0.5">
              <span>2h</span>
              <span>•</span>
              <Globe size={11} className="text-[rgba(0,0,0,0.5)]" />
            </div>
          </div>
        </div>
        
        <button className="text-[rgba(0,0,0,0.6)] hover:bg-black/5 p-1 rounded-full cursor-pointer">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Text */}
      <p className="px-4 pb-3 text-[14px] text-[rgba(0,0,0,0.9)] leading-relaxed font-normal">
        I'm excited to share my new open source project! It lets you instantly preview and validate social media metadata cards. Super helpful for checking OG and Twitter tags! 💻✨
      </p>

      {/* Main Preview Card */}
      <div className="border-t border-[#e8e8e8] flex flex-col">
        {image ? (
          <div 
            onClick={() => focusInput('input-ogImage')}
            className="w-full aspect-[1.91/1] bg-gray-100 overflow-hidden relative editable-preview-image"
            title="Click to edit Image"
          >
            <img src={image} alt="LinkedIn Preview" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div 
            onClick={() => focusInput('input-ogImage')}
            className="w-full aspect-[1.91/1] bg-[#d9e5eb] flex items-center justify-center text-gray-500 text-xs cursor-pointer hover:bg-[#c9d5db]"
            title="Click to edit Image"
          >
            No Preview Image Available
          </div>
        )}
        
        <div className="bg-[#f3f6f8] px-4 py-3 border-t border-[#e8e8e8] flex flex-col justify-center">
          <h3 
            onClick={() => focusInput('input-ogTitle')}
            className="text-[14px] font-semibold text-[rgba(0,0,0,0.9)] mb-0.5 line-clamp-2 leading-snug editable-preview-field"
            title="Click to edit OG Title"
          >
            {title}
          </h3>
          <span 
            onClick={() => focusInput('input-ogUrl')}
            className="text-[12px] text-[rgba(0,0,0,0.6)] truncate cursor-pointer hover:underline hover:text-primary-500"
            title="Click to edit URL"
          >
            {domain}
          </span>
        </div>
      </div>

      {/* Interaction Actions */}
      <div className="px-3 py-1 flex items-center justify-between text-[rgba(0,0,0,0.6)] text-[12px] font-semibold border-t border-[#f3f3f3]">
        <button className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 hover:bg-black/5 rounded-md cursor-pointer transition-colors">
          <ThumbsUp size={16} />
          <span>Like</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 hover:bg-black/5 rounded-md cursor-pointer transition-colors">
          <MessageSquare size={16} />
          <span>Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 hover:bg-black/5 rounded-md cursor-pointer transition-colors">
          <Repeat2 size={16} />
          <span>Repost</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 hover:bg-black/5 rounded-md cursor-pointer transition-colors">
          <Send size={16} />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default LinkedInPreview;
