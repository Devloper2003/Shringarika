'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const galleryImages = [
  { alt: 'Bridal Lehenga Closeup — Gold Zari Embroidery', category: 'Bridal', gradient: 'from-rose-blue-light/20 via-blush/40 to-champagne/40', letter: 'B' },
  { alt: 'Festive Designer Saree — Champagne & Gold', category: 'Festive', gradient: 'from-champagne/40 via-sandalwood/40 to-blush/40', letter: 'F' },
  { alt: 'Western Fusion — Contemporary Elegance', category: 'Fusion', gradient: 'from-ivory-dark via-champagne to-blush', letter: 'W' },
  { alt: 'Shringarika Bridal Lookbook — Draped in Dreams', category: 'Bridal', gradient: 'from-blush-warm/40 via-champagne/40 to-sandalwood/40', letter: 'S' },
  { alt: 'Ready-to-Wear — Curated Luxury', category: 'RTW', gradient: 'from-champagne/30 via-blush/40 to-sandalwood/40', letter: 'R' },
  { alt: 'Atelier — Where Every Stitch Holds a Story', category: 'Atelier', gradient: 'from-noir-soft via-mauve-dusty/20 to-noir', letter: 'A' },
];

export default function Lookbook() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="lookbook" className="relative bg-noir-soft section-luxury overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="font-dm-sans text-zari-gold/80 text-[10px] tracking-[0.4em] uppercase">
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
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
              className={`group relative overflow-hidden cursor-pointer zari-hover ${
                i === 0 || i === 3 ? 'sm:row-span-2 aspect-[3/4]' : 'aspect-[3/4]'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient} group-hover:scale-105 transition-transform duration-[1.5s] ease-out`}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-cormorant text-ivory/15 text-5xl italic">{image.letter}</span>
                </div>
              </div>
              {/* Default subtle overlay */}
              <div className="absolute inset-0 bg-noir/20 group-hover:bg-noir/40 transition-colors duration-700" />
              
              {/* Category tag */}
              <div className="absolute top-4 left-4">
                <span className="font-dm-sans text-[9px] tracking-[0.3em] uppercase text-ivory/60 bg-noir/40 backdrop-blur-sm px-3 py-1">
                  {image.category}
                </span>
              </div>

              {/* Hover reveal */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-16 h-16 border border-ivory/40 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-ivory" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
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
          <div className="luxury-divider mb-8 max-w-xs mx-auto" />
          <p className="font-dm-sans text-ivory/40 text-sm mb-4">
            Follow our journey and see more of our creations
          </p>
          <a
            href="https://www.instagram.com/houseofshringarika"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-dm-sans text-xs tracking-[0.2em] uppercase text-zari-gold hover:text-zari-gold-light transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            @houseofshringarika
          </a>
        </motion.div>
      </div>
    </section>
  );
}
