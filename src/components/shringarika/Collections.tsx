'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const collections = [
  {
    title: 'Bridal Edit',
    subtitle: 'Lehengas & Bridal Sarees',
    description: 'Where dreams are woven into silk and adorned with heritage zari — each bridal creation is a masterpiece of devotion.',
    category: 'bridal',
    gradient: 'from-[#1a0a15] via-[#2a1025] to-[#0f1320]',
    letter: 'B',
  },
  {
    title: 'Groom Edit',
    subtitle: 'Sherwanis & Bandhgalas',
    description: 'Regal elegance for the modern groom — handcrafted sherwanis and bandhgalas that command the occasion with quiet power.',
    category: 'sherwanis',
    gradient: 'from-[#0d1220] via-[#1a2b4a] to-[#0f1320]',
    letter: 'G',
  },
  {
    title: 'Festive Collection',
    subtitle: 'Sarees & Anarkalis',
    description: 'Celebrate every moment in couture that captures the joy and splendor of India\'s most beautiful occasions.',
    category: 'festive',
    gradient: 'from-[#12081a] via-[#2a0a20] to-[#0d1220]',
    letter: 'F',
  },
  {
    title: 'Western Fusion',
    subtitle: 'Contemporary Elegance',
    description: 'Where traditional artistry meets modern silhouettes — for the woman who moves between worlds with grace.',
    category: 'fusion',
    gradient: 'from-[#0f1320] via-[#1a2b4a] to-[#1a0a15]',
    letter: 'W',
  },
  {
    title: 'Men\'s Kurta Sets',
    subtitle: 'Refined Tradition',
    description: 'From intimate pujas to grand celebrations — impeccably tailored kurta sets that honor tradition with a modern edge.',
    category: 'men-kurta',
    gradient: 'from-[#0d1220] via-[#0f1525] to-[#12081a]',
    letter: 'K',
  },
  {
    title: 'Ready-to-Wear',
    subtitle: 'Curated Luxury',
    description: 'Effortlessly elegant pieces designed for the modern woman — refined, versatile, and unmistakably Shringarika.',
    category: 'rtw',
    gradient: 'from-[#1a0a15] via-[#0f1320] to-[#0d1220]',
    letter: 'R',
  },
];

