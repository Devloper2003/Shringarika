import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | SHRINGARIKA',
  description: 'Discover the heritage and philosophy of House of Shringarika — where every thread tells a story. From the heart of Jaipur, our atelier crafts dreams into bridal couture.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
