import React from 'react';

const TwitterPreview = ({ metadata }) => {
  const isLargeCard = metadata.twitterCard === 'summary_large_image';
  
  const title = metadata.twitterTitle || metadata.ogTitle || metadata.title || 'Untitled';
  const description = metadata.twitterDescription || metadata.ogDescription || metadata.description || 'No description available.';
  const image = metadata.twitterImage || metadata.ogImage || '';
  const domain = metadata.ogUrl ? (new URL(metadata.ogUrl).hostname.replace('www.', '')) : 'example.com';

  return (
    <div className="bg-black text-white rounded-2xl border border-gray-700 overflow-hidden max-w-[500px] font-sans mx-auto text-left">
      {image && isLargeCard && (
        <div className="w-full aspect-[2/1] bg-gray-800 border-b border-gray-700 overflow-hidden">
          <img src={image} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className={`flex ${!isLargeCard && image ? 'h-32' : ''}`}>
        {!isLargeCard && image && (
          <div className="w-32 h-full bg-gray-800 border-r border-gray-700 shrink-0">
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="p-3 flex flex-col justify-center overflow-hidden flex-1">
          <span className="text-[#71767b] text-[15px] truncate mb-0.5">{domain}</span>
          <h3 className="text-[15px] font-bold text-[#e7e9ea] truncate mb-0.5 leading-tight">
            {title}
          </h3>
          <p className="text-[#71767b] text-[15px] line-clamp-2 leading-snug">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TwitterPreview;
