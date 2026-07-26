import React from 'react';

const DiscordPreview = ({ metadata }) => {
  const title = metadata.ogTitle || metadata.title || 'Untitled Page';
  const description = metadata.ogDescription || metadata.description || '';
  const siteName = metadata.ogSiteName || '';
  const image = metadata.ogImage || '';

  return (
    <div className="bg-[#2b2d31] max-w-[400px] rounded border-l-[4px] border-[#1e1f22] p-4 text-left font-sans flex flex-col items-start shadow-sm">
      {siteName && (
        <span className="text-[12px] font-semibold text-[#dbdee1] mb-1">
          {siteName}
        </span>
      )}
      <h3 className="text-[16px] font-semibold text-[#00a8fc] hover:underline cursor-pointer mb-2 leading-tight">
        {title}
      </h3>
      {description && (
        <p className="text-[14px] text-[#dbdee1] leading-snug mb-3">
          {description}
        </p>
      )}
      {image && (
        <div className="mt-2 rounded overflow-hidden max-w-[300px]">
          <img src={image} alt="Discord Preview" className="w-full h-auto object-cover max-h-[300px]" />
        </div>
      )}
    </div>
  );
};

export default DiscordPreview;
