import React from 'react';

interface CFMonogramProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  glow?: boolean;
  withBackground?: boolean;
}

export const CFMonogram: React.FC<CFMonogramProps> = ({
  size = 'md',
  className = '',
  glow = true,
  withBackground = true,
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24',
  };

  const glowStyle = glow
    ? {
        filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.75))',
      }
    : undefined;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}
      style={glowStyle}
    >
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="cfNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F274A" />
            <stop offset="50%" stopColor="#0A192F" />
            <stop offset="100%" stopColor="#050B14" />
          </linearGradient>
          <linearGradient id="cfCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="cfSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <filter id="cfCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Optional Hex / Chamfered Background */}
        {withBackground && (
          <>
            <rect
              x="2"
              y="2"
              width="40"
              height="40"
              rx="11"
              fill="url(#cfNavyGrad)"
              stroke="#06B6D4"
              strokeWidth="1.25"
              strokeOpacity="0.5"
            />
            {/* Subtle inner bevel highlight */}
            <rect
              x="3.5"
              y="3.5"
              width="37"
              height="37"
              rx="9.5"
              stroke="url(#cfCyanGrad)"
              strokeWidth="0.75"
              strokeOpacity="0.25"
            />
          </>
        )}

        {/* 'C' Arc: Curving outer arc in glowing Cyan */}
        <path
          d="M22 11C15.9249 11 11 15.9249 11 22C11 28.0751 15.9249 33 22 33C24.5 33 26.8 32.1 28.5 30.6"
          stroke="url(#cfCyanGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* 'F' Structure: Interlocking metallic silver & cyan accents */}
        {/* Main stem */}
        <path
          d="M20 12.5H33C33.55 12.5 34 12.95 34 13.5V17C34 17.55 33.55 18 33 18H25.5V21.5H30.5C31.05 21.5 31.5 21.95 31.5 22.5V25.5C31.5 26.05 31.05 26.5 30.5 26.5H25.5V31.5C25.5 32.05 25.05 32.5 24.5 32.5H21C20.45 32.5 20 32.05 20 31.5V12.5Z"
          fill="url(#cfSilverGrad)"
        />

        {/* Cyan Neural Accent Node on F wing */}
        <circle cx="33" cy="14" r="1.75" fill="#22D3EE" filter="url(#cfCyanGlow)" />
        <circle cx="30" cy="23.5" r="1.5" fill="#06B6D4" />

        {/* Speed Angle Diagonal Slash */}
        <line
          x1="12"
          y1="31"
          x2="32"
          y2="11"
          stroke="#06B6D4"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          strokeOpacity="0.6"
        />
      </svg>
    </div>
  );
};
