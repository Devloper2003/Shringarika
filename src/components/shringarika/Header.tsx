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
  Zap,
  Hexagon,
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

/* ─── Hard Mirror Edge Component ─────────────────────────── */

function MirrorEdge() {
  return (
    <>
      {/* Hard top chrome line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #D4AF37 15%, #FFD700 35%, #FFF8DC 50%, #FFD700 65%, #D4AF37 85%, transparent 100%)',
        }}
      />
      {/* Hard bottom chrome line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #D4AF37 15%, #FFD700 35%, #FFF8DC 50%, #FFD700 65%, #D4AF37 85%, transparent 100%)',
        }}
      />
      {/* Left chrome edge */}
      <div
        className="absolute top-0 left-0 bottom-0 w-[2px] z-20"
        style={{
          background: 'linear-gradient(180deg, #D4AF37, #FFD700 50%, #D4AF37)',
        }}
      />
      {/* Right chrome edge */}
      <div
        className="absolute top-0 right-0 bottom-0 w-[2px] z-20"
        style={{
          background: 'linear-gradient(180deg, #D4AF37, #FFD700 50%, #D4AF37)',
        }}
      />
      {/* Hard mirror shine — top strip */}
      <div
        className="absolute top-[2px] left-[2px] right-[2px] h-[40%] z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
        }}
      />
    </>
  );
}

/* ─── 3D Tilt Nav Item — Gaming Style ────────────────────── */

function NavItemGaming({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 250, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 500 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

/* ─── Neon Glow Button ──────────────────────────────────── */

function NeonGlow({ children, color = '#D4AF37' }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: `0 0 8px ${color}40, 0 0 20px ${color}15, inset 0 0 8px ${color}10` }} />
  );
}

