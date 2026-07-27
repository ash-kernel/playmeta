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

const SlackPreview = ({ metadata, theme }) => {
  const title = metadata.ogTitle || metadata.title || 'Untitled';
  const description = metadata.ogDescription || metadata.description || '';
  const siteName = metadata.ogSiteName || '';
  const image = metadata.ogImage || '';
  const favicon = metadata.favicon || '';

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-[#1a1d21] text-[#d1d2d3]' : 'bg-white text-[#1d1c1d]';
  const nameColor = isDark ? 'text-white' : 'text-[#1d1c1d]';
  const timeColor = isDark ? 'text-[#ababad]' : 'text-[#616061]';
  const linkColor = isDark ? 'text-[#36c5f0] hover:underline' : 'text-[#1264a3] hover:underline';
  const attachmentBorder = isDark ? 'border-[#383a3d]' : 'border-[#e2e2e2]';
  const embedLeftBorder = 'border-l-[4px] border-[#dddddd]';

  return (
    <div className={`w-full max-w-[480px] p-4 rounded-xl text-left font-sans select-none border transition-colors duration-300 ${bgClass} ${attachmentBorder} ${isDark ? 'shadow-md' : 'shadow-sm'}`}>
      {/* Slack Message Header */}
      <div className="flex items-start space-x-3">
        {/* User avatar mockup */}
        <div className="w-9 h-9 rounded bg-[#e8a528] flex items-center justify-center text-white font-bold text-sm shrink-0">
          <span>A</span>
        </div>
        
        <div className="flex flex-col leading-snug flex-1 min-w-0">
          <div className="flex items-baseline space-x-2">
            <span className={`font-black text-[15px] ${nameColor}`}>Ash Dev</span>
            <span className={`text-[12px] ${timeColor}`}>3:14 PM</span>
          </div>
          
          <p className="text-[15px] leading-relaxed mt-0.5 font-normal">
            Pushed the deployment! Here is the landing page preview: <a href="#url" className={linkColor}>{metadata.ogUrl || 'https://example.com'}</a>
          </p>

          {/* Slack Attachment Card */}
          <div className={`mt-2 ${embedLeftBorder} pl-3 py-0.5 space-y-1`}>
            {siteName && (
              <div className="flex items-center space-x-1.5 mb-1 text-[13px] font-bold">
                {favicon && <img src={favicon} alt="" className="w-4 h-4 object-contain rounded-sm cursor-pointer hover:ring-1 hover:ring-primary-500" onClick={() => focusInput('input-favicon')} title="Click to edit Favicon" />}
                <span className={`${nameColor} cursor-pointer hover:text-primary-500`} onClick={() => focusInput('input-ogSiteName')} title="Click to edit Site Name">{siteName}</span>
              </div>
            )}
            
            <h3 
              onClick={() => focusInput('input-ogTitle')}
              className={`text-[15px] font-bold leading-snug ${linkColor} cursor-pointer editable-preview-field`}
              title="Click to edit OG Title"
            >
              {title}
            </h3>
            
            {description && (
              <p 
                onClick={() => focusInput('input-ogDescription')}
                className={`text-[14px] leading-relaxed font-normal ${isDark ? 'text-[#b5b6b8]' : 'text-[#1d1c1d]'} editable-preview-field`}
                title="Click to edit OG Description"
              >
                {description}
              </p>
            )}
            
            {image && (
              <div 
                onClick={() => focusInput('input-ogImage')}
                className="mt-2 rounded overflow-hidden max-w-[320px] border border-transparent editable-preview-image"
                title="Click to edit Image"
              >
                <img src={image} alt="Slack Preview" className={`w-full h-auto object-cover max-h-[180px] rounded border ${isDark ? 'border-white/5' : 'border-gray-200'}`} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlackPreview;
