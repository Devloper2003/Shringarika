'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/* ─── 3D Rotating Ring Component ──────────────────────────── */
function RotatingRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '800px' }}>
      {/* Outer ring */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute"
        style={{
          width: '440px',
          height: '240px',
          borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.2)',
          boxShadow: '0 0 20px rgba(212,175,55,0.1), inset 0 0 20px rgba(212,175,55,0.05)',
        }}
      >
        {/* Ring dot marker */}
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{
            background: '#FFD700',
            boxShadow: '0 0 10px rgba(255,215,0,0.6), 0 0 20px rgba(255,215,0,0.3)',
          }}
        />
      </motion.div>

      {/* Inner ring — counter-rotate */}
      <motion.div
        animate={{ rotateZ: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute"
        style={{
          width: '400px',
          height: '210px',
          borderRadius: '50%',
          border: '1px solid rgba(139,26,56,0.25)',
          boxShadow: '0 0 15px rgba(139,26,56,0.1), inset 0 0 15px rgba(139,26,56,0.05)',
        }}
      >
        {/* Ring dot marker */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            background: '#8b1a38',
            boxShadow: '0 0 8px rgba(139,26,56,0.6), 0 0 16px rgba(139,26,56,0.3)',
          }}
        />
      </motion.div>

      {/* Third ring — slower, 3D tilt */}
      <motion.div
        animate={{ rotateZ: 360, rotateX: [5, -5, 5] }}
        transition={{
          rotateZ: { duration: 12, repeat: Infinity, ease: 'linear' },
          rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute"
        style={{
          width: '460px',
          height: '260px',
          borderRadius: '50%',
          border: '1px dashed rgba(212,175,55,0.08)',
          transformStyle: 'preserve-3d',
        }}
      />
    </div>
  );
}

/* ─── Loading Star Particles ──────────────────────────────── */
function LoadingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2,
    isGold: Math.random() > 0.4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.isGold ? '#FFD700' : '#8b1a38',
            boxShadow: p.isGold
              ? '0 0 6px rgba(255,215,0,0.5), 0 0 12px rgba(255,215,0,0.2)'
              : '0 0 6px rgba(139,26,56,0.5), 0 0 12px rgba(139,26,56,0.2)',
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

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
        // Make it look like wireframe - gold lines with neon glow
        output.data[i] = 255;     // brighter gold R
        output.data[i + 1] = 215; // gold G
        output.data[i + 2] = 0;   // gold B
        output.data[i + 3] = Math.min(a * 1.3, 255);
      } else if (!isDark && a > 20) {
        // Subtle outline pixels — burgundy tint
        output.data[i] = 139;
        output.data[i + 1] = 26;
        output.data[i + 2] = 56;
        output.data[i + 3] = Math.floor(a * 0.3);
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
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: '#0d1220' }}
        >
          {/* Vignette effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(13,18,32,0.6) 70%, rgba(13,18,32,0.95) 100%)',
            }}
          />

          {/* Floating particles */}
          <LoadingParticles />

          <div className="text-center relative z-10">
            {/* Top decorative line — gold neon */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-20 h-[1px] mx-auto mb-6 origin-center"
              style={{
                background: 'linear-gradient(90deg, transparent, #D4AF37, #FFD700, #D4AF37, transparent)',
                boxShadow: '0 0 10px rgba(212,175,55,0.3)',
              }}
            />

            {/* Logo with wireframe → fill animation + 3D rotating ring */}
            <div className="relative w-[460px] h-[260px] mx-auto mb-6">
              {/* 3D Rotating rings */}
              <RotatingRing />

              {/* Logo content centered */}
              <div className="absolute inset-0 flex items-center justify-center">
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

                {/* Scanning line effect — burgundy-gold gradient */}
                {phase === 'wireframe' && (
                  <motion.div
                    initial={{ top: 0 }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 1.2, ease: 'linear' }}
                    className="absolute left-0 right-0 h-[2px] z-10"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #8b1a38, #D4AF37, #FFD700, #D4AF37, #8b1a38, transparent)',
                      boxShadow: '0 0 8px rgba(212,175,55,0.5), 0 0 20px rgba(139,26,56,0.3)',
                    }}
                  />
                )}
              </div>
            </div>

            {/* Brand tagline — gold gradient */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase === 'fill' || phase === 'done' ? 0.8 : 0, y: phase === 'fill' || phase === 'done' ? 0 : 10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-dm-sans text-[9px] tracking-[0.35em] uppercase"
              style={{
                background: 'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Inspired by Divine Shringar, Rooted in Sanatan Purity
            </motion.p>

            {/* Bottom decorative line — gold neon */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
              className="w-20 h-[1px] mx-auto mt-6 origin-center"
              style={{
                background: 'linear-gradient(90deg, transparent, #D4AF37, #FFD700, #D4AF37, transparent)',
                boxShadow: '0 0 10px rgba(212,175,55,0.3)',
              }}
            />

            {/* Loading dots — gold with neon pulse */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex items-center justify-center gap-3 mt-8"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.3, 1, 0.3],
                    boxShadow: [
                      '0 0 4px rgba(255,215,0,0.3)',
                      '0 0 12px rgba(255,215,0,0.8), 0 0 24px rgba(212,175,55,0.4)',
                      '0 0 4px rgba(255,215,0,0.3)',
                    ],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: 'easeInOut',
                  }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #FFD700, #D4AF37)',
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
