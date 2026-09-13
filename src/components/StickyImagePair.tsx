import { motion } from 'framer-motion';
import { useReducedMotion } from '../lib/useReducedMotion';

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
  const reduced = useReducedMotion();

  return (
    <div className={`sticky-pair-wrapper ${reverse ? 'reverse' : ''} ${className}`}>
      <div className="sticky-pair-caption-col">
        <motion.div
          className="sticky-pair-caption-inner"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {heading && (
            <span className="text-xs font-mono uppercase tracking-widest text-[#1D4ED8] font-semibold mb-1">
              {heading}
            </span>
          )}
          <img src={caption.thumbnail} alt={caption.label} className="caption-thumb" />
          <p className="caption-label text-slate-900">
            <span className="dot text-[#1D4ED8]" /> {caption.label}
          </p>
          <p className="caption-description">{caption.description}</p>
        </motion.div>
      </div>
      <div className="sticky-pair-image-col">
        <img src={image} alt={caption.label || 'Feature scroll exhibit'} className="scroll-image" />
      </div>
    </div>
  );
}

export default StickyImagePair;
