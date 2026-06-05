'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[100] bg-noir flex items-center justify-center"
        >
          <div className="text-center">
            {/* Gold shimmer line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-16 h-[1px] bg-gradient-to-r from-transparent via-zari-gold to-transparent mx-auto mb-8 origin-center"
            />
            
            {/* Brand name reveal */}
            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.5em', filter: 'blur(8px)' }}
              animate={{ opacity: 1, letterSpacing: '0.25em', filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
              className="font-cinzel text-2xl sm:text-3xl text-ivory tracking-[0.25em] font-light"
            >
              SHRINGARIKA
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1, delay: 1 }}
              className="font-dm-sans text-[9px] tracking-[0.4em] uppercase text-ivory/30 mt-4"
            >
              House of Shringarika
            </motion.p>

            {/* Bottom shimmer line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
              className="w-16 h-[1px] bg-gradient-to-r from-transparent via-zari-gold to-transparent mx-auto mt-8 origin-center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
