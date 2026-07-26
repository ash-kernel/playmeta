import React from 'react';

const LinkedInPreview = ({ metadata }) => {
  const title = metadata.ogTitle || metadata.title || 'Untitled Page';
  const domain = metadata.ogUrl ? (new URL(metadata.ogUrl).hostname) : 'example.com';
  const image = metadata.ogImage || '';

  return (
    <div className="bg-[#eef3f8] max-w-[500px] mx-auto font-sans text-left text-black overflow-hidden border border-gray-300">
      {image ? (
        <div className="w-full aspect-[1.91/1] bg-gray-200">
          <img src={image} alt="LinkedIn Preview" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full aspect-[1.91/1] bg-[#d9e5eb] flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
      
      <div className="bg-white p-3">
        <h3 className="text-[14px] font-semibold text-[rgba(0,0,0,0.9)] mb-0.5 line-clamp-2 leading-tight">
          {title}
        </h3>
        <span className="text-[12px] text-[rgba(0,0,0,0.6)]">{domain}</span>
      </div>
    </div>
  );
};

export default LinkedInPreview;
