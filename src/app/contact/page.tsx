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

const contactCards = [
  {
    title: 'Phone',
    value: '+91 141 400 1234',
    subtext: 'Mon–Sat, 10 AM – 7 PM IST',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
    ),
  },
  {
    title: 'Email',
    value: 'hello@shringarika.com',
    subtext: 'We respond within 24 hours',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
  {
    title: 'Address',
    value: '42, Civil Lines, C-Scheme',
    subtext: 'Jaipur, Rajasthan 302006',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
  },
  {
    title: 'Instagram',
    value: '@houseofshringarika',
    subtext: 'Daily inspiration & updates',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    ),
  },
  {
    title: 'WhatsApp',
    value: '+91 99999 99999',
    subtext: 'Quick replies, always',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    ),
  },
];

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'You can begin by booking a consultation at our Jaipur atelier or reaching out via WhatsApp. We don\'t operate on a traditional e-commerce model — every order begins with a conversation so we can understand your needs perfectly. For select ready-to-wear pieces, you can inquire directly and we\'ll arrange shipping.',
  },
  {
    question: 'Can I order from outside India?',
    answer: 'Absolutely. We ship worldwide and have clients across the US, UK, UAE, Singapore, and Australia. For bridal and bespoke orders, we conduct virtual consultations and video fittings. Shipping typically takes 7-10 business days internationally, and we handle all customs documentation.',
  },
  {
    question: 'How long does a custom/bespoke order take?',
    answer: 'Bridal bespoke orders take 60-90 days. Festive and party wear bespoke takes 30-45 days. Light customisations and alterations take 15-20 days. Rush orders are available at a surcharge. We always recommend starting as early as possible for the best results.',
  },
  {
    question: 'What is your return and exchange policy?',
    answer: 'Since each piece is handcrafted and often made-to-order, we do not accept returns. However, we offer complimentary alterations within 30 days of delivery. For bespoke pieces, we include multiple fitting sessions to ensure perfect fit before final delivery. If there is a craftsmanship defect, we will repair or replace the piece at no cost.',
  },
  {
    question: 'Do you offer styling advice?',
    answer: 'Yes, styling consultation is a core part of the Shringarika experience. Whether you book a formal styling session or simply WhatsApp us your questions, our team is happy to advise on silhouettes, colour palettes, jewellery pairing, and draping techniques — all at no extra charge for existing clients.',
  },
  {
    question: 'Can I visit the atelier without an appointment?',
    answer: 'We recommend booking an appointment to ensure we can give you our full attention and have the right pieces ready for you to view. However, walk-ins are welcome during business hours (Mon-Sat, 10 AM-7 PM), subject to availability. Sundays are by appointment only.',
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <SiteLayout>
      <main className="bg-ivory">

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-champagne/50 via-blush/30 to-sandalwood/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-6"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-noir leading-[1.1] mb-8"
          >
            Begin Your Style Story Today
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
            Every beautiful creation begins with a simple conversation
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-luxury bg-ivory pt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <FadeInSection>
              <div className="bg-ivory p-8 md:p-10 border border-zari-gold/10">
                <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-2">Send Us a Message</p>
                <h2 className="font-cormorant text-2xl md:text-3xl text-noir mb-8">We&apos;d Love to Hear from You</h2>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <div>
                    <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/20 focus:border-zari-gold focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Phone *</label>
                      <input
                        type="tel"
                        placeholder="+91 99999 99999"
                        className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/20 focus:border-zari-gold focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Email *</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/20 focus:border-zari-gold focus:outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Occasion</label>
                    <select className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir/60 focus:border-zari-gold focus:outline-none transition-colors duration-300">
                      <option value="">Select occasion</option>
                      <option value="wedding">Wedding / Bridal</option>
                      <option value="reception">Reception</option>
                      <option value="engagement">Engagement</option>
                      <option value="festive">Festive / Puja</option>
                      <option value="party">Party / Cocktail</option>
                      <option value="custom">Custom / Bespoke</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Message *</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us how we can help — whether it's about a specific outfit, a custom order, a consultation, or just a question about our process..."
                      className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/20 focus:border-zari-gold focus:outline-none transition-colors duration-300 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-noir text-ivory font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-noir-soft transition-all duration-500 btn-luxury-glow"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </FadeInSection>

            {/* Contact Info Cards */}
            <FadeInSection delay={0.2}>
              <div className="space-y-4">
                {contactCards.map((card) => (
                  <div key={card.title} className="p-6 border border-zari-gold/10 hover:border-zari-gold/20 transition-all duration-300 flex items-start gap-5">
                    <div className="w-12 h-12 bg-blush/30 flex items-center justify-center text-zari-gold shrink-0">
                      {card.icon}
                    </div>
                    <div>
                      <p className="font-dm-sans text-xs tracking-wider uppercase text-noir/30 mb-1">{card.title}</p>
                      <p className="font-dm-sans text-sm text-noir mb-0.5">{card.value}</p>
                      <p className="font-dm-sans text-xs text-noir/40">{card.subtext}</p>
                    </div>
                  </div>
                ))}

                {/* Map Placeholder */}
                <div className="aspect-[16/9] bg-gradient-to-br from-noir-soft via-mauve-dusty/10 to-noir rounded-sm overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-10 h-10 text-ivory/10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <p className="font-dm-sans text-ivory/15 text-xs tracking-wider uppercase">Map Placeholder</p>
                      <p className="font-dm-sans text-ivory/10 text-[10px] mt-1">42, Civil Lines, C-Scheme, Jaipur</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-luxury bg-blush/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Common Questions</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-noir mb-6">Frequently Asked Questions</h2>
              <p className="font-dm-sans text-sm text-noir/60 max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about ordering, custom work, appointments, shipping, and more.
                Can&apos;t find your answer? Reach out directly — we&apos;re always happy to help.
              </p>
            </div>
          </FadeInSection>
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <FadeInSection key={index} delay={index * 0.08}>
                <div className="border-b border-zari-gold/10">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left py-6 flex items-start justify-between gap-4 group"
                  >
                    <h3 className="font-playfair text-base md:text-lg text-noir group-hover:text-zari-gold transition-colors duration-300">{faq.question}</h3>
                    <span className={`text-zari-gold shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pb-6"
                    >
                      <p className="font-dm-sans text-sm text-noir/50 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Our Atelier */}
      <section className="section-luxury bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">In Person</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-noir mb-8">Visit Our Atelier</h2>
              <div className="space-y-6 font-dm-sans text-sm text-noir/60 leading-relaxed">
                <p>
                  There is nothing quite like experiencing a Shringarika creation in person — feeling the weight
                  of hand-embroidered silk, watching the light play across zardozi thread, and seeing how a
                  silhouette transforms when it drapes on your body. Our Jaipur atelier is designed for exactly
                  this kind of intimate, unhurried exploration.
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-dm-sans text-xs tracking-wider uppercase text-noir/30 mb-1">Address</p>
                    <p>42, Civil Lines, C-Scheme, Jaipur, Rajasthan 302006</p>
                  </div>
                  <div>
                    <p className="font-dm-sans text-xs tracking-wider uppercase text-noir/30 mb-1">Hours</p>
                    <p>Monday – Saturday: 10:00 AM – 7:00 PM</p>
                    <p>Sunday: By appointment only</p>
                  </div>
                  <div>
                    <p className="font-dm-sans text-xs tracking-wider uppercase text-noir/30 mb-1">Getting Here</p>
                    <p>15 minutes from Jaipur International Airport, 10 minutes from Jaipur Junction Railway Station. Complimentary parking available.</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Link
                    href="/appointments"
                    className="inline-flex items-center px-6 py-3 border border-zari-gold/40 text-zari-gold font-dm-sans text-xs tracking-wider uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
                  >
                    Book a Visit
                  </Link>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="aspect-[4/3] bg-gradient-to-br from-champagne/30 via-blush/30 to-sandalwood/30 rounded-sm overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-cormorant text-noir/10 text-9xl italic block">A</span>
                    <span className="font-dm-sans text-noir/15 text-xs tracking-[0.3em] uppercase">Our Jaipur Atelier</span>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Luxury Closing Statement */}
      <section className="py-16 md:py-24 bg-noir">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-6">The Beginning</p>
            <h2 className="font-cormorant text-3xl md:text-4xl text-ivory mb-6">
              Every Masterpiece Starts with<br />a Single Conversation
            </h2>
            <p className="font-dm-sans text-sm text-ivory/40 leading-relaxed mb-10">
              Whether you know exactly what you want or only have a feeling, we&apos;re here to listen.
              Reach out in whatever way feels most comfortable — a message, a call, a WhatsApp, or a visit.
              Your story deserves to be told in silk and gold.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/919999999999?text=Hi%20Shringarika!%20I'd%20love%20to%20start%20a%20conversation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-[#20bd5a] transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us Now
              </a>
              <Link
                href="/appointments"
                className="inline-flex items-center px-8 py-3 border border-ivory/20 text-ivory font-dm-sans text-xs tracking-[0.2em] uppercase hover:border-zari-gold hover:text-zari-gold transition-all duration-500"
              >
                Book Appointment
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      </main>
    </SiteLayout>
  );
}
