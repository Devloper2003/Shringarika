'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/shringarika/Header';
import Footer from '@/components/shringarika/Footer';
import WhatsAppButton from '@/components/shringarika/WhatsAppButton';

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

const steps = [
  {
    number: '01',
    title: 'Consultation',
    subtitle: 'Your Vision, Our Canvas',
    description: 'Every bespoke journey begins with a personal conversation — either at our Jaipur atelier or over a video call. We listen to your vision, understand your occasion, discuss silhouettes you love, and explore fabrics and embroidery styles that resonate with your personal aesthetic. This is not a sales meeting; it is a creative dialogue between you and our design team.',
    duration: '60–90 minutes',
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'Sketching Your Dream',
    description: 'Based on our consultation, our design team creates detailed hand-drawn sketches and digital renderings of your outfit. We present multiple options, discuss every element — from neckline shape to border width — and refine the design until it is unmistakably, beautifully yours. We also create a curated fabric and embroidery swatch kit for your approval.',
    duration: '5–7 business days',
  },
  {
    number: '03',
    title: 'Drape & Create',
    subtitle: 'The Art of Making',
    description: 'Once the design is approved, your garment enters production. First, we create a muslin toile (a test garment in cotton) for a live fitting, ensuring the silhouette drapes perfectly on your body. After your fitting approval, our master artisans begin the hand-embroidery, hand-cutting, and hand-stitching process. Each piece is crafted by specialists in their craft — zardozi masters, resham embroiderers, gota patti artisans.',
    duration: '30–60 days',
  },
  {
    number: '04',
    title: 'Deliver',
    subtitle: 'The Grand Reveal',
    description: 'Your finished garment undergoes a rigorous quality inspection — every stitch, every bead, every border is examined under natural light. We then arrange a final fitting (in-person or via video for outstation clients), make any last adjustments, and carefully package your creation in our signature Shringarika garment bag. For bridal orders, we include a complimentary steaming session and styling consultation.',
    duration: 'Final fitting + 2–3 days delivery',
  },
];

const fabricOptions = [
  { name: 'Silk', description: 'Pure Banarasi, Tussar, and Mulberry silk — the cornerstone of Indian luxury textiles. Our silks are sourced directly from weaving clusters in Varanasi and Bhagalpur.', gradient: 'from-champagne to-sandalwood', letter: 'S' },
  { name: 'Velvet', description: 'Rich, tactile, and impossibly regal. Our velvet is custom-dyed to match your exact shade requirements, perfect for winter weddings and evening occasions.', gradient: 'from-noir-soft to-mauve-dusty', letter: 'V' },
  { name: 'Organza', description: 'Light as air, luminous as moonlight. Our organzas create ethereal, architectural silhouettes that float rather than drape — ideal for contemporary bridal looks.', gradient: 'from-ivory-dark to-champagne', letter: 'O' },
  { name: 'Zari', description: 'The golden thread that has defined Indian bridal wear for centuries. We use real zari (silver coated in gold) for our premium pieces, and tested zari for more accessible options.', gradient: 'from-zari-gold/30 to-champagne', letter: 'Z' },
  { name: 'Resham', description: 'Silk thread embroidery that creates vivid, painterly designs on fabric. Our resham work ranges from delicate tonal patterns to bold, colourful motifs that bring any garment to life.', gradient: 'from-rose-gold-light/30 to-blush', letter: 'R' },
  { name: 'Mirror Work', description: 'A hallmark of Rajasthani craft tradition, our mirror work (sheesha) is hand-applied by artisans from Kutch and Jaisalmer, creating dazzling interplays of light and texture.', gradient: 'from-blush to-champagne', letter: 'M' },
];

