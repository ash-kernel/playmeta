import React from 'react';

const SlackPreview = ({ metadata }) => {
  const title = metadata.ogTitle || metadata.title || 'Untitled';
  const description = metadata.ogDescription || metadata.description || '';
  const siteName = metadata.ogSiteName || '';
  const image = metadata.ogImage || '';
  const favicon = metadata.favicon || '';

  return (
    <div className="bg-white max-w-[450px] border-l-[4px] border-[#dddddd] p-3 text-left font-sans flex flex-col items-start rounded-r-md shadow-sm text-black">
      {siteName && (
        <div className="flex items-center space-x-2 mb-1.5">
          {favicon && <img src={favicon} alt="Favicon" className="w-4 h-4" />}
          <span className="text-[13px] font-bold text-black">{siteName}</span>
        </div>
      )}
      <h3 className="text-[15px] font-bold text-[#1264a3] hover:underline cursor-pointer mb-1 leading-tight">
        {title}
      </h3>
      {description && (
        <p className="text-[14px] text-[#1d1c1d] leading-snug mb-2">
          {description}
        </p>
      )}
      {image && (
        <div className="mt-1 rounded overflow-hidden max-w-[300px]">
          <img src={image} alt="Slack Preview" className="w-full h-auto object-cover max-h-[300px] border border-gray-200 rounded" />
        </div>
      )}
    </div>
  );
};

export default SlackPreview;
