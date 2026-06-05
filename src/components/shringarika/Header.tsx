'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { User, Calendar, X, Menu, ChevronDown, BookOpen, Scissors, Heart, Sparkles, ArrowRight } from 'lucide-react';

/* ─── Nav Config ──────────────────────────────────────────── */

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/about' },
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
          { label: 'Men\'s Accessories', href: '/collections?cat=men-accessories' },
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
];

const secondaryLinks = [
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

  /* ── Smooth scroll-driven blend ── */
  const { scrollY } = useScroll();

  // Raw numeric motion values (0 → 1 range for blend progress)
  const bgOpacity = useTransform(scrollY, [0, 80, 250], [0, 0.55, 0.97]);
  const blurPx = useTransform(scrollY, [0, 80, 250], [0, 10, 24]);
  const borderAlpha = useTransform(scrollY, [0, 150, 300], [0, 0.06, 0.12]);
  const shadowAlpha = useTransform(scrollY, [0, 250], [0, 0.1]);
  const announceHeight = useTransform(scrollY, [0, 60], [36, 0]);
  const announceOpacity = useTransform(scrollY, [0, 40], [1, 0]);
  const logoScale = useTransform(scrollY, [0, 250], [1, 0.9]);

  // Transform into full CSS string motion values (so framer-motion can animate them reactively)
  const bgColor = useTransform(bgOpacity, (v) => `rgba(242,237,232,${v})`);
  const backdropBlur = useTransform(blurPx, (v) => `blur(${v}px)`);
  const borderStyle = useTransform(borderAlpha, (v) => `1px solid rgba(201,168,76,${v})`);
  const shadowStyle = useTransform(shadowAlpha, (v) => `0 1px 40px rgba(181,148,82,${v})`);

  // Derived boolean for conditional rendering (announcement bar, etc.)
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
    // Using requestAnimationFrame to avoid synchronous setState in effect
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          backgroundColor: bgColor,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
          borderBottom: borderStyle,
          boxShadow: shadowStyle,
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Top Announcement Bar — collapses smoothly on scroll */}
        <motion.div
          style={{ height: announceHeight, opacity: announceOpacity }}
          className="overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
            <p className="font-dm-sans text-[10px] tracking-[0.2em] uppercase text-noir/40">
              <Sparkles size={10} className="inline mr-1.5 text-zari-gold/60" />
              Complimentary Bridal Consultation — Book Your Private Session
              <ArrowRight size={10} className="inline ml-1.5 text-zari-gold/60" />
            </p>
          </div>
        </motion.div>

        {/* Main Nav Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-[84px]">

            {/* ─ Left: Logo (shrinks subtly on scroll) ─ */}
            <Link href="/" className="flex items-center group shrink-0 z-10">
              <motion.div style={{ scale: logoScale }} className="origin-left">
                <Image
                  src="/images/logo.png"
                  alt="Shringarika — Official Logo"
                  width={200}
                  height={70}
                  className="h-14 lg:h-16 w-auto object-contain group-hover:opacity-80 transition-opacity duration-500"
                  priority
                />
              </motion.div>
            </Link>

            {/* ─ Center: Primary Nav ─ */}
            <nav className="hidden lg:flex items-center gap-1">
              {primaryLinks.map((link) =>
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
                      className={`relative flex items-center gap-1 px-4 py-2 font-dm-sans text-[11px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                        isActive(link.href) ? 'text-noir' : 'text-noir/50 hover:text-noir'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={12}
                        strokeWidth={1.5}
                        className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`}
                      />
                      {/* Active indicator */}
                      {isActive(link.href) && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-zari-gold"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Mega Menu Panel */}
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[820px]"
                          onMouseEnter={openMega}
                          onMouseLeave={closeMegaDelayed}
                        >
                          <div className="bg-ivory/[0.98] backdrop-blur-xl border border-zari-gold/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">
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
                                            className="flex items-center gap-2 font-dm-sans text-[12px] tracking-wide text-noir/60 hover:text-zari-gold hover:translate-x-1 transition-all duration-300"
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

                            {/* Mega Footer */}
                            <div className="mt-6 pt-5 border-t border-zari-gold/10 flex items-center justify-between">
                              <p className="font-cormorant text-sm italic text-noir/40">
                                &ldquo;Every thread tells your story&rdquo;
                              </p>
                              <Link
                                href="/collections"
                                className="flex items-center gap-1.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase text-zari-gold hover:text-noir transition-colors duration-300"
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
                  /* Regular Nav Link */
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 font-dm-sans text-[11px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                      isActive(link.href) ? 'text-noir' : 'text-noir/50 hover:text-noir'
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-zari-gold"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              )}

              {/* Separator */}
              <div className="w-px h-4 bg-noir/10 mx-2" />

              {/* Secondary Links */}
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 font-dm-sans text-[11px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                    isActive(link.href) ? 'text-noir' : 'text-noir/35 hover:text-noir/70'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-active-secondary"
                      className="absolute bottom-0 left-3 right-3 h-[1px] bg-zari-gold/60"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* ─ Right: Actions ─ */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              {/* Account */}
              <Link
                href="/account"
                className={`p-2 transition-colors duration-300 ${
                  isActive('/account') ? 'text-zari-gold' : 'text-noir/40 hover:text-zari-gold'
                }`}
                aria-label="My Account"
              >
                <User size={17} strokeWidth={1.5} />
              </Link>

              {/* Book Appointment CTA */}
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-noir text-ivory font-dm-sans text-[10px] tracking-[0.2em] uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
              >
                <Calendar size={12} strokeWidth={1.5} />
                Book Appointment
              </Link>
            </div>

            {/* ─ Mobile Actions ─ */}
            <div className="flex items-center gap-2 lg:hidden shrink-0">
              {/* Account Icon */}
              <Link
                href="/account"
                className="p-2 text-noir/50 hover:text-zari-gold transition-colors duration-300"
                aria-label="Account"
              >
                <User size={18} strokeWidth={1.5} />
              </Link>

              {/* Book CTA — tablet */}
              <Link
                href="/appointments"
                className="hidden sm:inline-flex items-center px-4 py-1.5 bg-noir text-ivory font-dm-sans text-[9px] tracking-[0.18em] uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
              >
                Book
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-noir transition-colors"
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
              className="fixed inset-0 z-40 bg-noir/70 backdrop-blur-sm lg:hidden"
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
              <div className="flex items-center justify-between px-7 h-16 border-b border-ivory/5">
                <Image
                src="/images/logo.png"
                alt="Shringarika"
                width={140}
                height={56}
                className="h-11 w-auto object-contain"
              />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-ivory/60 hover:text-ivory transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav Links — Scrollable */}
              <nav className="flex-1 flex flex-col overflow-y-auto py-4">
                {/* Primary Links */}
                <div className="px-7 pb-3">
                  <span className="font-dm-sans text-[9px] tracking-[0.3em] uppercase text-ivory/25">Navigate</span>
                </div>
                {primaryLinks.map((link, i) => (
                  <div key={link.href}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.35 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between py-3 px-7 font-cormorant text-lg tracking-wide transition-all duration-300 border-b border-ivory/5 ${
                          isActive(link.href)
                            ? 'text-zari-gold bg-ivory/5'
                            : 'text-ivory/70 hover:text-zari-gold hover:pl-9'
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
                      <div className="bg-ivory/[0.03]">
                        {link.categories?.flatMap((cat) =>
                          cat.items.map((item) => (
                            <Link
                              key={item.href + item.label}
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center gap-2 py-2 px-12 font-dm-sans text-[11px] tracking-wider text-ivory/40 hover:text-zari-gold hover:pl-14 transition-all duration-300"
                            >
                              <span className="w-1 h-1 rounded-full bg-ivory/20" />
                              {item.label}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Separator */}
                <div className="my-4 mx-7 h-px bg-ivory/5" />

                {/* Secondary Links */}
                <div className="px-7 pb-3">
                  <span className="font-dm-sans text-[9px] tracking-[0.3em] uppercase text-ivory/25">More</span>
                </div>
                {secondaryLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (primaryLinks.length + i) * 0.04, duration: 0.35 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between py-3 px-7 font-cormorant text-lg tracking-wide transition-all duration-300 border-b border-ivory/5 ${
                        isActive(link.href)
                          ? 'text-zari-gold bg-ivory/5'
                          : 'text-ivory/50 hover:text-zari-gold hover:pl-9'
                      }`}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-zari-gold" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Panel Footer */}
              <div className="px-7 pb-8 space-y-4 border-t border-ivory/5 pt-5">
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
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-zari-gold text-noir font-dm-sans text-[10px] tracking-[0.2em] uppercase hover:bg-ivory transition-all duration-500"
                >
                  <Calendar size={13} strokeWidth={1.5} />
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
