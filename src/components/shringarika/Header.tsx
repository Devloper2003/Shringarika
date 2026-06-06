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

/* ─── 3D Tilt Nav Item ──────────────────────────────────── */

function NavItem3D({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 20 });

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
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 400 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

/* ─── Floating Particle ──────────────────────────────────── */

function FloatingParticle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        background: 'radial-gradient(circle, #D4AF3780 0%, transparent 70%)',
      }}
      animate={{
        y: [-4, 4, -4],
        opacity: [0.3, 0.7, 0.3],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 3 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

/* ─── Curved Neon Edge SVG Wave ──────────────────────────── */

function CurvedNeonWave() {
  return (
    <div className="absolute -bottom-[18px] left-0 right-0 overflow-hidden pointer-events-none" style={{ height: '20px' }}>
      <svg
        viewBox="0 0 1440 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,10 C240,0 480,20 720,10 C960,0 1200,20 1440,10"
          stroke="url(#neonGrad)"
          strokeWidth="1.5"
          fill="transparent"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="80%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
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
  const navScale = useTransform(scrollY, [0, 200], [1, 0.97]);
  const navY = useTransform(scrollY, [0, 200], [0, -2]);

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
      {/* ── Curved Animated Navbar ──────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          style={{ scale: navScale, y: navY }}
          className="flex justify-center pt-3 px-4 lg:px-6"
        >
          {/* ── Curved Floating Capsule ── */}
          <motion.div
            className="relative w-full max-w-[1380px] overflow-visible"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute -inset-[1px] rounded-[28px] pointer-events-none"
              style={{
                background: scrolled
                  ? 'linear-gradient(135deg, #D4AF3760 0%, #FFD70030 25%, #D4AF3715 50%, #FFD70030 75%, #D4AF3760 100%)'
                  : 'linear-gradient(135deg, #D4AF3730 0%, #FFD70015 25%, #D4AF3708 50%, #FFD70015 75%, #D4AF3730 100%)',
                transition: 'background 0.5s ease',
                borderRadius: '28px',
              }}
            />

            {/* Main curved container */}
            <div
              className="relative rounded-[28px] overflow-visible"
              style={{
                background: scrolled
                  ? 'linear-gradient(180deg, rgba(10,10,10,0.97) 0%, rgba(17,17,17,0.97) 100%)'
                  : 'linear-gradient(180deg, rgba(10,10,10,0.92) 0%, rgba(17,17,17,0.92) 100%)',
                backdropFilter: scrolled ? 'saturate(1.5)' : 'saturate(1.2)',
                border: '1px solid rgba(212,175,55,0.15)',
                boxShadow: scrolled
                  ? '0 8px 32px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.04)'
                  : '0 4px 20px rgba(0,0,0,0.4), 0 0 20px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Animated curved top chrome line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[28px] z-20 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, #D4AF37 15%, #FFD700 35%, #FFF8DC 50%, #FFD700 65%, #D4AF37 85%, transparent 100%)',
                  }}
                  animate={{ backgroundPosition: ['200% center', '-200% center'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Animated curved bottom chrome line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-[28px] z-20 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, #D4AF37 15%, #FFD700 35%, #FFF8DC 50%, #FFD700 65%, #D4AF37 85%, transparent 100%)',
                  }}
                  animate={{ backgroundPosition: ['-200% center', '200% center'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Mirror shine reflection — top area */}
              <div
                className="absolute top-[2px] left-[2px] right-[2px] h-[45%] rounded-t-[26px] pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 100%)',
                }}
              />

              {/* Floating particles around the nav */}
              <FloatingParticle delay={0} x={10} size={4} />
              <FloatingParticle delay={1} x={30} size={3} />
              <FloatingParticle delay={0.5} x={55} size={5} />
              <FloatingParticle delay={1.5} x={75} size={3} />
              <FloatingParticle delay={2} x={90} size={4} />

              {/* Animated neon scan line */}
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[28px] pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute left-0 right-0 h-[1px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #D4AF37, #FFD700, #D4AF37, transparent)',
                    boxShadow: '0 0 8px #D4AF3760, 0 0 16px #D4AF3720',
                  }}
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Curved neon wave under navbar */}
              <CurvedNeonWave />

              <div className="max-w-[1340px] mx-auto px-5 lg:px-8 overflow-visible">
                <div className="flex items-center justify-between h-[72px] lg:h-[78px]">

                  {/* ─ Left: Curved Logo ─ */}
                  <Link href="/" className="flex items-center shrink-0 group z-10 relative">
                    {/* Neon glow behind logo */}
                    <motion.div
                      className="absolute -inset-5 rounded-full"
                      animate={{
                        boxShadow: isActive('/')
                          ? '0 0 25px #D4AF3725, 0 0 50px #D4AF3710'
                          : '0 0 0px transparent',
                      }}
                      whileHover={{
                        boxShadow: '0 0 30px #D4AF3730, 0 0 60px #D4AF3715',
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.06, rotateY: 8 }}
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

                  {/* ─ Center: Curved Nav Links ─ */}
                  <nav className="hidden lg:flex items-center gap-0.5 overflow-visible" style={{ perspective: '800px' }}>
                    {navLinks.map((link, i) =>
                      link.mega ? (
                        /* Collections Mega Menu Trigger */
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
                              className={`group relative flex items-center gap-1.5 px-4 py-2.5 font-dm-sans text-[11px] tracking-[0.2em] uppercase rounded-full transition-all duration-400 ${
                                isActive(link.href)
                                  ? 'text-[#0a0a0a] font-bold'
                                  : 'text-[#ccc] hover:text-[#FFD700]'
                              }`}
                            >
                              {/* Active: Curved gold pill */}
                              {isActive(link.href) && (
                                <motion.span
                                  layoutId="nav-active-curved"
                                  className="absolute inset-0 rounded-full"
                                  style={{
                                    background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #B89730 100%)',
                                    boxShadow: '0 0 14px #D4AF3750, 0 0 28px #D4AF3720, inset 0 1px 0 rgba(255,255,255,0.3)',
                                  }}
                                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                              )}

                              {/* Hover: Curved border glow */}
                              {!isActive(link.href) && (
                                <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/[0.06] transition-all duration-400" />
                              )}

                              <span className="relative z-10 flex items-center gap-1.5">
                                {link.label}
                                <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.25, type: 'spring', stiffness: 300 }}>
                                  <ChevronDown size={11} strokeWidth={2.5} />
                                </motion.span>
                              </span>

                              {/* Bottom curved neon indicator */}
                              {isActive(link.href) && (
                                <motion.span
                                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full"
                                  style={{
                                    background: '#FFD700',
                                    boxShadow: '0 0 8px #FFD700, 0 0 16px #D4AF3750',
                                  }}
                                  layoutId="nav-indicator-curved"
                                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                              )}
                            </Link>
                          </NavItem3D>

                          {/* ── Curved Mega Menu ── */}
                          <AnimatePresence>
                            {megaOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 12, scale: 0.97, rotateX: -5 }}
                                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                                exit={{ opacity: 0, y: 10, scale: 0.98, rotateX: -3 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                style={{ transformOrigin: 'top center', perspective: 1000 }}
                                className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[900px] z-[60]"
                                onMouseEnter={openMega}
                                onMouseLeave={closeMegaDelayed}
                              >
                                <div
                                  className="relative p-8 rounded-[24px]"
                                  style={{
                                    background: 'linear-gradient(180deg, rgba(10,10,10,0.98) 0%, rgba(17,17,17,0.98) 100%)',
                                    border: '1px solid rgba(212,175,55,0.2)',
                                    boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
                                  }}
                                >
                                  {/* Curved chrome edges on mega */}
                                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[24px] overflow-hidden">
                                    <motion.div
                                      className="h-full"
                                      style={{
                                        background: 'linear-gradient(90deg, transparent, #D4AF37, #FFD700, #D4AF37, transparent)',
                                      }}
                                      animate={{ backgroundPosition: ['200% center', '-200% center'] }}
                                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                    />
                                  </div>
                                  <div className="absolute bottom-0 left-0 right-0 h-[1px] rounded-b-[24px]" style={{ background: 'linear-gradient(90deg, transparent, #D4AF3740, #FFD70040, #D4AF3740, transparent)' }} />

                                  {/* Mirror shine */}
                                  <div
                                    className="absolute top-[2px] left-[2px] right-[2px] h-[40%] rounded-t-[22px] pointer-events-none"
                                    style={{
                                      background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
                                    }}
                                  />

                                  <div className="grid grid-cols-4 gap-6 relative z-10">
                                    {link.categories?.map((cat, ci) => (
                                      <motion.div
                                        key={cat.title}
                                        initial={{ opacity: 0, y: 15, rotateX: -10 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        transition={{ delay: ci * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ transformStyle: 'preserve-3d', perspective: 500 }}
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
                                          {cat.items.map((item, ii) => {
                                            const Icon = 'icon' in item && item.icon ? item.icon : null;
                                            return (
                                              <motion.li
                                                key={item.href + item.label}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: ci * 0.06 + ii * 0.03, duration: 0.3 }}
                                              >
                                                <Link
                                                  href={item.href}
                                                  className="group/item flex items-center gap-2 font-dm-sans text-[12px] tracking-wide text-[#777] hover:text-[#FFD700] transition-all duration-300 py-1.5 px-2 -mx-2 rounded-lg hover:bg-[#D4AF3708]"
                                                >
                                                  {Icon ? (
                                                    <Icon size={12} strokeWidth={1.5} className="text-[#D4AF3750] group-hover/item:text-[#D4AF37] transition-colors duration-200" />
                                                  ) : (
                                                    <span className="w-1 h-1 rounded-full bg-[#D4AF3730] group-hover/item:bg-[#FFD700] group-hover/item:shadow-[0_0_6px_#FFD700] transition-all duration-200" />
                                                  )}
                                                  {item.label}
                                                </Link>
                                              </motion.li>
                                            );
                                          })}
                                        </ul>
                                      </motion.div>
                                    ))}
                                  </div>

                                  <motion.div
                                    className="mt-6 pt-4 border-t border-[#D4AF3715] flex items-center justify-between relative z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                  >
                                    <p className="font-cormorant text-sm italic text-[#555] flex items-center gap-2">
                                      <Sparkles size={12} className="text-[#D4AF3740]" />
                                      Every thread tells your story
                                    </p>
                                    <Link
                                      href="/collections"
                                      className="group/view flex items-center gap-1.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] hover:text-[#FFD700] transition-colors duration-300"
                                    >
                                      View All Collections
                                      <ArrowRight size={12} strokeWidth={1.5} className="group-hover/view:translate-x-1 transition-transform duration-300" />
                                    </Link>
                                  </motion.div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        /* Regular Curved Nav Link */
                        <NavItem3D key={link.href}>
                          <Link
                            href={link.href}
                            className={`group relative px-4 py-2.5 font-dm-sans text-[11px] tracking-[0.2em] uppercase rounded-full transition-all duration-400 ${
                              isActive(link.href)
                                ? 'text-[#0a0a0a] font-bold'
                                : 'text-[#ccc] hover:text-[#FFD700]'
                            }`}
                          >
                            {/* Active: Curved gold pill */}
                            {isActive(link.href) && (
                              <motion.span
                                layoutId="nav-active-curved"
                                className="absolute inset-0 rounded-full"
                                style={{
                                  background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #B89730 100%)',
                                  boxShadow: '0 0 14px #D4AF3750, 0 0 28px #D4AF3720, inset 0 1px 0 rgba(255,255,255,0.3)',
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                              />
                            )}

                            {/* Hover: Curved border glow */}
                            {!isActive(link.href) && (
                              <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/[0.06] transition-all duration-400" />
                            )}

                            <span className="relative z-10">{link.label}</span>

                            {/* Bottom curved neon indicator */}
                            {isActive(link.href) && (
                              <motion.span
                                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full"
                                style={{
                                  background: '#FFD700',
                                  boxShadow: '0 0 8px #FFD700, 0 0 16px #D4AF3750',
                                }}
                                layoutId="nav-indicator-curved"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                              />
                            )}
                          </Link>
                        </NavItem3D>
                      )
                    )}
                  </nav>

                  {/* ─ Right: Curved Icons + CTA ─ */}
                  <div className="hidden lg:flex items-center gap-2 shrink-0">
                    {/* Shopping Bag */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotateY: 10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      style={{ transformStyle: 'preserve-3d', perspective: 400 }}
                    >
                      <Link
                        href="/collections"
                        className={`group p-2.5 rounded-full transition-all duration-300 relative ${
                          isActive('/collections') ? 'text-[#FFD700] bg-[#D4AF3710]' : 'text-[#888] hover:text-[#FFD700] hover:bg-[#D4AF3708]'
                        }`}
                        aria-label="Shop"
                      >
                        <ShoppingBag size={18} strokeWidth={1.5} />
                        {isActive('/collections') && (
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-[2px] rounded-full" style={{ background: '#FFD700', boxShadow: '0 0 6px #FFD700' }} />
                        )}
                      </Link>
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotateY: -10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      style={{ transformStyle: 'preserve-3d', perspective: 400 }}
                    >
                      <a
                        href="tel:+919999999999"
                        className="group p-2.5 rounded-full text-[#888] hover:text-[#FFD700] hover:bg-[#D4AF3708] transition-all duration-300"
                        aria-label="Call us"
                      >
                        <Phone size={17} strokeWidth={1.5} />
                      </a>
                    </motion.div>

                    {/* Account */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotateY: 10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      style={{ transformStyle: 'preserve-3d', perspective: 400 }}
                    >
                      <Link
                        href="/account"
                        className={`group p-2.5 rounded-full transition-all duration-300 relative ${
                          isActive('/account') ? 'text-[#FFD700] bg-[#D4AF3710]' : 'text-[#888] hover:text-[#FFD700] hover:bg-[#D4AF3708]'
                        }`}
                        aria-label="My Account"
                      >
                        <User size={17} strokeWidth={1.5} />
                      </Link>
                    </motion.div>

                    {/* Book Appointment — Neon CTA Pill */}
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 30px #D4AF3750, 0 0 60px #D4AF3720',
                      }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <Link
                        href="/appointments"
                        className="group/btn relative inline-flex items-center gap-2 ml-2 px-6 py-2.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase font-bold rounded-full overflow-hidden transition-all duration-400"
                        style={{
                          background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #B89730 100%)',
                          color: '#0a0a0a',
                          boxShadow: '0 0 18px #D4AF3740, 0 0 36px #D4AF3715, inset 0 1px 0 rgba(255,255,255,0.3)',
                        }}
                      >
                        {/* Animated holographic sweep */}
                        <motion.span
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%)',
                            backgroundSize: '250% 100%',
                          }}
                          animate={{ backgroundPosition: ['200% center', '-200% center'] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
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
                            <motion.div key="close" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}>
                              <X size={22} strokeWidth={1.5} />
                            </motion.div>
                          ) : (
                            <motion.div key="menu" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}>
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
        </motion.div>
      </motion.header>

      {/* ── Curved Mobile Menu ─────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%', borderRadius: '0px' }}
              animate={{ x: 0, borderRadius: '24px 0 0 24px' }}
              exit={{ x: '100%', borderRadius: '0px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[300px] lg:hidden overflow-hidden"
            >
              <div
                className="h-full flex flex-col relative"
                style={{
                  background: 'linear-gradient(180deg, rgba(10,10,10,0.98) 0%, rgba(17,17,17,0.98) 100%)',
                  borderLeft: '1px solid rgba(212,175,55,0.2)',
                  boxShadow: '-10px 0 50px rgba(0,0,0,0.6), -5px 0 20px rgba(212,175,55,0.05)',
                }}
              >
                {/* Curved top chrome line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{
                      background: 'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)',
                    }}
                    animate={{ backgroundPosition: ['200% center', '-200% center'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                </div>

                {/* Mirror shine */}
                <div
                  className="absolute top-[2px] left-0 right-0 h-[35%] pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
                  }}
                />

                {/* Header */}
                <div className="flex items-center justify-between px-6 h-16 border-b border-[#D4AF3720] relative z-10">
                  <Image
                    src="/images/logo.png"
                    alt="Shringarika"
                    width={130}
                    height={52}
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                  <motion.button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-full text-[#888] hover:text-[#FFD700] hover:bg-[#D4AF3710] transition-all duration-300"
                    aria-label="Close"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} strokeWidth={1.5} />
                  </motion.button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 flex flex-col overflow-y-auto min-h-0 py-3">
                  {navLinks.map((link, i) => (
                    <div key={link.href}>
                      <motion.div
                        initial={{ opacity: 0, x: 30, rotateY: -15 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformStyle: 'preserve-3d', perspective: 500 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center justify-between py-3 px-6 font-dm-sans text-[13px] tracking-[0.12em] uppercase transition-all duration-300 border-b border-[#ffffff06] ${
                            isActive(link.href)
                              ? 'text-[#FFD700] bg-[#D4AF3708]'
                              : 'text-[#888] hover:text-[#FFD700] hover:pl-8 hover:bg-[#D4AF3705]'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isActive(link.href) && (
                              <motion.span
                                className="w-2 h-2 rounded-full"
                                style={{ background: '#FFD700', boxShadow: '0 0 8px #FFD700' }}
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
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
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (i * 0.04) + (ii * 0.02), duration: 0.25 }}
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
                <div className="px-6 pb-6 space-y-4 border-t border-[#D4AF3715] pt-5 relative z-10">
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 font-dm-sans text-[11px] tracking-[0.15em] uppercase text-[#555] hover:text-[#FFD700] transition-colors duration-200"
                  >
                    <User size={15} strokeWidth={1.5} />
                    My Account
                  </Link>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/appointments"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 font-dm-sans text-[10px] tracking-[0.2em] uppercase font-bold rounded-full relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #FFD700, #D4AF37, #B89730)',
                        color: '#0a0a0a',
                        boxShadow: '0 0 18px #D4AF3730, 0 0 36px #D4AF3710',
                      }}
                    >
                      {/* Sweep animation */}
                      <motion.span
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 50%, transparent 80%)',
                          backgroundSize: '250% 100%',
                        }}
                        animate={{ backgroundPosition: ['200% center', '-200% center'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                      />
                      <Calendar size={13} strokeWidth={2.5} className="relative z-10" />
                      <span className="relative z-10">Book Appointment</span>
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
