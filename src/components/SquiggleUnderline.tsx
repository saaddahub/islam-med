import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../lib/useReducedMotion';

interface SquiggleUnderlineProps {
  className?: string;
  color?: string;
}

export const SquiggleUnderline: React.FC<SquiggleUnderlineProps> = ({
  className = "",
  color = "var(--color-bronze)",
}) => {
  const reduced = useReducedMotion();
  return (
    <svg
      className={`inline-block absolute -bottom-2.5 left-0 w-full overflow-visible pointer-events-none ${className}`}
      height="14"
      viewBox="0 0 200 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        initial={{ pathLength: reduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduced ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
        d="M2 10C60 3 132 3 198 7"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-85"
      />
    </svg>
  );
};

export default SquiggleUnderline;
