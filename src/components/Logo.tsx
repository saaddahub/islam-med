import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'mark';
  isDarkBg?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = 'icon',
  isDarkBg = false,
}) => {
  if (variant === 'icon' || variant === 'mark') {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-9 h-9 shrink-0 ${className}`}
        aria-label="Islam Medical Complex Logo"
      >
        {/* Outer Circular Ring */}
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke={isDarkBg ? "#3B82F6" : "#1B4332"}
          strokeWidth="3.5"
          className="transition-colors duration-200"
        />

        {/* Dynamic Red Swoosh Arch */}
        <path
          d="M 32 46 C 30 36, 42 28, 58 28 C 76 28, 88 38, 86 52 C 84 62, 70 70, 52 70 C 44 70, 36 67, 32 62"
          stroke="#E11D2A"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Blue Figure Body */}
        <path
          d="M 52 50 C 51 40, 56 34, 60 30 C 64 34, 69 40, 68 50 C 64 45, 56 45, 52 50 Z"
          fill={isDarkBg ? "#60A5FA" : "#1B4332"}
        />
        {/* Red Head Dot of Figure */}
        <circle cx="60" cy="27" r="3.5" fill="#E11D2A" />

        {/* 'I' in IMC */}
        <path
          d="M 38 45 L 44 45 L 44 63 L 38 63 Z"
          fill={isDarkBg ? "#FFFFFF" : "#1B4332"}
        />

        {/* 'M' in IMC */}
        <path
          d="M 47 45 L 53 45 L 57 56 L 61 45 L 67 45 L 67 63 L 62 63 L 62 52 L 58.5 61 L 55.5 61 L 52 52 L 52 63 L 47 63 Z"
          fill={isDarkBg ? "#FFFFFF" : "#1B4332"}
        />

        {/* 'C' in IMC */}
        <path
          d="M 83 49 C 80 45, 75 44, 71 46 C 66 48, 64 54, 66 59 C 68 64, 75 66, 81 64 L 83 60 C 79 62, 74 61, 72 58 C 71 55, 72 51, 75 49 C 78 48, 81 49, 83 51 Z"
          fill={isDarkBg ? "#FFFFFF" : "#1B4332"}
        />

        {/* Heartbeat ECG Pulse Red Line cutting across C */}
        <path
          d="M 68 54 L 74 54 L 76 50 L 78 58 L 80 48 L 82 56 L 84 54 L 90 54"
          stroke="#E11D2A"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Bottom Blue Wave Accent */}
        <path
          d="M 34 76 Q 60 70, 86 76 Q 60 80, 34 76 Z"
          fill={isDarkBg ? "#3B82F6" : "#1B4332"}
        />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 shrink-0"
        aria-label="Islam Medical Complex Emblem"
      >
        {/* Outer Circular Ring */}
        <circle
          cx="60"
          cy="60"
          r="55"
          stroke={isDarkBg ? "#60A5FA" : "#1B4332"}
          strokeWidth="3.5"
          className="transition-colors duration-200"
        />

        {/* Dynamic Red Swoosh Arch */}
        <path
          d="M 30 46 C 28 35, 42 26, 58 26 C 78 26, 90 37, 88 52 C 86 64, 70 72, 50 72 C 41 72, 33 68, 30 62"
          stroke="#E11D2A"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Blue Figure Body */}
        <path
          d="M 51 49 C 50 39, 55 33, 60 29 C 65 33, 70 39, 69 49 C 65 44, 55 44, 51 49 Z"
          fill={isDarkBg ? "#86EFAC" : "#1B4332"}
        />
        {/* Red Head Dot */}
        <circle cx="60" cy="26" r="3.5" fill="#E11D2A" />

        {/* IMC Monogram */}
        <g fill={isDarkBg ? "#FFFFFF" : "#1B4332"}>
          <path d="M 37 45 L 43 45 L 43 63 L 37 63 Z" />
          <path d="M 46 45 L 52 45 L 56 56 L 60 45 L 66 45 L 66 63 L 61 63 L 61 52 L 57.5 61 L 54.5 61 L 51 52 L 51 63 L 46 63 Z" />
          <path d="M 83 49 C 80 45, 75 44, 71 46 C 66 48, 64 54, 66 59 C 68 64, 75 66, 81 64 L 83 60 C 79 62, 74 61, 72 58 C 71 55, 72 51, 75 49 C 78 48, 81 49, 83 51 Z" />
        </g>

        {/* Heartbeat ECG Pulse */}
        <path
          d="M 68 54 L 73 54 L 75 50 L 77 58 L 79 48 L 81 56 L 83 54 L 89 54"
          stroke="#E11D2A"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Bottom Blue Wave */}
        <path
          d="M 32 76 Q 60 69, 88 76 Q 60 81, 32 76 Z"
          fill={isDarkBg ? "#60A5FA" : "#1B4332"}
        />
      </svg>

      <div className="flex flex-col">
        <span
          className={`font-anton uppercase tracking-wider text-xl sm:text-2xl leading-none ${
            isDarkBg ? 'text-white' : 'text-[#1B4332]'
          }`}
        >
          ISLAM
        </span>
        <span className="font-anton uppercase tracking-wider text-xs sm:text-sm leading-tight text-[#E11D2A]">
          MEDICAL COMPLEX
        </span>
      </div>
    </div>
  );
};

export default Logo;
