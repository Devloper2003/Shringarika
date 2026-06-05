'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const collections = [
  {
    title: 'Bridal Edit',
    subtitle: 'Lehengas & Bridal Sarees',
    description: 'Where dreams are woven into silk and adorned with heritage zari — each bridal creation is a masterpiece of devotion.',
    category: 'bridal',
    gradient: 'from-rose-gold-light/20 via-blush/50 to-champagne/40',
    letter: 'B',
  },
  {
    title: 'Groom Edit',
    subtitle: 'Sherwanis & Bandhgalas',
    description: 'Regal elegance for the modern groom — handcrafted sherwanis and bandhgalas that command the occasion with quiet power.',
    category: 'sherwanis',
    gradient: 'from-noir-soft/30 via-sandalwood/50 to-champagne/40',
    letter: 'G',
  },
  {
    title: 'Festive Collection',
    subtitle: 'Sarees & Anarkalis',
    description: 'Celebrate every moment in couture that captures the joy and splendor of India\'s most beautiful occasions.',
    category: 'festive',
    gradient: 'from-champagne/50 via-sandalwood/40 to-blush/40',
    letter: 'F',
  },
  {
    title: 'Western Fusion',
    subtitle: 'Contemporary Elegance',
    description: 'Where traditional artistry meets modern silhouettes — for the woman who moves between worlds with grace.',
    category: 'fusion',
    gradient: 'from-ivory-dark/60 via-champagne/40 to-blush/40',
    letter: 'W',
  },
  {
    title: 'Men\'s Kurta Sets',
    subtitle: 'Refined Tradition',
    description: 'From intimate pujas to grand celebrations — impeccably tailored kurta sets that honor tradition with a modern edge.',
    category: 'men-kurta',
    gradient: 'from-champagne/30 via-sandalwood/20 to-blush-warm/40',
    letter: 'K',
  },
  {
    title: 'Ready-to-Wear',
    subtitle: 'Curated Luxury',
    description: 'Effortlessly elegant pieces designed for the modern woman — refined, versatile, and unmistakably Shringarika.',
    category: 'rtw',
    gradient: 'from-blush-warm/40 via-champagne/40 to-sandalwood/40',
    letter: 'R',
  },
];

export default function Collections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="collections" className="relative bg-noir section-luxury overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(201,168,76,0.03) 35px, rgba(201,168,76,0.03) 36px)',
        }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="font-dm-sans text-zari-gold/80 text-[10px] tracking-[0.4em] uppercase">
            Collections
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {collections.map((collection, i) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="collection-card group relative aspect-[3/4] overflow-hidden cursor-pointer"
            >
              {/* Placeholder Image */}
              <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} transition-transform duration-[1.2s] ease-out group-hover:scale-110`}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-cormorant text-noir/10 text-7xl italic">{collection.letter}</span>
                </div>
              </div>

              {/* Default overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/20 to-transparent transition-opacity duration-700" />

              {/* Hover overlay */}
              <div className="collection-overlay absolute inset-0 bg-noir/60 opacity-0 transition-opacity duration-700 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  initial={false}
                  animate={hoveredIndex === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-dm-sans text-zari-gold text-[10px] tracking-[0.3em] uppercase mb-3">
                    {collection.subtitle}
                  </p>
                  <p className="font-dm-sans text-ivory/70 text-xs sm:text-sm leading-relaxed mb-6">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center gap-2 font-dm-sans text-xs tracking-[0.2em] uppercase text-zari-gold border-b border-zari-gold/40 pb-1 hover:border-zari-gold transition-colors">
                    View Collection
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-zari-gold/0 group-hover:border-zari-gold/40 transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Custom Bespoke CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 sm:p-12 border border-zari-gold/20 bg-noir/50 backdrop-blur-sm">
            <p className="font-dm-sans text-zari-gold/60 text-[10px] tracking-[0.3em] uppercase mb-3">
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
              className="inline-flex items-center gap-3 px-8 py-3 border border-zari-gold text-zari-gold font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
            >
              Start Your Custom Journey
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
