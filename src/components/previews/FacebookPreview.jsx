import React from 'react';

const FacebookPreview = ({ metadata }) => {
  const title = metadata.ogTitle || metadata.title || 'Untitled Page';
  const description = metadata.ogDescription || metadata.description || 'No description available.';
  const image = metadata.ogImage || '';
  const domain = metadata.ogUrl ? (new URL(metadata.ogUrl).hostname.toUpperCase().replace('WWW.', '')) : 'EXAMPLE.COM';

  return (
    <div className="bg-[#f0f2f5] max-w-[500px] mx-auto rounded-lg overflow-hidden border border-gray-300 shadow-sm font-sans text-left text-black">
      {image ? (
        <div className="w-full aspect-[1.91/1] bg-gray-200 overflow-hidden border-b border-gray-300">
          <img src={image} alt="Facebook Preview" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full aspect-[1.91/1] bg-gray-200 border-b border-gray-300 flex items-center justify-center text-gray-400">
          No Image Available
        </div>
      )}
      
      <div className="bg-[#f2f3f5] p-3 flex flex-col justify-center">
        <span className="text-[#65676B] text-[12px] uppercase mb-1 tracking-wider">{domain}</span>
        <h3 className="text-[16px] font-semibold text-black leading-snug mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-[#65676B] text-[14px] line-clamp-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FacebookPreview;
