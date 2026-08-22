import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 28, ...props }) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MMY Monogram Logo"
      className={cn('shrink-0 select-none shadow-xs', className)}
      {...props}
    >
      <defs>
        <linearGradient id="redGradLogo" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF5A5F" />
          <stop offset="100%" stopColor="#B3001B" />
        </linearGradient>
      </defs>

      {/* Deep Matte Black Background */}
      <rect width="1024" height="1024" rx="192" fill="#090909" />

      {/* Monogram MMY Structure */}
      <g fill="none" strokeWidth="56" strokeLinecap="square" strokeLinejoin="miter" strokeMiterlimit="10">
        {/* White Section */}
        <path d="M 200 880 L 200 144 L 256 144 L 512 400 L 768 144 L 824 144" stroke="#F4F4F4" />

        {/* Red Gradient Section: Right Outer Vertical */}
        <path d="M 824 144 L 824 880" stroke="url(#redGradLogo)" />

        {/* Lower Left Connecting Stroke */}
        <path d="M 200 368 L 428 596 L 428 880" stroke="url(#redGradLogo)" />

        {/* Lower Right Connecting Stroke */}
        <path d="M 824 368 L 596 596 L 596 880" stroke="url(#redGradLogo)" />
      </g>
    </svg>
  );
};