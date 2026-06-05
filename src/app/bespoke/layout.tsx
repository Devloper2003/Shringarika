import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bespoke Couture | SHRINGARIKA',
  description: 'Made Only for You. Experience the luxury of custom bespoke couture — from consultation to creation, every detail crafted to your vision at House of Shringarika.',
};

export default function BespokeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
