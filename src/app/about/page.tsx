'use client';

import { useRef } from 'react';
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

const philosophies = [
  {
    title: 'Heritage-First Design',
    description: 'Every silhouette begins with a deep reverence for Rajasthani craft traditions. We don\'t simply borrow motifs — we study the artisans who\'ve kept them alive for generations, then reimagine them for the woman of today. Our lehengas carry the soul of block-printers, our sarees echo the rhythm of loom weavers, and our embroidery channels the patience of zardozi masters.',
    icon: '✦',
  },
  {
    title: 'Conscious Couture',
    description: 'Luxury without conscience is merely ornamentation. At House of Shringarika, we are committed to slow fashion — small-batch production, zero-waste pattern cutting, and fair wages for every hand that touches our garments. We believe that the most beautiful outfit is one that carries no hidden cost to the planet or its people.',
    icon: '❋',
  },
  {
    title: 'Personal Narrative',
    description: 'No two women share the same story, and no two Shringarika creations should be identical. Whether you choose from our curated collections or embark on a bespoke journey, your outfit will be infused with personal meaning — from the colour of your grandmother\'s saree woven into the border, to a hidden mantra embroidered beneath the dupatta.',
    icon: '◇',
  },
  {
    title: 'Modern Royal',
    description: 'We exist at the intersection of timeless Indian grandeur and contemporary global sophistication. Our designs are never costume-like or derivative. They are sharp, architectural, and effortlessly modern — yet unmistakably rooted in the aesthetic vocabulary of Rajasthan\'s royal courts and temple traditions.',
    icon: '◈',
  },
];

