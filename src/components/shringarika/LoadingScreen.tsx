'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/* ─── Wireframe Drawing Animation on Canvas ─── */
function WireframeLogoCanvas({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imgRef.current;
    const cw = canvas.width;
    const ch = canvas.height;

    // Draw the image to extract edges
    ctx.drawImage(img, 0, 0, cw, ch);
    const imageData = ctx.getImageData(0, 0, cw, ch);
    const data = imageData.data;

    // Convert to grayscale and detect edges (simple threshold)
    ctx.clearRect(0, 0, cw, ch);

    // Draw wireframe style - only bright/gold pixels, rest transparent
    const output = ctx.createImageData(cw, ch);
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Detect gold-ish or bright pixels
      const isGold = r > 120 && g > 80 && b < 100 && a > 30;
      const isBright = r > 150 && g > 130 && b > 80 && a > 30;
      const isDark = r < 80 && g < 80 && b < 80;

      if (isGold || isBright) {
        // Make it look like wireframe - gold lines
        output.data[i] = 184;     // zari-gold R (muted)
        output.data[i + 1] = 152; // zari-gold G
        output.data[i + 2] = 64;  // zari-gold B
        output.data[i + 3] = Math.min(a * 1.2, 255);
      } else if (!isDark && a > 20) {
        // Subtle outline pixels
        output.data[i] = 184;
        output.data[i + 1] = 152;
        output.data[i + 2] = 76;
        output.data[i + 3] = Math.floor(a * 0.4);
      }
    }
    ctx.putImageData(output, 0, 0);
  }, []);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = 380;
      const displayH = 180;
      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      draw();
    };
    img.src = '/images/logo.png';
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto"
      style={{ width: 380, height: 180 }}
    />
  );
}

/* ─── Main Loading Screen ─── */
export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<'wireframe' | 'fill' | 'done'>('wireframe');

  useEffect(() => {
    // Phase 1: Wireframe draws (0-1.2s)
    const t1 = setTimeout(() => setPhase('fill'), 1200);
    // Phase 2: Fill in with color (1.2-2.2s)
    const t2 = setTimeout(() => setPhase('done'), 2200);
    // Phase 3: Fade out (2.2-3s)
    const t3 = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
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
            {/* Top decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-20 h-[1px] bg-gradient-to-r from-transparent via-zari-gold/60 to-transparent mx-auto mb-6 origin-center"
            />

            {/* Logo with wireframe → fill animation */}
            <div className="relative w-[380px] h-[180px] mx-auto mb-6">
              {/* Wireframe layer — visible first, then fades */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: phase === 'wireframe' ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <WireframeLogoCanvas onComplete={() => {}} />
              </motion.div>

              {/* Full color logo — fades in after wireframe */}
              <motion.div
                initial={{ opacity: 0, filter: 'brightness(2) contrast(0.5)' }}
                animate={{
                  opacity: phase === 'fill' || phase === 'done' ? 1 : 0,
                  filter: phase === 'fill'
                    ? 'brightness(1.2) contrast(0.8)'
                    : phase === 'done'
                    ? 'brightness(1) contrast(1)'
                    : 'brightness(2) contrast(0.5)',
                }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src="/images/logo.png"
                  alt="Shringarika — Official Logo"
                  width={360}
                  height={160}
                  className="w-auto h-auto max-w-[360px] object-contain"
                  priority
                />
              </motion.div>

              {/* Scanning line effect during wireframe phase */}
              {phase === 'wireframe' && (
                <motion.div
                  initial={{ top: 0 }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.2, ease: 'linear' }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zari-gold/80 to-transparent z-10"
                />
              )}
            </div>

            {/* Brand tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase === 'fill' || phase === 'done' ? 0.6 : 0, y: phase === 'fill' || phase === 'done' ? 0 : 10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-dm-sans text-[9px] tracking-[0.35em] uppercase text-ivory/40"
            >
              Inspired by Divine Shringar, Rooted in Sanatan Purity
            </motion.p>

            {/* Bottom decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
              className="w-20 h-[1px] bg-gradient-to-r from-transparent via-zari-gold/60 to-transparent mx-auto mt-6 origin-center"
            />

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex items-center justify-center gap-2 mt-8"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                  className="w-1 h-1 rounded-full bg-zari-gold"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
