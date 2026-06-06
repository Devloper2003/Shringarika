'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const galleryImages = [
  { alt: 'Bridal Lehenga Closeup — Gold Zari Embroidery', category: 'Bridal', gradient: 'from-[#6b1a2a]/40 via-[#0d1220] to-[#1a2b4a]/40', letter: 'B' },
  { alt: 'Festive Designer Saree — Champagne & Gold', category: 'Festive', gradient: 'from-[#1a2b4a]/40 via-[#0d1220] to-[#6b1a2a]/30', letter: 'F' },
  { alt: 'Western Fusion — Contemporary Elegance', category: 'Fusion', gradient: 'from-[#0d1220] via-[#1a2b4a]/50 to-[#0a0a12]', letter: 'W' },
  { alt: 'Shringarika Bridal Lookbook — Draped in Dreams', category: 'Bridal', gradient: 'from-[#6b1a2a]/30 via-[#0d1220] to-[#1a2b4a]/40', letter: 'S' },
  { alt: 'Ready-to-Wear — Curated Luxury', category: 'RTW', gradient: 'from-[#1a2b4a]/30 via-[#0a0a12] to-[#6b1a2a]/20', letter: 'R' },
  { alt: 'Atelier — Where Every Stitch Holds a Story', category: 'Atelier', gradient: 'from-[#0a0a12] via-[#1a2b4a]/40 to-[#0d1220]', letter: 'A' },
];

export default function Lookbook() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="lookbook" className="relative overflow-hidden section-luxury" style={{ background: 'linear-gradient(180deg, #0a0a12 0%, #0d1220 50%, #0a0a12 100%)' }}>
      {/* Radial glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="font-dm-sans text-[#D4AF37]/80 text-[10px] tracking-[0.4em] uppercase">
            Portfolio
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory text-center font-light leading-tight mb-6"
        >
          The <span className="italic text-gradient-gold">Lookbook</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-dm-sans text-ivory/40 text-sm sm:text-base text-center max-w-xl mx-auto mb-16"
        >
          A curated gallery of our most breathtaking creations — editorial moments 
          captured in silk, zari, and the warm glow of the atelier.
        </motion.p>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {galleryImages.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: 5 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              className={`group relative overflow-hidden cursor-pointer border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-700 ${
                i === 0 || i === 3 ? 'sm:row-span-2 aspect-[3/4]' : 'aspect-[3/4]'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient} group-hover:scale-105 transition-transform duration-[1.5s] ease-out`}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-cormorant text-ivory/10 text-5xl italic group-hover:text-ivory/15 transition-colors duration-700">{image.letter}</span>
                </div>
              </div>
              {/* Default subtle overlay */}
              <div className="absolute inset-0 bg-[#0a0a12]/30 group-hover:bg-[#0a0a12]/50 transition-colors duration-700" />
              
              {/* Category tag */}
              <div className="absolute top-4 left-4">
                <span className="font-dm-sans text-[9px] tracking-[0.3em] uppercase text-ivory/60 bg-[#0a0a12]/60 backdrop-blur-sm px-3 py-1 border border-[#D4AF37]/10">
                  {image.category}
                </span>
              </div>

              {/* Hover reveal with 3D tilt */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:[transform:translateZ(20px)]">
                <div className="w-16 h-16 border border-[#D4AF37]/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Neon gold border glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[inset_0_0_30px_rgba(212,175,55,0.1)] pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mb-8" />
          <p className="font-dm-sans text-ivory/40 text-sm mb-4">
            Follow our journey and see more of our creations
          </p>
          <a
            href="https://www.instagram.com/houseofshringarika"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-dm-sans text-xs tracking-[0.2em] uppercase text-[#D4AF37] hover:text-[#FFD700] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            @houseofshringarika
          </a>
        </motion.div>
      </div>
    </section>
  );
}
