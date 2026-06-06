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

/* ─── 3D Tilt Nav Item ───────────────────────────────────── */

function NavItem3D({
  link,
  isActive,
  children,
}: {
  link: typeof navLinks[number];
  isActive: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 600,
      }}
      className="relative"
    >
      {/* 3D Depth Shadow Layer */}
      <div
        className="absolute inset-0 rounded-full bg-zari-gold/5 blur-md translate-z-[-10px]"
        style={{ transform: 'translateZ(-10px)' }}
      />
      {children}
    </motion.div>
  );
}

/* ─── Holographic Gold Shimmer ────────────────────────────── */

function HolographicShimmer() {
  return (
    <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(
            105deg,
            transparent 20%,
            rgba(184, 152, 64, 0.06) 30%,
            rgba(212, 184, 106, 0.15) 40%,
            rgba(255, 223, 140, 0.12) 45%,
            rgba(184, 152, 64, 0.08) 55%,
            transparent 65%
          )`,
          backgroundSize: '250% 100%',
          animation: 'holo-shimmer 3s ease-in-out infinite',
        }}
      />
    </span>
  );
}

/* ─── 3D Floating Icon ───────────────────────────────────── */

function FloatingIcon3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) * 0.15);
    mouseY.set((e.clientY - cy) * 0.15);
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

  /* ── Scroll-driven 3D depth ── */
  const { scrollY } = useScroll();
  const navElevation = useTransform(scrollY, [0, 200], [0, 12]);
  const navScale = useTransform(scrollY, [0, 200], [1, 0.98]);
  const bgBlur = useTransform(scrollY, [0, 150], [12, 24]);

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
      {/* ── 3D Desktop Header ──────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -30, rotateX: -8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          boxShadow: useTransform(navElevation, (v) =>
            `0 ${v}px ${v * 3}px rgba(0,0,0,0.4), 0 ${v * 0.5}px ${v}px rgba(184,152,64,0.08), inset 0 1px 0 rgba(184,152,64,0.15)`
          ),
          backdropFilter: useTransform(bgBlur, (v) => `blur(${v}px) saturate(1.8)`),
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* 3D Perspective Container */}
        <div style={{ perspective: '1200px' }}>
          <motion.div
            style={{
              scale: navScale,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* ── Crystal Nav Bar Body ── */}
            <div className="relative bg-noir/[0.92] border-b border-zari-gold/[0.12]">

              {/* Holographic top edge light */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, rgba(184,152,64,0.1) 15%, rgba(212,184,106,0.5) 30%, rgba(255,223,140,0.8) 50%, rgba(212,184,106,0.5) 70%, rgba(184,152,64,0.1) 85%, transparent 100%)`,
                  animation: 'edge-glow 4s ease-in-out infinite alternate',
                }}
              />

              {/* 3D Inner Shadow (depth illusion) */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.3)',
                }}
              />

              <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
                <div className="flex items-center justify-between h-[72px] lg:h-[78px]">

                  {/* ─ Left: 3D Logo ─ */}
                  <Link href="/" className="flex items-center shrink-0 group z-10 relative">
                    {/* Logo glow backdrop */}
                    <div
                      className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
                      style={{
                        background: 'radial-gradient(ellipse, rgba(184,152,64,0.15) 0%, transparent 70%)',
                      }}
                    />
                    <motion.div
                      whileHover={{
                        scale: 1.04,
                        rotateY: 5,
                        filter: 'brightness(1.2)',
                      }}
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
                      {/* 3D reflection */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-[2px]"
                        style={{
                          transform: 'translateZ(2px) scaleY(-0.3) translateY(-8px)',
                          mask: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
                          WebkitMask: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
                        }}
                      >
                        <Image
                          src="/images/logo.png"
                          alt=""
                          width={180}
                          height={64}
                          className="h-12 lg:h-14 w-auto object-contain brightness-0 invert"
                          aria-hidden="true"
                        />
                      </div>
                    </motion.div>
                  </Link>

                  {/* ─ Center: 3D Navigation Links ─ */}
                  <nav className="hidden lg:flex items-center gap-0.5" style={{ perspective: '800px' }}>
                    {navLinks.map((link, i) =>
                      link.mega ? (
                        /* Collections with 3D Mega Menu */
                        <div
                          key={link.href}
                          ref={megaRef}
                          className="relative"
                          onMouseEnter={openMega}
                          onMouseLeave={closeMegaDelayed}
                        >
                          <NavItem3D link={link} isActive={isActive(link.href)}>
                            <Link
                              href={link.href}
                              className={`group relative flex items-center gap-1.5 px-5 py-2.5 font-dm-sans text-[11px] tracking-[0.2em] uppercase rounded-full transition-all duration-500 overflow-hidden ${
                                isActive(link.href)
                                  ? 'text-noir font-semibold'
                                  : 'text-ivory/60 hover:text-ivory'
                              }`}
                            >
                              {/* Active Pill Background with 3D depth */}
                              {isActive(link.href) && (
                                <motion.span
                                  layoutId="nav-active-pill"
                                  className="absolute inset-0 rounded-full"
                                  style={{
                                    background: 'linear-gradient(135deg, #D4B86A 0%, #B89840 40%, #9A7B2E 100%)',
                                    boxShadow: '0 2px 8px rgba(184,152,64,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.15)',
                                  }}
                                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                              )}

                              {/* Hover glow ring */}
                              {!isActive(link.href) && (
                                <span className="absolute inset-0 rounded-full border border-zari-gold/0 group-hover:border-zari-gold/20 transition-all duration-500" />
                              )}

                              <HolographicShimmer />

                              <span className="relative z-10 flex items-center gap-1.5">
                                {link.label}
                                <motion.span
                                  animate={{ rotate: megaOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ChevronDown size={11} strokeWidth={2} className="opacity-60" />
                                </motion.span>
                              </span>

                              {/* Bottom crystal facet */}
                              {isActive(link.href) && (
                                <span
                                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full"
                                  style={{
                                    background: 'linear-gradient(to bottom, rgba(184,152,64,0.8), transparent)',
                                    filter: 'blur(1px)',
                                  }}
                                />
                              )}
                            </Link>
                          </NavItem3D>

                          {/* ── 3D Mega Menu Panel ── */}
                          <AnimatePresence>
                            {megaOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 15, rotateX: -5, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, rotateX: -3, scale: 0.97 }}
                                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                                className="absolute top-full left-1/2 -translate-x-1/2 pt-5 w-[860px]"
                                onMouseEnter={openMega}
                                onMouseLeave={closeMegaDelayed}
                              >
                                <div
                                  className="relative bg-noir/[0.97] backdrop-blur-2xl border border-zari-gold/12 rounded-2xl p-8 overflow-hidden"
                                  style={{
                                    boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 10px 30px rgba(184,152,64,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
                                  }}
                                >
                                  {/* Holographic edge glow */}
                                  <div
                                    className="absolute top-0 left-0 right-0 h-[1px]"
                                    style={{
                                      background: 'linear-gradient(90deg, transparent, rgba(212,184,106,0.5), rgba(255,223,140,0.8), rgba(212,184,106,0.5), transparent)',
                                    }}
                                  />

                                  {/* Background crystal pattern */}
                                  <div className="absolute inset-0 opacity-[0.02]"
                                    style={{
                                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(184,152,64,0.5) 30px, rgba(184,152,64,0.5) 31px)`,
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
                                          className="font-cinzel text-[10px] tracking-[0.25em] uppercase mb-4 pb-2.5 border-b border-zari-gold/10 flex items-center gap-2"
                                          style={{
                                            background: 'linear-gradient(135deg, #D4B86A, #B89840)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                          }}
                                        >
                                          <Diamond size={9} className="text-zari-gold" style={{ WebkitTextFillColor: 'unset' }} />
                                          {cat.title}
                                        </h4>
                                        <ul className="space-y-1">
                                          {cat.items.map((item) => {
                                            const Icon = 'icon' in item && item.icon ? item.icon : null;
                                            return (
                                              <li key={item.href + item.label}>
                                                <Link
                                                  href={item.href}
                                                  className="group/item flex items-center gap-2.5 font-dm-sans text-[12px] tracking-wide text-ivory/40 hover:text-zari-gold transition-all duration-300 py-1.5 px-2 -mx-2 rounded-lg hover:bg-zari-gold/[0.04]"
                                                >
                                                  {Icon ? (
                                                    <Icon size={13} strokeWidth={1.5} className="text-zari-gold/30 group-hover/item:text-zari-gold/70 transition-colors duration-300" />
                                                  ) : (
                                                    <span className="w-1 h-1 rounded-full bg-zari-gold/20 group-hover/item:bg-zari-gold/60 transition-all duration-300 group-hover/item:scale-150" />
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

                                  <div className="mt-7 pt-5 border-t border-zari-gold/8 flex items-center justify-between relative z-10">
                                    <p className="font-cormorant text-sm italic text-ivory/25 flex items-center gap-2">
                                      <Crown size={12} className="text-zari-gold/30" />
                                      Every thread tells your story
                                    </p>
                                    <Link
                                      href="/collections"
                                      className="group/view flex items-center gap-1.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase text-zari-gold/60 hover:text-zari-gold transition-all duration-300"
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
                        /* Regular 3D Nav Link */
                        <NavItem3D key={link.href} link={link} isActive={isActive(link.href)}>
                          <Link
                            href={link.href}
                            className={`group relative px-5 py-2.5 font-dm-sans text-[11px] tracking-[0.2em] uppercase rounded-full transition-all duration-500 overflow-hidden ${
                              isActive(link.href)
                                ? 'text-noir font-semibold'
                                : 'text-ivory/60 hover:text-ivory'
                            }`}
                          >
                            {/* Active Pill with 3D depth */}
                            {isActive(link.href) && (
                              <motion.span
                                layoutId="nav-active-pill"
                                className="absolute inset-0 rounded-full"
                                style={{
                                  background: 'linear-gradient(135deg, #D4B86A 0%, #B89840 40%, #9A7B2E 100%)',
                                  boxShadow: '0 2px 8px rgba(184,152,64,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.15)',
                                }}
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                              />
                            )}

                            {/* Hover glow ring */}
                            {!isActive(link.href) && (
                              <span className="absolute inset-0 rounded-full border border-zari-gold/0 group-hover:border-zari-gold/20 transition-all duration-500" />
                            )}

                            <HolographicShimmer />

                            <span className="relative z-10">{link.label}</span>

                            {/* Bottom crystal facet for active */}
                            {isActive(link.href) && (
                              <span
                                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full"
                                style={{
                                  background: 'linear-gradient(to bottom, rgba(184,152,64,0.8), transparent)',
                                  filter: 'blur(1px)',
                                }}
                              />
                            )}
                          </Link>
                        </NavItem3D>
                      )
                    )}
                  </nav>

                  {/* ─ Right: 3D Icons + CTA ─ */}
                  <div className="hidden lg:flex items-center gap-1.5 shrink-0">
                    {/* Shopping Bag */}
                    <FloatingIcon3D>
                      <Link
                        href="/collections"
                        className={`group p-2.5 rounded-full transition-all duration-300 relative overflow-hidden ${
                          isActive('/collections') ? 'text-zari-gold bg-ivory/[0.06]' : 'text-ivory/50 hover:text-zari-gold'
                        }`}
                        aria-label="Shop"
                      >
                        <motion.div whileHover={{ scale: 1.15, rotateY: 15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                          <ShoppingBag size={18} strokeWidth={1.5} />
                        </motion.div>
                        {/* 3D hover glow */}
                        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ boxShadow: '0 0 15px rgba(184,152,64,0.2), inset 0 0 8px rgba(184,152,64,0.1)' }}
                        />
                      </Link>
                    </FloatingIcon3D>

                    {/* Phone */}
                    <FloatingIcon3D>
                      <a
                        href="tel:+919999999999"
                        className="group p-2.5 rounded-full text-ivory/50 hover:text-zari-gold transition-all duration-300 relative overflow-hidden"
                        aria-label="Call us"
                      >
                        <motion.div whileHover={{ scale: 1.15, rotateY: -15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                          <Phone size={17} strokeWidth={1.5} />
                        </motion.div>
                        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ boxShadow: '0 0 15px rgba(184,152,64,0.2), inset 0 0 8px rgba(184,152,64,0.1)' }}
                        />
                      </a>
                    </FloatingIcon3D>

                    {/* Account */}
                    <FloatingIcon3D>
                      <Link
                        href="/account"
                        className={`group p-2.5 rounded-full transition-all duration-300 relative overflow-hidden ${
                          isActive('/account') ? 'text-zari-gold bg-ivory/[0.06]' : 'text-ivory/50 hover:text-zari-gold'
                        }`}
                        aria-label="My Account"
                      >
                        <motion.div whileHover={{ scale: 1.15, rotateY: 15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                          <User size={17} strokeWidth={1.5} />
                        </motion.div>
                        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ boxShadow: '0 0 15px rgba(184,152,64,0.2), inset 0 0 8px rgba(184,152,64,0.1)' }}
                        />
                      </Link>
                    </FloatingIcon3D>

                    {/* Book Appointment — 3D Crystal CTA */}
                    <motion.div
                      whileHover={{
                        scale: 1.04,
                        rotateY: -3,
                        boxShadow: '0 8px 30px rgba(184,152,64,0.35), 0 2px 8px rgba(184,152,64,0.2)',
                      }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      style={{ transformStyle: 'preserve-3d', perspective: 600 }}
                    >
                      <Link
                        href="/appointments"
                        className="group/btn relative inline-flex items-center gap-2 ml-2 px-6 py-2.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full overflow-hidden transition-all duration-500"
                        style={{
                          background: 'linear-gradient(135deg, #D4B86A 0%, #B89840 35%, #9A7B2E 70%, #B89840 100%)',
                          boxShadow: '0 3px 12px rgba(184,152,64,0.3), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 3px rgba(0,0,0,0.2)',
                          color: '#1A1A1A',
                        }}
                      >
                        {/* Holographic sweep */}
                        <span
                          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                          style={{
                            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 60%, transparent 80%)',
                            backgroundSize: '250% 100%',
                            animation: 'holo-shimmer 2.5s ease-in-out infinite',
                          }}
                        />

                        {/* 3D edge highlight */}
                        <span className="absolute top-0 left-0 right-0 h-[1px] bg-white/30 rounded-full" />
                        <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/20 rounded-full" />

                        <Calendar size={12} strokeWidth={2} className="relative z-10" />
                        <span className="relative z-10">Book Appointment</span>

                        {/* 3D reflection */}
                        <span
                          className="absolute bottom-0 left-0 right-0 h-1/3 opacity-10"
                          style={{
                            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3))',
                            mask: 'linear-gradient(to bottom, transparent, black)',
                            WebkitMask: 'linear-gradient(to bottom, transparent, black)',
                          }}
                        />
                      </Link>
                    </motion.div>
                  </div>

                  {/* ─ Mobile: Logo left, actions right ─ */}
                  <div className="flex items-center justify-between w-full lg:hidden">
                    <Link href="/" className="flex items-center group shrink-0 relative">
                      <div
                        className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
                        style={{ background: 'radial-gradient(ellipse, rgba(184,152,64,0.12) 0%, transparent 70%)' }}
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
                      <Link
                        href="/collections"
                        className="p-2 text-ivory/50 hover:text-zari-gold transition-colors duration-300"
                        aria-label="Shop"
                      >
                        <ShoppingBag size={18} strokeWidth={1.5} />
                      </Link>
                      <a
                        href="tel:+919999999999"
                        className="p-2 text-ivory/50 hover:text-zari-gold transition-colors duration-300"
                        aria-label="Call"
                      >
                        <Phone size={17} strokeWidth={1.5} />
                      </a>
                      <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 text-ivory/70 hover:text-zari-gold transition-colors"
                        aria-label="Toggle menu"
                      >
                        <AnimatePresence mode="wait">
                          {menuOpen ? (
                            <motion.div
                              key="close"
                              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                              animate={{ rotate: 0, opacity: 1, scale: 1 }}
                              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                              transition={{ duration: 0.25, type: 'spring' }}
                            >
                              <X size={22} strokeWidth={1.5} />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="menu"
                              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                              animate={{ rotate: 0, opacity: 1, scale: 1 }}
                              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                              transition={{ duration: 0.25, type: 'spring' }}
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

              {/* Golden 3D bottom accent with depth */}
              <div className="relative h-[2px]">
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 5%, rgba(184,152,64,0.2) 20%, rgba(212,184,106,0.5) 40%, rgba(255,223,140,0.7) 50%, rgba(212,184,106,0.5) 60%, rgba(184,152,64,0.2) 80%, transparent 95%)',
                  }}
                />
                {/* 3D glow beneath the line */}
                <div
                  className="absolute top-full left-0 right-0 h-3"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(184,152,64,0.08), transparent)',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* ── 3D Mobile Menu Overlay ──────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop with depth */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-noir/85 backdrop-blur-lg lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* 3D Slide Panel */}
            <motion.div
              initial={{ x: '100%', rotateY: -15, opacity: 0 }}
              animate={{ x: 0, rotateY: 0, opacity: 1 }}
              exit={{ x: '100%', rotateY: -10, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[320px] lg:hidden"
            >
              <div
                className="h-full flex flex-col bg-noir/[0.98] border-l border-zari-gold/10"
                style={{
                  boxShadow: '-20px 0 60px rgba(0,0,0,0.5), -5px 0 20px rgba(184,152,64,0.05)',
                }}
              >
                {/* Holographic edge */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-[1px]"
                  style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(212,184,106,0.3), rgba(255,223,140,0.5), rgba(212,184,106,0.3), transparent)',
                  }}
                />

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
                    className="p-2 text-ivory/50 hover:text-zari-gold transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Nav Links — Scrollable */}
                <nav className="flex-1 flex flex-col overflow-y-auto min-h-0 py-4">
                  <div className="px-7 pb-3">
                    <span className="font-dm-sans text-[9px] tracking-[0.3em] uppercase text-ivory/20">Navigate</span>
                  </div>
                  {navLinks.map((link, i) => (
                    <div key={link.href}>
                      <motion.div
                        initial={{ opacity: 0, x: 30, rotateY: -10 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.4, type: 'spring', damping: 25 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center justify-between py-3.5 px-7 font-dm-sans text-[13px] tracking-[0.12em] uppercase transition-all duration-300 border-b border-ivory/[0.03] ${
                            isActive(link.href)
                              ? 'text-zari-gold bg-zari-gold/[0.06]'
                              : 'text-ivory/50 hover:text-zari-gold hover:pl-9'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isActive(link.href) && (
                              <motion.span
                                layoutId="mobile-active-dot"
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  background: 'linear-gradient(135deg, #D4B86A, #B89840)',
                                  boxShadow: '0 0 6px rgba(184,152,64,0.5)',
                                }}
                              />
                            )}
                            {link.label}
                          </span>
                          {isActive(link.href) && (
                            <Diamond size={10} className="text-zari-gold/50" />
                          )}
                        </Link>
                      </motion.div>

                      {/* Mobile Sub-links */}
                      {link.mega && (
                        <div className="bg-ivory/[0.015]">
                          {link.categories?.flatMap((cat) =>
                            cat.items.map((item, ii) => (
                              <motion.div
                                key={item.href + item.label}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (i * 0.05) + (ii * 0.02), duration: 0.3 }}
                              >
                                <Link
                                  href={item.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center gap-2.5 py-2.5 px-12 font-dm-sans text-[11px] tracking-wider text-ivory/30 hover:text-zari-gold hover:pl-14 transition-all duration-300"
                                >
                                  <span className="w-1 h-1 rounded-full bg-zari-gold/20" />
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
                <div className="px-7 pb-8 space-y-4 border-t border-zari-gold/8 pt-5">
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 font-dm-sans text-[11px] tracking-[0.15em] uppercase text-ivory/40 hover:text-zari-gold transition-colors duration-300"
                  >
                    <User size={15} strokeWidth={1.5} />
                    My Account
                  </Link>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/appointments"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full overflow-hidden relative"
                      style={{
                        background: 'linear-gradient(135deg, #D4B86A 0%, #B89840 40%, #9A7B2E 100%)',
                        boxShadow: '0 3px 12px rgba(184,152,64,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
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