export default function BespokePage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <main className="relative min-h-screen flex flex-col bg-ivory">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-noir via-noir-soft to-mauve-dusty/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-noir" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-6"
          >
            Bespoke Couture
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory leading-[1.1] mb-8"
          >
            Made Only for You.
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
            className="font-cormorant text-xl md:text-2xl text-ivory/50 italic max-w-2xl mx-auto"
          >
            When off-the-rack is not enough, we create from scratch — a garment that exists nowhere else in the world
          </motion.p>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="section-luxury bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">The Journey</p>
              <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-noir mb-6">Your Bespoke Journey in Four Steps</h2>
              <p className="font-dm-sans text-sm text-noir/60 max-w-2xl mx-auto leading-relaxed">
                From the first conversation to the final fitting, every stage of our bespoke process is designed
                to ensure your creation is nothing short of extraordinary.
              </p>
            </div>
          </FadeInSection>

          {/* Step Navigation */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-12">
            {steps.map((step, index) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 transition-all duration-500 ${
                  activeStep === index
                    ? 'bg-noir text-ivory'
                    : 'bg-blush/30 text-noir/40 hover:bg-blush/50'
                }`}
              >
                <span className="font-cinzel text-sm md:text-base">{step.number}</span>
                <span className="font-dm-sans text-xs tracking-wider uppercase hidden sm:inline">{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <FadeInSection key={activeStep}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] bg-gradient-to-br from-champagne via-blush to-sandalwood rounded-sm overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-cinzel text-noir/10 text-9xl block">{steps[activeStep].number}</span>
                  </div>
                </div>
              </div>
              <div>
                <span className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-2 block">
                  Step {steps[activeStep].number}
                </span>
                <h3 className="font-cormorant text-3xl md:text-4xl text-noir mb-2">{steps[activeStep].title}</h3>
                <p className="font-playfair text-lg text-noir/40 italic mb-6">{steps[activeStep].subtitle}</p>
                <p className="font-dm-sans text-sm text-noir/60 leading-relaxed mb-4">{steps[activeStep].description}</p>
                <p className="font-dm-sans text-xs text-zari-gold/80 tracking-wider uppercase">Duration: {steps[activeStep].duration}</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* The Bespoke Experience */}
      <section className="section-luxury bg-blush/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Beyond Customisation</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-noir mb-6">The Bespoke Experience</h2>
            </div>
            <div className="space-y-8 font-dm-sans text-sm text-noir/60 leading-relaxed">
              <p>
                Bespoke at House of Shringarika is not simply about choosing a different neckline or swapping one
                embroidery pattern for another. It is a profoundly personal creative partnership — one where your
                personality, your story, and your aesthetic sensibility become the raw materials from which we craft
                something entirely new. We believe that the most memorable outfits are not bought — they are born
                from a conversation, a sketch, and the patient hands of artisans who treat every thread as sacred.
              </p>
              <p>
                When you walk into our atelier for a bespoke consultation, you are not entering a store. You are
                entering a creative sanctuary — a space where mood boards line the walls, fabric swatches are
                arranged like an artist&apos;s palette, and the scent of fresh silk mingles with masala chai. Here,
                there are no wrong ideas, only starting points. Our designers are trained not just in aesthetics
                but in the art of listening — they will draw out your vision even if you can&apos;t yet articulate it,
                and translate it into sketches that make you say, &ldquo;Yes, that&apos;s exactly what I imagined.&rdquo;
              </p>
              <p>
                The result is a garment that fits not just your body but your identity. A bridal lehenga that
                carries your grandmother&apos;s favourite colour in its border. A saree whose pallu tells the story
                of how you met. A jacket with your wedding date embroidered in Devanagari on the inside cuff —
                invisible to the world, but known to you. That is the Shringarika bespoke promise: we don&apos;t
                just make clothes. We make keepsakes.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Fabric & Embroidery Options */}
      <section className="section-luxury bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Materials & Craft</p>
              <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-noir mb-6">Fabric & Embroidery Options</h2>
              <p className="font-dm-sans text-sm text-noir/60 max-w-2xl mx-auto leading-relaxed">
                Our materials are sourced from the finest weaving clusters across India, and every embroidery
                technique is executed by master artisans with decades of generational expertise.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fabricOptions.map((option, index) => (
              <FadeInSection key={option.name} delay={index * 0.1}>
                <div className="group cursor-pointer">
                  <div className={`aspect-[4/3] bg-gradient-to-br ${option.gradient} rounded-sm overflow-hidden mb-4`}>
                    <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <span className="font-cormorant text-noir/10 text-7xl italic">{option.letter}</span>
                    </div>
                  </div>
                  <h3 className="font-playfair text-lg text-noir mb-2 group-hover:text-zari-gold transition-colors duration-300">{option.name}</h3>
                  <p className="font-dm-sans text-xs text-noir/50 leading-relaxed">{option.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Expectations */}
      <section className="section-luxury bg-noir">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Planning Ahead</p>
            <h2 className="font-cormorant text-3xl md:text-4xl text-ivory mb-8">Timeline Expectations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { type: 'Bridal Lehenga', timeline: '60–90 days', note: 'For elaborate zardozi and hand-embroidery work, we recommend starting 3–4 months before your wedding.' },
                { type: 'Festive / Party Wear', timeline: '30–45 days', note: 'Simpler embroidery and ready fabric options allow for faster turnaround, especially for pre-wedding events.' },
                { type: 'Light Bespoke / Alterations', timeline: '15–20 days', note: 'Custom styling of existing silhouettes with personalised embroidery or fabric changes.' },
              ].map((item, index) => (
                <div key={item.type} className="p-6 border border-ivory/10">
                  <h3 className="font-playfair text-lg text-ivory mb-2">{item.type}</h3>
                  <span className="font-cormorant text-3xl text-zari-gold block mb-3">{item.timeline}</span>
                  <p className="font-dm-sans text-xs text-ivory/40 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
            <p className="font-dm-sans text-xs text-ivory/30 leading-relaxed">
              Rush orders are available at a surcharge. Please contact us directly for expedited timelines.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="section-luxury bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Get Started</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-noir mb-6">Begin Your Bespoke Inquiry</h2>
              <p className="font-dm-sans text-sm text-noir/60 max-w-2xl mx-auto leading-relaxed">
                Tell us about your dream outfit and our design team will get back to you within 24 hours with
                initial thoughts, fabric suggestions, and a detailed consultation plan.
              </p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div>
                <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Email Address *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/20 focus:border-zari-gold focus:outline-none transition-colors duration-300"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Occasion *</label>
                  <select className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir/60 focus:border-zari-gold focus:outline-none transition-colors duration-300">
                    <option value="">Select occasion</option>
                    <option value="wedding">Wedding / Bridal</option>
                    <option value="reception">Reception</option>
                    <option value="engagement">Engagement / Ring Ceremony</option>
                    <option value="sangeet">Sangeet / Mehendi</option>
                    <option value="festive">Festive / Puja</option>
                    <option value="party">Cocktail / Party</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Budget Range *</label>
                  <select className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir/60 focus:border-zari-gold focus:outline-none transition-colors duration-300">
                    <option value="">Select budget</option>
                    <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                    <option value="1l-2l">₹1,00,000 – ₹2,00,000</option>
                    <option value="2l-3l">₹2,00,000 – ₹3,00,000</option>
                    <option value="3l-5l">₹3,00,000 – ₹5,00,000</option>
                    <option value="5l+">₹5,00,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Fabric Preference</label>
                <div className="flex flex-wrap gap-2">
                  {['Silk', 'Velvet', 'Organza', 'Georgette', 'Chanderi', 'Net', 'No Preference'].map((fabric) => (
                    <button
                      key={fabric}
                      type="button"
                      className="px-4 py-2 border border-zari-gold/20 font-dm-sans text-xs text-noir/50 hover:border-zari-gold hover:text-noir transition-all duration-300"
                    >
                      {fabric}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Describe Your Dream Outfit *</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your vision — the silhouette, colours, embroidery style, any reference images you have in mind, the occasion, and what makes this outfit special to you..."
                  className="w-full bg-transparent border border-zari-gold/20 px-4 py-3 font-dm-sans text-sm text-noir placeholder:text-noir/20 focus:border-zari-gold focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>
              <div>
                <label className="block font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-2">Upload Reference Image</label>
                <div className="border-2 border-dashed border-zari-gold/20 p-8 text-center hover:border-zari-gold/40 transition-colors duration-300 cursor-pointer">
                  <svg className="w-8 h-8 text-noir/20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p className="font-dm-sans text-xs text-noir/30">Click to upload or drag and drop</p>
                  <p className="font-dm-sans text-[10px] text-noir/20 mt-1">PNG, JPG up to 10MB</p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-noir text-ivory font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-noir-soft transition-all duration-500 btn-luxury-glow"
                >
                  Submit Inquiry
                </button>
                <a
                  href="https://wa.me/919999999999?text=Hi!%20I'm%20interested%20in%20a%20bespoke%20creation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-4 border border-zari-gold/40 text-zari-gold font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Instead
                </a>
              </div>
            </form>
          </FadeInSection>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-luxury bg-blush/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center">
              <span className="font-cormorant text-6xl text-zari-gold/30 block mb-4">&ldquo;</span>
              <p className="font-cormorant text-2xl md:text-3xl text-noir leading-relaxed mb-8 italic">
                When I walked into Shringarika, I had a vague idea of what I wanted. When I walked out wearing my
                bridal lehenga, I was wearing a piece of art that told my story. The team didn&apos;t just listen — they
                understood. Every detail, from the peacock motifs my mother loved to the hidden mantra my grandmother
                taught me, was woven into the fabric. I wept when I saw the finished piece. It was more than a lehenga —
                it was a love letter to my family.
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-champagne to-blush flex items-center justify-center">
                  <span className="font-cormorant text-noir/30 text-lg">A</span>
                </div>
                <div className="text-left">
                  <p className="font-cinzel text-sm text-noir tracking-wider">Ananya Mehta</p>
                  <p className="font-dm-sans text-xs text-noir/40">Bespoke Bridal Client, Mumbai</p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-16 md:py-24 bg-noir">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="font-cormorant text-3xl md:text-4xl text-ivory mb-4">
              Ready to Begin?
            </h2>
            <p className="font-dm-sans text-sm text-ivory/40 mb-8 leading-relaxed">
              Book a personal consultation at our Jaipur atelier or schedule a video call — whichever feels right for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/appointments"
                className="inline-flex items-center px-8 py-3 bg-zari-gold text-noir font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-zari-gold-light transition-all duration-500 btn-luxury-glow"
              >
                Book Appointment
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hi!%20I'd%20like%20to%20book%20a%20bespoke%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 border border-ivory/20 text-ivory font-dm-sans text-xs tracking-[0.2em] uppercase hover:border-zari-gold hover:text-zari-gold transition-all duration-500"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
      <WhatsAppButton />
    </main>
  );
}
