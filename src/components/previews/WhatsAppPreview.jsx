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

const WhatsAppPreview = ({ metadata }) => {
  const title = metadata.ogTitle || metadata.title || 'Untitled Page';
  const description = metadata.ogDescription || metadata.description || '';
  const image = metadata.ogImage || '';
  
  let domain = 'example.com';
  try {
    domain = new URL(metadata.ogUrl || 'https://example.com').hostname;
  } catch {
    domain = 'example.com';
  }

  return (
    <div 
      className="rounded-2xl p-6 w-full max-w-[380px] font-sans text-left text-black shadow-lg relative overflow-hidden select-none border border-black/10 flex flex-col justify-end min-h-[300px]"
      style={{
        backgroundColor: '#efeae2',
        // Simulated WhatsApp doodle background pattern
        backgroundImage: `radial-gradient(circle at 100% 150%, #e5ddd5 24%, white 24%, white 28%, #e5ddd5 28%, #e5ddd5 36%, white 36%, white 40%, transparent 40%, transparent),
                          radial-gradient(circle at 0% 150%, #e5ddd5 24%, white 24%, white 28%, #e5ddd5 28%, #e5ddd5 36%, white 36%, white 40%, transparent 40%, transparent)`,
        backgroundSize: '20px 20px'
      }}
    >
      {/* WhatsApp Message Bubble */}
      <div className="bg-[#d9fdd3] rounded-2xl rounded-tr-none p-2.5 shadow-sm max-w-[90%] self-end relative border border-[#c1e8ba]/80">
        
        {/* Outgoing Message Link Text */}
        <p className="text-[14px] text-[#111b21] leading-relaxed mb-1.5 break-all font-normal">
          Check this out: <span className="text-[#039be5] hover:underline cursor-pointer" onClick={() => focusInput('input-ogUrl')} title="Click to edit URL">{metadata.ogUrl || 'https://example.com'}</span>
        </p>

        {/* Rich Preview Card inside the bubble */}
        <div className="rounded-xl overflow-hidden bg-[#000000]/[0.03] border border-black/5 flex flex-col">
          {image && (
            <div 
              onClick={() => focusInput('input-ogImage')}
              className="w-full h-[160px] bg-[#d9d9d9]/60 overflow-hidden relative border-b border-black/5 editable-preview-image"
              title="Click to edit Image"
            >
              <img src={image} alt="WhatsApp Preview" className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className="p-2.5 bg-[#000000]/[0.04]">
            <h3 
              onClick={() => focusInput('input-ogTitle')}
              className="text-[14px] font-semibold text-[#111b21] mb-0.5 line-clamp-1 leading-snug editable-preview-field"
              title="Click to edit OG Title"
            >
              {title}
            </h3>
            {description && (
              <p 
                onClick={() => focusInput('input-ogDescription')}
                className="text-[12.5px] text-[#667781] mb-1 line-clamp-2 leading-relaxed font-normal editable-preview-field"
                title="Click to edit OG Description"
              >
                {description}
              </p>
            )}
            <span 
              onClick={() => focusInput('input-ogUrl')}
              className="text-[11px] text-[#8696a0] block truncate cursor-pointer hover:underline hover:text-primary-500"
              title="Click to edit URL"
            >
              {domain}
            </span>
          </div>
        </div>

        {/* Timestamp and Double Tick Checkmark */}
        <div className="flex items-center justify-end space-x-1 mt-1 text-[10px] text-[#667781]">
          <span>3:24 PM</span>
          {/* WhatsApp Double Blue Checkmark */}
          <svg className="w-4 h-4 text-[#53bdeb] fill-current" viewBox="0 0 16 15">
            <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033L5.138 6.947a.366.366 0 0 0-.515.006l-.423.433a.355.355 0 0 0-.007.514l3.766 3.774a.32.32 0 0 0 .463-.016l5.65-6.837a.365.365 0 0 0-.062-.505zM9.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L2.666 9.879a.32.32 0 0 1-.484.033L.138 6.947a.366.366 0 0 0-.515.006l-.423.433a.355.355 0 0 0-.007.514l3.766 3.774a.32.32 0 0 0 .463-.016l5.65-6.837a.365.365 0 0 0-.062-.505z" />
          </svg>
        </div>

        {/* Bubble Tail */}
        <div 
          className="absolute top-0 -right-2 w-3.5 h-3.5 bg-[#d9fdd3] border-l border-t border-[#c1e8ba]/80"
          style={{
            clipPath: 'polygon(0 0, 0 100%, 100% 0)'
          }}
        />
      </div>
    </div>
  );
};

export default WhatsAppPreview;
