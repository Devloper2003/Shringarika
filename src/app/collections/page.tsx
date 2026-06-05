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

const categories = ['All', 'Women', 'Men', 'Bridal Lehengas', 'Designer Sarees', 'Sherwanis', 'Bandhgalas', 'Kurta Sets', 'Festive Wear', 'Western Fusion', 'Ready-to-Wear'];

const products = [
  // Women's Collection
  { id: 1, name: 'Maharani Bridal Lehenga', category: 'Bridal Lehengas', gender: 'Women', price: 'Inquire for Price', gradient: 'from-rose-gold-light via-blush to-champagne', letter: 'M' },
  { id: 2, name: 'Varanasi Silk Saree', category: 'Designer Sarees', gender: 'Women', price: '₹85,000', gradient: 'from-champagne via-sandalwood to-blush', letter: 'V' },
  { id: 3, name: 'Padmini Festive Gown', category: 'Festive Wear', gender: 'Women', price: '₹1,20,000', gradient: 'from-blush via-rose-gold-light/30 to-champagne', letter: 'P' },
  { id: 4, name: 'Noor Fusion Drape Set', category: 'Western Fusion', gender: 'Women', price: '₹68,000', gradient: 'from-sandalwood via-champagne to-ivory-dark', letter: 'N' },
  { id: 5, name: 'Rajputana Bridal Lehenga', category: 'Bridal Lehengas', gender: 'Women', price: 'Inquire for Price', gradient: 'from-rose-gold-light/50 via-blush-warm to-champagne', letter: 'R' },
  { id: 6, name: 'Chanderi Elegance Saree', category: 'Designer Sarees', gender: 'Women', price: '₹55,000', gradient: 'from-champagne/60 via-blush to-sandalwood', letter: 'C' },
  { id: 7, name: 'Mehfil Anarkali Set', category: 'Festive Wear', gender: 'Women', price: '₹78,000', gradient: 'from-blush-warm via-champagne to-rose-gold-light/20', letter: 'M' },
  { id: 8, name: 'Sakhi RTW Kurta Set', category: 'Ready-to-Wear', gender: 'Women', price: '₹28,000', gradient: 'from-ivory-dark via-champagne to-blush', letter: 'S' },
  // Men's Collection
  { id: 9, name: 'Maharaja Sherwani', category: 'Sherwanis', gender: 'Men', price: 'Inquire for Price', gradient: 'from-noir-soft/40 via-sandalwood to-champagne', letter: 'M' },
  { id: 10, name: 'Royal Bandhgala Suit', category: 'Bandhgalas', gender: 'Men', price: '₹1,45,000', gradient: 'from-champagne/60 via-sandalwood/30 to-blush-warm', letter: 'R' },
  { id: 11, name: 'Heritage Silk Kurta Set', category: 'Kurta Sets', gender: 'Men', price: '₹42,000', gradient: 'from-sandalwood via-champagne to-ivory-dark', letter: 'H' },
  { id: 12, name: 'Jodhpuri Achkan', category: 'Bandhgalas', gender: 'Men', price: '₹1,10,000', gradient: 'from-champagne via-rose-gold-light/30 to-sandalwood', letter: 'J' },
  { id: 13, name: 'Padmini Zardozi Lehenga', category: 'Bridal Lehengas', gender: 'Women', price: 'Inquire for Price', gradient: 'from-champagne via-rose-gold-light/40 to-blush-warm', letter: 'P' },
  { id: 14, name: 'Gota Patti Festive Saree', category: 'Designer Sarees', gender: 'Women', price: '₹92,000', gradient: 'from-blush via-sandalwood to-champagne', letter: 'G' },
  { id: 15, name: 'Indowestern Jacket Set', category: 'Western Fusion', gender: 'Women', price: '₹72,000', gradient: 'from-sandalwood/80 via-champagne to-blush', letter: 'I' },
  { id: 16, name: 'Everyday Luxe Co-ord', category: 'Ready-to-Wear', gender: 'Women', price: '₹22,000', gradient: 'from-ivory-dark via-blush to-champagne', letter: 'E' },
  { id: 17, name: 'Utsav Embroidered Kurta', category: 'Kurta Sets', gender: 'Men', price: '₹35,000', gradient: 'from-champagne via-blush-warm to-sandalwood', letter: 'U' },
  { id: 18, name: 'Regal Wedding Sherwani', category: 'Sherwanis', gender: 'Men', price: 'Inquire for Price', gradient: 'from-rose-gold-light/30 via-champagne to-sandalwood', letter: 'R' },
  { id: 19, name: 'Evening Bandhgala', category: 'Bandhgalas', gender: 'Men', price: '₹95,000', gradient: 'from-noir-soft/30 via-champagne to-blush', letter: 'E' },
  { id: 20, name: 'Festive Men\'s Kurta', category: 'Kurta Sets', gender: 'Men', price: '₹28,000', gradient: 'from-blush-warm via-champagne/60 to-sandalwood', letter: 'F' },
];

