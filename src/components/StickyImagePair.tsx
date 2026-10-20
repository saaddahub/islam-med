import { imageSources } from '../lib/imageSources';

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
          <img data-reveal="up" src={caption.thumbnail} srcSet={imageSources(caption.thumbnail)} sizes="320px" alt={caption.label} loading="lazy" decoding="async" width={600} height={450} className="caption-thumb" />
          <div data-reveal="up">
            {heading && (
              <span className="text-xs font-label uppercase tracking-widest text-imc-blue font-semibold mb-1 block">
                {heading}
              </span>
            )}
            <p className="caption-label text-slate-900">
              <span className="dot text-imc-blue" /> {caption.label}
            </p>
            <p className="caption-description">{caption.description}</p>
          </div>
        </div>
      </div>
      <div className="sticky-pair-image-col">
        <div data-gallery-frame className="gallery-frame">
          {/* A tall cover crop needs more source detail than the column width suggests. */}
          <img src={image} srcSet={imageSources(image)} sizes="(max-width: 1023px) 90vw, 1300px" alt={caption.label || 'Feature scroll exhibit'} loading="lazy" decoding="async" className="scroll-image" />
        </div>
      </div>
    </div>
  );
}

export default StickyImagePair;

