'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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

const blogPostData: Record<string, {
  title: string;
  category: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  gradient: string;
  letter: string;
  toc: { id: string; label: string }[];
  content: { type: 'h2' | 'h3' | 'p' | 'quote' | 'list'; text: string; items?: string[] }[];
  faqs: { question: string; answer: string }[];
}> = {
  'ultimate-bridal-lehenga-guide-2025': {
    title: 'The Ultimate Bridal Lehenga Guide for 2025 Brides',
    category: 'Bridal Style',
    author: 'Priya Sharma',
    authorTitle: 'Founder & Creative Director',
    date: 'February 15, 2025',
    readTime: '12 min read',
    gradient: 'from-rose-gold-light/30 via-blush to-champagne',
    letter: 'U',
    toc: [
      { id: 'choosing-silhouette', label: 'Choosing the Right Silhouette' },
      { id: 'fabric-guide', label: 'Fabric Guide: Silk, Velvet & More' },
      { id: 'embroidery-decoded', label: 'Embroidery Decoded' },
      { id: 'colour-trends', label: 'Colour Trends for 2025' },
      { id: 'budgeting', label: 'Budgeting for Your Dream Lehenga' },
      { id: 'timeline', label: 'When to Start Shopping' },
    ],
    content: [
      { type: 'p', text: 'Your bridal lehenga is perhaps the most significant garment you will ever wear. It is not merely an outfit — it is a statement of identity, a nod to tradition, and a canvas for personal expression. Yet for many brides, the process of choosing a lehenga can feel overwhelming, filled with unfamiliar terminology, endless options, and the weight of expectation. This guide is designed to change that.' },
      { type: 'h2', text: 'Choosing the Right Silhouette' },
      { type: 'p', text: 'The silhouette of your lehenga determines not just how it looks, but how it feels, how it moves, and how it photographs. The most popular silhouettes in 2025 include the classic A-line, the dramatic flared ghagra, the sleek mermaid cut, and the structured panelled lehenga. Each has its own personality and suits different body types and wedding settings.' },
      { type: 'p', text: 'The A-line lehenga is the most universally flattering — fitted at the waist and flaring gently to the hem, it creates an elegant, elongated silhouette that works beautifully for both petite and tall brides. The flared ghagra, with its voluminous layers of fabric, is the quintessential royal choice — perfect for grand venues and brides who want to make a dramatic entrance. The mermaid cut, fitted through the hips and thighs before flaring at the knee, is sophisticated and modern but requires confidence and comfort with a more body-conscious shape.' },
      { type: 'h3', text: 'A-Line vs. Flared: Making the Choice' },
      { type: 'p', text: 'If your wedding venue is a palace or a grand ballroom, the flared ghagra will fill the space beautifully. If you\'re having an intimate garden ceremony or a beach wedding, the A-line offers elegance without overwhelming the setting. At Shringarika, we always recommend trying both silhouettes during your consultation — you might be surprised by which one makes your heart skip.' },
      { type: 'h2', text: 'Fabric Guide: Silk, Velvet & More' },
      { type: 'p', text: 'The fabric of your lehenga is its foundation — it determines the drape, the weight, the lustre, and ultimately how the embroidery sits on the surface. Here are the key fabrics to consider for a 2025 bridal lehenga.' },
      { type: 'list', text: 'Top Fabric Choices for 2025 Brides', items: [
        'Pure Banarasi Silk — The gold standard for traditional bridal wear. Heavy, lustrous, and ideal for zardozi and resham work. Best for winter weddings and grand ceremonies.',
        'Raw Silk (Tussar) — Slightly textured with a natural sheen, raw silk is lighter than Banarasi and perfect for brides who want tradition without excessive weight.',
        'Velvet — Making a massive comeback in 2025, velvet adds depth, richness, and a regal quality that no other fabric can replicate. Ideal for reception and winter bridal lehengas.',
        'Organza — For the contemporary bride who wants lightness and architectural structure. Organza lehengas are ethereal, modern, and photograph beautifully in natural light.',
        'Georgette — Soft, flowing, and surprisingly versatile. Georgette lehengas are comfortable for long ceremonies and suit both traditional and contemporary designs.',
      ] },
      { type: 'h2', text: 'Embroidery Decoded' },
      { type: 'p', text: 'Embroidery is where a lehenga transforms from beautiful to breathtaking. Understanding the key techniques will help you appreciate the craftsmanship and make informed decisions about where to invest your budget.' },
      { type: 'p', text: 'Zardozi is the king of bridal embroidery — metallic threads (traditionally gold or silver) are couched onto the fabric to create raised, three-dimensional patterns. The quality of zardozi varies enormously; genuine zardozi uses real metal threads and is significantly heavier and more expensive than imitation alternatives. At Shringarika, we use only real zardozi for our bridal pieces, which is why our lehengas have that unmistakable weight and luminosity.' },
      { type: 'p', text: 'Resham (silk thread) embroidery is the most versatile — it can be tonal and subtle or vivid and bold, depending on the colour palette. It\'s ideal for intricate motifs like florals, paisleys, and birds. Gota Patti, a Rajasthani specialty, involves applying thin strips of gold or silver ribbon to create flat, shimmering patterns — it\'s lighter than zardozi but equally stunning.' },
      { type: 'quote', text: 'The embroidery on a bridal lehenga should tell a story — your story. Whether it\'s peacocks for grace, lotuses for purity, or mango motifs for fertility, every element can carry meaning beyond beauty.' },
      { type: 'h2', text: 'Colour Trends for 2025' },
      { type: 'p', text: 'While red will always remain the quintessential bridal colour in Indian tradition, 2025 is seeing a beautiful expansion of the bridal colour palette. Pastel lehengas in blush pink, mint green, and powder blue continue to gain popularity for daytime ceremonies. Ivory and gold combinations are the height of sophistication for reception looks. And for the bold bride, deep jewel tones — emerald, sapphire, and burgundy — are making a powerful statement.' },
      { type: 'h2', text: 'Budgeting for Your Dream Lehenga' },
      { type: 'p', text: 'A hand-embroidered bridal lehenga is a significant investment, and understanding the pricing structure will help you allocate your budget wisely. Entry-level machine-embroidered lehengas start around ₹30,000, while hand-embroidered pieces range from ₹80,000 to ₹5,00,000+ depending on the complexity and technique. The key factors that affect price are the fabric quality, the embroidery technique and density, the number of artisans involved, and the time required.' },
      { type: 'h2', text: 'When to Start Shopping' },
      { type: 'p', text: 'For a hand-embroidered bridal lehenga, we recommend starting the process at least 3-4 months before your wedding. For bespoke or heavily embellished pieces, 6 months is ideal. This allows time for design consultation, fabric sourcing, muslin fitting, embroidery execution, and final adjustments. Rush orders are possible but come with a surcharge and limit your design options.' },
    ],
    faqs: [
      { question: 'How far in advance should I order my bridal lehenga?', answer: 'We recommend starting the process 3-6 months before your wedding date. For bespoke or heavily embroidered pieces, 6 months is ideal to allow sufficient time for design, muslin fitting, hand-embroidery, and final adjustments.' },
      { question: 'What is the difference between zardozi and machine embroidery?', answer: 'Zardozi is hand-embroidery using metallic threads that are couched onto the fabric, creating raised, three-dimensional patterns. Machine embroidery is faster and less expensive but lacks the depth, texture, and artistry of handwork. A trained eye can always tell the difference.' },
      { question: 'Can I customise a lehenga from your existing collection?', answer: 'Absolutely. Most of our collection pieces can be customised — from changing the colour palette and fabric to adding or removing embroidery elements. We can also adjust silhouettes to better suit your body type.' },
      { question: 'Do you ship internationally?', answer: 'Yes, we ship worldwide. For bridal orders, we include a virtual fitting session and detailed draping instructions. We also have partners in several international cities who can assist with final alterations.' },
      { question: 'How do I preserve my bridal lehenga after the wedding?', answer: 'We provide a comprehensive preservation guide with every bridal order. Key tips include: dry-clean within two weeks, store in a muslin bag (never plastic), add neem leaves to deter insects, and avoid hanging (fold with tissue instead).' },
    ],
  },
};