const sortOptions = ['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low'];

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = activeCategory === 'All'
    ? products
    : activeCategory === 'Women'
    ? products.filter(p => p.gender === 'Women')
    : activeCategory === 'Men'
    ? products.filter(p => p.gender === 'Men')
    : products.filter(p => p.category === activeCategory);

  return (
    <SiteLayout>
      <main className="bg-ivory">

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-champagne/60 via-blush/40 to-sandalwood/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-6"
          >
            Our Collections
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-noir leading-[1.1] mb-6"
          >
            Curated for the Extraordinary
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-[1px] bg-zari-gold mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-cormorant text-xl text-noir/60 italic max-w-2xl mx-auto"
          >
            Each piece is a chapter in a story of craftsmanship, heritage, and timeless beauty
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 md:top-20 z-30 bg-ivory/95 backdrop-blur-md border-b border-zari-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Category Tabs - Desktop */}
            <div className="hidden md:flex items-center gap-1 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 font-dm-sans text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-noir text-ivory'
                      : 'text-noir/50 hover:text-noir hover:bg-blush/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile Category Scroll */}
            <div className="md:hidden flex items-center gap-1 overflow-x-auto max-w-[60%] pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 font-dm-sans text-[10px] tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-noir text-ivory'
                      : 'text-noir/50 hover:text-noir'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-dm-sans text-xs text-noir/60 bg-transparent border border-zari-gold/20 px-3 py-2 focus:outline-none focus:border-zari-gold/50"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              {/* Filter Toggle Mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden font-dm-sans text-xs text-noir/60 border border-zari-gold/20 px-3 py-2"
              >
                Filter
              </button>
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-zari-gold/10"
            >
              <div>
                <p className="font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-3">Price Range</p>
                <div className="flex flex-wrap gap-2">
                  {['Under ₹30K', '₹30K - ₹60K', '₹60K - ₹1L', '₹1L+', 'Inquire'].map((range) => (
                    <button key={range} className="px-3 py-1.5 font-dm-sans text-[10px] text-noir/50 border border-zari-gold/10 hover:border-zari-gold/30 hover:text-noir transition-all">
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Desktop Sidebar + Product Grid */}
      <section className="section-luxury bg-ivory pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-32">
                <div className="mb-8">
                  <p className="font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-4">Category</p>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`block w-full text-left font-dm-sans text-sm py-1.5 transition-colors duration-300 ${
                          activeCategory === cat ? 'text-noir' : 'text-noir/40 hover:text-noir/70'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-4">Price Range</p>
                  <div className="space-y-2">
                    {['Under ₹30K', '₹30K - ₹60K', '₹60K - ₹1L', '₹1L+', 'Inquire'].map((range) => (
                      <button key={range} className="block w-full text-left font-dm-sans text-sm py-1.5 text-noir/40 hover:text-noir/70 transition-colors duration-300">
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-4">Fabric</p>
                  <div className="space-y-2">
                    {['Silk', 'Velvet', 'Organza', 'Chanderi', 'Georgette'].map((fabric) => (
                      <button key={fabric} className="block w-full text-left font-dm-sans text-sm py-1.5 text-noir/40 hover:text-noir/70 transition-colors duration-300">
                        {fabric}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sidebar CTA */}
                <div className="p-6 bg-noir">
                  <p className="font-cormorant text-lg text-ivory mb-2">Can&apos;t find it?</p>
                  <p className="font-dm-sans text-xs text-ivory/40 mb-4 leading-relaxed">
                    We&apos;ll create it from scratch just for you.
                  </p>
                  <Link
                    href="/bespoke"
                    className="inline-block px-4 py-2 border border-zari-gold text-zari-gold font-dm-sans text-[10px] tracking-wider uppercase hover:bg-zari-gold hover:text-noir transition-all duration-300"
                  >
                    Custom Bespoke
                  </Link>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="font-dm-sans text-xs text-noir/40">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <FadeInSection key={product.id} delay={index * 0.08}>
                    <div className="group cursor-pointer">
                      <div className="relative aspect-[3/4] bg-gradient-to-br overflow-hidden mb-3">
                        <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`} />
                        {/* Placeholder letter */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`font-cormorant text-noir/10 text-7xl italic`}>{product.letter}</span>
                        </div>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/40 transition-all duration-500 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 flex flex-col items-center gap-3">
                            <span className="font-dm-sans text-xs tracking-wider uppercase text-ivory">View Details</span>
                            <a
                              href={`https://wa.me/919999999999?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="font-dm-sans text-[10px] tracking-wider uppercase text-zari-gold/80 mb-1">{product.category} · {product.gender}</p>
                        <h3 className="font-playfair text-sm md:text-base text-noir mb-1 group-hover:text-zari-gold transition-colors duration-300">{product.name}</h3>
                        <p className="font-dm-sans text-xs text-noir/50">{product.price}</p>
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Bespoke Featured Section */}
      <section className="section-luxury bg-noir">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Beyond the Collection</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-ivory mb-6">Custom Bespoke</h2>
              <div className="space-y-4 font-dm-sans text-sm text-ivory/50 leading-relaxed">
                <p>
                  Our collections represent only a fraction of what we can create. When you choose bespoke, you enter
                  a world of limitless possibility — where your imagination sets the boundaries and our artisans bring
                  every detail to life.
                </p>
                <p>
                  From the first sketch to the final drape, every bespoke creation is a deeply collaborative journey.
                  You choose the fabric, the silhouette, the embroidery, the colour palette. We provide the expertise,
                  the artistry, and the unwavering attention to detail that transforms a vision into a masterpiece.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/bespoke"
                  className="inline-flex items-center px-8 py-3 bg-zari-gold text-noir font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-zari-gold-light transition-all duration-500 btn-luxury-glow"
                >
                  Explore Bespoke
                </Link>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="aspect-square bg-gradient-to-br from-noir-soft via-mauve-dusty/20 to-noir rounded-sm overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-cormorant text-ivory/10 text-9xl italic block">B</span>
                    <span className="font-dm-sans text-ivory/20 text-xs tracking-[0.3em] uppercase">Bespoke Creation</span>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Can't Find CTA */}
      <section className="py-16 md:py-24 bg-blush/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="font-cormorant text-3xl md:text-4xl text-noir mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="font-dm-sans text-sm text-noir/60 mb-8 leading-relaxed">
              Create it. Our bespoke service lets you design your dream outfit from scratch —
              with personal guidance from our design team every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/bespoke"
                className="inline-flex items-center px-8 py-3 bg-noir text-ivory font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-noir-soft transition-all duration-500"
              >
                Create It
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hi!%20I%20can't%20find%20what%20I'm%20looking%20for%20in%20your%20collections.%20Can%20you%20help?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 border border-noir/20 text-noir font-dm-sans text-xs tracking-[0.2em] uppercase hover:border-zari-gold hover:text-zari-gold transition-all duration-500"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      </main>
    </SiteLayout>
  );
}
