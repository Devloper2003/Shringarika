import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Appointment | SHRINGARIKA',
  description: 'Book your private bridal consultation or bespoke design session at House of Shringarika. In-studio, virtual, and at-home appointments available.',
};

export default function AppointmentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