// Default post data for any slug not in the map
const defaultPost = {
  title: 'The Art of Indian Couture: Tradition Meets Modernity',
  category: 'Behind the Craft',
  author: 'Priya Sharma',
  authorTitle: 'Founder & Creative Director',
  date: 'January 15, 2025',
  readTime: '8 min read',
  gradient: 'from-champagne via-sandalwood to-blush',
  letter: 'A',
  toc: [
    { id: 'heritage', label: 'Our Heritage' },
    { id: 'process', label: 'The Creative Process' },
    { id: 'artisans', label: 'Our Artisans' },
  ],
  content: [
    { type: 'p', text: 'Indian couture is not merely about beautiful garments — it is about a living tradition of artistry that has been passed down through generations of skilled craftspeople. At House of Shringarika, we stand at the intersection of this extraordinary heritage and the demands of contemporary fashion, creating pieces that honour the past while speaking to the present.' },
    { type: 'h2', text: 'Our Heritage' },
    { type: 'p', text: 'The roots of Indian textile craftsmanship stretch back thousands of years. From the Ajanta cave paintings that depict women in draped silks to the Mughal courts where zardozi embroidery reached its zenith, our textile traditions are among the richest in the world. At Shringarika, we see ourselves not just as designers but as custodians of this legacy — responsible for ensuring that these ancient techniques not only survive but thrive in the modern world.' },
    { type: 'h2', text: 'The Creative Process' },
    { type: 'p', text: 'Every Shringarika creation begins with a conversation — between designer and client, between tradition and innovation, between fabric and form. Our design process is deliberately unhurried, because we believe that true creativity cannot be rushed. We sketch by hand, drape on real bodies, and refine through multiple iterations before a single stitch is placed on the final fabric.' },
    { type: 'h2', text: 'Our Artisans' },
    { type: 'p', text: 'Behind every Shringarika piece is a team of artisans whose skills have been honed over decades, often across generations. Our zardozi masters learned the craft from their fathers, who learned from theirs. Our block printers can identify the origin of a print by touch alone. These are not workers — they are artists, and we treat them as such, paying fair wages and providing a creative environment where their expertise is respected and celebrated.' },
    { type: 'quote', text: 'The hand that stitches a Shringarika lehenga carries the weight of centuries of tradition. We never forget that — and we never let our clients forget it either.' },
    { type: 'p', text: 'This commitment to artisan-first production is not just ethical — it is the very reason our garments look and feel the way they do. Machine embroidery can replicate a pattern, but it cannot replicate the subtle tension of a hand-pulled stitch, the organic irregularity that gives handwork its soul, or the pride of an artisan who signs their work with invisible excellence.' },
  ],
  faqs: [
    { question: 'What makes hand-embroidery different from machine work?', answer: 'Hand-embroidery has a unique texture, depth, and character that machines cannot replicate. Each stitch carries the artisan\'s touch, creating subtle variations that give the garment its soul. Hand-embroidery is also significantly more durable and ages beautifully.' },
    { question: 'How many artisans work on a single Shringarika piece?', answer: 'Depending on the complexity, between 8 and 15 artisans contribute to a single garment. Each specialises in a different technique — from zardozi and resham to gota patti and mirror work.' },
    { question: 'Can I visit the atelier to see the artisans at work?', answer: 'We occasionally host open studio days where visitors can observe our artisans at work. For a private viewing, please book an appointment through our website or WhatsApp.' },
  ],
};

