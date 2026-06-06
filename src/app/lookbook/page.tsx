'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import SiteLayout from '@/components/shringarika/SiteLayout';

function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const categories = ['All', 'Bridal', 'Festive', 'Western', 'Atelier', 'Campaign'];

const lookbookImages = [
  { id: 1, category: 'Bridal', aspect: 'aspect-[3/4]', gradient: 'from-burgundy-deep via-burgundy to-navy', letter: 'B', title: 'Maharani Bridal' },
  { id: 2, category: 'Festive', aspect: 'aspect-square', gradient: 'from-navy via-zari-gold/10 to-burgundy-deep', letter: 'F', title: 'Mehfil Night' },
  { id: 3, category: 'Bridal', aspect: 'aspect-[4/5]', gradient: 'from-burgundy via-burgundy-light to-navy', letter: 'R', title: 'Royal Reception' },
  { id: 4, category: 'Western', aspect: 'aspect-[3/4]', gradient: 'from-navy-light via-navy to-burgundy-deep', letter: 'W', title: 'Fusion Silhouette' },
  { id: 5, category: 'Atelier', aspect: 'aspect-square', gradient: 'from-noir-soft via-burgundy-deep/20 to-noir', letter: 'A', title: 'Behind the Needle' },
  { id: 6, category: 'Campaign', aspect: 'aspect-[4/5]', gradient: 'from-zari-gold/15 via-navy to-burgundy', letter: 'C', title: 'Spring/Summer 2025' },
  { id: 7, category: 'Festive', aspect: 'aspect-[3/4]', gradient: 'from-burgundy via-navy to-zari-gold/10', letter: 'D', title: 'Diwali Glamour' },
  { id: 8, category: 'Bridal', aspect: 'aspect-square', gradient: 'from-navy via-burgundy-deep to-navy-light', letter: 'V', title: 'Varanasi Vows' },
  { id: 9, category: 'Atelier', aspect: 'aspect-[4/5]', gradient: 'from-noir via-noir-soft to-burgundy-deep/30', letter: 'S', title: 'Silk & Story' },
  { id: 10, category: 'Western', aspect: 'aspect-[3/4]', gradient: 'from-navy-light via-zari-gold/10 to-burgundy-deep', letter: 'I', title: 'Indo-Modern' },
  { id: 11, category: 'Campaign', aspect: 'aspect-square', gradient: 'from-zari-gold/15 via-navy-deep to-burgundy', letter: 'H', title: 'Heritage Film' },
  { id: 12, category: 'Festive', aspect: 'aspect-[4/5]', gradient: 'from-burgundy-deep via-burgundy to-navy', letter: 'N', title: 'Navratri Nights' },
];

const bridalStories = [
  {
    name: 'Priya & Arjun',
    location: 'Udaipur Palace Wedding',
    quote: 'The moment I saw myself in the mirror wearing my Shringarika lehenga, I knew this was the one. It wasn\'t just beautiful — it felt like me.',
    gradient: 'from-burgundy via-burgundy-deep to-navy',
    letter: 'P',
  },
  {
    name: 'Kavya & Vikram',
    location: 'Jaipur Haveli Wedding',
    quote: 'Working with the Shringarika team was like having a fairy godmother who also happened to be a genius designer. They turned my Pinterest dreams into reality.',
    gradient: 'from-navy via-zari-gold/10 to-burgundy-deep',
    letter: 'K',
  },
  {
    name: 'Meera & Rohan',
    location: 'Delhi Garden Wedding',
    quote: 'My grandmother cried when she saw the gota patti work — it reminded her of her own bridal lehenga from 50 years ago. That\'s the magic of Shringarika.',
    gradient: 'from-burgundy-deep via-navy to-burgundy',
    letter: 'M',
  },
];

const behindTheScenes = [
  { title: 'Zardozi Workshop', gradient: 'from-noir-soft to-noir', letter: 'Z' },
  { title: 'Dyeing Unit', gradient: 'from-noir via-burgundy-deep/20 to-noir-soft', letter: 'D' },
  { title: 'Pattern Cutting', gradient: 'from-noir-soft via-noir to-burgundy-deep/10', letter: 'P' },
  { title: 'Final Fitting', gradient: 'from-noir to-noir-soft', letter: 'F' },
  { title: 'Fabric Selection', gradient: 'from-burgundy-deep/20 via-noir to-noir-soft', letter: 'S' },
  { title: 'Embellishment', gradient: 'from-noir-soft via-burgundy-deep/30 to-noir', letter: 'E' },
];

