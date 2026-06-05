import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lookbook | SHRINGARIKA',
  description: 'Step into our visual diary — editorial shoots, campaign imagery, and behind-the-scenes moments from the House of Shringarika atelier.',
};

export default function LookbookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
