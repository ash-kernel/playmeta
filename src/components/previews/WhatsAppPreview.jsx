import React from 'react';

const WhatsAppPreview = ({ metadata }) => {
  const title = metadata.ogTitle || metadata.title || 'Untitled Page';
  const description = metadata.ogDescription || metadata.description || '';
  const image = metadata.ogImage || '';
  const domain = metadata.ogUrl ? (new URL(metadata.ogUrl).hostname) : 'example.com';

  return (
    <div className="bg-[#f0f2f5] max-w-[350px] rounded-lg overflow-hidden flex flex-col text-left font-sans text-black relative">
      {image && (
        <div className="w-full h-[180px] bg-[#d9d9d9] overflow-hidden relative">
          <img src={image} alt="WhatsApp Preview" className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="p-2.5 bg-[#e2e8f0]">
        <h3 className="text-[15px] font-semibold text-[#111b21] mb-0.5 line-clamp-1">
          {title}
        </h3>
        {description && (
          <p className="text-[13px] text-[#667781] mb-1 line-clamp-1">
            {description}
          </p>
        )}
        <span className="text-[12px] text-[#8696a0] block truncate">
          {domain}
        </span>
      </div>
    </div>
  );
};

export default WhatsAppPreview;