const relatedPosts = [
  { slug: 'zardozi-embroidery-history', title: 'The Art of Zardozi: A 3,000-Year-Old Craft', category: 'Behind the Craft', readTime: '8 min read', gradient: 'from-champagne via-sandalwood to-blush', letter: 'Z' },
  { slug: 'saree-draping-styles-2025', title: '7 Saree Draping Styles Redefining 2025', category: 'Lehenga & Saree', readTime: '7 min read', gradient: 'from-blush via-rose-gold-light/20 to-champagne', letter: 'S' },
  { slug: 'wedding-trends-2025', title: 'Wedding Fashion Trends 2025: What\'s In & Out', category: 'Wedding Trends', readTime: '10 min read', gradient: 'from-ivory-dark via-champagne to-blush', letter: 'W' },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPostData[slug] || defaultPost;

  return (
    <SiteLayout>
      <main className="bg-ivory">

      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Link href="/blog" className="font-dm-sans text-xs text-noir/40 hover:text-zari-gold transition-colors duration-300">
              ← Back to Journal
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-dm-sans text-[10px] tracking-wider uppercase text-zari-gold px-2 py-1 bg-zari-gold/5">{post.category}</span>
            <span className="font-dm-sans text-[10px] text-noir/30">{post.readTime}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-noir leading-[1.15] mb-6"
          >
            {post.title}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-[1px] bg-zari-gold mb-6"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne to-blush flex items-center justify-center">
              <span className="font-cormorant text-noir/30 text-sm">P</span>
            </div>
            <div>
              <p className="font-dm-sans text-sm text-noir">{post.author}</p>
              <p className="font-dm-sans text-xs text-noir/40">{post.authorTitle} · {post.date}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image Placeholder */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className={`aspect-[16/9] bg-gradient-to-br ${post.gradient} rounded-sm overflow-hidden`}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-cormorant text-noir/10 text-9xl italic">{post.letter}</span>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Content + TOC */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-12">
            {/* Table of Contents - Desktop */}
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-32">
                <p className="font-dm-sans text-xs tracking-wider uppercase text-noir/30 mb-4">In This Article</p>
                <nav className="space-y-2 mb-8">
                  {post.toc.map((item, index) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block font-dm-sans text-xs text-noir/40 hover:text-zari-gold transition-colors duration-300 py-1"
                    >
                      <span className="text-noir/20 mr-2">0{index + 1}</span>
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Social Share */}
                <div className="pt-6 border-t border-zari-gold/10">
                  <p className="font-dm-sans text-xs tracking-wider uppercase text-noir/30 mb-3">Share</p>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 border border-zari-gold/10 flex items-center justify-center text-noir/30 hover:text-zari-gold hover:border-zari-gold/30 transition-all duration-300" aria-label="Share on WhatsApp">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </button>
                    <button className="w-8 h-8 border border-zari-gold/10 flex items-center justify-center text-noir/30 hover:text-zari-gold hover:border-zari-gold/30 transition-all duration-300" aria-label="Share on Instagram">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </button>
                    <button className="w-8 h-8 border border-zari-gold/10 flex items-center justify-center text-noir/30 hover:text-zari-gold hover:border-zari-gold/30 transition-all duration-300" aria-label="Copy link">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <article className="flex-1 max-w-2xl">
              {post.content.map((block, index) => {
                if (block.type === 'h2') {
                  return (
                    <FadeInSection key={index} delay={0.05}>
                      <h2 id={post.toc.find(t => t.label === block.text)?.id || `section-${index}`} className="font-cormorant text-2xl md:text-3xl text-noir mt-12 mb-4 first:mt-0">
                        {block.text}
                      </h2>
                    </FadeInSection>
                  );
                }
                if (block.type === 'h3') {
                  return (
                    <FadeInSection key={index} delay={0.05}>
                      <h3 className="font-playfair text-lg md:text-xl text-noir mt-8 mb-3">
                        {block.text}
                      </h3>
                    </FadeInSection>
                  );
                }
                if (block.type === 'quote') {
                  return (
                    <FadeInSection key={index} delay={0.05}>
                      <blockquote className="my-8 pl-6 border-l-2 border-zari-gold/40">
                        <p className="font-cormorant text-lg md:text-xl text-noir/70 italic leading-relaxed">
                          {block.text}
                        </p>
                      </blockquote>
                    </FadeInSection>
                  );
                }
                if (block.type === 'list') {
                  return (
                    <FadeInSection key={index} delay={0.05}>
                      <div className="my-6">
                        <p className="font-dm-sans text-xs tracking-wider uppercase text-noir/40 mb-3">{block.text}</p>
                        <ul className="space-y-3">
                          {block.items?.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 bg-zari-gold/40 rounded-full mt-2 shrink-0" />
                              <span className="font-dm-sans text-sm text-noir/60 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </FadeInSection>
                  );
                }
                return (
                  <FadeInSection key={index} delay={0.05}>
                    <p className="font-dm-sans text-sm text-noir/60 leading-relaxed mb-4">
                      {block.text}
                    </p>
                  </FadeInSection>
                );
              })}

              {/* Inline CTA */}
              <FadeInSection>
                <div className="my-12 p-8 bg-blush/30 border border-zari-gold/10">
                  <p className="font-cormorant text-xl text-noir mb-3">Ready to Find Your Dream Outfit?</p>
                  <p className="font-dm-sans text-sm text-noir/50 mb-6">Chat with our styling team or book a consultation at our Jaipur atelier.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://wa.me/919999999999?text=Hi!%20I%20read%20your%20blog%20and%20I'm%20interested%20in%20finding%20my%20dream%20outfit."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-dm-sans text-xs tracking-wider uppercase hover:bg-[#20bd5a] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      WhatsApp Us
                    </a>
                    <Link
                      href="/appointments"
                      className="inline-flex items-center justify-center px-6 py-3 border border-noir/20 text-noir font-dm-sans text-xs tracking-wider uppercase hover:border-zari-gold hover:text-zari-gold transition-all duration-300"
                    >
                      Book Consultation
                    </Link>
                  </div>
                </div>
              </FadeInSection>

              {/* FAQ Section */}
              <FadeInSection>
                <div className="mt-16 mb-12">
                  <h2 className="font-cormorant text-2xl md:text-3xl text-noir mb-8">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {post.faqs.map((faq, index) => (
                      <div key={index} className="border-b border-zari-gold/10 pb-6">
                        <h3 className="font-playfair text-base text-noir mb-3">{faq.question}</h3>
                        <p className="font-dm-sans text-sm text-noir/50 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            </article>
          </div>
        </div>
      </section>

      {/* Author Profile */}
      <section className="py-12 bg-blush/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-champagne to-blush flex items-center justify-center shrink-0">
                <span className="font-cormorant text-noir/30 text-2xl">P</span>
              </div>
              <div>
                <p className="font-cinzel text-sm text-noir tracking-wider mb-1">Priya Sharma</p>
                <p className="font-dm-sans text-xs text-noir/40 mb-3">Founder & Creative Director, House of Shringarika</p>
                <p className="font-dm-sans text-sm text-noir/50 leading-relaxed">
                  Priya is a textile designer turned couturier who founded House of Shringarika in 2016 with a mission
                  to create deeply personal luxury fashion rooted in Indian craft traditions. Her work has been featured
                  in Vogue India, Harper&apos;s Bazaar, and Elle.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Related Posts */}
      <section className="section-luxury bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-zari-gold mb-4">Continue Reading</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-noir">Related Articles</h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post, index) => (
              <FadeInSection key={post.slug} delay={index * 0.15}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className={`aspect-[16/10] bg-gradient-to-br ${post.gradient} rounded-sm overflow-hidden mb-4`}>
                    <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                      <span className="font-cormorant text-noir/10 text-6xl italic">{post.letter}</span>
                    </div>
                  </div>
                  <span className="font-dm-sans text-[10px] tracking-wider uppercase text-zari-gold">{post.category}</span>
                  <h3 className="font-playfair text-base text-noir mt-1 group-hover:text-zari-gold transition-colors duration-300 leading-snug">{post.title}</h3>
                  <span className="font-dm-sans text-[10px] text-noir/30 mt-2 block">{post.readTime}</span>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      </main>
    </SiteLayout>
  );
}
