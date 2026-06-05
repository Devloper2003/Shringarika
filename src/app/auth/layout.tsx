import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | SHRINGARIKA',
  description: 'Sign in or create your House of Shringarika account to access exclusive features, wishlist, and appointments.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