/* ─── Main Header Component ──────────────────────────────── */

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Scroll effects */
  const { scrollY } = useScroll();
  const navScale = useTransform(scrollY, [0, 200], [1, 0.98]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  /* Close mobile on resize */
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) { setMenuOpen(false); setMegaOpen(false); } };
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

  const openMega = () => { if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current); setMegaOpen(true); };
  const closeMegaDelayed = () => { megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 200); };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Hard Mirror Gaming Navbar ──────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -40, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div style={{ scale: navScale }}>
          {/* Solid Dark Container — NO blur, NO transparency */}
          <div
            className="relative"
            style={{
              background: scrolled
                ? 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)'
                : 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)',
              transition: 'background 0.4s ease',
            }}
          >
            {/* Hard Mirror Chrome Edges */}
            <MirrorEdge />

            {/* Animated neon scan line */}
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute left-0 right-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, #D4AF37, #FFD700, #D4AF37, transparent)',
                  boxShadow: '0 0 10px #D4AF3780, 0 0 20px #D4AF3730',
                }}
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            <div className="max-w-[1400px] mx-auto px-5 lg:px-8 overflow-visible">
              <div className="flex items-center justify-between h-[72px] lg:h-[78px]">

                {/* ─ Left: Hard Mirror Logo ─ */}
                <Link href="/" className="flex items-center shrink-0 group z-10 relative">
                  {/* Neon glow behind logo */}
                  <div
                    className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(ellipse, #D4AF3720 0%, transparent 70%)',
                      boxShadow: '0 0 30px #D4AF3715',
                    }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.06, rotateY: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ transformStyle: 'preserve-3d', perspective: 800 }}
                  >
                    <Image
                      src="/images/logo.png"
                      alt="Shringarika"
                      width={180}
                      height={64}
                      className="h-12 lg:h-14 w-auto object-contain brightness-0 invert group-hover:brightness-0 invert transition-all duration-300"
                      priority
                    />
                  </motion.div>
                </Link>

                {/* ─ Center: Gaming Nav Links ─ */}
                <nav className="hidden lg:flex items-center gap-1 overflow-visible" style={{ perspective: '800px' }}>
                  {navLinks.map((link) =>
                    link.mega ? (
                      /* Collections Mega Menu Trigger */
                      <div
                        key={link.href}
                        ref={megaRef}
                        className="relative"
                        onMouseEnter={openMega}
                        onMouseLeave={closeMegaDelayed}
                      >
                        <NavItemGaming>
                          <Link
                            href={link.href}
                            className={`group relative flex items-center gap-1.5 px-5 py-2.5 font-dm-sans text-[11px] tracking-[0.2em] uppercase rounded-sm transition-all duration-300 ${
                              isActive(link.href)
                                ? 'text-[#0a0a0a] font-bold'
                                : 'text-[#e0e0e0] hover:text-[#FFD700]'
                            }`}
                          >
                            {/* Active: Hard gold fill */}
                            {isActive(link.href) && (
                              <motion.span
                                layoutId="nav-active-gaming"
                                className="absolute inset-0 rounded-sm"
                                style={{
                                  background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #B89730 100%)',
                                  boxShadow: '0 0 12px #D4AF3750, inset 0 1px 0 rgba(255,255,255,0.3)',
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                              />
                            )}

                            {/* Hover: Hard border glow */}
                            {!isActive(link.href) && (
                              <span className="absolute inset-0 rounded-sm border border-transparent group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/[0.06] transition-all duration-300" />
                            )}

                            <span className="relative z-10 flex items-center gap-1.5">
                              {link.label}
                              <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                <ChevronDown size={11} strokeWidth={2.5} />
                              </motion.span>
                            </span>

                            {/* Bottom neon indicator */}
                            {isActive(link.href) && (
                              <span
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-[2px]"
                                style={{
                                  background: '#FFD700',
                                  boxShadow: '0 0 8px #FFD700, 0 0 16px #D4AF3750',
                                }}
                              />
                            )}
                          </Link>
                        </NavItemGaming>

                        {/* ── Gaming Mega Menu ── */}
                        <AnimatePresence>
                          {megaOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scaleY: 0.95 }}
                              animate={{ opacity: 1, y: 0, scaleY: 1 }}
                              exit={{ opacity: 0, y: 8, scaleY: 0.97 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              style={{ transformOrigin: 'top' }}
                              className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[880px] z-[60]"
                              onMouseEnter={openMega}
                              onMouseLeave={closeMegaDelayed}
                            >
                              <div
                                className="relative p-8"
                                style={{
                                  background: 'linear-gradient(180deg, #0a0a0a 0%, #111 100%)',
                                  border: '1px solid #D4AF3730',
                                  boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 30px #D4AF3710',
                                }}
                              >
                                {/* Chrome edges on mega */}
                                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, #FFD700, #D4AF37, transparent)' }} />
                                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #D4AF3740, #FFD70040, #D4AF3740, transparent)' }} />

                                <div className="grid grid-cols-4 gap-6 relative z-10">
                                  {link.categories?.map((cat, ci) => (
                                    <motion.div
                                      key={cat.title}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: ci * 0.05, duration: 0.3 }}
                                    >
                                      <h4
                                        className="font-cinzel text-[10px] tracking-[0.25em] uppercase mb-4 pb-2 border-b border-[#D4AF3720] flex items-center gap-2"
                                        style={{
                                          background: 'linear-gradient(135deg, #FFD700, #D4AF37)',
                                          WebkitBackgroundClip: 'text',
                                          WebkitTextFillColor: 'transparent',
                                        }}
                                      >
                                        <Hexagon size={9} className="text-[#D4AF37]" style={{ WebkitTextFillColor: 'unset' }} strokeWidth={2} />
                                        {cat.title}
                                      </h4>
                                      <ul className="space-y-0.5">
                                        {cat.items.map((item) => {
                                          const Icon = 'icon' in item && item.icon ? item.icon : null;
                                          return (
                                            <li key={item.href + item.label}>
                                              <Link
                                                href={item.href}
                                                className="group/item flex items-center gap-2 font-dm-sans text-[12px] tracking-wide text-[#888] hover:text-[#FFD700] transition-all duration-200 py-1.5 px-2 -mx-2 hover:bg-[#D4AF3708]"
                                              >
                                                {Icon ? (
                                                  <Icon size={12} strokeWidth={1.5} className="text-[#D4AF3750] group-hover/item:text-[#D4AF37] transition-colors duration-200" />
                                                ) : (
                                                  <span className="w-1 h-1 rounded-full bg-[#D4AF3730] group-hover/item:bg-[#FFD700] transition-all duration-200" />
                                                )}
                                                {item.label}
                                              </Link>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </motion.div>
                                  ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-[#D4AF3715] flex items-center justify-between relative z-10">
                                  <p className="font-cormorant text-sm italic text-[#555] flex items-center gap-2">
                                    <Zap size={12} className="text-[#D4AF3740]" />
                                    Every thread tells your story
                                  </p>
                                  <Link
                                    href="/collections"
                                    className="group/view flex items-center gap-1.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] hover:text-[#FFD700] transition-colors duration-200"
                                  >
                                    View All Collections
                                    <ArrowRight size={12} strokeWidth={1.5} className="group-hover/view:translate-x-1 transition-transform duration-200" />
                                  </Link>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Regular Gaming Nav Link */
                      <NavItemGaming key={link.href}>
                        <Link
                          href={link.href}
                          className={`group relative px-5 py-2.5 font-dm-sans text-[11px] tracking-[0.2em] uppercase rounded-sm transition-all duration-300 ${
                            isActive(link.href)
                              ? 'text-[#0a0a0a] font-bold'
                              : 'text-[#e0e0e0] hover:text-[#FFD700]'
                          }`}
                        >
                          {/* Active: Hard gold fill */}
                          {isActive(link.href) && (
                            <motion.span
                              layoutId="nav-active-gaming"
                              className="absolute inset-0 rounded-sm"
                              style={{
                                background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #B89730 100%)',
                                boxShadow: '0 0 12px #D4AF3750, inset 0 1px 0 rgba(255,255,255,0.3)',
                              }}
                              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                          )}

                          {/* Hover border */}
                          {!isActive(link.href) && (
                            <span className="absolute inset-0 rounded-sm border border-transparent group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/[0.06] transition-all duration-300" />
                          )}

                          <span className="relative z-10">{link.label}</span>

                          {/* Bottom neon indicator */}
                          {isActive(link.href) && (
                            <span
                              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-[2px]"
                              style={{
                                background: '#FFD700',
                                boxShadow: '0 0 8px #FFD700, 0 0 16px #D4AF3750',
                              }}
                            />
                          )}
                        </Link>
                      </NavItemGaming>
                    )
                  )}
                </nav>

                {/* ─ Right: Gaming Icons + CTA ─ */}
                <div className="hidden lg:flex items-center gap-2 shrink-0">
                  {/* Shopping Bag */}
                  <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                    <Link
                      href="/collections"
                      className={`group p-2.5 rounded-sm transition-all duration-300 relative ${
                        isActive('/collections') ? 'text-[#FFD700] bg-[#D4AF3710]' : 'text-[#888] hover:text-[#FFD700]'
                      }`}
                      aria-label="Shop"
                    >
                      <ShoppingBag size={18} strokeWidth={1.5} />
                      {isActive('/collections') && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-[2px]" style={{ background: '#FFD700', boxShadow: '0 0 6px #FFD700' }} />
                      )}
                    </Link>
                  </motion.div>

                  {/* Phone */}
                  <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                    <a
                      href="tel:+919999999999"
                      className="group p-2.5 rounded-sm text-[#888] hover:text-[#FFD700] transition-all duration-300"
                      aria-label="Call us"
                    >
                      <Phone size={17} strokeWidth={1.5} />
                    </a>
                  </motion.div>

                  {/* Account */}
                  <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                    <Link
                      href="/account"
                      className={`group p-2.5 rounded-sm transition-all duration-300 relative ${
                        isActive('/account') ? 'text-[#FFD700] bg-[#D4AF3710]' : 'text-[#888] hover:text-[#FFD700]'
                      }`}
                      aria-label="My Account"
                    >
                      <User size={17} strokeWidth={1.5} />
                    </Link>
                  </motion.div>

                  {/* Book Appointment — Neon CTA */}
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: '0 0 25px #D4AF3750, 0 0 50px #D4AF3720' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <Link
                      href="/appointments"
                      className="group/btn relative inline-flex items-center gap-2 ml-2 px-6 py-2.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase font-bold rounded-sm overflow-hidden transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #B89730 100%)',
                        color: '#0a0a0a',
                        boxShadow: '0 0 15px #D4AF3740, inset 0 1px 0 rgba(255,255,255,0.3)',
                      }}
                    >
                      {/* Animated neon sweep */}
                      <span
                        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 50%, transparent 80%)',
                          backgroundSize: '250% 100%',
                          animation: 'holo-shimmer 2s ease-in-out infinite',
                        }}
                      />
                      <Calendar size={12} strokeWidth={2.5} className="relative z-10" />
                      <span className="relative z-10">Book Appointment</span>
                    </Link>
                  </motion.div>
                </div>

                {/* ─ Mobile Layout ─ */}
                <div className="flex items-center justify-between w-full lg:hidden">
                  <Link href="/" className="flex items-center group shrink-0 relative">
                    <Image
                      src="/images/logo.png"
                      alt="Shringarika"
                      width={150}
                      height={52}
                      className="h-11 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-opacity duration-300"
                      priority
                    />
                  </Link>

                  <div className="flex items-center gap-1 shrink-0">
                    <Link href="/collections" className="p-2 text-[#888] hover:text-[#FFD700] transition-colors duration-200" aria-label="Shop">
                      <ShoppingBag size={18} strokeWidth={1.5} />
                    </Link>
                    <a href="tel:+919999999999" className="p-2 text-[#888] hover:text-[#FFD700] transition-colors duration-200" aria-label="Call">
                      <Phone size={17} strokeWidth={1.5} />
                    </a>
                    <button
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="p-2 text-[#e0e0e0] hover:text-[#FFD700] transition-colors"
                      aria-label="Toggle menu"
                    >
                      <AnimatePresence mode="wait">
                        {menuOpen ? (
                          <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                            <X size={22} strokeWidth={1.5} />
                          </motion.div>
                        ) : (
                          <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
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

      {/* ── Gaming Mobile Menu ─────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/80 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[300px] lg:hidden"
            >
              <div
                className="h-full flex flex-col"
                style={{
                  background: 'linear-gradient(180deg, #0a0a0a 0%, #111 100%)',
                  borderLeft: '2px solid #D4AF3740',
                  boxShadow: '-10px 0 40px rgba(0,0,0,0.6)',
                }}
              >
                {/* Chrome top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)' }} />

                {/* Header */}
                <div className="flex items-center justify-between px-6 h-16 border-b border-[#D4AF3720]">
                  <Image
                    src="/images/logo.png"
                    alt="Shringarika"
                    width={130}
                    height={52}
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                  <button onClick={() => setMenuOpen(false)} className="p-2 text-[#888] hover:text-[#FFD700] transition-colors" aria-label="Close">
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 flex flex-col overflow-y-auto min-h-0 py-3">
                  {navLinks.map((link, i) => (
                    <div key={link.href}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.25 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center justify-between py-3 px-6 font-dm-sans text-[13px] tracking-[0.12em] uppercase transition-all duration-200 border-b border-[#ffffff06] ${
                            isActive(link.href)
                              ? 'text-[#FFD700] bg-[#D4AF3708]'
                              : 'text-[#888] hover:text-[#FFD700] hover:pl-8'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isActive(link.href) && (
                              <span className="w-2 h-2 rounded-full" style={{ background: '#FFD700', boxShadow: '0 0 8px #FFD700' }} />
                            )}
                            {link.label}
                          </span>
                        </Link>
                      </motion.div>

                      {link.mega && (
                        <div className="bg-[#0a0a0a]">
                          {link.categories?.flatMap((cat) =>
                            cat.items.map((item, ii) => (
                              <motion.div
                                key={item.href + item.label}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (i * 0.03) + (ii * 0.02), duration: 0.2 }}
                              >
                                <Link
                                  href={item.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center gap-2 py-2 px-10 font-dm-sans text-[11px] tracking-wider text-[#555] hover:text-[#FFD700] transition-all duration-200"
                                >
                                  <span className="w-1 h-1 rounded-full bg-[#D4AF3725]" />
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

                {/* Footer */}
                <div className="px-6 pb-6 space-y-4 border-t border-[#D4AF3715] pt-5">
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 font-dm-sans text-[11px] tracking-[0.15em] uppercase text-[#555] hover:text-[#FFD700] transition-colors duration-200"
                  >
                    <User size={15} strokeWidth={1.5} />
                    My Account
                  </Link>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/appointments"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase font-bold rounded-sm relative"
                      style={{
                        background: 'linear-gradient(135deg, #FFD700, #D4AF37, #B89730)',
                        color: '#0a0a0a',
                        boxShadow: '0 0 15px #D4AF3730',
                      }}
                    >
                      <Calendar size={13} strokeWidth={2.5} />
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
