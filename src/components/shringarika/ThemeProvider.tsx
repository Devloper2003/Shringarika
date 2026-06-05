'use client';

import { useEffect, useState } from 'react';

interface ThemeData {
  id: string;
  name: string;
  label: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  cardColor: string;
  borderColor: string;
  fontFamily: string;
  headingFont: string;
  bodyFont: string;
  customCss: string | null;
  showParticles: boolean;
  showCursorEffect: boolean;
  active: boolean;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadTheme() {
      try {
        const res = await fetch('/api/site/theme');
        if (!res.ok) return;

        const json = await res.json();
        if (!json.success || !json.data) return;

        const theme: ThemeData = json.data;

        if (!isMounted) return;

        const root = document.documentElement;

        // Apply CSS custom properties
        const vars: Record<string, string> = {
          '--primary': theme.primaryColor,
          '--secondary': theme.secondaryColor,
          '--accent': theme.accentColor,
          '--background': theme.backgroundColor,
          '--foreground': theme.textColor,
          '--card': theme.cardColor,
          '--border': theme.borderColor,
          '--ring': theme.primaryColor,
          '--sidebar-primary': theme.primaryColor,
          '--sidebar-ring': theme.primaryColor,
          // Derived foreground colors
          '--primary-foreground': theme.backgroundColor,
          '--card-foreground': theme.textColor,
          '--sidebar-primary-foreground': theme.backgroundColor,
        };

        Object.entries(vars).forEach(([key, value]) => {
          root.style.setProperty(key, value);
        });

        // Data attributes for particles and cursor effects
        if (!theme.showParticles) {
          root.setAttribute('data-disable-particles', 'true');
        } else {
          root.removeAttribute('data-disable-particles');
        }

        if (!theme.showCursorEffect) {
          root.setAttribute('data-disable-cursor', 'true');
        } else {
          root.removeAttribute('data-disable-cursor');
        }

        // Apply custom CSS if provided
        if (theme.customCss) {
          let styleEl = document.getElementById('shringarika-custom-css') as HTMLStyleElement | null;
          if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'shringarika-custom-css';
            document.head.appendChild(styleEl);
          }
          styleEl.textContent = theme.customCss;
        } else {
          const existing = document.getElementById('shringarika-custom-css');
          if (existing) existing.remove();
        }

        setApplied(true);
      } catch {
        // Silently fail — keep default CSS variables from globals.css
      }
    }

    loadTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  // Render children immediately — theme is applied as an enhancement
  return <>{children}</>;
}

export default ThemeProvider;
