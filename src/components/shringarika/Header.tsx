'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { User, Calendar, X, Menu } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Story', href: '/about' },
  { label: 'Collections', href: '/collections' },
  { label: 'Bespoke', href: '/bespoke' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'Appointments', href: '/appointments' },
  { label: 'Journal', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change / resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-zari-gold/20'
            : 'bg-ivory/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo — Left */}
            <Link href="/" className="flex items-center group shrink-0">
              <span className="font-cinzel text-lg md:text-xl tracking-[0.2em] font-semibold text-noir group-hover:text-zari-gold transition-colors duration-500">
                SHRINGARIKA
              </span>
            </Link>

            {/* Center Nav — Desktop */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative font-dm-sans text-[11px] tracking-[0.16em] uppercase text-noir/60 hover:text-noir transition-colors duration-300 py-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-zari-gold group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </nav>

            {/* Right Actions — Desktop */}
            <div className="hidden lg:flex items-center gap-5 shrink-0">
              {/* Account */}
              <Link
                href="/account"
                className="flex items-center gap-1.5 font-dm-sans text-[11px] tracking-[0.15em] uppercase text-noir/50 hover:text-zari-gold transition-colors duration-300"
              >
                <User size={15} strokeWidth={1.5} />
                <span>Account</span>
              </Link>

              {/* Divider */}
              <div className="w-px h-4 bg-noir/10" />

              {/* Book Appointment CTA */}
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 px-5 py-2 border border-zari-gold/60 text-zari-gold font-dm-sans text-[11px] tracking-[0.16em] uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
              >
                <Calendar size={13} strokeWidth={1.5} />
                Book Appointment
              </Link>
            </div>

            {/* Right Actions — Mobile/Tablet */}
            <div className="flex items-center gap-3 lg:hidden shrink-0">
              {/* Account Icon */}
              <Link
                href="/account"
                className="p-2 text-noir/60 hover:text-zari-gold transition-colors duration-300"
                aria-label="Account"
              >
                <User size={18} strokeWidth={1.5} />
              </Link>

              {/* Book CTA — tablet only */}
              <Link
                href="/appointments"
                className="hidden sm:inline-flex items-center px-4 py-1.5 border border-zari-gold/60 text-zari-gold font-dm-sans text-[10px] tracking-[0.15em] uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-noir/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-noir flex flex-col lg:hidden"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-ivory/5">
                <span className="font-cinzel text-sm tracking-[0.2em] text-zari-gold">SHRINGARIKA</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-ivory/60 hover:text-ivory transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 flex flex-col py-6 px-6 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center py-3.5 font-cormorant text-xl text-ivory/80 tracking-[0.1em] hover:text-zari-gold hover:pl-2 transition-all duration-300 border-b border-ivory/5"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Panel Footer */}
              <div className="px-6 pb-8 space-y-4 border-t border-ivory/5 pt-6">
                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 font-dm-sans text-sm text-ivory/60 hover:text-zari-gold transition-colors duration-300"
                >
                  <User size={16} strokeWidth={1.5} />
                  My Account
                </Link>
                <Link
                  href="/appointments"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-zari-gold text-zari-gold font-dm-sans text-[11px] tracking-[0.2em] uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
                >
                  <Calendar size={14} strokeWidth={1.5} />
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
