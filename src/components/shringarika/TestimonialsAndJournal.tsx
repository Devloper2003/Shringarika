'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Bride',
    content: 'From the moment I stepped into the Shringarika atelier, I knew this was where my bridal dream would come alive. The lehenga they created for me was beyond anything I had imagined — every thread, every zari detail felt like it was woven just for my story. I didn\'t just wear an outfit; I became the bride I always dreamed of being.',
    rating: 5,
  },
  {
    name: 'Ananya Rathore',
    role: 'Client',
    content: 'The bespoke experience at House of Shringarika is unlike anything else. They listened to every detail, every hesitation, every dream I had — and translated it into a saree that made me weep with joy when I first saw it. This isn\'t fashion; this is art that understands your soul.',
    rating: 5,
  },
  {
    name: 'Meera Kapoor',
    role: 'Bride',
    content: 'My wedding reception outfit from Shringarika was the most complimented thing I\'ve ever worn. The western fusion gown was pure magic — contemporary yet deeply rooted in Indian craftsmanship. I felt like I was floating through the evening in a dream.',
    rating: 5,
  },
];

const blogPosts = [
  {
    title: 'How to Choose Your Dream Bridal Lehenga in 2025',
    category: 'Bridal Style',
    excerpt: 'A complete guide to finding the lehenga that tells your story — from fabric and color to embroidery and silhouette.',
    readTime: '8 min read',
  },
  {
    title: 'The Art of Bespoke: What Custom Fashion Really Means',
    category: 'Behind the Craft',
    excerpt: 'Beyond the sketches and stitches lies an intimate journey — here\'s what truly happens when you commission a custom creation.',
    readTime: '6 min read',
  },
  {
    title: 'Top Bridal Wear Trends in Jaipur This Wedding Season',
    category: 'Wedding Trends',
    excerpt: 'From heritage pinks to contemporary ivories, discover the bridal trends defining Jaipur\'s most fashionable season.',
    readTime: '5 min read',
  },
];

export default function TestimonialsAndJournal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section id="journal" className="relative overflow-hidden section-luxury" style={{ background: 'linear-gradient(160deg, #0d1220 0%, #1a2b4a 30%, #0d1220 60%, #6b1a2a 100%)' }}>
      {/* Radial glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="font-dm-sans text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase">
            Testimonials
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-ivory text-center font-light leading-tight mb-16"
        >
          Stories from Our <span className="italic text-[#D4AF37]">Brides</span>
        </motion.h2>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto mb-24"
        >
          <div className="text-center p-8 border border-[#D4AF37]/10 bg-[#0a0a12]/50 backdrop-blur-sm" style={{ perspective: '800px' }}>
            {/* Quote mark */}
            <div className="font-cormorant text-6xl text-[#D4AF37]/30 mb-4">&ldquo;</div>
            
            {/* Content */}
            <motion.p
              key={activeTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-cormorant text-lg sm:text-xl md:text-2xl text-ivory/80 italic leading-relaxed mb-8"
            >
              {testimonials[activeTestimonial].content}
            </motion.p>

            {/* Author */}
            <motion.div
              key={`author-${activeTestimonial}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="font-playfair text-lg text-ivory">
                {testimonials[activeTestimonial].name}
              </p>
              <p className="font-dm-sans text-xs text-[#D4AF37]/80 tracking-[0.15em] uppercase">
                {testimonials[activeTestimonial].role}
              </p>
            </motion.div>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mt-4">
              {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                <span key={i} className="text-[#D4AF37] text-sm">✦</span>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeTestimonial ? 'bg-[#D4AF37] w-8 shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'bg-ivory/20 hover:bg-ivory/40 w-2'
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Luxury Divider */}
        <div className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mb-20" />

        {/* Journal / Blog Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-4"
        >
          <span className="font-dm-sans text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase">
            The Journal
          </span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-ivory text-center font-light mb-12"
        >
          Stories, Style & <span className="italic text-[#D4AF37]">Inspiration</span>
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 40, rotateX: 5 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.12 }}
              style={{ perspective: '800px' }}
              className="group cursor-pointer border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 bg-[#0a0a12]/60 transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a2b4a 0%, #0d1220 50%, #6b1a2a 100%)' }}>
                <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <span className="font-cormorant text-ivory/15 text-4xl italic">S</span>
                </div>
              </div>
              <div className="p-5 transition-transform duration-700 group-hover:[transform:translateZ(10px)]">
                <span className="font-dm-sans text-[9px] tracking-[0.3em] uppercase text-[#D4AF37]/80">
                  {post.category}
                </span>
                <h4 className="font-playfair text-lg text-ivory mt-2 mb-2 group-hover:text-[#D4AF37] transition-colors duration-300 leading-snug">
                  {post.title}
                </h4>
                <p className="font-dm-sans text-xs text-ivory/50 leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <span className="font-dm-sans text-[10px] text-ivory/30 tracking-wide">
                  {post.readTime}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
