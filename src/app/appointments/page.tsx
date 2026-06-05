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

const consultationTypes = [
  {
    id: 'bridal',
    title: 'Bridal Consultation',
    duration: '90 minutes',
    price: 'Complimentary',
    description: 'Your bridal journey begins here. In this extended consultation, we dive deep into your wedding vision — from the ceremony type and venue aesthetic to your personal style and family traditions. We\'ll explore silhouettes, discuss fabric and embroidery options, and begin sketching initial concepts. Whether you\'re a bride who knows exactly what she wants or one who needs gentle guidance, our team will make you feel heard, inspired, and confident.',
    includes: ['Personal design consultation with the founder', 'Fabric & embroidery swatch viewing', 'Initial sketch concepts', 'Bridal styling guide', 'Complimentary chai & refreshments'],
    icon: '✦',
  },
  {
    id: 'styling',
    title: 'Styling Consultation',
    duration: '60 minutes',
    price: '₹2,000 (adjusted against purchase)',
    description: 'Not sure what works for your body type, colouring, or occasion? Our styling consultation is designed for women who want expert guidance in choosing the perfect outfit from our existing collections. Our stylist will assess your preferences, understand the event you\'re dressing for, and curate a personalised selection of pieces that make you look and feel extraordinary.',
    includes: ['Body type & colour analysis', 'Curated outfit selection', 'Accessory pairing advice', 'Draping demonstration', 'Lookbook creation'],
    icon: '❋',
  },
  {
    id: 'custom',
    title: 'Custom Design Consultation',
    duration: '75 minutes',
    price: '₹3,000 (adjusted against order)',
    description: 'Ready to create something entirely unique? This consultation is the first step in our bespoke process. Bring your ideas, reference images, Pinterest boards — whatever inspires you. Our design team will listen, sketch, and begin translating your vision into a detailed design concept. We\'ll discuss fabrics, timelines, budgets, and every detail that will make your custom creation unmistakably yours.',
    includes: ['Design brainstorming session', 'Hand-drawn initial sketches', 'Fabric & embroidery selection', 'Timeline & budget planning', 'Priority booking for fittings'],
    icon: '◈',
  },
];

const whatToExpect = [
  {
    title: 'A Warm Welcome',
    description: 'From the moment you step into our atelier, you\'ll be treated as a guest, not a customer. Expect warm chai, comfortable seating, and zero pressure. We believe the best design decisions are made in a state of calm and comfort.',
  },
  {
    title: 'Expert Guidance, Not Hard Selling',
    description: 'Our team is trained in design and styling — not sales tactics. We\'ll share honest opinions, suggest alternatives if something doesn\'t flatter you, and never push you toward a more expensive option. Your satisfaction is our only metric.',
  },
  {
    title: 'Visual Storytelling',
    description: 'We use mood boards, fabric swatches, and hand-drawn sketches to bring your vision to life before a single stitch is made. You\'ll leave the consultation with a clear mental picture — and often a physical one — of what your outfit will look like.',
  },
  {
    title: 'No Rush, No Clock-Watching',
    description: 'While we list approximate durations, we never cut a consultation short. If we need an extra 30 minutes to get it right, we take it. Your outfit deserves that time, and so do you.',
  },
];

