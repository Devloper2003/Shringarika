'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const instagramPosts = [
  { id: 1, alt: 'Bridal lehenga detail — Shringarika couture' },
  { id: 2, alt: 'Festive saree styling — House of Shringarika' },
  { id: 3, alt: 'Atelier behind the scenes — embroidery work' },
  { id: 4, alt: 'Bride in Shringarika — real wedding moment' },
  { id: 5, alt: 'Western fusion collection — modern elegance' },
  { id: 6, alt: 'Custom bespoke process — from sketch to drape' },
];

export default function InstagramSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden py-16" style={{ background: 'linear-gradient(180deg, #0a0a12 0%, #0d1220 50%, #0a0a12 100%)' }}>
      {/* Subtle radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="font-dm-sans text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase">
            Follow Our Journey
          </span>
          <h3 className="font-cormorant text-2xl sm:text-3xl text-ivory font-light mt-2">
            @houseofshringarika
          </h3>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/houseofshringarika"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ perspective: '600px' }}
              className="group relative aspect-square overflow-hidden cursor-pointer border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-500"
            >
              {/* Gradient placeholder for Instagram posts */}
              <div className="w-full h-full group-hover:scale-110 transition-transform duration-700 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a2b4a 0%, #0d1220 50%, #6b1a2a 100%)' }}>
                <span className="font-cormorant text-ivory/10 text-2xl italic group-hover:text-ivory/15 transition-colors duration-500">S</span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#0a0a12]/0 group-hover:bg-[#0a0a12]/50 transition-colors duration-500 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              {/* Neon gold glow border on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(212,175,55,0.1)] pointer-events-none" />
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8"
        >
          <a
            href="https://www.instagram.com/houseofshringarika"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-dm-sans text-xs tracking-[0.2em] uppercase text-[#D4AF37] hover:text-[#FFD700] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
