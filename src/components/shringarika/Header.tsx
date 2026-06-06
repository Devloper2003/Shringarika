'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  User,
  Calendar,
  X,
  Menu,
  ChevronDown,
  BookOpen,
  Scissors,
  Heart,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Phone,
} from 'lucide-react';

/* ─── Nav Config ──────────────────────────────────────────── */

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Collections',
    href: '/collections',
    mega: true,
    categories: [
      {
        title: 'Women',
        items: [
          { label: 'Bridal Lehengas', href: '/collections?cat=bridal' },
          { label: 'Designer Sarees', href: '/collections?cat=sarees' },
          { label: 'Festive Edit', href: '/collections?cat=festive' },
          { label: 'Western Fusion', href: '/collections?cat=western' },
          { label: 'Ready to Wear', href: '/collections?cat=rtw' },
        ],
      },
      {
        title: 'Men',
        items: [
          { label: 'Sherwanis', href: '/collections?cat=sherwanis' },
          { label: 'Bandhgalas', href: '/collections?cat=bandhgalas' },
          { label: 'Kurta Sets', href: '/collections?cat=men-kurta' },
          { label: 'Achkan & Jodhpuri', href: '/collections?cat=achkan' },
          { label: "Men's Accessories", href: '/collections?cat=men-accessories' },
        ],
      },
      {
        title: 'By Occasion',
        items: [
          { label: 'Wedding & Reception', href: '/collections?occasion=wedding' },
          { label: 'Engagement & Mehendi', href: '/collections?occasion=engagement' },
          { label: 'Cocktail & Sangeet', href: '/collections?occasion=cocktail' },
          { label: 'Pooja & Havan', href: '/collections?occasion=pooja' },
        ],
      },
      {
        title: 'Signature Services',
        items: [
          { label: 'Custom Bespoke', href: '/bespoke', icon: Scissors },
          { label: 'Lookbook', href: '/lookbook', icon: BookOpen },
          { label: 'Bridal Consultation', href: '/appointments', icon: Heart },
        ],
      },
    ],
  },
  { label: 'Bespoke', href: '/bespoke' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'Appointments', href: '/appointments' },
  { label: 'Journal', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

/* ─── Component ───────────────────────────────────────────── */

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Scroll-driven effects ── */
  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, 100], [0, 1]);

  // Navbar transforms on scroll: starts transparent, becomes solid dark
  const bgOpacity = useTransform(scrollY, [0, 80, 200], [0.92, 0.96, 1]);
  const borderAlpha = useTransform(scrollY, [0, 100], [0.15, 0.4]);
  const shadowAlpha = useTransform(scrollY, [0, 200], [0, 0.3]);

  const bgColor = useTransform(bgOpacity, (v) => `rgba(26,26,26,${v})`);
  const borderStyle = useTransform(borderAlpha, (v) => `1px solid rgba(184,152,64,${v})`);
  const shadowStyle = useTransform(shadowAlpha, (v) => `0 4px 30px rgba(0,0,0,${v})`);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  /* Close mobile menu on resize */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
        setMegaOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMenuOpen(false);
      setMegaOpen(false);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  /* Close mega menu on outside click */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* Mega menu hover helpers with delay */
  const openMega = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setMegaOpen(true);
  };
  const closeMegaDelayed = () => {
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 250);
  };

  /* Active link check */
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Desktop Header ──────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          backgroundColor: bgColor,
          borderBottom: borderStyle,
          boxShadow: shadowStyle,
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Main Nav Row — Logo | Center Nav | Right Actions */}
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-[72px] lg:h-[76px]">

            {/* ─ Left: Logo ─ */}
            <Link href="/" className="flex items-center shrink-0 group z-10">
              <Image
                src="/images/logo.png"
                alt="Shringarika"
                width={180}
                height={64}
                className="h-12 lg:h-14 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-opacity duration-500"
                priority
              />
            </Link>

            {/* ─ Center: Navigation Links ─ */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.mega ? (
                  /* Collections with Mega Menu */
                  <div
                    key={link.href}
                    ref={megaRef}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={closeMegaDelayed}
                  >
                    <Link
                      href={link.href}
                      className={`relative flex items-center gap-1 px-4 py-2.5 font-dm-sans text-[11px] tracking-[0.18em] uppercase rounded-full transition-all duration-300 ${
                        isActive(link.href)
                          ? 'bg-zari-gold text-noir font-semibold'
                          : 'text-ivory/70 hover:text-zari-gold hover:bg-ivory/[0.06]'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={11}
                        strokeWidth={2}
                        className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`}
                      />
                    </Link>

                    {/* Mega Menu Panel */}
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[820px]"
                          onMouseEnter={openMega}
                          onMouseLeave={closeMegaDelayed}
                        >
                          <div className="bg-noir/[0.98] backdrop-blur-2xl border border-zari-gold/15 shadow-[0_25px_60px_rgba(0,0,0,0.5)] rounded-2xl p-8">
                            <div className="grid grid-cols-4 gap-6">
                              {link.categories?.map((cat) => (
                                <div key={cat.title}>
                                  <h4 className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-zari-gold/80 mb-4 pb-2 border-b border-zari-gold/10">
                                    {cat.title}
                                  </h4>
                                  <ul className="space-y-2.5">
                                    {cat.items.map((item) => {
                                      const Icon = 'icon' in item && item.icon ? item.icon : null;
                                      return (
                                        <li key={item.href + item.label}>
                                          <Link
                                            href={item.href}
                                            className="flex items-center gap-2 font-dm-sans text-[12px] tracking-wide text-ivory/50 hover:text-zari-gold hover:translate-x-1 transition-all duration-300"
                                          >
                                            {Icon && <Icon size={13} strokeWidth={1.5} className="text-zari-gold/50" />}
                                            {item.label}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6 pt-5 border-t border-zari-gold/10 flex items-center justify-between">
                              <p className="font-cormorant text-sm italic text-ivory/30">
                                &ldquo;Every thread tells your story&rdquo;
                              </p>
                              <Link
                                href="/collections"
                                className="flex items-center gap-1.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase text-zari-gold hover:text-ivory transition-colors duration-300"
                              >
                                View All Collections
                                <ArrowRight size={12} strokeWidth={1.5} />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Regular Nav Link — pill button style */
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2.5 font-dm-sans text-[11px] tracking-[0.18em] uppercase rounded-full transition-all duration-300 ${
                      isActive(link.href)
                        ? 'bg-zari-gold text-noir font-semibold'
                        : 'text-ivory/70 hover:text-zari-gold hover:bg-ivory/[0.06]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* ─ Right: Cart + Phone + Account ─ */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {/* Shopping Bag */}
              <Link
                href="/collections"
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  isActive('/collections') ? 'text-zari-gold bg-ivory/[0.08]' : 'text-ivory/60 hover:text-zari-gold hover:bg-ivory/[0.06]'
                }`}
                aria-label="Shop"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
              </Link>

              {/* Phone */}
              <a
                href="tel:+919999999999"
                className="p-2.5 rounded-full text-ivory/60 hover:text-zari-gold hover:bg-ivory/[0.06] transition-all duration-300"
                aria-label="Call us"
              >
                <Phone size={17} strokeWidth={1.5} />
              </a>

              {/* Account */}
              <Link
                href="/account"
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  isActive('/account') ? 'text-zari-gold bg-ivory/[0.08]' : 'text-ivory/60 hover:text-zari-gold hover:bg-ivory/[0.06]'
                }`}
                aria-label="My Account"
              >
                <User size={17} strokeWidth={1.5} />
              </Link>

              {/* Book Appointment CTA — Golden button */}
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 ml-2 px-5 py-2.5 bg-zari-gold text-noir font-dm-sans text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-zari-gold-light hover:shadow-[0_0_20px_rgba(184,152,64,0.3)] transition-all duration-500"
              >
                <Calendar size={12} strokeWidth={2} />
                Book Appointment
              </Link>
            </div>

            {/* ─ Mobile: Logo left, actions right ─ */}
            <div className="flex items-center justify-between w-full lg:hidden">
              {/* Logo */}
              <Link href="/" className="flex items-center group shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Shringarika"
                  width={150}
                  height={52}
                  className="h-11 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-opacity duration-500"
                  priority
                />
              </Link>

              {/* Mobile Actions */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Shopping Bag */}
                <Link
                  href="/collections"
                  className="p-2 text-ivory/60 hover:text-zari-gold transition-colors duration-300"
                  aria-label="Shop"
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                </Link>

                {/* Phone */}
                <a
                  href="tel:+919999999999"
                  className="p-2 text-ivory/60 hover:text-zari-gold transition-colors duration-300"
                  aria-label="Call"
                >
                  <Phone size={17} strokeWidth={1.5} />
                </a>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 text-ivory/80 hover:text-zari-gold transition-colors"
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait">
                    {menuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={22} strokeWidth={1.5} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu size={22} strokeWidth={1.5} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Golden bottom accent line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-zari-gold/30 to-transparent" />
      </motion.header>

      {/* ── Mobile Menu Overlay ──────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-noir/80 backdrop-blur-md lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[320px] bg-noir flex flex-col lg:hidden"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-7 h-16 border-b border-zari-gold/10">
                <Image
                  src="/images/logo.png"
                  alt="Shringarika"
                  width={130}
                  height={52}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-ivory/60 hover:text-zari-gold transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav Links — Scrollable */}
              <nav className="flex-1 flex flex-col overflow-y-auto min-h-0 py-4">
                <div className="px-7 pb-3">
                  <span className="font-dm-sans text-[9px] tracking-[0.3em] uppercase text-ivory/25">Navigate</span>
                </div>
                {navLinks.map((link, i) => (
                  <div key={link.href}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.35 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between py-3.5 px-7 font-dm-sans text-[13px] tracking-[0.12em] uppercase transition-all duration-300 border-b border-ivory/[0.04] ${
                          isActive(link.href)
                            ? 'text-zari-gold bg-zari-gold/[0.08]'
                            : 'text-ivory/60 hover:text-zari-gold hover:pl-9'
                        }`}
                      >
                        {link.label}
                        {isActive(link.href) && (
                          <span className="w-1.5 h-1.5 rounded-full bg-zari-gold" />
                        )}
                      </Link>
                    </motion.div>

                    {/* Mobile Sub-links for Collections */}
                    {link.mega && (
                      <div className="bg-ivory/[0.02]">
                        {link.categories?.flatMap((cat) =>
                          cat.items.map((item) => (
                            <Link
                              key={item.href + item.label}
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center gap-2 py-2.5 px-12 font-dm-sans text-[11px] tracking-wider text-ivory/35 hover:text-zari-gold hover:pl-14 transition-all duration-300"
                            >
                              <span className="w-1 h-1 rounded-full bg-zari-gold/30" />
                              {item.label}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Panel Footer */}
              <div className="px-7 pb-8 space-y-4 border-t border-zari-gold/10 pt-5">
                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 font-dm-sans text-[11px] tracking-[0.15em] uppercase text-ivory/50 hover:text-zari-gold transition-colors duration-300"
                >
                  <User size={15} strokeWidth={1.5} />
                  My Account
                </Link>
                <Link
                  href="/appointments"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-zari-gold text-noir font-dm-sans text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-zari-gold-light transition-all duration-500"
                >
                  <Calendar size={13} strokeWidth={2} />
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
