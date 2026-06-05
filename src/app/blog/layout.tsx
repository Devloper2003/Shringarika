import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal | SHRINGARIKA',
  description: 'The Shringarika Journal — stories of craft, bridal trends, style guides, and behind-the-scenes from our Jaipur atelier.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
