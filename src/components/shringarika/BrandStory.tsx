'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function BrandStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="story" className="relative bg-ivory section-luxury overflow-hidden">
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-zari-gold/20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-zari-gold/20" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="font-dm-sans text-zari-gold text-[10px] tracking-[0.4em] uppercase">
            Our Story
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-noir text-center font-light leading-tight mb-16"
        >
          Every Thread Tells a <span className="italic text-rose-blue">Story</span>
        </motion.h2>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden candlelight bg-gradient-to-br from-champagne/40 via-blush/40 to-sandalwood/40">
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-cormorant text-noir/10 text-8xl italic">A</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-noir/20 to-transparent" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-zari-gold/30 -z-10" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-6"
          >
            <div className="luxury-divider mb-8" />
            
            <p className="font-cormorant text-xl sm:text-2xl text-noir/80 italic leading-relaxed">
              &ldquo;Walking into a luxury atelier in Jaipur — where every stitch holds a story, 
              every fabric whispers elegance, and every woman is the protagonist.&rdquo;
            </p>

            <p className="font-dm-sans text-sm sm:text-base text-noir/60 leading-relaxed">
              Born from the timeless allure of Jaipur&apos;s royal heritage, House of Shringarika is more than 
              a fashion brand — it is a deeply personal, cinematic couture experience. Every creation that 
              leaves our atelier carries within it the soul of Indian craftsmanship, the elegance of 
              generations, and the intimate vision of the woman who will wear it.
            </p>

            <p className="font-dm-sans text-sm sm:text-base text-noir/60 leading-relaxed">
              Our design philosophy is rooted in the belief that couture is not merely clothing — it is an 
              expression of identity, a celebration of milestones, and a testament to the art of slow, 
              intentional fashion. From the first sketch to the final drape, every Shringarika piece is 
              handcrafted with devotion, using heritage embroidery techniques, luxurious fabrics sourced from 
              the finest looms, and an unwavering commitment to making every woman feel extraordinary.
            </p>

            <p className="font-dm-sans text-sm sm:text-base text-noir/60 leading-relaxed">
              We believe that when a woman wears Shringarika, she doesn&apos;t just wear an outfit — she steps 
              into her most beautiful story. And that story, like the golden threads that weave through our 
              creations, is entirely her own.
            </p>

            <div className="pt-4">
              <a
                href="#bespoke"
                className="inline-flex items-center gap-3 font-dm-sans text-xs tracking-[0.2em] uppercase text-rose-blue hover:text-zari-gold transition-colors duration-300 group"
              >
                Discover Our Craft
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { title: 'Heritage Craft', desc: 'Handcrafted using centuries-old embroidery techniques from the heart of Rajasthan' },
            { title: 'Bespoke Vision', desc: 'Every piece is designed to tell your unique story with personal consultation' },
            { title: 'Luxury Fabrics', desc: 'Sourced from the finest looms, silks, and artisan workshops across India' },
            { title: 'Timeless Elegance', desc: 'Designs that transcend trends and become heirlooms for generations' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 + i * 0.15 }}
              className="text-center p-6 border border-zari-gold/10 hover:border-zari-gold/30 transition-colors duration-500 group"
            >
              <div className="w-8 h-[1px] bg-zari-gold/40 mx-auto mb-4 group-hover:w-12 transition-all duration-500" />
              <h3 className="font-playfair text-lg text-noir mb-3">{item.title}</h3>
              <p className="font-dm-sans text-xs text-noir/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
