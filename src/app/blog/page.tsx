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

const blogCategories = ['All', 'Bridal Style', 'Lehenga & Saree', 'Wedding Trends', 'Styling Tips', 'Behind the Craft', 'Jaipur Fashion', 'Celebrity'];

const featuredPost = {
  slug: 'ultimate-bridal-lehenga-guide-2025',
  title: 'The Ultimate Bridal Lehenga Guide for 2025 Brides',
  excerpt: 'From choosing the right silhouette to understanding embroidery techniques, this comprehensive guide covers everything a modern bride needs to know before investing in her dream lehenga. We break down fabrics, colours, and craftsmanship so you can make an informed, confident decision.',
  category: 'Bridal Style',
  readTime: '12 min read',
  date: 'February 15, 2025',
  gradient: 'from-burgundy-deep via-navy to-burgundy',
  letter: 'U',
};

const blogPosts = [
  {
    slug: 'zardozi-embroidery-history',
    title: 'The Art of Zardozi: A 3,000-Year-Old Craft Still Thriving in Jaipur',
    excerpt: 'Discover how the ancient Persian art of zardozi embroidery found its way to Rajasthan and why it remains the gold standard for bridal embellishment.',
    category: 'Behind the Craft',
    readTime: '8 min read',
    date: 'January 28, 2025',
    gradient: 'from-navy-deep via-zari-gold/10 to-burgundy-deep',
    letter: 'Z',
  },
  {
    slug: 'jaipur-bride-styling-tips',
    title: '10 Styling Tips Every Jaipur Bride Needs to Know',
    excerpt: 'From managing the December chill to choosing jewellery that complements Rajasthani bridal wear — practical advice from our styling team.',
    category: 'Styling Tips',
    readTime: '6 min read',
    date: 'January 12, 2025',
    gradient: 'from-burgundy via-navy to-zari-gold/10',
    letter: 'J',
  },
  {
    slug: 'saree-draping-styles-2025',
    title: '7 Saree Draping Styles That Are Redefining 2025 Fashion',
    excerpt: 'The saree is no longer just traditional — it\'s becoming the most versatile garment in a modern woman\'s wardrobe. Here are the draping styles leading the revolution.',
    category: 'Lehenga & Saree',
    readTime: '7 min read',
    date: 'December 30, 2024',
    gradient: 'from-navy via-burgundy-deep to-navy-light',
    letter: 'S',
  },
  {
    slug: 'wedding-trends-2025',
    title: 'Wedding Fashion Trends 2025: What\'s In, What\'s Out, What\'s Next',
    excerpt: 'Our design team predicts the biggest bridal and festive fashion trends for 2025 — from the return of velvet to the rise of minimalist Indian couture.',
    category: 'Wedding Trends',
    readTime: '10 min read',
    date: 'December 15, 2024',
    gradient: 'from-burgundy-deep via-navy to-burgundy',
    letter: 'W',
  },
  {
    slug: 'behind-scenes-atelier',
    title: 'A Day Inside the Shringarika Atelier: Where Fabric Becomes Feeling',
    excerpt: 'From the first cup of chai to the final stitch of the evening — an intimate, behind-the-scenes look at what really goes into making a Shringarika creation.',
    category: 'Behind the Craft',
    readTime: '9 min read',
    date: 'November 28, 2024',
    gradient: 'from-noir-soft via-burgundy-deep/20 to-noir',
    letter: 'A',
  },
  {
    slug: 'celebrity-wedding-lehengas',
    title: 'Celebrity Wedding Lehengas That Changed Indian Fashion Forever',
    excerpt: 'From Anushka Sharma\'s pale pink Sabyasaci to Alia Bhatt\'s ivory elegance — the bridal moments that set trends for millions of Indian women.',
    category: 'Celebrity',
    readTime: '7 min read',
    date: 'November 10, 2024',
    gradient: 'from-navy via-zari-gold/15 to-burgundy-deep',
    letter: 'C',
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SiteLayout>
      <main className="bg-[#0a0a12]">

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-burgundy-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a12]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-zari-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-6"
          >
            Insights & Inspiration
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-ivory leading-[1.1] mb-8"
          >
            The Journal
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
            Stories, Style & Inspiration — from the heart of our atelier to the world
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 gaming-card hover:border-zari-gold/30 transition-all duration-500 overflow-hidden">
                <div className={`aspect-[16/9] lg:aspect-auto bg-gradient-to-br ${featuredPost.gradient} overflow-hidden`}>
                  <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <span className="font-cormorant text-zari-gold/10 text-9xl italic">{featuredPost.letter}</span>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-b from-[#0f1320] to-[#0a0a12]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-dm-sans text-[10px] tracking-wider uppercase text-zari-gold px-2 py-1 bg-zari-gold/5">{featuredPost.category}</span>
                    <span className="font-dm-sans text-[10px] text-ivory/30">{featuredPost.readTime}</span>
                  </div>
                  <h2 className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-ivory mb-4 group-hover:text-zari-gold transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  <p className="font-dm-sans text-sm text-ivory/40 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-dm-sans text-xs text-ivory/30">{featuredPost.date}</span>
                    <span className="font-dm-sans text-xs text-zari-gold tracking-wider uppercase group-hover:tracking-widest transition-all duration-300">Read Article →</span>
                  </div>
                </div>
              </div>
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* Main Content: Grid + Sidebar */}
      <section className="section-luxury bg-[#0d1220] pt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-12">
            {/* Blog Grid */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full bg-noir-soft/50 border border-zari-gold/20 pl-12 pr-4 py-3 font-dm-sans text-sm text-ivory placeholder:text-ivory/20 focus:border-zari-gold focus:shadow-[0_0_12px_rgba(212,175,55,0.15)] focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-1 mb-8">
                {blogCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 font-dm-sans text-[10px] tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-gradient-to-r from-zari-gold to-gold-bright text-noir shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                        : 'text-ivory/40 hover:text-ivory hover:bg-navy-deep border border-zari-gold/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <FadeInSection key={post.slug} delay={index * 0.1}>
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <div className={`aspect-[16/10] bg-gradient-to-br ${post.gradient} rounded-sm overflow-hidden mb-4 gaming-card`}>
                        <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                          <span className="font-cormorant text-zari-gold/10 text-7xl italic">{post.letter}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-dm-sans text-[10px] tracking-wider uppercase text-zari-gold">{post.category}</span>
                        <span className="w-1 h-1 bg-ivory/10 rounded-full" />
                        <span className="font-dm-sans text-[10px] text-ivory/30">{post.readTime}</span>
                      </div>
                      <h3 className="font-playfair text-lg text-ivory mb-2 group-hover:text-zari-gold transition-colors duration-300 leading-snug">{post.title}</h3>
                      <p className="font-dm-sans text-xs text-ivory/40 leading-relaxed mb-3 line-clamp-3">{post.excerpt}</p>
                      <span className="font-dm-sans text-[10px] text-ivory/30">{post.date}</span>
                    </Link>
                  </FadeInSection>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <p className="font-cormorant text-2xl text-ivory/30 italic">No articles found</p>
                  <p className="font-dm-sans text-sm text-ivory/20 mt-2">Try a different search or category</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-32 space-y-8">
                {/* Categories */}
                <div className="gaming-card p-6">
                  <p className="font-dm-sans text-xs tracking-wider uppercase text-ivory/30 mb-4">Categories</p>
                  <div className="space-y-2">
                    {blogCategories.filter(c => c !== 'All').map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`block w-full text-left font-dm-sans text-sm py-1.5 transition-colors duration-300 ${
                          activeCategory === cat ? 'text-zari-gold' : 'text-ivory/40 hover:text-ivory/70'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="p-6 bg-[#25D366]/5 border border-[#25D366]/20 gaming-card">
                  <p className="font-playfair text-base text-ivory mb-2">Quick Question?</p>
                  <p className="font-dm-sans text-xs text-ivory/40 mb-4 leading-relaxed">
                    Chat directly with our styling team on WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/919999999999?text=Hi!%20I%20have%20a%20quick%20question."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white font-dm-sans text-[10px] tracking-wider uppercase hover:bg-[#20bd5a] transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Us
                  </a>
                </div>

                {/* Book Appointment CTA */}
                <div className="gaming-card p-6 bg-gradient-to-b from-[#0f1320] to-[#0a0a12]">
                  <p className="font-playfair text-base text-ivory mb-2">Visit Our Atelier</p>
                  <p className="font-dm-sans text-xs text-ivory/30 mb-4 leading-relaxed">
                    Experience the Shringarika world in person. Book a private consultation.
                  </p>
                  <Link
                    href="/appointments"
                    className="inline-block px-4 py-2 border border-zari-gold text-zari-gold font-dm-sans text-[10px] tracking-wider uppercase hover:bg-zari-gold hover:text-noir hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 md:py-24 bg-[#0a0a12]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Stay Inspired</p>
            <h2 className="font-cormorant text-3xl md:text-4xl text-ivory mb-4">Subscribe to The Journal</h2>
            <p className="font-dm-sans text-sm text-ivory/50 mb-8 leading-relaxed">
              Receive styling inspiration, new collection previews, behind-the-scenes stories,
              and exclusive atelier invitations — delivered to your inbox every fortnight.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-noir-soft/50 border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-ivory placeholder:text-ivory/20 focus:border-zari-gold focus:shadow-[0_0_12px_rgba(212,175,55,0.15)] focus:outline-none transition-all duration-300"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-zari-gold to-gold-bright text-noir font-dm-sans text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </FadeInSection>
        </div>
      </section>

      </main>
    </SiteLayout>
  );
}