export default function LookbookPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All'
    ? lookbookImages
    : lookbookImages.filter(img => img.category === activeCategory);

  return (
    <SiteLayout>
      <main className="bg-[#0a0a12]">

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-burgundy-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a12]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-zari-gold/[0.03] rounded-full blur-[130px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-6"
          >
            Visual Stories
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory leading-[1.1] mb-8"
          >
            The Lookbook
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-[1px] bg-zari-gold mx-auto mb-8 shadow-[0_0_8px_rgba(212,175,55,0.3)]"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-cormorant text-xl text-ivory/50 italic max-w-2xl mx-auto"
          >
            A curated visual journey through our most cherished creations and the stories behind them
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 md:top-20 z-30 bg-[#0a0a12]/95 backdrop-blur-md border-b border-zari-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-1 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-dm-sans text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-zari-gold to-gold-bright text-noir shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'text-ivory/50 hover:text-ivory hover:bg-navy-deep'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="section-luxury bg-[#0a0a12] pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-2 md:columns-3 gap-4 md:gap-6">
            {filteredImages.map((image, index) => (
              <FadeInSection key={image.id} delay={index * 0.06} className="break-inside-avoid mb-4 md:mb-6">
                <div className={`group relative ${image.aspect} bg-gradient-to-br ${image.gradient} rounded-sm overflow-hidden cursor-pointer card-3d-tilt`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-cormorant text-zari-gold/10 text-7xl md:text-8xl italic group-hover:scale-110 transition-transform duration-700">{image.letter}</span>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/50 transition-all duration-500 flex items-end p-4 md:p-6">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <p className="font-dm-sans text-[10px] tracking-wider uppercase text-zari-gold mb-1">{image.category}</p>
                      <p className="font-playfair text-base md:text-lg text-ivory">{image.title}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bridal Stories */}
      <section className="section-luxury bg-[#0d1220]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Real Brides, Real Stories</p>
              <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-ivory mb-6">Bridal Stories</h2>
              <p className="font-dm-sans text-sm text-ivory/50 max-w-2xl mx-auto leading-relaxed">
                Behind every Shringarika bride is a story of love, family, and the moment she first saw herself
                in the outfit of her dreams.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bridalStories.map((story, index) => (
              <FadeInSection key={story.name} delay={index * 0.15}>
                <div className="group cursor-pointer">
                  <div className={`aspect-[3/4] bg-gradient-to-br ${story.gradient} rounded-sm overflow-hidden mb-4 card-3d-tilt`}>
                    <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                      <span className="font-cormorant text-zari-gold/10 text-8xl italic">{story.letter}</span>
                    </div>
                  </div>
                  <p className="font-cormorant text-lg italic text-ivory/60 leading-relaxed mb-3">&ldquo;{story.quote}&rdquo;</p>
                  <p className="font-cinzel text-sm text-ivory tracking-wider">{story.name}</p>
                  <p className="font-dm-sans text-xs text-ivory/40">{story.location}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="section-luxury bg-noir">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Atelier Moments</p>
              <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-ivory mb-6">Behind the Scenes</h2>
              <p className="font-dm-sans text-sm text-ivory/40 max-w-2xl mx-auto leading-relaxed">
                Step inside our Jaipur atelier and witness the quiet artistry that transforms raw fabric into couture.
                These are the moments the world rarely sees — but they are where the true magic lives.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {behindTheScenes.map((item, index) => (
              <FadeInSection key={item.title} delay={index * 0.1}>
                <div className="group cursor-pointer">
                  <div className={`aspect-square bg-gradient-to-br ${item.gradient} rounded-sm overflow-hidden gaming-card`}>
                    <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                      <span className="font-cormorant text-ivory/10 text-6xl italic">{item.letter}</span>
                    </div>
                  </div>
                  <p className="font-dm-sans text-xs text-ivory/40 mt-2 tracking-wider uppercase text-center">{item.title}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 md:py-24 bg-[#0d1220]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Follow Our Journey</p>
            <h2 className="font-cormorant text-3xl md:text-4xl text-ivory mb-4">
              @houseofshringarika
            </h2>
            <p className="font-dm-sans text-sm text-ivory/50 mb-8 leading-relaxed">
              Daily inspiration, behind-the-scenes moments, and the latest from our atelier — follow us on Instagram
              for a front-row seat to the world of Shringarika.
            </p>
            <a
              href="https://www.instagram.com/houseofshringarika"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 border border-zari-gold/40 text-zari-gold font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-zari-gold hover:text-noir hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Follow on Instagram
            </a>
          </FadeInSection>
        </div>
      </section>

      </main>
    </SiteLayout>
  );
}