const differentiators = [
  'Every garment is touched by at least 12 artisans across 4 different craft disciplines — no factory shortcuts.',
  'We source fabrics directly from heritage weaving clusters in Varanasi, Kanchipuram, and Chanderi — no middlemen.',
  'Our bespoke process includes a personal design consultation with the founder, not a sales associate.',
  'Each bridal lehenga takes a minimum of 45 days and over 200 hours of hand-embroidery — never rushed.',
  'We maintain a lifetime relationship with every client — alterations, styling advice, and preservation guidance, always.',
  'Our atelier in Jaipur is open for private viewings — because luxury should never be experienced through a screen alone.',
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-ivory">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-champagne via-blush to-sandalwood" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-6"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-noir leading-[1.1] mb-8"
          >
            Every Thread Tells<br />a Story
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
            className="font-cormorant text-xl md:text-2xl text-noir/60 italic max-w-2xl mx-auto"
          >
            Born in the pink city of Jaipur, woven with the soul of Rajasthan
          </motion.p>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="section-luxury bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInSection>
              <div className="aspect-[4/5] bg-gradient-to-br from-champagne via-blush to-sandalwood rounded-sm overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-cormorant text-noir/10 text-8xl italic">S</span>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">The Beginning</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-noir mb-8">Where It All Started</h2>
              <div className="space-y-6 font-dm-sans text-sm text-noir/70 leading-relaxed">
                <p>
                  In the narrow, sun-dappled lanes of Jaipur&apos;s old city — where the air carries the scent of marigolds and
                  block-printing ink — a young girl watched her grandmother drape sarees with the precision of a sculptor.
                  Each pleat was deliberate, each fold a verse in an unspoken language of beauty. That girl was Priya Sharma,
                  and those quiet afternoons of observation would one day become the foundation of House of Shringarika.
                </p>
                <p>
                  Founded in 2016, House of Shringarika was never meant to be just another fashion label. Priya, after
                  studying textile design at the National Institute of Design and apprenticing under master weavers in
                  Kanchipuram and Varanasi, returned to Jaipur with a singular vision: to create a couture house that
                  treated every garment as a living story — one that honoured the hands that made it as much as the woman
                  who wore it. The word &ldquo;Shringarika&rdquo; itself draws from the Sanskrit &ldquo;shringar&rdquo; — the art of adornment,
                  the 36th rasa in Indian aesthetics that celebrates beauty, love, and the sacred act of making oneself
                  beautiful.
                </p>
                <p>
                  What began as a small atelier with three artisans and a single sewing machine has grown into a
                  destination for brides and connoisseurs from across India and the world. Yet the spirit remains
                  unchanged. Every lehenga that leaves our workshop still carries the scent of fresh thread, the
                  warmth of hands that stitched through the night, and the unwavering belief that fashion at its
                  highest form is not about trend — it is about truth. Your truth. Told in silk, zari, and the
                  quiet confidence of a woman who knows exactly who she is.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section className="section-luxury bg-blush/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Our Philosophy</p>
              <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-noir mb-6">Design Principles We Live By</h2>
              <p className="font-dm-sans text-sm text-noir/60 max-w-2xl mx-auto leading-relaxed">
                These are not mere guidelines — they are the invisible architecture that holds every creation together,
                the quiet promises we make to every woman who trusts us with her most important moments.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {philosophies.map((philosophy, index) => (
              <FadeInSection key={philosophy.title} delay={index * 0.15}>
                <div className="bg-ivory p-8 md:p-10 border border-zari-gold/10 hover:border-zari-gold/30 transition-all duration-500 group">
                  <div className="flex items-start gap-6">
                    <span className="text-3xl text-zari-gold/60 group-hover:text-zari-gold transition-colors duration-500 mt-1">
                      {philosophy.icon}
                    </span>
                    <div>
                      <h3 className="font-playfair text-xl text-noir mb-4">{philosophy.title}</h3>
                      <p className="font-dm-sans text-sm text-noir/60 leading-relaxed">{philosophy.description}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Designer */}
      <section className="section-luxury bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInSection>
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">The Visionary</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-noir mb-8">Meet the Designer</h2>
              <div className="space-y-6 font-dm-sans text-sm text-noir/70 leading-relaxed">
                <p>
                  Priya Sharma is not your typical fashion designer. With a degree in Textile Design from NID Ahmedabad
                  and a heart rooted firmly in Jaipur&apos;s artisan communities, she represents a new generation of Indian
                  couturiers — one that refuses to choose between heritage and innovation. Her design sensibility was
                  shaped not by runway trends, but by years of sitting alongside master craftsmen in the workshops of
                  Sanganer, watching them transform raw fabric into poetry.
                </p>
                <p>
                  &ldquo;I don&apos;t design clothes,&rdquo; Priya often says. &ldquo;I design moments. The moment a bride sees herself
                  in the mirror for the first time. The moment a mother realises her daughter is wearing not just a
                  lehenga, but a legacy. That&apos;s what Shringarika exists for — to make those moments unforgettable.&rdquo;
                </p>
                <p>
                  Her work has been featured in Vogue India, Harper&apos;s Bazaar, and Elle, and she has dressed some of
                  India&apos;s most discerning women — from corporate leaders to Bollywood stylists. Yet she remains
                  refreshingly grounded, often found sitting cross-legged on the atelier floor, hand-stitching a
                  border detail herself because &ldquo;the machine just doesn&apos;t feel right for this part.&rdquo;
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <span className="font-cinzel text-lg text-noir tracking-wider">Priya Sharma</span>
                <span className="w-12 h-[1px] bg-zari-gold/40" />
                <span className="font-dm-sans text-xs text-noir/50">Founder & Creative Director</span>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="aspect-[3/4] bg-gradient-to-br from-sandalwood via-champagne to-blush rounded-sm overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-cormorant text-noir/10 text-9xl italic">P</span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Atelier Section */}
      <section className="section-luxury bg-noir">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInSection>
              <div className="aspect-[4/3] bg-gradient-to-br from-noir-soft via-noir to-mauve-dusty/20 rounded-sm overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-cormorant text-ivory/10 text-8xl italic block">A</span>
                    <span className="font-dm-sans text-ivory/20 text-xs tracking-[0.3em] uppercase">Our Atelier</span>
                  </div>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">The Atelier</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-ivory mb-8">Where Magic Meets Method</h2>
              <div className="space-y-6 font-dm-sans text-sm text-ivory/50 leading-relaxed">
                <p>
                  Our atelier sits in the heart of Jaipur&apos;s C-Scheme — a sun-filled, three-storey space that hums
                  with the quiet industry of over 40 artisans. Walk through the doors and you&apos;ll hear the click of
                  wooden looms, the whisper of silk being measured, and the gentle clink of zari threads being woven
                  into intricate patterns that will one day grace a bride or grace a gala.
                </p>
                <p>
                  The ground floor is our consultation space — warm, inviting, and deliberately free of the
                  overwhelming racks you&apos;d find in a typical bridal store. Here, you sit with a cup of masala chai,
                  browse fabric swatches, and talk about your vision. The second floor houses our design studio,
                  where sketches become patterns and patterns become muslins. And the third floor — that&apos;s where
                  the magic truly happens — our embroidery workshop, where artisans from Lucknow, Kutch, and
                  Rajasthan work side by side, each bringing their regional mastery to the same garment.
                </p>
                <p>
                  We believe that the space where something is made matters. Our atelier is designed to inspire —
                  with natural light, Rajasthani jharokha windows, and walls lined with vintage textile fragments
                  that remind us every day of the extraordinary legacy we carry forward.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Craftsmanship Ethos */}
      <section className="section-luxury bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Our Ethos</p>
            <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-noir mb-6">Craftsmanship Is Our Religion</h2>
            <p className="font-dm-sans text-sm text-noir/60 max-w-3xl mx-auto leading-relaxed mb-16">
              In an age of mass production and overnight delivery, we choose the path of patience. Every House of
              Shringarika creation is a testament to the belief that true luxury cannot be hurried — it must be
              earned through skill, dedication, and an unwavering commitment to excellence.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                number: '200+',
                label: 'Hours of Hand-Embroidery',
                description: 'Each bridal lehenga receives a minimum of 200 hours of meticulous hand-embroidery, with some pieces exceeding 500 hours for our most elaborate designs.',
              },
              {
                number: '12',
                label: 'Artisans Per Garment',
                description: 'Every creation passes through the hands of at least 12 specialised artisans — from pattern makers and cutters to embroiderers, dyers, and finishers.',
              },
              {
                number: '6',
                label: 'Heritage Craft Techniques',
                description: 'We actively preserve and employ six heritage craft techniques including Zardozi, Gota Patti, Bandhani, Block Printing, Resham, and Mirror Work.',
              },
            ].map((stat, index) => (
              <FadeInSection key={stat.label} delay={index * 0.15}>
                <div className="p-8 border border-zari-gold/10">
                  <span className="font-cormorant text-5xl text-zari-gold block mb-3">{stat.number}</span>
                  <span className="font-dm-sans text-xs tracking-[0.2em] uppercase text-noir/80 block mb-4">{stat.label}</span>
                  <p className="font-dm-sans text-sm text-noir/50 leading-relaxed">{stat.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="section-luxury bg-blush/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">What Sets Us Apart</p>
              <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-noir mb-6">Why Shringarika Is Different</h2>
              <p className="font-dm-sans text-sm text-noir/60 max-w-2xl mx-auto leading-relaxed">
                We don&apos;t just make clothes — we craft legacies. Here&apos;s what truly distinguishes the House of Shringarika
                experience from everything else in the market.
              </p>
            </div>
          </FadeInSection>
          <div className="space-y-6">
            {differentiators.map((item, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <div className="flex items-start gap-6 group">
                  <span className="font-cinzel text-zari-gold text-sm mt-1 shrink-0">0{index + 1}</span>
                  <div className="flex-1 pb-6 border-b border-zari-gold/10 group-hover:border-zari-gold/30 transition-colors duration-500">
                    <p className="font-dm-sans text-sm text-noir/70 leading-relaxed">{item}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-luxury bg-noir">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-6">Begin Your Story</p>
            <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-ivory mb-6">
              Ready to Create Something<br />That&apos;s Uniquely Yours?
            </h2>
            <p className="font-dm-sans text-sm text-ivory/50 max-w-2xl mx-auto leading-relaxed mb-10">
              Every great outfit begins with a conversation. Tell us about your vision, your occasion, your dream —
              and let us bring it to life with the same dedication and artistry that has made House of Shringarika
              the most trusted name in luxury couture.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/bespoke"
                className="inline-flex items-center px-8 py-4 bg-zari-gold text-noir font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-zari-gold-light transition-all duration-500 btn-luxury-glow"
              >
                Start Your Custom Journey
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hi%20Shringarika!%20I%27d%20love%20to%20learn%20more%20about%20your%20bespoke%20process."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-ivory/20 text-ivory font-dm-sans text-xs tracking-[0.2em] uppercase hover:border-zari-gold hover:text-zari-gold transition-all duration-500"
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
