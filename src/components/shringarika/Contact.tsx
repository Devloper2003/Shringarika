'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="relative bg-noir section-luxury overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-blue/5 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="font-dm-sans text-zari-gold/80 text-[10px] tracking-[0.4em] uppercase">
            Contact
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory text-center font-light leading-tight mb-6"
        >
          Begin Your Style <span className="italic text-gradient-gold">Story</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-dm-sans text-ivory/40 text-sm sm:text-base text-center max-w-xl mx-auto mb-16"
        >
          Every beautiful journey begins with a single conversation. 
          Reach out, and let us help you write yours.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-ivory/50 block mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full bg-transparent border-b border-ivory/20 px-0 py-3 font-dm-sans text-sm text-ivory placeholder:text-ivory/20 focus:border-zari-gold focus:outline-none transition-colors duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-ivory/50 block mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98XXX XXXXX"
                    className="w-full bg-transparent border-b border-ivory/20 px-0 py-3 font-dm-sans text-sm text-ivory placeholder:text-ivory/20 focus:border-zari-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-ivory/50 block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-ivory/20 px-0 py-3 font-dm-sans text-sm text-ivory placeholder:text-ivory/20 focus:border-zari-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-ivory/50 block mb-2">
                  Occasion
                </label>
                <select className="w-full bg-transparent border-b border-ivory/20 px-0 py-3 font-dm-sans text-sm text-ivory/50 focus:border-zari-gold focus:outline-none transition-colors duration-300">
                  <option value="">Select occasion</option>
                  <option value="bridal">Bridal</option>
                  <option value="wedding">Wedding Guest</option>
                  <option value="festive">Festive</option>
                  <option value="party">Party / Cocktail</option>
                  <option value="custom">Custom / Bespoke</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-ivory/50 block mb-2">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your style dreams, questions, or how we can help..."
                  className="w-full bg-transparent border-b border-ivory/20 px-0 py-3 font-dm-sans text-sm text-ivory placeholder:text-ivory/20 focus:border-zari-gold focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="px-10 py-3.5 bg-zari-gold text-noir font-dm-sans text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all duration-500"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="space-y-8"
          >
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  ),
                  label: 'Phone',
                  value: '+91 99999 99999',
                  sublabel: 'Call or WhatsApp',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  ),
                  label: 'Email',
                  value: 'hello@shringarika.com',
                  sublabel: 'We respond within 24 hours',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  ),
                  label: 'Atelier',
                  value: 'Jaipur, Rajasthan',
                  sublabel: 'By appointment only',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  ),
                  label: 'Instagram',
                  value: '@houseofshringarika',
                  sublabel: 'Follow our journey',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 border border-ivory/5 hover:border-zari-gold/20 transition-colors duration-500 group"
                >
                  <div className="text-zari-gold/60 group-hover:text-zari-gold transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-dm-sans text-[10px] tracking-[0.15em] uppercase text-ivory/30">
                      {item.label}
                    </p>
                    <p className="font-dm-sans text-sm text-ivory/80">{item.value}</p>
                    <p className="font-dm-sans text-[10px] text-ivory/30">{item.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Closing Brand Statement */}
            <div className="pt-6 border-t border-ivory/5">
              <p className="font-cormorant text-lg text-ivory/40 italic text-center leading-relaxed">
                &ldquo;Not just a fashion brand — but a deeply personal, cinematic couture experience 
                where every woman walks into her most beautiful story.&rdquo;
              </p>
              <p className="font-cinzel text-xs text-zari-gold/40 tracking-[0.3em] uppercase text-center mt-4">
                House of Shringarika
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
