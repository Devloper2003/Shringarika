'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

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
    <section id="bespoke" className="relative bg-ivory section-luxury overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-8 w-px h-40 bg-gradient-to-b from-zari-gold/20 to-transparent" />
      <div className="absolute bottom-20 right-8 w-px h-40 bg-gradient-to-t from-zari-gold/20 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="font-dm-sans text-rose-gold text-[10px] tracking-[0.4em] uppercase">
            Bespoke Couture
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-noir text-center font-light leading-tight mb-6"
        >
          Made Only for <span className="italic text-rose-gold">You.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-dm-sans text-noir/50 text-sm sm:text-base text-center max-w-2xl mx-auto mb-20"
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
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
              className="relative text-center group"
            >
              {/* Step number */}
              <span className="font-cinzel text-5xl sm:text-6xl text-zari-gold/10 absolute -top-4 left-1/2 -translate-x-1/2 select-none">
                {step.step}
              </span>
              <div className="relative z-10 pt-8">
                <div className="w-12 h-12 mx-auto mb-4 border border-zari-gold/30 rounded-full flex items-center justify-center group-hover:border-zari-gold group-hover:bg-zari-gold/5 transition-all duration-500">
                  <span className="text-zari-gold text-sm">{step.icon}</span>
                </div>
                <h3 className="font-playfair text-xl text-noir mb-3">{step.title}</h3>
                <p className="font-dm-sans text-xs text-noir/50 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
              {/* Connector line */}
              {i < bespokeSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-zari-gold/20" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Image + Inquiry Form */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden candlelight">
              <Image
                src="/images/bespoke.png"
                alt="Shringarika Bespoke Consultation — Your Vision, Our Craft"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/20 to-transparent" />
            </div>
            {/* Quote overlay */}
            <div className="absolute bottom-8 left-8 right-8 bg-ivory/90 backdrop-blur-sm p-6">
              <p className="font-cormorant text-lg sm:text-xl text-noir/80 italic leading-relaxed">
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
            <h3 className="font-playfair text-2xl text-noir mb-2">Begin Your Custom Journey</h3>
            <p className="font-dm-sans text-noir/50 text-sm mb-8">
              Tell us about your dream outfit, and our design team will reach out to begin 
              crafting something extraordinary — just for you.
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-noir/60 block mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-transparent border-b border-noir/20 px-0 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/30 focus:border-rose-gold focus:outline-none transition-colors duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-noir/60 block mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98XXX XXXXX"
                    className="w-full bg-transparent border-b border-noir/20 px-0 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/30 focus:border-rose-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-noir/60 block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-noir/20 px-0 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/30 focus:border-rose-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-noir/60 block mb-2">
                  Occasion
                </label>
                <select className="w-full bg-transparent border-b border-noir/20 px-0 py-3 font-dm-sans text-sm text-noir/60 focus:border-rose-gold focus:outline-none transition-colors duration-300">
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
                <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-noir/60 block mb-2">
                  Describe Your Dream Outfit
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the colors, fabrics, embroidery, and style you envision..."
                  className="w-full bg-transparent border-b border-noir/20 px-0 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/30 focus:border-rose-gold focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-noir text-ivory font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
                >
                  Send Inquiry
                </button>
                <a
                  href="https://wa.me/919999999999?text=Hi!%20I%27m%20interested%20in%20a%20custom%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 border border-noir/20 text-noir font-dm-sans text-xs tracking-[0.2em] uppercase hover:border-green-600 hover:text-green-700 transition-all duration-500"
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
