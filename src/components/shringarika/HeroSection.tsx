'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  type: 'thread' | 'sparkle' | 'dust';

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
    this.type = r < 0.4 ? 'thread' : r < 0.7 ? 'sparkle' : 'dust';
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
      // Golden thread strand
      ctx.strokeStyle = '#c9a84c';
      ctx.lineWidth = this.size * 0.4;
      ctx.beginPath();
      ctx.moveTo(-this.size * 3, 0);
      ctx.quadraticCurveTo(0, this.size * 2, this.size * 3, 0);
      ctx.stroke();
    } else if (this.type === 'sparkle') {
      // Diamond sparkle
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
    } else {
      // Soft dust mote
      ctx.fillStyle = '#c9a84c';
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

/* ─── Component ───────────────────────────────────────────── */
export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

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
        const count = Math.min(Math.floor(window.innerWidth / 12), 80);
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
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-noir">
      {/* ── Cinematic Background with Motion ── */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        {/* Hero Image with Ken Burns slow zoom */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero-motion.png"
            alt="Shringarika — Luxury Bridal Couture"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>

        {/* Dark cinematic overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-noir/90 via-noir/70 to-noir/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-noir/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/40 via-transparent to-noir" />

        {/* Cinematic vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(20,20,18,0.7) 100%)',
        }} />

        {/* Warm golden glow from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#c9a84c]/5 via-[#c9a84c]/2 to-transparent" />

        {/* Side light streaks */}
        <motion.div
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-zari-gold/20 to-transparent"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-0 right-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-zari-gold/15 to-transparent"
        />
      </motion.div>

      {/* ── Particle Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none"
      />

      {/* ── Content ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
      >
        {/* Brand Name Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-dm-sans text-zari-gold/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-4 sm:mb-6">
            House of Shringarika
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-24 h-[1px] bg-zari-gold/40 mx-auto mb-8 origin-center"
        />

        {/* Main Headline — Cinematic Letter-by-Letter Reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-ivory font-light leading-[1.1]"
          >
            Draped in Dreams.
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] text-gradient-gold italic"
          >
            Crafted for You.
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-dm-sans text-ivory/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed tracking-wide"
        >
          Luxury bridal wear, bespoke couture & ready-to-wear collections —
          where every woman becomes the story.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#collections"
            className="group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-zari-gold text-noir font-dm-sans text-xs sm:text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
          >
            <span className="relative z-10">Explore Collections</span>
            <div className="absolute inset-0 bg-zari-gold-light transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </a>
          <a
            href="#appointments"
            className="px-8 sm:px-10 py-3.5 sm:py-4 border border-ivory/40 text-ivory font-dm-sans text-xs sm:text-sm tracking-[0.2em] uppercase hover:border-zari-gold hover:text-zari-gold transition-all duration-500"
          >
            Book a Consultation
          </a>
          <a
            href="https://wa.me/919999999999?text=Hi%20Shringarika!%20I%27d%20love%20to%20inquire%20about%20a%20bridal%20outfit."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ivory/60 font-dm-sans text-xs sm:text-sm tracking-[0.15em] uppercase hover:text-green-400 transition-colors duration-300"
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
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-dm-sans text-ivory/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-zari-gold/60 to-transparent"
        />
      </motion.div>

      {/* ── Bottom cinematic fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent z-[2]" />
    </section>
  );
}
