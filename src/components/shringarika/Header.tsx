'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
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
  ArrowRight,
  ShoppingBag,
  Phone,
  Diamond,
  Crown,
  Sparkles,
} from 'lucide-react';

/* ─── Static Nav Config ──────────────────────────────────── */

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

/* ─── Glass Reflection Effect ────────────────────────────── */

function GlassReflection() {
  return (
    <>
      {/* Top mirror highlight */}
      <span
        className="absolute top-0 left-[5%] right-[5%] h-[1px] opacity-40"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
        }}
      />
      {/* Curved mirror glare */}
      <span
        className="absolute top-0 left-0 right-0 h-[45%] pointer-events-none opacity-[0.07]"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.4), transparent)',
          borderRadius: 'inherit',
        }}
      />
      {/* Bottom glass reflection */}
      <span
        className="absolute bottom-0 left-[10%] right-[10%] h-[1px] opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
        }}
      />
    </>
  );
}

/* ─── Holographic Shimmer for Hover ──────────────────────── */

function HolographicShimmer() {
  return (
    <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(
            105deg,
            transparent 20%,
            rgba(212,175,55,0.04) 30%,
            rgba(255,223,100,0.12) 40%,
            rgba(255,240,160,0.1) 45%,
            rgba(212,175,55,0.06) 55%,
            transparent 65%
          )`,
          backgroundSize: '250% 100%',
          animation: 'holo-shimmer 3s ease-in-out infinite',
        }}
      />
    </span>
  );
}

/* ─── 3D Tilt Nav Item with Mirror ───────────────────────── */

function NavItem3D({
  children,
}: {
  children: React.ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 25 });

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 600 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

/* ─── Floating 3D Icon ──────────────────────────────────── */

function FloatingIcon3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.12);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.12);
  }, [mouseX, mouseY]);

  const handleLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Header Component ──────────────────────────────── */

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Scroll-driven effects ── */
  const { scrollY } = useScroll();
  const navElevation = useTransform(scrollY, [0, 200], [0, 10]);
  const navScale = useTransform(scrollY, [0, 200], [1, 0.985]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  /* Close mobile menu on resize */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { setMenuOpen(false); setMegaOpen(false); }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Close on route change */
  useEffect(() => {
    const raf = requestAnimationFrame(() => { setMenuOpen(false); setMegaOpen(false); });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  /* Close mega on outside click */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* Mega menu hover helpers */
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
      {/* ── Curvy Glass Navigation Bar ──────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-3 left-3 right-3 z-50 lg:top-4 lg:left-4 lg:right-4"
      >
        <motion.div
          style={{
            scale: navScale,
            boxShadow: useTransform(navElevation, (v) =>
              `0 ${v}px ${v * 3}px rgba(0,0,0,0.3), 0 0 ${v * 2}px rgba(212,175,55,0.06)`
            ),
          }}
          className="relative"
        >
          {/* ── Curvy Glass Container ── */}
          <div
            className="relative overflow-hidden rounded-[20px] lg:rounded-[24px]"
            style={{
              background: scrolled
                ? 'linear-gradient(135deg, rgba(26,26,26,0.85) 0%, rgba(20,20,20,0.9) 50%, rgba(26,26,26,0.85) 100%)'
                : 'linear-gradient(135deg, rgba(26,26,26,0.6) 0%, rgba(20,20,20,0.65) 50%, rgba(26,26,26,0.6) 100%)',
              backdropFilter: 'blur(20px) saturate(1.8)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'background 0.5s ease',
            }}
          >
            {/* Glass Mirror Reflections */}
            <GlassReflection />

            {/* Animated mirror shimmer sweep */}
            <span
              className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-30"
              style={{
                background: `linear-gradient(
                  105deg,
                  transparent 30%,
                  rgba(255,255,255,0.03) 42%,
                  rgba(255,255,255,0.06) 50%,
                  rgba(255,255,255,0.03) 58%,
                  transparent 70%
                )`,
                backgroundSize: '300% 100%',
                animation: 'mirror-sweep 6s ease-in-out infinite',
              }}
            />

            {/* Golden curvy bottom glow */}
            <div
              className="absolute bottom-0 left-[8%] right-[8%] h-[1px] opacity-40"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), rgba(255,223,100,0.8), rgba(212,175,55,0.6), transparent)',
                animation: 'edge-glow 4s ease-in-out infinite alternate',
              }}
            />

            <div className="max-w-[1380px] mx-auto px-5 lg:px-8">
              <div className="flex items-center justify-between h-[68px] lg:h-[74px]">

                {/* ─ Left: Logo with Mirror Glow ─ */}
                <Link href="/" className="flex items-center shrink-0 group z-10 relative">
                  {/* Mirror reflection glow behind logo */}
                  <div
                    className="absolute -inset-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
                    style={{
                      background: 'radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, transparent 70%)',
                    }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.04, filter: 'brightness(1.2)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ transformStyle: 'preserve-3d', perspective: 800 }}
                  >
                    <Image
                      src="/images/logo.png"
                      alt="Shringarika"
                      width={180}
                      height={64}
                      className="h-12 lg:h-14 w-auto object-contain brightness-0 invert group-hover:opacity-90 transition-opacity duration-500"
                      priority
                    />
                  </motion.div>
                </Link>

                {/* ─ Center: Curvy Glass Navigation Links ─ */}
                <nav className="hidden lg:flex items-center gap-0.5" style={{ perspective: '800px' }}>
                  {navLinks.map((link) =>
                    link.mega ? (
                      /* Collections with Curvy Mega Menu */
                      <div
                        key={link.href}
                        ref={megaRef}
                        className="relative"
                        onMouseEnter={openMega}
                        onMouseLeave={closeMegaDelayed}
                      >
                        <NavItem3D>
                          <Link
                            href={link.href}
                            className={`group relative flex items-center gap-1.5 px-5 py-2.5 font-dm-sans text-[11px] tracking-[0.2em] uppercase rounded-full transition-all duration-500 overflow-hidden ${
                              isActive(link.href)
                                ? 'text-noir font-semibold'
                                : 'text-white/70 hover:text-white'
                            }`}
                          >
                            {/* Active Pill — Curvy Gold with Mirror Depth */}
                            {isActive(link.href) && (
                              <motion.span
                                layoutId="nav-active-pill"
                                className="absolute inset-0 rounded-full"
                                style={{
                                  background: 'linear-gradient(135deg, #E8C84A 0%, #D4AF37 35%, #B89730 70%, #D4AF37 100%)',
                                  boxShadow: '0 2px 12px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.15)',
                                }}
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                              />
                            )}

                            {/* Hover glass ring */}
                            {!isActive(link.href) && (
                              <span className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/10 bg-white/0 group-hover:bg-white/[0.04] transition-all duration-500" />
                            )}

                            <HolographicShimmer />

                            <span className="relative z-10 flex items-center gap-1.5">
                              {link.label}
                              <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                <ChevronDown size={11} strokeWidth={2} className="opacity-50" />
                              </motion.span>
                            </span>

                            {/* Crystal bottom facet */}
                            {isActive(link.href) && (
                              <span
                                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-1.5 rounded-full"
                                style={{
                                  background: 'linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)',
                                  filter: 'blur(2px)',
                                }}
                              />
                            )}
                          </Link>
                        </NavItem3D>

                        {/* ── Curvy Glass Mega Menu ── */}
                        <AnimatePresence>
                          {megaOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 15, rotateX: -5, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, rotateX: -3, scale: 0.97 }}
                              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                              className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[860px]"
                              onMouseEnter={openMega}
                              onMouseLeave={closeMegaDelayed}
                            >
                              <div
                                className="relative overflow-hidden rounded-[20px] p-8"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(26,26,26,0.9) 0%, rgba(18,18,18,0.95) 50%, rgba(26,26,26,0.9) 100%)',
                                  backdropFilter: 'blur(24px) saturate(1.8)',
                                  WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
                                  border: '1px solid rgba(255,255,255,0.08)',
                                  boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.04)',
                                }}
                              >
                                {/* Glass reflections on mega menu */}
                                <GlassReflection />

                                {/* Mirror sweep */}
                                <span
                                  className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-20"
                                  style={{
                                    background: `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 55%, transparent 70%)`,
                                    backgroundSize: '300% 100%',
                                    animation: 'mirror-sweep 8s ease-in-out infinite',
                                  }}
                                />

                                <div className="grid grid-cols-4 gap-6 relative z-10">
                                  {link.categories?.map((cat, ci) => (
                                    <motion.div
                                      key={cat.title}
                                      initial={{ opacity: 0, y: 15 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: ci * 0.06, duration: 0.4 }}
                                    >
                                      <h4
                                        className="font-cinzel text-[10px] tracking-[0.25em] uppercase mb-4 pb-2.5 border-b border-white/[0.06] flex items-center gap-2"
                                        style={{
                                          background: 'linear-gradient(135deg, #E8C84A, #D4AF37)',
                                          WebkitBackgroundClip: 'text',
                                          WebkitTextFillColor: 'transparent',
                                        }}
                                      >
                                        <Diamond size={9} className="text-[#D4AF37]" style={{ WebkitTextFillColor: 'unset' }} />
                                        {cat.title}
                                      </h4>
                                      <ul className="space-y-1">
                                        {cat.items.map((item) => {
                                          const Icon = 'icon' in item && item.icon ? item.icon : null;
                                          return (
                                            <li key={item.href + item.label}>
                                              <Link
                                                href={item.href}
                                                className="group/item flex items-center gap-2.5 font-dm-sans text-[12px] tracking-wide text-white/35 hover:text-[#D4AF37] transition-all duration-300 py-1.5 px-2 -mx-2 rounded-lg hover:bg-white/[0.03]"
                                              >
                                                {Icon ? (
                                                  <Icon size={13} strokeWidth={1.5} className="text-[#D4AF37]/30 group-hover/item:text-[#D4AF37]/70 transition-colors duration-300" />
                                                ) : (
                                                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]/20 group-hover/item:bg-[#D4AF37]/60 transition-all duration-300 group-hover/item:scale-150" />
                                                )}
                                                <span className="group-hover/item:translate-x-0.5 transition-transform duration-300">{item.label}</span>
                                              </Link>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </motion.div>
                                  ))}
                                </div>

                                <div className="mt-7 pt-5 border-t border-white/[0.05] flex items-center justify-between relative z-10">
                                  <p className="font-cormorant text-sm italic text-white/20 flex items-center gap-2">
                                    <Crown size={12} className="text-[#D4AF37]/30" />
                                    Every thread tells your story
                                  </p>
                                  <Link
                                    href="/collections"
                                    className="group/view flex items-center gap-1.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300"
                                  >
                                    View All Collections
                                    <ArrowRight size={12} strokeWidth={1.5} className="group-hover/view:translate-x-1 transition-transform duration-300" />
                                  </Link>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Regular Curvy Glass Nav Link */
                      <NavItem3D key={link.href}>
                        <Link
                          href={link.href}
                          className={`group relative px-5 py-2.5 font-dm-sans text-[11px] tracking-[0.2em] uppercase rounded-full transition-all duration-500 overflow-hidden ${
                            isActive(link.href)
                              ? 'text-noir font-semibold'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          {/* Active Gold Pill with Mirror Depth */}
                          {isActive(link.href) && (
                            <motion.span
                              layoutId="nav-active-pill"
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: 'linear-gradient(135deg, #E8C84A 0%, #D4AF37 35%, #B89730 70%, #D4AF37 100%)',
                                boxShadow: '0 2px 12px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.15)',
                              }}
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}

                          {/* Hover glass ring */}
                          {!isActive(link.href) && (
                            <span className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/10 bg-white/0 group-hover:bg-white/[0.04] transition-all duration-500" />
                          )}

                          <HolographicShimmer />

                          <span className="relative z-10">{link.label}</span>

                          {/* Crystal bottom facet */}
                          {isActive(link.href) && (
                            <span
                              className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-1.5 rounded-full"
                              style={{
                                background: 'linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)',
                                filter: 'blur(2px)',
                              }}
                            />
                          )}
                        </Link>
                      </NavItem3D>
                    )
                  )}
                </nav>

                {/* ─ Right: Mirror Icons + Curvy CTA ─ */}
                <div className="hidden lg:flex items-center gap-1.5 shrink-0">
                  {/* Shopping Bag */}
                  <FloatingIcon3D>
                    <Link
                      href="/collections"
                      className={`group p-2.5 rounded-full transition-all duration-300 relative overflow-hidden ${
                        isActive('/collections') ? 'text-[#D4AF37] bg-white/[0.06]' : 'text-white/50 hover:text-[#D4AF37]'
                      }`}
                      aria-label="Shop"
                    >
                      <motion.div whileHover={{ scale: 1.15, rotateY: 15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                        <ShoppingBag size={18} strokeWidth={1.5} />
                      </motion.div>
                      <span
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ boxShadow: '0 0 15px rgba(212,175,55,0.15), inset 0 0 8px rgba(212,175,55,0.08)' }}
                      />
                    </Link>
                  </FloatingIcon3D>

                  {/* Phone */}
                  <FloatingIcon3D>
                    <a
                      href="tel:+919999999999"
                      className="group p-2.5 rounded-full text-white/50 hover:text-[#D4AF37] transition-all duration-300 relative overflow-hidden"
                      aria-label="Call us"
                    >
                      <motion.div whileHover={{ scale: 1.15, rotateY: -15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                        <Phone size={17} strokeWidth={1.5} />
                      </motion.div>
                      <span
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ boxShadow: '0 0 15px rgba(212,175,55,0.15), inset 0 0 8px rgba(212,175,55,0.08)' }}
                      />
                    </a>
                  </FloatingIcon3D>

                  {/* Account */}
                  <FloatingIcon3D>
                    <Link
                      href="/account"
                      className={`group p-2.5 rounded-full transition-all duration-300 relative overflow-hidden ${
                        isActive('/account') ? 'text-[#D4AF37] bg-white/[0.06]' : 'text-white/50 hover:text-[#D4AF37]'
                      }`}
                      aria-label="My Account"
                    >
                      <motion.div whileHover={{ scale: 1.15, rotateY: 15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                        <User size={17} strokeWidth={1.5} />
                      </motion.div>
                      <span
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ boxShadow: '0 0 15px rgba(212,175,55,0.15), inset 0 0 8px rgba(212,175,55,0.08)' }}
                      />
                    </Link>
                  </FloatingIcon3D>

                  {/* Book Appointment — Curvy Mirror CTA */}
                  <motion.div
                    whileHover={{
                      scale: 1.04,
                      rotateY: -3,
                      boxShadow: '0 8px 30px rgba(212,175,55,0.35), 0 2px 8px rgba(212,175,55,0.2)',
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{ transformStyle: 'preserve-3d', perspective: 600 }}
                  >
                    <Link
                      href="/appointments"
                      className="group/btn relative inline-flex items-center gap-2 ml-2 px-6 py-2.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full overflow-hidden transition-all duration-500"
                      style={{
                        background: 'linear-gradient(135deg, #E8C84A 0%, #D4AF37 35%, #B89730 70%, #D4AF37 100%)',
                        boxShadow: '0 3px 12px rgba(212,175,55,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 3px rgba(0,0,0,0.2)',
                        color: '#1A1A1A',
                      }}
                    >
                      {/* Holographic sweep on CTA */}
                      <span
                        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                        style={{
                          background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 60%, transparent 80%)',
                          backgroundSize: '250% 100%',
                          animation: 'holo-shimmer 2.5s ease-in-out infinite',
                        }}
                      />
                      <span className="absolute top-0 left-0 right-0 h-[1px] bg-white/30 rounded-full" />
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/20 rounded-full" />

                      <Calendar size={12} strokeWidth={2} className="relative z-10" />
                      <span className="relative z-10">Book Appointment</span>
                    </Link>
                  </motion.div>
                </div>

                {/* ─ Mobile: Logo left, actions right ─ */}
                <div className="flex items-center justify-between w-full lg:hidden">
                  <Link href="/" className="flex items-center group shrink-0 relative">
                    <div
                      className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
                      style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.1) 0%, transparent 70%)' }}
                    />
                    <Image
                      src="/images/logo.png"
                      alt="Shringarika"
                      width={150}
                      height={52}
                      className="h-11 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-opacity duration-500"
                      priority
                    />
                  </Link>

                  <div className="flex items-center gap-1 shrink-0">
                    <Link href="/collections" className="p-2 text-white/50 hover:text-[#D4AF37] transition-colors duration-300" aria-label="Shop">
                      <ShoppingBag size={18} strokeWidth={1.5} />
                    </Link>
                    <a href="tel:+919999999999" className="p-2 text-white/50 hover:text-[#D4AF37] transition-colors duration-300" aria-label="Call">
                      <Phone size={17} strokeWidth={1.5} />
                    </a>
                    <button
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="p-2 text-white/70 hover:text-[#D4AF37] transition-colors"
                      aria-label="Toggle menu"
                    >
                      <AnimatePresence mode="wait">
                        {menuOpen ? (
                          <motion.div key="close" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25, type: 'spring' }}>
                            <X size={22} strokeWidth={1.5} />
                          </motion.div>
                        ) : (
                          <motion.div key="menu" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25, type: 'spring' }}>
                            <Menu size={22} strokeWidth={1.5} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* ── Curvy Glass Mobile Menu ─────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Curvy Glass Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-3 right-3 bottom-3 z-50 w-[300px] lg:hidden"
            >
              <div
                className="h-full flex flex-col overflow-hidden rounded-[20px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(26,26,26,0.9) 0%, rgba(18,18,18,0.95) 50%, rgba(26,26,26,0.9) 100%)',
                  backdropFilter: 'blur(24px) saturate(1.8)',
                  WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '-15px 0 50px rgba(0,0,0,0.4), 0 0 30px rgba(212,175,55,0.04)',
                }}
              >
                {/* Glass reflections */}
                <GlassReflection />

                {/* Panel Header */}
                <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.05]">
                  <Image
                    src="/images/logo.png"
                    alt="Shringarika"
                    width={130}
                    height={52}
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 text-white/40 hover:text-[#D4AF37] transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 flex flex-col overflow-y-auto min-h-0 py-4">
                  <div className="px-6 pb-3">
                    <span className="font-dm-sans text-[9px] tracking-[0.3em] uppercase text-white/15">Navigate</span>
                  </div>
                  {navLinks.map((link, i) => (
                    <div key={link.href}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center justify-between py-3 px-6 font-dm-sans text-[13px] tracking-[0.12em] uppercase transition-all duration-300 border-b border-white/[0.02] ${
                            isActive(link.href)
                              ? 'text-[#D4AF37] bg-[#D4AF37]/[0.06]'
                              : 'text-white/45 hover:text-[#D4AF37] hover:pl-8'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isActive(link.href) && (
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  background: 'linear-gradient(135deg, #E8C84A, #D4AF37)',
                                  boxShadow: '0 0 6px rgba(212,175,55,0.5)',
                                }}
                              />
                            )}
                            {link.label}
                          </span>
                          {isActive(link.href) && <Diamond size={10} className="text-[#D4AF37]/40" />}
                        </Link>
                      </motion.div>

                      {/* Mobile Sub-links */}
                      {link.mega && (
                        <div className="bg-white/[0.01]">
                          {link.categories?.flatMap((cat) =>
                            cat.items.map((item, ii) => (
                              <motion.div
                                key={item.href + item.label}
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (i * 0.04) + (ii * 0.02), duration: 0.25 }}
                              >
                                <Link
                                  href={item.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center gap-2.5 py-2 px-10 font-dm-sans text-[11px] tracking-wider text-white/25 hover:text-[#D4AF37] transition-all duration-300"
                                >
                                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]/15" />
                                  {item.label}
                                </Link>
                              </motion.div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Panel Footer */}
                <div className="px-6 pb-6 space-y-4 border-t border-white/[0.04] pt-5">
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 font-dm-sans text-[11px] tracking-[0.15em] uppercase text-white/30 hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    <User size={15} strokeWidth={1.5} />
                    My Account
                  </Link>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/appointments"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full overflow-hidden relative"
                      style={{
                        background: 'linear-gradient(135deg, #E8C84A 0%, #D4AF37 40%, #B89730 100%)',
                        boxShadow: '0 3px 12px rgba(212,175,55,0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
                        color: '#1A1A1A',
                      }}
                    >
                      <Calendar size={13} strokeWidth={2} />
                      Book Appointment
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
