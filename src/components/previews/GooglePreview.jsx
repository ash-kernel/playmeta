import React from 'react';

const GooglePreview = ({ metadata }) => {
  const title = metadata.title || 'Untitled Page';
  const url = metadata.ogUrl || 'https://example.com';
  const description = metadata.description || 'No description provided.';
  const favicon = metadata.favicon || '';

  // Truncate logic approx
  const displayTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  const displayDesc = description.length > 160 ? description.substring(0, 157) + '...' : description;

  try {
    var domain = new URL(url).hostname;
  } catch (e) {
    var domain = url;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm font-sans max-w-[600px] text-left">
      <div className="flex items-center space-x-3 mb-1">
        {favicon ? (
          <div className="w-7 h-7 bg-[#f1f3f4] rounded-full flex items-center justify-center p-1">
            <img src={favicon} alt="" className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-7 h-7 bg-[#f1f3f4] rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          </div>
        )}
        <div className="flex flex-col leading-snug">
          <span className="text-sm text-[#202124]">{domain}</span>
          <span className="text-[12px] text-[#4d5156]">{url}</span>
        </div>
      </div>
      <h3 className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer mb-1 leading-tight">
        {displayTitle}
      </h3>
      <p className="text-[14px] text-[#4d5156] leading-snug">
        {displayDesc}
      </p>
    </div>
  );
};

export default GooglePreview;
