import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | SHRINGARIKA',
  description: 'Get in touch with House of Shringarika — visit our Jaipur atelier, call, or send us a message. We would love to hear from you.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
