import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SalonLogo } from './SalonLogo';

interface LoaderSequenceProps {
  onComplete: () => void;
}

export const LoaderSequence: React.FC<LoaderSequenceProps> = ({ onComplete }) => {
  const [isDissolving, setIsDissolving] = useState(false);
  const [progress, setProgress] = useState(0);

  // Letters of "Hair" and "Spray"
  const word1 = ['H', 'a', 'i', 'r'];
  const word2 = ['S', 'p', 'r', 'a', 'y'];

  useEffect(() => {
    // Progress counter
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    // Fade out sequence after animation completes
    const dissolveTimer = setTimeout(() => {
      setIsDissolving(true);
    }, 2900);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3400);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(dissolveTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDissolving && (
        <motion.div
          id="loader-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAFAFA] text-zinc-900 overflow-hidden select-none"
        >
          {/* Subtle radial ambient glow */}
          <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg mx-auto">
            {/* 2. LOGO DROPS AT THE END (After letters settle in middle) */}
            <motion.div
              initial={{ y: -450, opacity: 0, scale: 0.3, rotate: -15 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                damping: 9,
                stiffness: 110,
                bounce: 0.62,
                delay: 1.15, // Drops from top right after the letters finish bouncing into place
              }}
              className="mb-5 relative"
            >
              <div className="relative p-1 rounded-2xl bg-white shadow-xl border border-zinc-200">
                <SalonLogo size="xl" />
              </div>
            </motion.div>

            {/* Location Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.35 }}
              className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-[#9E6868] font-bold mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E6868]" />
              <span>Kavoor · Mangalore</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E6868]" />
            </motion.div>

            {/* 1. LETTERS DROP FROM TOP AND BOUNCE TO MIDDLE */}
            <div className="flex flex-wrap items-baseline justify-center gap-x-3 sm:gap-x-4 mb-6 font-serif">
              {/* Word 1: Hair */}
              <div className="flex items-baseline overflow-visible">
                {word1.map((letter, idx) => (
                  <motion.span
                    key={`word1-${idx}`}
                    initial={{ y: -380, opacity: 0, scale: 0.5, rotate: idx % 2 === 0 ? -12 : 12 }}
                    animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      damping: 10,
                      stiffness: 140,
                      bounce: 0.58,
                      delay: 0.08 + idx * 0.07, // Staggered drop from top
                    }}
                    className="inline-block text-4xl sm:text-6xl md:text-7xl font-bold text-zinc-950 tracking-tight"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Word 2: Spray */}
              <div className="flex items-baseline overflow-visible">
                {word2.map((letter, idx) => (
                  <motion.span
                    key={`word2-${idx}`}
                    initial={{ y: -380, opacity: 0, scale: 0.5, rotate: idx % 2 === 0 ? 12 : -12 }}
                    animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      damping: 10,
                      stiffness: 140,
                      bounce: 0.58,
                      delay: 0.38 + idx * 0.07, // Drops in right after "Hair"
                    }}
                    className="inline-block text-4xl sm:text-6xl md:text-7xl font-bold text-[#9E6868] tracking-tight"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Loading progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="w-48 flex flex-col items-center gap-2"
            >
              <div className="w-full h-[2px] bg-zinc-200 overflow-hidden relative rounded-full">
                <motion.div
                  className="h-full bg-zinc-950 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <div className="flex items-center justify-between w-full text-[10px] font-sans text-zinc-500 font-semibold tracking-wider">
                <span>Loading Salon Experience</span>
                <span>{progress}%</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Skip button */}
          <button
            id="skip-loader-btn"
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            className="absolute bottom-10 font-sans text-xs uppercase tracking-wider text-zinc-600 hover:text-zinc-950 px-6 py-2.5 rounded-full border border-zinc-200 hover:border-zinc-400 bg-white shadow-xs cursor-pointer transition-all font-semibold"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
