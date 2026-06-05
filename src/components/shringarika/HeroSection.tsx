'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-noir">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bridal.png"
          alt="Shringarika Luxury Bridal Couture — Draped in Dreams"
          fill
          sizes="100vw"
          className="object-cover object-center scale-105"
          priority
          quality={95}
        />
        {/* Cinematic Overlay */}
        <div className="hero-overlay absolute inset-0" />
        {/* Vignette */}
        <div className="absolute inset-0 vignette" />
        {/* Warm glow from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-noir/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Brand Name Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-dm-sans text-zari-gold/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-4 sm:mb-6">
            House of Shringarika
          </p>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-ivory font-light leading-[1.1] mb-6 sm:mb-8"
        >
          Draped in Dreams.
          <br />
          <span className="text-gradient-gold font-cormorant italic font-light">Crafted for You.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-dm-sans text-ivory/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed tracking-wide"
        >
          Luxury bridal wear, bespoke couture & ready-to-wear collections — 
          where every woman becomes the story.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#collections"
            className="group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-zari-gold text-noir font-dm-sans text-xs sm:text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
          >
            <span className="relative z-10">Explore Collections</span>
            <div className="absolute inset-0 bg-zari-gold-light transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </a>
          <a
            href="#appointments"
            className="px-8 sm:px-10 py-3.5 sm:py-4 border border-ivory/40 text-ivory font-dm-sans text-xs sm:text-sm tracking-[0.2em] uppercase hover:border-zari-gold hover:text-zari-gold transition-all duration-500"
          >
            Book a Consultation
          </a>
          <a
            href="https://wa.me/919999999999?text=Hi%20Shringarika!%20I%27d%20love%20to%20inquire%20about%20a%20bridal%20outfit."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ivory/60 font-dm-sans text-xs sm:text-sm tracking-[0.15em] uppercase hover:text-green-400 transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-dm-sans text-ivory/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-zari-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
