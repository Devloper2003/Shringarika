'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const bespokeSteps = [
  {
    step: '01',
    title: 'Consultation',
    description: 'Share your vision, occasion, and dreams with our design team — an intimate conversation where your story begins.',
    icon: '✦',
  },
  {
    step: '02',
    title: 'Design',
    description: 'Our artisans translate your vision into sketches and fabric selections, refining every detail until it feels like you.',
    icon: '✦',
  },
  {
    step: '03',
    title: 'Drape & Create',
    description: 'Handcrafted with devotion using heritage embroidery techniques, luxurious fabrics, and golden zari threads — slowly, beautifully.',
    icon: '✦',
  },
  {
    step: '04',
    title: 'Deliver',
    description: 'Your creation arrives — not just an outfit, but a piece of art that carries your story in every stitch.',
    icon: '✦',
  },
];

export default function Bespoke() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="bespoke" className="relative overflow-hidden section-luxury" style={{ background: 'linear-gradient(135deg, #0a0a12 0%, #0d1220 40%, #1a2b4a 100%)' }}>
      {/* Decorative elements */}
      <div className="absolute top-20 left-8 w-px h-40 bg-gradient-to-b from-[#D4AF37]/20 to-transparent" />
      <div className="absolute bottom-20 right-8 w-px h-40 bg-gradient-to-t from-[#D4AF37]/20 to-transparent" />
      {/* Subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="font-dm-sans text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase">
            Bespoke Couture
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory text-center font-light leading-tight mb-6"
        >
          Made Only for <span className="italic text-[#D4AF37]">You.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-dm-sans text-ivory/50 text-sm sm:text-base text-center max-w-2xl mx-auto mb-20"
        >
          When you dream of something that doesn&apos;t exist yet — we create it. 
          Our bespoke service is an intimate journey from your imagination to a masterpiece 
          that exists nowhere else in the world.
        </motion.p>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-20">
          {bespokeSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
              style={{ perspective: '800px' }}
              className="relative text-center group"
            >
              {/* Step number */}
              <span className="font-cinzel text-5xl sm:text-6xl text-[#D4AF37]/10 absolute -top-4 left-1/2 -translate-x-1/2 select-none">
                {step.step}
              </span>
              <div
                className="relative z-10 pt-8 transition-transform duration-700 group-hover:[transform:rotateY(5deg)_rotateX(-3deg)]"
              >
                <div className="w-12 h-12 mx-auto mb-4 border border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500">
                  <span className="text-[#D4AF37] text-sm">{step.icon}</span>
                </div>
                <h3 className="font-playfair text-xl text-ivory mb-3">{step.title}</h3>
                <p className="font-dm-sans text-xs text-ivory/50 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
              {/* Connector line */}
              {i < bespokeSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-[#D4AF37]/20" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Animated gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-16"
        />

        {/* Image + Inquiry Form */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ perspective: '1000px' }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-[#D4AF37]/20 group" style={{ background: 'linear-gradient(135deg, #1a2b4a 0%, #0d1220 50%, #6b1a2a 100%)' }}>
              <div className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:[transform:rotateY(3deg)]">
                <span className="font-cormorant text-ivory/10 text-8xl italic">B</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/60 to-transparent" />
            </div>
            {/* Quote overlay */}
            <div className="absolute bottom-8 left-8 right-8 bg-[#0d1220]/90 backdrop-blur-sm p-6 border border-[#D4AF37]/20">
              <p className="font-cormorant text-lg sm:text-xl text-ivory/80 italic leading-relaxed">
                &ldquo;The most beautiful outfits are the ones that tell your story — not someone else&apos;s.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            <h3 className="font-playfair text-2xl text-ivory mb-2">Begin Your Custom Journey</h3>
            <p className="font-dm-sans text-ivory/50 text-sm mb-8">
              Tell us about your dream outfit, and our design team will reach out to begin 
              crafting something extraordinary — just for you.
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/60 block mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-transparent border-b border-[#D4AF37]/20 px-0 py-3 font-dm-sans text-sm text-ivory placeholder:text-ivory/20 focus:border-[#D4AF37] focus:shadow-[0_2px_10px_rgba(212,175,55,0.15)] focus:outline-none transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/60 block mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98XXX XXXXX"
                    className="w-full bg-transparent border-b border-[#D4AF37]/20 px-0 py-3 font-dm-sans text-sm text-ivory placeholder:text-ivory/20 focus:border-[#D4AF37] focus:shadow-[0_2px_10px_rgba(212,175,55,0.15)] focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/60 block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-[#D4AF37]/20 px-0 py-3 font-dm-sans text-sm text-ivory placeholder:text-ivory/20 focus:border-[#D4AF37] focus:shadow-[0_2px_10px_rgba(212,175,55,0.15)] focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/60 block mb-2">
                  Occasion
                </label>
                <select className="w-full bg-[#0d1220] border-b border-[#D4AF37]/20 px-0 py-3 font-dm-sans text-sm text-ivory/60 focus:border-[#D4AF37] focus:shadow-[0_2px_10px_rgba(212,175,55,0.15)] focus:outline-none transition-all duration-300">
                  <option value="">Select occasion</option>
                  <option value="bridal">Bridal</option>
                  <option value="reception">Wedding Reception</option>
                  <option value="sangeet">Sangeet / Mehendi</option>
                  <option value="festive">Festive / Puja</option>
                  <option value="party">Party / Cocktail</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/60 block mb-2">
                  Describe Your Dream Outfit
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the colors, fabrics, embroidery, and style you envision..."
                  className="w-full bg-transparent border-b border-[#D4AF37]/20 px-0 py-3 font-dm-sans text-sm text-ivory placeholder:text-ivory/20 focus:border-[#D4AF37] focus:shadow-[0_2px_10px_rgba(212,175,55,0.15)] focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#D4AF37] text-[#0a0a12] font-dm-sans text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500"
                >
                  Send Inquiry
                </button>
                <a
                  href="https://wa.me/919999999999?text=Hi!%20I%27m%20interested%20in%20a%20custom%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 border border-[#D4AF37]/30 text-ivory font-dm-sans text-xs tracking-[0.2em] uppercase hover:border-[#25D366] hover:text-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.15)] transition-all duration-500"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat on WhatsApp
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