export default function AppointmentsPage() {
  const [selectedType, setSelectedType] = useState('');

  return (
    <SiteLayout>
      <main className="bg-ivory">

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-champagne/30 via-blush/20 to-sandalwood/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-6"
          >
            Book Your Visit
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-noir leading-[1.1] mb-8"
          >
            Step into the Atelier
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-[1px] bg-zari-gold mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-cormorant text-xl text-noir/60 italic max-w-2xl mx-auto"
          >
            Experience the Shringarika world in person — where fabric becomes feeling and ideas become art
          </motion.p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 border-y border-zari-gold/10 bg-ivory">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {[
              { number: '500+', label: 'Happy Brides' },
              { number: '8+', label: 'Years of Craft' },
              { number: '100%', label: 'Handcrafted' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="font-cormorant text-2xl md:text-3xl text-zari-gold block">{stat.number}</span>
                <span className="font-dm-sans text-[10px] tracking-wider uppercase text-noir/40">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="section-luxury bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Choose Your Experience</p>
              <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-noir mb-6">Consultation Types</h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultationTypes.map((type, index) => (
              <FadeInSection key={type.id} delay={index * 0.15}>
                <div className="bg-ivory border border-zari-gold/10 p-8 hover:border-zari-gold/30 transition-all duration-500 group h-full flex flex-col">
                  <span className="text-3xl text-zari-gold/60 group-hover:text-zari-gold transition-colors duration-500 mb-4 block">{type.icon}</span>
                  <h3 className="font-playfair text-xl text-noir mb-2">{type.title}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-dm-sans text-xs text-noir/40">{type.duration}</span>
                    <span className="w-1 h-1 bg-zari-gold/40 rounded-full" />
                    <span className="font-dm-sans text-xs text-zari-gold">{type.price}</span>
                  </div>
                  <p className="font-dm-sans text-sm text-noir/60 leading-relaxed mb-6 flex-1">{type.description}</p>
                  <div className="pt-4 border-t border-zari-gold/10">
                    <p className="font-dm-sans text-[10px] tracking-wider uppercase text-noir/30 mb-3">Includes</p>
                    <ul className="space-y-1.5">
                      {type.includes.map((item) => (
                        <li key={item} className="font-dm-sans text-xs text-noir/50 flex items-start gap-2">
                          <span className="text-zari-gold/60 mt-0.5">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => setSelectedType(type.id)}
                    className="mt-6 w-full py-3 border border-zari-gold/40 text-zari-gold font-dm-sans text-xs tracking-wider uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
                  >
                    Select & Book
                  </button>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-luxury bg-blush/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Schedule Your Visit</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-noir mb-6">Book an Appointment</h2>
              <p className="font-dm-sans text-sm text-noir/60 max-w-2xl mx-auto leading-relaxed">
                Fill in the details below and our team will confirm your appointment within 4 hours.
                For urgent requests, please call or WhatsApp us directly.
              </p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <form onSubmit={(e) => e.preventDefault()} className="bg-ivory p-8 md:p-12 border border-zari-gold/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/20 focus:border-zari-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Phone *</label>
                  <input
                    type="tel"
                    placeholder="+91 99999 99999"
                    className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/20 focus:border-zari-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Email Address *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/20 focus:border-zari-gold focus:outline-none transition-colors duration-300"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Consultation Type *</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir/60 focus:border-zari-gold focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select type</option>
                    <option value="bridal">Bridal Consultation (90 min)</option>
                    <option value="styling">Styling Consultation (60 min)</option>
                    <option value="custom">Custom Design Consultation (75 min)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Occasion</label>
                  <select className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir/60 focus:border-zari-gold focus:outline-none transition-colors duration-300">
                    <option value="">Select occasion</option>
                    <option value="wedding">Wedding</option>
                    <option value="reception">Reception</option>
                    <option value="engagement">Engagement</option>
                    <option value="festive">Festive / Puja</option>
                    <option value="party">Party / Cocktail</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir/60 focus:border-zari-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Preferred Time *</label>
                  <select className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir/60 focus:border-zari-gold focus:outline-none transition-colors duration-300">
                    <option value="">Select time</option>
                    <option value="10am">10:00 AM</option>
                    <option value="11am">11:00 AM</option>
                    <option value="12pm">12:00 PM</option>
                    <option value="2pm">2:00 PM</option>
                    <option value="3pm">3:00 PM</option>
                    <option value="4pm">4:00 PM</option>
                    <option value="5pm">5:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="mb-8">
                <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Message (Optional)</label>
                <textarea
                  rows={4}
                  placeholder="Tell us anything that would help us prepare for your visit — your style preferences, any specific pieces you'd like to see, or questions you have..."
                  className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/20 focus:border-zari-gold focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-noir text-ivory font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-noir-soft transition-all duration-500 btn-luxury-glow"
                >
                  Request Appointment
                </button>
                <a
                  href="https://wa.me/919999999999?text=Hi!%20I'd%20like%20to%20book%20an%20appointment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-4 border border-zari-gold/40 text-zari-gold font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Book via WhatsApp
                </a>
              </div>
            </form>
          </FadeInSection>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-luxury bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Before You Visit</p>
              <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-noir mb-6">What to Expect</h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatToExpect.map((item, index) => (
              <FadeInSection key={item.title} delay={index * 0.15}>
                <div className="flex items-start gap-6 p-6 border border-zari-gold/10 hover:border-zari-gold/20 transition-all duration-300">
                  <span className="font-cinzel text-zari-gold text-sm shrink-0 mt-1">0{index + 1}</span>
                  <div>
                    <h3 className="font-playfair text-lg text-noir mb-2">{item.title}</h3>
                    <p className="font-dm-sans text-sm text-noir/50 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Info & Map */}
      <section className="section-luxury bg-noir">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeInSection>
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Visit Us</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-ivory mb-8">Our Atelier</h2>
              <div className="space-y-6">
                <div>
                  <p className="font-dm-sans text-xs tracking-wider uppercase text-ivory/30 mb-1">Address</p>
                  <p className="font-dm-sans text-sm text-ivory/60">42, Civil Lines, C-Scheme<br />Jaipur, Rajasthan 302006</p>
                </div>
                <div>
                  <p className="font-dm-sans text-xs tracking-wider uppercase text-ivory/30 mb-1">Hours</p>
                  <p className="font-dm-sans text-sm text-ivory/60">Monday – Saturday: 10:00 AM – 7:00 PM<br />Sunday: By appointment only</p>
                </div>
                <div>
                  <p className="font-dm-sans text-xs tracking-wider uppercase text-ivory/30 mb-1">Phone</p>
                  <p className="font-dm-sans text-sm text-ivory/60">+91 141 400 1234</p>
                </div>
                <div>
                  <p className="font-dm-sans text-xs tracking-wider uppercase text-ivory/30 mb-1">Email</p>
                  <p className="font-dm-sans text-sm text-ivory/60">hello@shringarika.com</p>
                </div>
                <div className="pt-4">
                  <a
                    href="https://wa.me/919999999999?text=Hi!%20I'd%20like%20directions%20to%20your%20atelier."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-zari-gold/40 text-zari-gold font-dm-sans text-xs tracking-wider uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp for Directions
                  </a>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="aspect-[4/3] bg-gradient-to-br from-noir-soft via-mauve-dusty/10 to-noir rounded-sm overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-ivory/10 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <p className="font-dm-sans text-ivory/15 text-xs tracking-wider uppercase">Map Placeholder</p>
                    <p className="font-dm-sans text-ivory/10 text-[10px] mt-1">42, Civil Lines, C-Scheme, Jaipur</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      </main>
    </SiteLayout>
  );
}
