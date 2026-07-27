import React from 'react';

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

const GooglePreview = ({ metadata, device }) => {
  const title = metadata.title || 'Untitled Page';
  const url = metadata.ogUrl || 'https://example.com';
  const description = metadata.description || 'No description provided. Add a meta description tag to control how your page is summarized in search engines.';
  const favicon = metadata.favicon || '';
  const image = metadata.ogImage || '';

  // Google truncation limits
  const maxTitleLength = device === 'mobile' ? 58 : 60;
  const maxDescLength = device === 'mobile' ? 120 : 158;

  const displayTitle = title.length > maxTitleLength ? title.substring(0, maxTitleLength - 3) + '...' : title;
  const displayDesc = description.length > maxDescLength ? description.substring(0, maxDescLength - 3) + '...' : description;

  let domain = 'example.com';
  try {
    domain = new URL(url).hostname;
  } catch {
    domain = url || 'example.com';
  }

  // Generate mock search path breadcrumb
  const pathSegments = url.replace(/https?:\/\/(www\.)?/, '').split('/');
  const breadcrumb = pathSegments.length > 1 && pathSegments[1] 
    ? `${domain} › ${pathSegments[1]}` 
    : domain;

  if (device === 'mobile') {
    return (
      <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-2xl p-4 w-full max-w-[375px] font-sans text-left text-black shadow-sm select-none">
        {/* Mobile Header: Favicon + Breadcrumb */}
        <div className="flex items-center space-x-2.5 mb-2">
          {favicon ? (
            <div 
              onClick={() => focusInput('input-favicon')}
              className="w-[26px] h-[26px] bg-white border border-[#dadce0] rounded-full flex items-center justify-center p-1.5 shadow-sm cursor-pointer hover:border-primary-500"
              title="Click to edit favicon"
            >
              <img src={favicon} alt="" className="w-3.5 h-3.5 object-contain" />
            </div>
          ) : (
            <div 
              onClick={() => focusInput('input-favicon')}
              className="w-[26px] h-[26px] bg-[#f1f3f4] rounded-full flex items-center justify-center border border-[#dadce0] cursor-pointer hover:border-primary-500"
            >
              <div className="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
            </div>
          )}
          <div className="flex flex-col leading-tight">
            <span className="text-[12px] text-[#202124] font-medium">{domain}</span>
            <span 
              onClick={() => focusInput('input-ogUrl')}
              className="text-[10px] text-[#5f6368] truncate max-w-[240px] cursor-pointer hover:text-primary-500"
              title="Click to edit URL"
            >
              {url}
            </span>
          </div>
        </div>

        {/* Mobile Title */}
        <h3 
          onClick={() => focusInput('input-title')}
          className="text-[18px] text-[#15c] font-medium leading-snug mb-1.5 hover:underline cursor-pointer editable-preview-field"
          title="Click to edit Title"
        >
          {displayTitle}
        </h3>

        {/* Mobile Snippet with optional right image */}
        <div className="flex space-x-3 items-start">
          <p 
            onClick={() => focusInput('input-description')}
            className="text-[13px] text-[#4d5156] leading-relaxed flex-1 editable-preview-field"
            title="Click to edit Description"
          >
            {displayDesc}
          </p>
          {image && (
            <div 
              onClick={() => focusInput('input-ogImage')}
              className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-[#dadce0] editable-preview-image"
              title="Click to edit Image"
            >
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop View
  return (
    <div className="bg-white border border-[#dadce0] rounded-2xl p-6 w-full max-w-[620px] font-sans text-left text-black shadow-md select-none">
      {/* Desktop Search Stats Info */}
      <div className="text-[11px] text-[#70757a] mb-4 pb-2 border-b border-[#dadce0]/50 font-normal">
        About 48,200,000 results (0.41 seconds)
      </div>

      <div className="flex flex-col">
        {/* Desktop Breadcrumb */}
        <div className="flex items-center space-x-2 mb-1">
          {favicon ? (
            <div 
              onClick={() => focusInput('input-favicon')}
              className="w-[18px] h-[18px] bg-white border border-[#dadce0] rounded-full flex items-center justify-center p-0.5 shadow-sm cursor-pointer hover:border-primary-500"
              title="Click to edit favicon"
            >
              <img src={favicon} alt="" className="w-2.5 h-2.5 object-contain" />
            </div>
          ) : (
            <div 
              onClick={() => focusInput('input-favicon')}
              className="w-[18px] h-[18px] bg-[#f1f3f4] rounded-full flex items-center justify-center border border-[#dadce0] cursor-pointer hover:border-primary-500"
            >
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          )}
          <span 
            onClick={() => focusInput('input-ogUrl')}
            className="text-[12px] text-[#202124] font-normal leading-none truncate max-w-[500px] cursor-pointer hover:text-primary-500"
            title="Click to edit URL"
          >
            {breadcrumb}
          </span>
        </div>

        {/* Desktop Title Link */}
        <h3 
          onClick={() => focusInput('input-title')}
          className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1 font-normal editable-preview-field"
          title="Click to edit Title"
        >
          {displayTitle}
        </h3>

        {/* Desktop Snippet */}
        <p 
          onClick={() => focusInput('input-description')}
          className="text-[14px] text-[#4d5156] leading-relaxed font-normal editable-preview-field"
          title="Click to edit Description"
        >
          {displayDesc}
        </p>
      </div>
    </div>
  );
};

export default GooglePreview;
