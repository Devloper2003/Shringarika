'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const consultationTypes = [
  {
    type: 'Bridal Appointment',
    description: 'A private, intimate session to discover and design your dream bridal outfit — from lehengas to sarees, every detail curated for your story.',
    icon: '♡',
    duration: '90 minutes',
  },
  {
    type: 'Styling Session',
    description: 'Let our expert stylists guide you through our collections and help you find the perfect look for any occasion — festive, cocktail, or celebration.',
    icon: '✦',
    duration: '60 minutes',
  },
  {
    type: 'Custom Design Consultation',
    description: 'The first step in your bespoke journey — share your vision, explore fabrics and embroidery, and begin crafting something that exists only for you.',
    icon: '✧',
    duration: '75 minutes',
  },
];

export default function Appointments() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedType, setSelectedType] = useState(0);

  return (
    <section id="appointments" className="relative bg-[#C5CCDA] section-luxury overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-rose-blue/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-champagne/30 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="font-dm-sans text-rose-blue text-[10px] tracking-[0.4em] uppercase">
            Appointments
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-noir text-center font-light leading-tight mb-6"
        >
          Step into the <span className="italic text-rose-blue">Atelier</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-dm-sans text-noir/50 text-sm sm:text-base text-center max-w-xl mx-auto mb-16"
        >
          Whether you&apos;re a bride-to-be, seeking styling guidance, or beginning a bespoke creation — 
          your private consultation awaits.
        </motion.p>

        {/* Consultation Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-3 gap-4 mb-12"
        >
          {consultationTypes.map((ct, i) => (
            <button
              key={ct.type}
              onClick={() => setSelectedType(i)}
              className={`text-left p-6 border transition-all duration-500 ${
                selectedType === i
                  ? 'border-rose-blue bg-ivory shadow-sm'
                  : 'border-noir/10 bg-ivory/50 hover:border-noir/20'
              }`}
            >
              <span className="text-rose-blue text-xl mb-3 block">{ct.icon}</span>
              <h3 className="font-playfair text-lg text-noir mb-2">{ct.type}</h3>
              <p className="font-dm-sans text-xs text-noir/50 leading-relaxed mb-2">{ct.description}</p>
              <span className="font-dm-sans text-[10px] text-rose-blue/60 tracking-wide">{ct.duration}</span>
            </button>
          ))}
        </motion.div>

        {/* Booking Form */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="font-playfair text-2xl text-noir mb-2">Book Your Appointment</h3>
            <p className="font-dm-sans text-noir/50 text-sm mb-8">
              Fill in your details below and our team will confirm your appointment within 24 hours.
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-noir/60 block mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full bg-ivory/80 border-b border-noir/20 px-0 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/30 focus:border-rose-blue focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-noir/60 block mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98XXX XXXXX"
                    className="w-full bg-ivory/80 border-b border-noir/20 px-0 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/30 focus:border-rose-blue focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-noir/60 block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-ivory/80 border-b border-noir/20 px-0 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/30 focus:border-rose-blue focus:outline-none transition-colors duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-noir/60 block mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-ivory/80 border-b border-noir/20 px-0 py-3 font-dm-sans text-sm text-noir/60 focus:border-rose-blue focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-noir/60 block mb-2">
                    Preferred Time
                  </label>
                  <select className="w-full bg-ivory/80 border-b border-noir/20 px-0 py-3 font-dm-sans text-sm text-noir/60 focus:border-rose-blue focus:outline-none transition-colors duration-300">
                    <option value="">Select time</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                    <option>5:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-noir/60 block mb-2">
                  Occasion Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your occasion, style preferences, or any special requirements..."
                  className="w-full bg-ivory/80 border-b border-noir/20 px-0 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/30 focus:border-rose-blue focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-noir text-ivory font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-rose-blue transition-all duration-500"
                >
                  Request Appointment
                </button>
                <a
                  href="https://wa.me/919999999999?text=Hi!%20I%20want%20to%20book%20a%20styling%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 border border-noir/20 text-noir font-dm-sans text-xs tracking-[0.2em] uppercase hover:border-green-600 hover:text-green-700 transition-all duration-500"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Book via WhatsApp
                </a>
              </div>
            </form>
          </motion.div>

          {/* Studio Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-ivory p-8 border border-noir/5">
              <h4 className="font-playfair text-lg text-noir mb-4">Visit Our Atelier</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-rose-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <div>
                    <p className="font-dm-sans text-sm text-noir">House of Shringarika</p>
                    <p className="font-dm-sans text-xs text-noir/50">Jaipur, Rajasthan, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-rose-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>
                    <p className="font-dm-sans text-sm text-noir">Monday – Saturday</p>
                    <p className="font-dm-sans text-xs text-noir/50">10:00 AM – 7:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-rose-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <div>
                    <p className="font-dm-sans text-sm text-noir">+91 99999 99999</p>
                    <p className="font-dm-sans text-xs text-noir/50">Call or WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="aspect-[4/3] bg-champagne/50 border border-noir/5 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-8 h-8 text-rose-blue/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <p className="font-dm-sans text-xs text-noir/30">Jaipur, Rajasthan</p>
              </div>
            </div>

            {/* Trust element */}
            <div className="flex items-center gap-6 justify-center">
              <div className="text-center">
                <p className="font-cormorant text-3xl text-rose-blue font-light">500+</p>
                <p className="font-dm-sans text-[10px] text-noir/40 tracking-wide uppercase">Happy Brides</p>
              </div>
              <div className="w-px h-12 bg-noir/10" />
              <div className="text-center">
                <p className="font-cormorant text-3xl text-rose-blue font-light">8+</p>
                <p className="font-dm-sans text-[10px] text-noir/40 tracking-wide uppercase">Years of Craft</p>
              </div>
              <div className="w-px h-12 bg-noir/10" />
              <div className="text-center">
                <p className="font-cormorant text-3xl text-rose-blue font-light">100%</p>
                <p className="font-dm-sans text-[10px] text-noir/40 tracking-wide uppercase">Handcrafted</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