export default function Collections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="collections" className="relative bg-noir section-luxury overflow-hidden">
      {/* Navy-burgundy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d1220] to-[#0a0a12]" />

      {/* Subtle mesh/grid pattern replacing diagonal texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />

      {/* Parallax ambient glow */}
      <motion.div
        animate={isInView ? { y: [0, -20, 0] } : {}}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-navy/15 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={isInView ? { y: [0, 15, 0] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-burgundy/10 rounded-full blur-[130px] pointer-events-none"
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, rotateX: -15, y: 25 }}
          animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ perspective: '600px' }}
          className="text-center mb-4"
        >
          <span className="font-dm-sans text-gold-accent/80 text-[10px] tracking-[0.4em] uppercase"
            style={{ textShadow: '0 0 8px rgba(212,175,55,0.25)' }}>
            Collections
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, rotateX: -20, y: 35 }}
          animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ perspective: '800px' }}
          className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory text-center font-light leading-tight mb-6"
        >
          Curated for the <span className="italic text-gradient-gold">Extraordinary</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-dm-sans text-ivory/40 text-sm sm:text-base text-center max-w-xl mx-auto mb-16"
        >
          Each collection is a chapter in the Shringarika story — designed to make
          every occasion unforgettable for both women and men.
        </motion.p>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6" style={{ perspective: '1200px' }}>
          {collections.map((collection, i) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, rotateX: -25, y: 50 }}
              animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{
                scale: 1.03,
                rotateY: 3,
                rotateX: 1,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="collection-card card-3d-tilt group relative aspect-[3/4] overflow-hidden cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Dark cinematic gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} transition-transform duration-[1.2s] ease-out group-hover:scale-110`}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-cormorant text-gold-accent/10 text-7xl italic group-hover:text-gold-accent/20 transition-colors duration-700"
                    style={{ textShadow: '0 0 40px rgba(212,175,55,0.08)' }}>{collection.letter}</span>
                </div>
              </div>

              {/* Default overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/90 via-[#0a0a12]/30 to-transparent transition-opacity duration-700" />

              {/* Hover overlay */}
              <div className="collection-overlay absolute inset-0 bg-[#0a0a12]/70 backdrop-blur-[2px] opacity-0 transition-opacity duration-700 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  initial={false}
                  animate={hoveredIndex === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-dm-sans text-gold-accent text-[10px] tracking-[0.3em] uppercase mb-3"
                    style={{ textShadow: '0 0 6px rgba(212,175,55,0.3)' }}>
                    {collection.subtitle}
                  </p>
                  <p className="font-dm-sans text-ivory/70 text-xs sm:text-sm leading-relaxed mb-6">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center gap-2 font-dm-sans text-xs tracking-[0.2em] uppercase text-gold-accent group relative pb-1">
                    View Collection
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    {/* Neon gold underline animation */}
                    <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gold-accent transition-all duration-500"
                      style={{ boxShadow: '0 0 6px rgba(212,175,55,0.4)' }} />
                  </span>
                </motion.div>
              </div>

              {/* Title overlay (always visible) */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <h3 className="font-cormorant text-xl sm:text-2xl text-ivory font-light mb-1 group-hover:opacity-0 transition-opacity duration-500">
                  {collection.title}
                </h3>
                <p className="font-dm-sans text-ivory/50 text-[10px] tracking-[0.2em] uppercase group-hover:opacity-0 transition-opacity duration-500">
                  {collection.subtitle}
                </p>
              </div>

              {/* Animated gold corner accents on hover */}
              <div className="absolute top-4 right-4 w-6 h-6 transition-all duration-700 opacity-0 group-hover:opacity-100">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-gold-accent/60"
                  style={{ boxShadow: '0 0 6px rgba(212,175,55,0.3)' }} />
                <div className="absolute top-0 right-0 h-full w-[1px] bg-gold-accent/60"
                  style={{ boxShadow: '0 0 6px rgba(212,175,55,0.3)' }} />
              </div>
              <div className="absolute bottom-4 left-4 w-6 h-6 transition-all duration-700 opacity-0 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-accent/60"
                  style={{ boxShadow: '0 0 6px rgba(212,175,55,0.3)' }} />
                <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gold-accent/60"
                  style={{ boxShadow: '0 0 6px rgba(212,175,55,0.3)' }} />
              </div>

              {/* Neon gold border glow on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-gold-accent/20 transition-colors duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 20px rgba(212,175,55,0.06)' }} />
            </motion.div>
          ))}
        </div>

        {/* Custom Bespoke CTA — Animated border + 3D hover */}
        <motion.div
          initial={{ opacity: 0, rotateX: -20, y: 40 }}
          animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02, rotateX: 1, rotateY: -1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="animated-border inline-block p-8 sm:p-12 bg-[#0a0a12]/80 backdrop-blur-sm"
          >
            <p className="font-dm-sans text-gold-accent/60 text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ textShadow: '0 0 6px rgba(212,175,55,0.2)' }}>
              Custom Bespoke
            </p>
            <h3 className="font-cormorant text-2xl sm:text-3xl text-ivory font-light italic mb-4">
              Your Vision. Our Craft.
            </h3>
            <p className="font-dm-sans text-ivory/50 text-sm mb-6 max-w-md mx-auto">
              Can&apos;t find exactly what you&apos;re dreaming of? Let us create it for you —
              a one-of-a-kind masterpiece, made only for you.
            </p>
            <a
              href="#bespoke"
              className="gaming-btn inline-flex items-center gap-3 px-8 py-3 font-dm-sans text-xs tracking-[0.2em] uppercase"
            >
              Start Your Custom Journey
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
