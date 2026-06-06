'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/shringarika/Header';
import Footer from '@/components/shringarika/Footer';
import WhatsAppButton from '@/components/shringarika/WhatsAppButton';

const GoldParticles = dynamic(() => import('@/components/shringarika/GoldParticles'), {
  ssr: false,
});

const FashionCursor = dynamic(() => import('@/components/cursor/FashionCursor'), {
  ssr: false,
});

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [showParticles, setShowParticles] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    function checkAttributes() {
      const root = document.documentElement;
      setShowParticles(root.getAttribute('data-disable-particles') !== 'true');
      setShowCursor(root.getAttribute('data-disable-cursor') !== 'true');
    }

    // Check initial state
    checkAttributes();

    // Observe attribute changes on <html> (ThemeProvider may set them after mount)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          const attr = mutation.attributeName;
          if (attr === 'data-disable-particles' || attr === 'data-disable-cursor') {
            checkAttributes();
          }
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-disable-particles', 'data-disable-cursor'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Global Effects */}
      {showParticles && <GoldParticles />}
      {showCursor && <FashionCursor />}

      {/* Navigation */}
      <Header />

      {/* Page Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <WhatsAppButton />

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0d1220]/[0.97] backdrop-blur-xl border-t border-[#D4AF37]/15 px-4 py-3 safe-bottom">
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/919999999999?text=Hi%20Shringarika!%20I%27d%20love%20to%20inquire%20about%20a%20bridal%20outfit."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white font-dm-sans text-[11px] tracking-[0.12em] uppercase rounded-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <a
            href="/appointments"
            className="flex-1 flex items-center justify-center py-2.5 bg-[#D4AF37] text-[#0a0a12] font-dm-sans text-[11px] tracking-[0.12em] uppercase rounded-sm"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
