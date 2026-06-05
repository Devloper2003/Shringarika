'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  type: 'thread' | 'sparkle' | 'dust' | 'star';

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 3 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = -Math.random() * 0.4 - 0.1;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 0.5;
    const r = Math.random();
    this.type = r < 0.3 ? 'thread' : r < 0.55 ? 'sparkle' : r < 0.8 ? 'dust' : 'star';
  }

  update(w: number, h: number) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    this.opacity += (Math.random() - 0.5) * 0.02;
    this.opacity = Math.max(0.05, Math.min(0.7, this.opacity));

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
      ctx.strokeStyle = '#c9a84c';
      ctx.lineWidth = this.size * 0.4;
      ctx.beginPath();
      ctx.moveTo(-this.size * 3, 0);
      ctx.quadraticCurveTo(0, this.size * 2, this.size * 3, 0);
      ctx.stroke();
    } else if (this.type === 'sparkle') {
      ctx.fillStyle = '#d4af37';
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
      // 4-pointed star — like in reference image 2
      ctx.fillStyle = '#d4af37';
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
    } else {
      ctx.fillStyle = '#d4a0a7';
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

/* ─── Letter-by-Letter Reveal Component ──────────────────────── */
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
          initial={{ opacity: 0, y: 40, rotateX: -40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.7,
            delay: delay + i * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Flowing Silk SVG Layers ──────────────────────────────── */
function FlowingSilk() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep background — dark charcoal */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#141418] via-[#1a1a1f] to-[#0e0e12]" />

      {/* Flowing silk SVG waves */}
      <svg
        className="absolute inset-0 w-full h-full animate-fabric-wave"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silk-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3a3024" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#4a3c28" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2a2418" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="silk-2" x1="0%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#B76E79" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#D4A0A7" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#9B5A64" stopOpacity="0.1" />
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

      {/* Second silk layer */}
      <svg
        className="absolute inset-0 w-full h-full animate-fabric-wave-delayed"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silk-3" x1="20%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#B89840" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#D4B86A" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#8B7430" stopOpacity="0.08" />
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

      {/* Third silk layer */}
      <svg
        className="absolute inset-0 w-full h-full animate-fabric-wave-slow"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silk-4" x1="50%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B76E79" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#9B5A64" stopOpacity="0.07" />
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

      {/* Radial warm light from bottom-center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(184,152,64,0.12) 0%, rgba(183,110,121,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,14,0.6) 100%)',
        }}
      />

      {/* Subtle side light streaks — animated */}
      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-[8%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#d4a0a7]/20 to-transparent"
      />
      <motion.div
        animate={{ opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-0 right-[12%] w-[1px] h-full bg-gradient-to-b from-transparent via-zari-gold/20 to-transparent"
      />

      {/* Sparkle spots — like reference image 2 */}
      <motion.div
        animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[20%] left-[15%] w-1 h-1 bg-[#d4af37] rounded-full"
      />
      <motion.div
        animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        className="absolute top-[30%] right-[20%] w-1 h-1 bg-[#d4af37] rounded-full"
      />
      <motion.div
        animate={{ opacity: [0, 0.4, 0], scale: [0.3, 1, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[50%] left-[25%] w-0.5 h-0.5 bg-[#d4a0a7] rounded-full"
      />
      <motion.div
        animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-[65%] right-[30%] w-1 h-1 bg-[#d4af37] rounded-full"
      />
    </div>
  );
}

/* ─── Component ───────────────────────────────────────────── */
export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  useEffect(() => {
    setMounted(true);
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
        const count = Math.min(Math.floor(window.innerWidth / 10), 100);
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

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0e0e12]"
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

      {/* ── Content ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >
        {/* WELCOME TO — subtle top label */}
        <motion.div
          initial={{ opacity: 0, y: 20, letterSpacing: '0.8em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.4em' }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-dm-sans text-zari-gold/60 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase mb-4">
            Welcome to
          </p>
        </motion.div>

        {/* House of Shringarika — Brand Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-dm-sans text-zari-gold/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-6 sm:mb-8">
            House of Shringarika
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-24 h-[1px] bg-zari-gold/40 mx-auto mb-8 sm:mb-10 origin-center"
        />

        {/* Main Headline — Letter-by-Letter Cinematic Reveal */}
        <div className="overflow-hidden mb-3" style={{ perspective: '800px' }}>
          <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-ivory font-light leading-[1.1]">
            <LetterReveal
              text="Draped in Dreams."
              delay={1.0}
              staggerDelay={0.045}
            />
          </h1>
        </div>

        <div className="overflow-hidden mb-8" style={{ perspective: '800px' }}>
          <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] text-gradient-gold italic">
            <LetterReveal
              text="Crafted for You."
              delay={1.8}
              staggerDelay={0.05}
            />
          </h1>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-dm-sans text-ivory/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed tracking-wide"
        >
          Luxury bridal wear, groom couture, bespoke fashion & ready-to-wear collections —
          where every woman and man becomes the story.
        </motion.p>

        {/* CTA Buttons — matching reference image 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          {/* Explore Collections — Gold filled button */}
          <a
            href="#collections"
            className="group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-zari-gold text-noir font-dm-sans text-xs sm:text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,168,76,0.45)]"
          >
            <span className="relative z-10">Explore Collections</span>
            <div className="absolute inset-0 bg-zari-gold-light transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </a>

          {/* Book a Consultation — Outlined button */}
          <a
            href="#appointments"
            className="px-8 sm:px-10 py-3.5 sm:py-4 border border-ivory/30 text-ivory font-dm-sans text-xs sm:text-sm tracking-[0.2em] uppercase hover:border-zari-gold hover:text-zari-gold transition-all duration-500 backdrop-blur-sm"
          >
            Book a Consultation
          </a>

          {/* WhatsApp Us — Ghost button with icon */}
          <a
            href="https://wa.me/919999999999?text=Hi%20Shringarika!%20I%27d%20love%20to%20inquire%20about%20a%20bridal%20outfit."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ivory/50 font-dm-sans text-xs sm:text-sm tracking-[0.15em] uppercase hover:text-green-400 transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-dm-sans text-ivory/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-zari-gold/50 to-transparent"
        />
      </motion.div>

      {/* ── Bottom cinematic fade — softer blend into content ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F2EDE8]/90 to-transparent z-[2]" />
    </section>
  );
}
