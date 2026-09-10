import React from 'react';

interface SquiggleUnderlineProps {
  className?: string;
  color?: string;
}

export const SquiggleUnderline: React.FC<SquiggleUnderlineProps> = ({
  className = "",
  color = "#7A52B3",
}) => {
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
      <path
        d="M2 10.5C28 3.5 54 13.5 80 7.5C106 1.5 132 12.5 158 6.5C174 2.5 188 8 198 6"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-85"
      />
    </svg>
  );
};

export default SquiggleUnderline;
