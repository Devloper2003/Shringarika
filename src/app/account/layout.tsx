import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account | SHRINGARIKA',
  description: 'Manage your Shringarika account — view orders, wishlist, measurements, and profile details.',
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
