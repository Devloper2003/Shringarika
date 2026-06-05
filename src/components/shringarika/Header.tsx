'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Story', href: '#story' },
  { label: 'Collections', href: '#collections' },
  { label: 'Bespoke', href: '#bespoke' },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Appointments', href: '#appointments' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
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

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-ivory/90 backdrop-blur-md shadow-sm border-b border-zari-gold/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group">
              <span
                className={`font-cinzel text-lg md:text-xl tracking-[0.2em] font-semibold transition-colors duration-500 ${
                  scrolled ? 'text-noir' : 'text-ivory'
                } group-hover:text-zari-gold`}
              >
                SHRINGARIKA
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-dm-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-zari-gold ${
                    scrolled ? 'text-noir/70' : 'text-ivory/80'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a
                href="#appointments"
                className="hidden md:inline-flex items-center px-5 py-2 border border-zari-gold/60 text-zari-gold font-dm-sans text-xs tracking-[0.15em] uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500 rounded-none"
              >
                Book Appointment
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`lg:hidden flex flex-col gap-1.5 p-2 transition-colors ${
                  scrolled ? 'text-noir' : 'text-ivory'
                }`}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-[1.5px] bg-current"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-6 h-[1.5px] bg-current"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-[1.5px] bg-current"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-noir/95 backdrop-blur-lg flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="font-cormorant text-2xl md:text-3xl text-ivory/90 tracking-[0.15em] hover:text-zari-gold transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#appointments"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.5 }}
                className="mt-4 px-8 py-3 border border-zari-gold text-zari-gold font-dm-sans text-xs tracking-[0.2em] uppercase hover:bg-zari-gold hover:text-noir transition-all duration-500"
              >
                Book Appointment
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
