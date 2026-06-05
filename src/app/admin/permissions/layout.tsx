import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Staff Permissions | SHRINGARIKA Admin',
  description: 'Manage staff access control and permissions — super admin only',
};

export default function PermissionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
