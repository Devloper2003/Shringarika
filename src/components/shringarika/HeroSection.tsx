'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import Image from 'next/image';

/* ─── Floating Thread Particles ───────────────────────────── */
class ThreadParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'thread' | 'sparkle' | 'dust' | 'star' | 'burgundy' | 'goldflare';

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 3 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = -Math.random() * 0.5 - 0.15;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 0.6;
    const r = Math.random();
    this.type = r < 0.2 ? 'thread' : r < 0.4 ? 'sparkle' : r < 0.55 ? 'star' : r < 0.7 ? 'goldflare' : r < 0.85 ? 'burgundy' : 'dust';
  }

  update(w: number, h: number) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    this.opacity += (Math.random() - 0.5) * 0.02;
    this.opacity = Math.max(0.05, Math.min(0.8, this.opacity));

    if (this.y < -10) { this.y = h + 10; this.x = Math.random() * w; }
    if (this.x < -10) this.x = w + 10;
    if (this.x > w + 10) this.x = -10;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);

    if (this.type === 'thread') {
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = this.size * 0.5;
      ctx.shadowColor = '#D4AF37';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.moveTo(-this.size * 3, 0);
      ctx.quadraticCurveTo(0, this.size * 2, this.size * 3, 0);
      ctx.stroke();
    } else if (this.type === 'sparkle') {
      ctx.fillStyle = '#FFD700';
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 6;
      const s = this.size;
      ctx.beginPath();
      ctx.moveTo(0, -s * 2);
      ctx.lineTo(s * 0.5, -s * 0.5);
      ctx.lineTo(s * 2, 0);
      ctx.lineTo(s * 0.5, s * 0.5);
      ctx.lineTo(0, s * 2);
      ctx.lineTo(-s * 0.5, s * 0.5);
      ctx.lineTo(-s * 2, 0);
      ctx.lineTo(-s * 0.5, -s * 0.5);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'star') {
      ctx.fillStyle = '#D4AF37';
      ctx.shadowColor = '#D4AF37';
      ctx.shadowBlur = 8;
      const s = this.size * 0.8;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle - 0.2) * s * 0.3, Math.sin(angle - 0.2) * s * 0.3);
        ctx.lineTo(Math.cos(angle) * s * 2.5, Math.sin(angle) * s * 2.5);
        ctx.lineTo(Math.cos(angle + 0.2) * s * 0.3, Math.sin(angle + 0.2) * s * 0.3);
      }
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'goldflare') {
      ctx.fillStyle = '#FFD700';
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 12;
      const s = this.size * 0.6;
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'burgundy') {
      ctx.fillStyle = '#8b1a38';
      ctx.shadowColor = '#8b1a38';
      ctx.shadowBlur = 5;
      const s = this.size * 0.7;
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#1a2b4a';
      ctx.globalAlpha = this.opacity * 0.4;
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

/* ─── Letter-by-Letter Reveal Component with 3D ───────────── */
function LetterReveal({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.04,
}: {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}) {
  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 60, rotateX: -90, filter: 'blur(12px)', scale: 0.5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', scale: 1 }}
          transition={{
            duration: 0.9,
            delay: delay + i * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            transformOrigin: 'bottom center',
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── 3D Rotating Gold Diamond ────────────────────────────── */
function RotatingDiamond() {
  return (
    <div className="relative w-20 h-20 mx-auto mb-8" style={{ perspective: '600px' }}>
      <motion.div
        animate={{ rotateY: 360, rotateX: 15 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        {/* Diamond shape */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
          <defs>
            <linearGradient id="diamond-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>
          <polygon
            points="50,5 95,40 50,95 5,40"
            fill="none"
            stroke="url(#diamond-grad)"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <polygon
            points="50,15 80,40 50,80 20,40"
            fill="url(#diamond-grad)"
            opacity="0.1"
          />
          <line x1="50" y1="5" x2="50" y2="95" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          <line x1="5" y1="40" x2="95" y2="40" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </motion.div>
      {/* Glow ring */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
}

/* ─── Animated SVG Border Decoration ──────────────────────── */
function AnimatedSVGBorder() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 400"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="border-grad-left" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="border-grad-right" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b1a38" stopOpacity="0" />
          <stop offset="50%" stopColor="#8b1a38" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8b1a38" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="border-grad-top" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFD700" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Left border line */}
      <motion.line
        x1="40" y1="40" x2="40" y2="360"
        stroke="url(#border-grad-left)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 1.5, ease: 'easeOut' }}
      />
      {/* Right border line */}
      <motion.line
        x1="760" y1="40" x2="760" y2="360"
        stroke="url(#border-grad-right)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 1.8, ease: 'easeOut' }}
      />
      {/* Top decorative line */}
      <motion.line
        x1="120" y1="30" x2="680" y2="30"
        stroke="url(#border-grad-top)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 2.0, ease: 'easeOut' }}
      />
      {/* Bottom decorative line */}
      <motion.line
        x1="120" y1="370" x2="680" y2="370"
        stroke="url(#border-grad-top)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 2.2, ease: 'easeOut' }}
      />
      {/* Corner ornaments */}
      <motion.path
        d="M40,50 L40,40 L50,40"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="1"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      />
      <motion.path
        d="M760,50 L760,40 L750,40"
        fill="none"
        stroke="#8b1a38"
        strokeWidth="1"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
      />
      <motion.path
        d="M40,350 L40,360 L50,360"
        fill="none"
        stroke="#8b1a38"
        strokeWidth="1"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 2.7 }}
      />
      <motion.path
        d="M760,350 L760,360 L750,360"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="1"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
      />
    </svg>
  );
}

/* ─── Flowing Silk SVG Layers — Deep Navy + Burgundy ──────── */
function FlowingSilk() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep background — deep navy to dark burgundy */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[#1a2b4a] to-[#0d1220]" />

      {/* Animated gradient overlay — subtle moving navy-burgundy shift */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(135deg, rgba(13,18,32,1) 0%, rgba(26,43,74,0.8) 40%, rgba(139,26,56,0.15) 70%, rgba(13,18,32,1) 100%)',
            'linear-gradient(135deg, rgba(13,18,32,1) 0%, rgba(139,26,56,0.12) 30%, rgba(26,43,74,0.9) 60%, rgba(13,18,32,1) 100%)',
            'linear-gradient(135deg, rgba(13,18,32,1) 0%, rgba(26,43,74,0.8) 40%, rgba(139,26,56,0.15) 70%, rgba(13,18,32,1) 100%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0"
      />

      {/* Flowing silk SVG waves — navy/burgundy tones */}
      <svg
        className="absolute inset-0 w-full h-full animate-fabric-wave"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silk-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a2b4a" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#2a3b5a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0d1220" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="silk-2" x1="0%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#8b1a38" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#6b1a2a" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#8b1a38" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          d="M0,300 C200,250 400,350 600,280 C800,210 1000,320 1200,290 C1400,260 1600,340 1920,300 L1920,1080 L0,1080 Z"
          fill="url(#silk-1)"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,300 C200,250 400,350 600,280 C800,210 1000,320 1200,290 C1400,260 1600,340 1920,300 L1920,1080 L0,1080 Z;
              M0,320 C200,280 400,310 600,340 C800,280 1000,260 1200,310 C1400,340 1600,280 1920,320 L1920,1080 L0,1080 Z;
              M0,300 C200,250 400,350 600,280 C800,210 1000,320 1200,290 C1400,260 1600,340 1920,300 L1920,1080 L0,1080 Z
            "
          />
        </path>
      </svg>

      {/* Second silk layer — burgundy accent */}
      <svg
        className="absolute inset-0 w-full h-full animate-fabric-wave-delayed"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silk-3" x1="20%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#8b1a38" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#6b1a2a" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M0,400 C150,360 350,420 550,380 C750,340 950,410 1150,370 C1350,330 1550,400 1920,380 L1920,1080 L0,1080 Z"
          fill="url(#silk-3)"
        >
          <animate
            attributeName="d"
            dur="16s"
            repeatCount="indefinite"
            values="
              M0,400 C150,360 350,420 550,380 C750,340 950,410 1150,370 C1350,330 1550,400 1920,380 L1920,1080 L0,1080 Z;
              M0,380 C150,420 350,360 550,400 C750,420 950,360 1150,400 C1350,370 1550,410 1920,400 L1920,1080 L0,1080 Z;
              M0,400 C150,360 350,420 550,380 C750,340 950,410 1150,370 C1350,330 1550,400 1920,380 L1920,1080 L0,1080 Z
            "
          />
        </path>
      </svg>

      {/* Third silk layer — deep navy with gold hints */}
      <svg
        className="absolute inset-0 w-full h-full animate-fabric-wave-slow"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silk-4" x1="50%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a2b4a" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#0d1220" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path
          d="M0,500 C200,460 400,520 600,480 C800,440 1000,510 1200,470 C1400,430 1600,500 1920,480 L1920,1080 L0,1080 Z"
          fill="url(#silk-4)"
        >
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M0,500 C200,460 400,520 600,480 C800,440 1000,510 1200,470 C1400,430 1600,500 1920,480 L1920,1080 L0,1080 Z;
              M0,480 C200,520 400,470 600,510 C800,500 1000,460 1200,500 C1400,490 1600,470 1920,500 L1920,1080 L0,1080 Z;
              M0,500 C200,460 400,520 600,480 C800,440 1000,510 1200,470 C1400,430 1600,500 1920,480 L1920,1080 L0,1080 Z
            "
          />
        </path>
      </svg>

      {/* Radial warm light from bottom-center — gold + burgundy glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(212,175,55,0.15) 0%, rgba(139,26,56,0.08) 40%, transparent 70%)',
        }}
      />

      {/* Cinematic vignette — deeper */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(13,18,32,0.7) 100%)',
        }}
      />

      {/* Animated side light streaks — navy/burgundy */}
      <motion.div
        animate={{ opacity: [0.03, 0.1, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-[8%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#8b1a38]/30 to-transparent"
      />
      <motion.div
        animate={{ opacity: [0.04, 0.12, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-0 right-[12%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4AF37]/25 to-transparent"
      />

      {/* Neon glow spots */}
      <motion.div
        animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[20%] left-[15%] w-1.5 h-1.5 rounded-full"
        style={{
          background: '#FFD700',
          boxShadow: '0 0 8px 2px rgba(255,215,0,0.6)',
        }}
      />
      <motion.div
        animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        className="absolute top-[30%] right-[20%] w-1 h-1 rounded-full"
        style={{
          background: '#D4AF37',
          boxShadow: '0 0 6px 2px rgba(212,175,55,0.5)',
        }}
      />
      <motion.div
        animate={{ opacity: [0, 0.5, 0], scale: [0.3, 1, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[50%] left-[25%] w-1 h-1 rounded-full"
        style={{
          background: '#8b1a38',
          boxShadow: '0 0 6px 2px rgba(139,26,56,0.5)',
        }}
      />
      <motion.div
        animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-[65%] right-[30%] w-1.5 h-1.5 rounded-full"
        style={{
          background: '#FFD700',
          boxShadow: '0 0 10px 2px rgba(255,215,0,0.5)',
        }}
      />
      <motion.div
        animate={{ opacity: [0, 0.4, 0], scale: [0.3, 1.2, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
        className="absolute top-[40%] left-[60%] w-1 h-1 rounded-full"
        style={{
          background: '#8b1a38',
          boxShadow: '0 0 8px 2px rgba(139,26,56,0.4)',
        }}
      />

      {/* Horizontal scan line effect — subtle */}
      <motion.div
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 right-0 h-[1px] z-[1]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 30%, rgba(139,26,56,0.1) 70%, transparent 100%)',
        }}
      />
    </div>
  );
}

/* ─── Clip-Path Reveal Wrapper ────────────────────────────── */
function ClipReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      transition={{ duration: 1.4, delay, ease: [0.77, 0, 0.175, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Component ───────────────────────────────────────────── */
export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  // 3D perspective tilt on scroll
  const perspectiveRotateX = useTransform(scrollYProgress, [0, 0.5], [0, -8]);
  const perspectiveRotateY = useTransform(scrollYProgress, [0, 0.5], [0, 3]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Canvas animation for floating particles */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: ThreadParticle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particles.length === 0) {
        const count = Math.min(Math.floor(window.innerWidth / 8), 140);
        particles = Array.from({ length: count }, () =>
          new ThreadParticle(canvas.width, canvas.height)
        );
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      }
      animId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  /* Mouse tracking for 3D tilt */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x * 2);
    mouseY.set(y * 2);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const tiltX = useTransform(mouseY, [-2, 2], [2, -2]);
  const tiltY = useTransform(mouseX, [-2, 2], [-2, 2]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1220]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Flowing Silk Background ── */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <FlowingSilk />
      </motion.div>

      {/* ── Particle Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none"
      />

      {/* ── Content with 3D perspective ── */}
      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY,
          rotateX: tiltX,
          rotateY: tiltY,
          perspective: 1200,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >
        {/* Animated SVG border decoration */}
        <div className="relative py-16 sm:py-20">
          <AnimatedSVGBorder />

          {/* WELCOME TO — subtle top label */}
          <motion.div
            initial={{ opacity: 0, y: 20, letterSpacing: '0.8em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.4em' }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="font-dm-sans text-[#D4AF37]/70 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase mb-4">
              Welcome to
            </p>
          </motion.div>

          {/* House of Shringarika — Brand Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p
              className="font-dm-sans text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-6 sm:mb-8"
              style={{
                background: 'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              House of Shringarika
            </p>
          </motion.div>

          {/* Decorative line — now with gold glow */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-24 h-[1px] mx-auto mb-8 sm:mb-10 origin-center"
            style={{
              background: 'linear-gradient(90deg, transparent, #D4AF37, #FFD700, #D4AF37, transparent)',
              boxShadow: '0 0 8px rgba(212,175,55,0.3)',
            }}
          />

          {/* 3D Rotating Diamond */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <RotatingDiamond />
          </motion.div>

          {/* Main Headline — Clip-Path Reveal + Letter-by-Letter with 3D */}
          <ClipReveal delay={1.0}>
            <div className="overflow-hidden mb-3" style={{ perspective: '800px' }}>
              <h1
                className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-[1.05]"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #e8e0d0 40%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.2))',
                }}
              >
                <LetterReveal
                  text="Draped in Dreams."
                  delay={1.0}
                  staggerDelay={0.045}
                />
              </h1>
            </div>
          </ClipReveal>

          <ClipReveal delay={1.6}>
            <div className="overflow-hidden mb-8" style={{ perspective: '800px' }}>
              <h1
                className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light italic leading-[1.05]"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 40%, #D4AF37 70%, #8b1a38 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 25px rgba(255,215,0,0.25))',
                }}
              >
                <LetterReveal
                  text="Crafted for You."
                  delay={1.8}
                  staggerDelay={0.05}
                />
              </h1>
            </div>
          </ClipReveal>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-dm-sans text-[#e8e0d0]/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed tracking-wide"
          >
            Luxury bridal wear, groom couture, bespoke fashion & ready-to-wear collections —
            where every woman and man becomes the story.
          </motion.p>

          {/* CTA Buttons — Gaming-like neon gold glow, pill shapes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            {/* Explore Collections — Neon Gold Pill Button */}
            <a
              href="#collections"
              className="group relative px-10 sm:px-12 py-4 sm:py-5 rounded-full font-dm-sans text-xs sm:text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #FFD700, #D4AF37)',
                color: '#0d1220',
                boxShadow: '0 0 20px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.15), inset 0 0 20px rgba(255,215,0,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(212,175,55,0.6), 0 0 80px rgba(255,215,0,0.3), inset 0 0 30px rgba(255,215,0,0.3)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.15), inset 0 0 20px rgba(255,215,0,0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span className="relative z-10 font-semibold">Explore Collections</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>

            {/* Book a Consultation — Outlined Neon Pill */}
            <a
              href="#appointments"
              className="group relative px-10 sm:px-12 py-4 sm:py-5 rounded-full border font-dm-sans text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-500 backdrop-blur-sm"
              style={{
                borderColor: 'rgba(212,175,55,0.3)',
                color: '#e8e0d0',
                boxShadow: '0 0 15px rgba(212,175,55,0.1), inset 0 0 15px rgba(212,175,55,0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D4AF37';
                e.currentTarget.style.color = '#FFD700';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(212,175,55,0.3), inset 0 0 25px rgba(212,175,55,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                e.currentTarget.style.color = '#e8e0d0';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(212,175,55,0.1), inset 0 0 15px rgba(212,175,55,0.05)';
              }}
            >
              Book a Consultation
            </a>

            {/* WhatsApp Us — Ghost button with icon */}
            <a
              href="https://wa.me/919999999999?text=Hi%20Shringarika!%20I%27d%20love%20to%20inquire%20about%20a%20bridal%20outfit."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#e8e0d0]/50 font-dm-sans text-xs sm:text-sm tracking-[0.15em] uppercase hover:text-green-400 transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-dm-sans text-[#D4AF37]/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8"
          style={{
            background: 'linear-gradient(to bottom, #D4AF37, transparent)',
            boxShadow: '0 0 6px rgba(212,175,55,0.3)',
          }}
        />
      </motion.div>

      {/* ── Bottom cinematic fade — deep navy ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2]"
        style={{
          background: 'linear-gradient(to top, rgba(13,18,32,0.95) 0%, rgba(13,18,32,0.5) 50%, transparent 100%)',
        }}
      />
    </section>
  );
}
