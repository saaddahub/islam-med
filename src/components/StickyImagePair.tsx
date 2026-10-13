export interface StickyImagePairCaption {
  thumbnail: string;
  label: string;
  description: string;
}

export interface StickyImagePairProps {
  image: string;
  caption: StickyImagePairCaption;
  heading?: string;
  reverse?: boolean;
  className?: string;
}

export function StickyImagePair({
  image,
  caption,
  heading,
  reverse = false,
  className = '',
}: StickyImagePairProps) {
  return (
    <div className={`sticky-pair-wrapper ${reverse ? 'reverse' : ''} ${className}`}>
      <div className="sticky-pair-caption-col">
        <div className="sticky-pair-caption-inner">
          <img data-reveal="up" src={caption.thumbnail} alt={caption.label} className="caption-thumb" />
          <div data-reveal="up">
            {heading && (
              <span className="text-xs font-label uppercase tracking-widest text-[#1C3460] font-semibold mb-1 block">
                {heading}
              </span>
            )}
            <p className="caption-label text-slate-900">
              <span className="dot text-[#1C3460]" /> {caption.label}
            </p>
            <p className="caption-description">{caption.description}</p>
          </div>
        </div>
      </div>
      <div className="sticky-pair-image-col">
        <div data-reveal="image" style={{ borderRadius: '16px', overflow: 'clip' }}>
          <img data-drift src={image} alt={caption.label || 'Feature scroll exhibit'} className="scroll-image" />
        </div>
      </div>
    </div>
  );
}

export default StickyImagePair;

