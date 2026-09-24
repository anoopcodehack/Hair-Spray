import React from 'react';

interface SalonLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

/**
 * Authentic Hair Spray Unisex Salon Logo
 * Faithfully matches the user's official salon emblem:
 * - Left: Woman silhouette with flowing wavy hair
 * - Center: Vertical hair styling scissors with circular finger rings
 * - Right: Man profile silhouette with sharp haircut
 */
export const SalonLogo: React.FC<SalonLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  theme = 'auto',
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', text: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'w-20 h-20', text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official Emblem Container */}
      <div
        className={`relative ${currentSize.icon} rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-[#2B231D] text-[#F3ECE4] p-1 shadow-sm transition-transform duration-300 hover:scale-105`}
        title="Hair Spray Unisex Salon Official Logo"
      >
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Hair Spray Unisex Salon Logo: Woman's flowing hair, styling shears, and man's profile silhouette"
        >
          {/* WOMAN'S FLOWING HAIR & PROFILE (Left) */}
          <path
            d="M 45 14
               C 38 12, 28 15, 20 22
               C 14 28, 12 36, 17 40
               C 21 43, 27 41, 31 39
               C 24 43, 17 46, 14 52
               C 11 58, 14 65, 20 67
               C 25 69, 31 66, 35 63
               C 26 66, 18 71, 14 77
               C 10 83, 13 90, 21 91
               C 28 92, 36 86, 42 79
               C 44 76, 45 72, 45 68
               C 41 68, 38 67, 36 64
               C 34 61, 35 57, 38 55
               C 42 53, 44 51, 44 48
               C 41 48, 39 46, 39 43
               C 39 40, 42 39, 44 37
               C 41 33, 41 29, 43 25
               C 44 22, 45 18, 45 14 Z"
          />

          {/* SCISSORS / STYLING SHEARS (Center) */}
          {/* Left Blade */}
          <path d="M 47 12 L 49.5 50 L 48 50 L 46 12 Z" />
          {/* Right Blade */}
          <path d="M 53 12 L 50.5 50 L 52 50 L 54 12 Z" />
          {/* Center Scissor Pivot Joint & A-Bar */}
          <circle cx="50" cy="46" r="2.2" fill="#2B231D" />
          <circle cx="50" cy="46" r="1.2" />
          <rect x="47" y="44.8" width="6" height="2" rx="0.5" />
          <line x1="47.5" y1="46" x2="52.5" y2="46" stroke="#2B231D" strokeWidth="0.8" />

          {/* Scissor Shanks */}
          <path d="M 48.5 50 L 45 74 L 46.5 74.5 L 50 51 Z" />
          <path d="M 51.5 50 L 55 74 L 53.5 74.5 L 50 51 Z" />

          {/* Scissor Loop 1 (Left Handle) */}
          <circle cx="43" cy="83" r="8" fill="none" stroke="currentColor" strokeWidth="2.8" />
          {/* Scissor Loop 2 (Right Handle) */}
          <circle cx="57" cy="83" r="8" fill="none" stroke="currentColor" strokeWidth="2.8" />

          {/* MAN'S HEAD PROFILE & SHORT HAIR (Right) */}
          <path
            d="M 55 14
               C 62 13, 72 13, 76 17
               C 78 19, 77 23, 78 26
               C 77 27, 75 29, 74 32
               C 76 34, 78 37, 80 40
               C 81 42, 80 44, 78 45
               C 79 47, 80 49, 78 51
               C 75 52, 74 54, 76 56
               C 77 58, 77 61, 76 64
               C 74 69, 70 73, 65 74
               C 60 75, 56 75, 55 74
               L 55 64
               C 60 63, 65 60, 67 55
               C 69 51, 68 47, 65 44
               C 62 42, 60 41, 57 41
               L 55 41
               C 55 35, 55 24, 55 14 Z"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className={`font-serif font-bold tracking-tight text-zinc-950 ${currentSize.text}`}>
              Hair Spray
            </span>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              Unisex
            </span>
          </div>
          <span className={`font-sans font-medium uppercase tracking-wider text-stone-500 ${currentSize.sub}`}>
            Salon · Kavoor, Mangalore
          </span>
        </div>
      )}
    </div>
  );
};
