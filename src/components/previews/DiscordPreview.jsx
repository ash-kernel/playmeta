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

const DiscordPreview = ({ metadata, theme }) => {
  const title = metadata.ogTitle || metadata.title || 'Untitled Page';
  const description = metadata.ogDescription || metadata.description || '';
  const siteName = metadata.ogSiteName || '';
  const image = metadata.ogImage || '';

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-[#313338] text-[#dbdee1] border-[#1e1f22]' : 'bg-[#ffffff] text-[#060607] border-[#e3e5e8]';
  const nameColor = isDark ? 'text-white' : 'text-[#060607]';
  const timeColor = isDark ? 'text-[#949ba4]' : 'text-[#747f8d]';
  const embedBgClass = isDark ? 'bg-[#2b2d31] hover:bg-[#2e3035]' : 'bg-[#f2f3f5] hover:bg-[#ebedef]';
  const embedBorder = isDark ? 'border-l-[4px] border-[#1e1f22]' : 'border-l-[4px] border-[#e3e5e8]';
  const embedTitleColor = isDark ? 'text-[#00a8fc]' : 'text-[#0068e0]';
  const embedDescColor = isDark ? 'text-[#dbdee1]' : 'text-[#2e3338]';
  const siteNameColor = isDark ? 'text-[#b5bac1]' : 'text-[#4f5660]';

  return (
    <div className={`rounded-xl p-4 md:p-6 w-full max-w-[480px] font-sans text-left transition-colors duration-300 shadow-md select-none border ${bgClass}`}>
      {/* Discord Message Header */}
      <div className="flex items-start space-x-4 mb-2">
        {/* Discord Bot Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white shrink-0 shadow-sm relative">
          <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 127.14 96.36">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5A51.31,51.31,0,0,0,30.34,78a75.46,75.46,0,0,0,66.46,0,51.31,51.31,0,0,0,2.2,2.5,68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129,54.65,122.94,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
          </svg>
        </div>
        
        <div className="flex flex-col leading-snug flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className={`font-semibold text-[15px] hover:underline cursor-pointer ${nameColor}`}>PreviewBot</span>
            {/* BOT TAG */}
            <span className="bg-[#5865f2] text-white text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">BOT</span>
            <span className={`text-[12px] ${timeColor}`}>Today at 3:12 PM</span>
          </div>
          
          <p className="text-[15px] mt-1 font-normal leading-normal">
            Here's the visual preview card for the submitted metadata tags:
          </p>

          {/* Discord Embed Rich Preview */}
          <div className={`mt-2 rounded-md p-4 text-left font-sans flex flex-col items-start max-w-[400px] transition-colors ${embedBgClass} ${embedBorder}`}>
            {siteName && (
              <span 
                onClick={() => focusInput('input-ogSiteName')}
                className={`text-[12px] font-medium mb-1.5 cursor-pointer hover:underline ${siteNameColor}`}
                title="Click to edit Site Name"
              >
                {siteName}
              </span>
            )}
            <h3 
              onClick={() => focusInput('input-ogTitle')}
              className={`text-[16px] font-semibold hover:underline cursor-pointer mb-1 leading-snug editable-preview-field ${embedTitleColor}`}
              title="Click to edit OG Title"
            >
              {title}
            </h3>
            {description && (
              <p 
                onClick={() => focusInput('input-ogDescription')}
                className={`text-[14px] leading-relaxed mb-2 font-normal editable-preview-field ${embedDescColor}`}
                title="Click to edit OG Description"
              >
                {description}
              </p>
            )}
            {image && (
              <div 
                onClick={() => focusInput('input-ogImage')}
                className="mt-2 rounded-md overflow-hidden max-w-full border border-black/5 editable-preview-image"
                title="Click to edit Image"
              >
                <img src={image} alt="Discord Preview" className="w-full h-auto object-cover max-h-[220px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordPreview;
