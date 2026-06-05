'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TrailDot {
  id: number;
  x: number;
  y: number;
  createdAt: number;
  size: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

type FashionIcon = 'needle' | 'thread' | 'scissors' | 'tape';

// ─── Constants ───────────────────────────────────────────────────────────────

const ZARI_GOLD = '#C9A84C';
const ROSE_GOLD = '#B76E79';
const TRAIL_LIFETIME_MS = 1000;
const MAX_TRAIL_DOTS = 30;
const TRAIL_THROTTLE_MS = 30;
const SPARKLE_COUNT_MIN = 6;
const SPARKLE_COUNT_MAX = 8;
const CURSOR_DOT_SIZE = 8;
const CURSOR_HOVER_SIZE = 40;
const FASHION_ICON_SIZE = 18;

const FASHION_ICONS: Record<FashionIcon, string> = {
  needle: '🪡',
  thread: '🧵',
  scissors: '✂',
  tape: '📏',
};

const FASHION_ICON_SEQUENCE: FashionIcon[] = ['needle', 'thread', 'scissors', 'tape'];

// ─── Helper: is mobile device ────────────────────────────────────────────────

function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || 'ontouchstart' in window;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FashionCursor() {
  const [isVisible] = useState(() => !isMobileDevice());

  // ── DOM refs ──
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const sparkleContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // ── All mutable state in a single ref to avoid hook-immutability issues ──
  const stateRef = useRef({
    cursorX: -100,
    cursorY: -100,
    isHovering: false,
    trailDots: [] as TrailDot[],
    sparkles: [] as Sparkle[],
    fashionIconIndex: 0,
    iconChangeTime: 0,
    lastTrailTime: 0,
    dotIdCounter: 0,
    sparkleIdCounter: 0,
    isMounted: false,
    rafId: 0,
    // Fashion tooltip state
    tooltipIcon: 'needle' as FashionIcon,
    tooltipX: 0,
    tooltipY: 0,
    tooltipVisible: false,
  });

  useEffect(() => {
    // Skip setup if on mobile (component won't render anyway)
    if (!isVisible) return;
    const s = stateRef.current;
    s.isMounted = true;

    // Hide default cursor
    document.body.style.cursor = 'none';

    // ─── Trail dot creation (throttled) ──────────────────────────────────

    const addTrailDot = (x: number, y: number) => {
      const now = performance.now();
      if (now - s.lastTrailTime < TRAIL_THROTTLE_MS) return;
      s.lastTrailTime = now;

      const dot: TrailDot = {
        id: s.dotIdCounter++,
        x,
        y,
        createdAt: now,
        size: Math.random() * 2 + 2,
      };

      s.trailDots.push(dot);
      if (s.trailDots.length > MAX_TRAIL_DOTS) {
        s.trailDots = s.trailDots.slice(-MAX_TRAIL_DOTS);
      }
    };

    // ─── Sparkle creation on click ───────────────────────────────────────

    const emitSparkles = (x: number, y: number) => {
      const count =
        Math.floor(Math.random() * (SPARKLE_COUNT_MAX - SPARKLE_COUNT_MIN + 1)) +
        SPARKLE_COUNT_MIN;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
        const speed = Math.random() * 3 + 1.5;
        const isGold = Math.random() > 0.4;

        s.sparkles.push({
          id: s.sparkleIdCounter++,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          opacity: 1,
          size: Math.random() * 3 + 2,
          color: isGold ? ZARI_GOLD : ROSE_GOLD,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
        });
      }
    };

    // ─── Fashion icon cycling ────────────────────────────────────────────

    const cycleFashionIcon = (): FashionIcon => {
      const now = Date.now();
      if (now - s.iconChangeTime > 3000) {
        s.iconChangeTime = now;
        s.fashionIconIndex = (s.fashionIconIndex + 1) % FASHION_ICON_SEQUENCE.length;
      }
      return FASHION_ICON_SEQUENCE[s.fashionIconIndex];
    };

    // ─── Render trail dots to DOM ────────────────────────────────────────

    const renderTrail = () => {
      const container = trailContainerRef.current;
      if (!container) return;

      const now = performance.now();

      // Remove expired dots
      s.trailDots = s.trailDots.filter((dot) => now - dot.createdAt < TRAIL_LIFETIME_MS);

      let html = '';
      for (let i = 0; i < s.trailDots.length; i++) {
        const dot = s.trailDots[i];
        const age = now - dot.createdAt;
        const progress = age / TRAIL_LIFETIME_MS;
        const opacity = Math.max(0, (1 - progress) * 0.8);
        const size = dot.size * (1 - progress * 0.5);

        html += `<div style="position:absolute;left:${dot.x}px;top:${dot.y}px;width:${size}px;height:${size}px;border-radius:50%;background:rgba(201,168,76,${opacity});box-shadow:0 0 ${size * 2}px rgba(201,168,76,${opacity * 0.4});transform:translate(-50%,-50%);pointer-events:none;" />`;
      }

      container.innerHTML = html;
    };

    // ─── Render sparkles to DOM (immutable update) ───────────────────────

    const renderSparkles = () => {
      const container = sparkleContainerRef.current;
      if (!container) return;

      // Create new array with updated sparkle positions (immutable)
      const updated: Sparkle[] = [];
      let html = '';

      for (let i = 0; i < s.sparkles.length; i++) {
        const sp = s.sparkles[i];
        const newOpacity = sp.opacity * 0.94;

        // Skip sparkles that have faded
        if (newOpacity < 0.01) continue;

        const newX = sp.x + sp.vx;
        const newY = sp.y + sp.vy;
        const newVx = sp.vx * 0.96;
        const newVy = sp.vy * 0.96 + 0.05; // slight gravity
        const newRotation = sp.rotation + sp.rotationSpeed;

        updated.push({
          ...sp,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          opacity: newOpacity,
          rotation: newRotation,
        });

        html += `<div style="position:absolute;left:${newX}px;top:${newY}px;width:${sp.size}px;height:${sp.size}px;opacity:${newOpacity};transform:translate(-50%,-50%) rotate(${newRotation}deg);pointer-events:none;"><svg width="${sp.size}" height="${sp.size}" viewBox="0 0 10 10" fill="none"><path d="M5 0L6 4L10 5L6 6L5 10L4 6L0 5L4 4Z" fill="${sp.color}" /></svg></div>`;
      }

      s.sparkles = updated;
      container.innerHTML = html;
    };

    // ─── Render fashion tooltip ──────────────────────────────────────────

    const renderTooltip = () => {
      const tooltipEl = tooltipRef.current;
      if (!tooltipEl) return;

      if (!s.tooltipVisible) {
        tooltipEl.style.opacity = '0';
        tooltipEl.style.transform = 'translate(-50%, -50%) scale(0.5)';
        return;
      }

      const icon = FASHION_ICONS[s.tooltipIcon];
      const offsetX = 25;
      const offsetY = -20;

      tooltipEl.style.left = `${s.tooltipX + offsetX}px`;
      tooltipEl.style.top = `${s.tooltipY + offsetY}px`;
      tooltipEl.style.opacity = '0.6';
      tooltipEl.style.transform = 'translate(-50%, -50%) scale(1)';
      tooltipEl.innerHTML = `<span style="font-size:${FASHION_ICON_SIZE}px;color:${ZARI_GOLD};opacity:0.6;filter:drop-shadow(0 0 4px rgba(201,168,76,0.3));user-select:none;">${icon}</span>`;
    };

    // ─── Update cursor dot position ──────────────────────────────────────

    const updateCursorDot = () => {
      const dot = dotRef.current;
      if (!dot) return;

      const size = s.isHovering ? CURSOR_HOVER_SIZE : CURSOR_DOT_SIZE;

      dot.style.left = `${s.cursorX}px`;
      dot.style.top = `${s.cursorY}px`;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;

      if (s.isHovering) {
        dot.style.background = 'transparent';
        dot.style.border = `2px solid ${ZARI_GOLD}`;
        dot.style.boxShadow =
          '0 0 15px rgba(201, 168, 76, 0.3), inset 0 0 10px rgba(201, 168, 76, 0.1)';
      } else {
        dot.style.background = ZARI_GOLD;
        dot.style.border = 'none';
        dot.style.boxShadow = '0 0 10px rgba(201, 168, 76, 0.5), 0 0 20px rgba(201, 168, 76, 0.2)';
      }
    };

    // ─── Main animation loop ─────────────────────────────────────────────

    const animate = () => {
      if (!s.isMounted) return;

      updateCursorDot();
      renderTrail();
      renderSparkles();
      renderTooltip();

      s.rafId = requestAnimationFrame(animate);
    };

    // ─── Event handlers ──────────────────────────────────────────────────

    const handleMouseMove = (e: MouseEvent) => {
      s.cursorX = e.clientX;
      s.cursorY = e.clientY;
      addTrailDot(e.clientX, e.clientY);

      // Update fashion tooltip
      s.tooltipIcon = cycleFashionIcon();
      s.tooltipX = e.clientX;
      s.tooltipY = e.clientY;
      s.tooltipVisible = true;

      // Check hover on interactive elements
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[role="button"]') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      s.isHovering = isInteractive;
    };

    const handleMouseDown = (e: MouseEvent) => {
      emitSparkles(e.clientX, e.clientY);
    };

    const handleMouseEnter = () => {
      const dot = dotRef.current;
      if (dot) dot.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      const dot = dotRef.current;
      if (dot) dot.style.opacity = '0';
      s.trailDots = [];
      s.tooltipVisible = false;
    };

    // ─── Attach listeners ────────────────────────────────────────────────

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    s.rafId = requestAnimationFrame(animate);

    // ─── Cleanup ─────────────────────────────────────────────────────────

    return () => {
      s.isMounted = false;

      // Restore default cursor
      document.body.style.cursor = '';

      // Cancel animation
      cancelAnimationFrame(s.rafId);

      // Remove event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);

      // Clear state
      s.trailDots = [];
      s.sparkles = [];
      s.tooltipVisible = false;
    };
  }, []);

  // ─── Don't render on mobile ──────────────────────────────────────────────

  if (!isVisible) return null;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Custom cursor dot */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          left: -100,
          top: -100,
          width: CURSOR_DOT_SIZE,
          height: CURSOR_DOT_SIZE,
          borderRadius: '50%',
          background: ZARI_GOLD,
          boxShadow: '0 0 10px rgba(201, 168, 76, 0.5), 0 0 20px rgba(201, 168, 76, 0.2)',
          transform: 'translate(-50%, -50%)',
          transition:
            'width 0.25s ease, height 0.25s ease, background 0.25s ease, border 0.25s ease, box-shadow 0.25s ease',
          pointerEvents: 'none',
          willChange: 'left, top, width, height',
        }}
      />

      {/* Trail container */}
      <div
        ref={trailContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      />

      {/* Sparkle container */}
      <div
        ref={sparkleContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      />

      {/* Fashion tooltip */}
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.5)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          willChange: 'left, top, opacity, transform',
          userSelect: 'none',
        }}
      />
    </div>
  );
}
