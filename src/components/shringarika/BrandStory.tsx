'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function BrandStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({ rotateX: -y * 8, rotateY: x * 8 });
  };

  const resetTilt = () => setTiltStyle({ rotateX: 0, rotateY: 0 });

  const philosophyCards = [
    { title: 'Heritage Craft', desc: 'Handcrafted using centuries-old embroidery techniques from the heart of Rajasthan', icon: '✦' },
    { title: 'Bespoke Vision', desc: 'Every piece is designed to tell your unique story with personal consultation', icon: '◈' },
    { title: 'Luxury Fabrics', desc: 'Sourced from the finest looms, silks, and artisan workshops across India', icon: '❖' },
    { title: 'Timeless Elegance', desc: 'Designs that transcend trends and become heirlooms for generations', icon: '✧' },
  ];

  return (
    <section id="story" className="relative bg-[#0a0a12] section-luxury overflow-hidden">
      {/* Navy-to-burgundy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[#0a0a12] to-[#12081a]" />

      {/* Subtle mesh grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Animated gold border line — top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-accent to-transparent origin-left"
        style={{ boxShadow: '0 0 12px rgba(212,175,55,0.3)' }}
      />

      {/* Animated gold border line — bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-accent to-transparent origin-right"
        style={{ boxShadow: '0 0 12px rgba(212,175,55,0.3)' }}
      />

      {/* Decorative corner elements with gold glow */}
      <div className="absolute top-6 left-6 w-20 h-20" style={{ boxShadow: '0 0 15px rgba(212,175,55,0.15)' }}>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold-accent/60 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-gold-accent/60 to-transparent" />
      </div>
      <div className="absolute top-6 right-6 w-20 h-20" style={{ boxShadow: '0 0 15px rgba(212,175,55,0.15)' }}>
        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-gold-accent/60 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-gold-accent/60 to-transparent" />
      </div>
      <div className="absolute bottom-6 left-6 w-20 h-20">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold-accent/40 to-transparent" />
        <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-gold-accent/40 to-transparent" />
      </div>
      <div className="absolute bottom-6 right-6 w-20 h-20">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-gold-accent/40 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-gold-accent/40 to-transparent" />
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-navy/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-burgundy/10 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, rotateX: -20, y: 30 }}
          animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ perspective: '600px' }}
          className="text-center mb-4"
        >
          <span className="font-dm-sans text-gold-accent text-[10px] tracking-[0.4em] uppercase"
            style={{ textShadow: '0 0 8px rgba(212,175,55,0.3)' }}>
            Our Story
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, rotateX: -15, y: 40 }}
          animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ perspective: '800px' }}
          className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory text-center font-light leading-tight mb-16"
        >
          Every Thread Tells a <span className="italic text-gradient-gold">Story</span>
        </motion.h2>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, rotateY: -15, x: -60 }}
            animate={isInView ? { opacity: 1, rotateY: 0, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            className="relative"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
          >
            <motion.div
              animate={tiltStyle}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              {/* Dark cinematic image container */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-[#0f1320] to-[#1a0a15]">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-cormorant text-gold-accent/10 text-8xl italic"
                    style={{ textShadow: '0 0 30px rgba(212,175,55,0.05)' }}>A</span>
                </div>
              </div>
              {/* Cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/80 via-transparent to-[#0d1220]/40" />

              {/* Neon gold border glow on image */}
              <div className="absolute inset-0 border border-gold-accent/10"
                style={{ boxShadow: 'inset 0 0 30px rgba(212,175,55,0.03), 0 0 20px rgba(212,175,55,0.05)' }} />

              {/* Scan line effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-accent/30 to-transparent"
                  style={{ animation: 'scan-line 4s linear infinite' }} />
              </div>
            </motion.div>

            {/* Decorative frame with neon glow */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-accent/15 -z-10"
              style={{ boxShadow: '0 0 20px rgba(212,175,55,0.06)' }} />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, rotateY: 10, x: 60 }}
            animate={isInView ? { opacity: 1, rotateY: 0, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
            className="space-y-6"
          >
            <div className="luxury-divider mb-8" />

            <p className="font-cormorant text-xl sm:text-2xl text-ivory/90 italic leading-relaxed">
              &ldquo;Walking into a luxury atelier in Jaipur — where every stitch holds a story,
              every fabric whispers elegance, and every woman is the protagonist.&rdquo;
            </p>

            <p className="font-dm-sans text-sm sm:text-base text-ivory/50 leading-relaxed">
              Born from the timeless allure of Jaipur&apos;s royal heritage, House of Shringarika is more than
              a fashion brand — it is a deeply personal, cinematic couture experience. Every creation that
              leaves our atelier carries within it the soul of Indian craftsmanship, the elegance of
              generations, and the intimate vision of the woman who will wear it.
            </p>

            <p className="font-dm-sans text-sm sm:text-base text-ivory/50 leading-relaxed">
              Our design philosophy is rooted in the belief that couture is not merely clothing — it is an
              expression of identity, a celebration of milestones, and a testament to the art of slow,
              intentional fashion. From the first sketch to the final drape, every Shringarika piece is
              handcrafted with devotion, using heritage embroidery techniques, luxurious fabrics sourced from
              the finest looms, and an unwavering commitment to making every woman feel extraordinary.
            </p>

            <p className="font-dm-sans text-sm sm:text-base text-ivory/50 leading-relaxed">
              We believe that when a woman wears Shringarika, she doesn&apos;t just wear an outfit — she steps
              into her most beautiful story. And that story, like the golden threads that weave through our
              creations, is entirely her own.
            </p>

            <div className="pt-4">
              <a
                href="#bespoke"
                className="inline-flex items-center gap-3 font-dm-sans text-xs tracking-[0.2em] uppercase text-gradient-gold hover:text-gold-bright transition-colors duration-300 group"
              >
                Discover Our Craft
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Cards — Gaming-card style with neon gold borders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-20"
          style={{ perspective: '1000px' }}
        >
          {philosophyCards.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, rotateX: -30, y: 60 }}
              animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.05, rotateX: 2, rotateY: -2 }}
              className="gaming-card text-center p-5 sm:p-6 cursor-pointer group relative"
              style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
            >
              {/* Neon gold border glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-gold-accent/30 rounded-sm"
                style={{ boxShadow: '0 0 15px rgba(212,175,55,0.1), inset 0 0 15px rgba(212,175,55,0.03)' }} />

              {/* Icon */}
              <span className="text-gold-accent/40 text-lg mb-2 block group-hover:text-gold-accent/70 transition-colors duration-500"
                style={{ textShadow: '0 0 8px rgba(212,175,55,0.2)' }}>
                {item.icon}
              </span>

              {/* Animated gold line */}
              <div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-gold-accent/60 to-transparent mx-auto mb-4 group-hover:w-10 transition-all duration-500"
                style={{ boxShadow: '0 0 6px rgba(212,175,55,0.2)' }} />

              <h3 className="font-playfair text-base sm:text-lg text-ivory mb-3">{item.title}</h3>
              <p className="font-dm-sans text-[10px] sm:text-xs text-ivory/40 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
