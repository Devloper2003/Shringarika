'use client';

import { useState, useEffect, ReactNode, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  Mail,
  Calendar,
  Image as ImageIcon,
  LayoutTemplate,
  FolderOpen,
  Palette,
  Share2,
  Sparkles,
  Users,
  Settings,
  ArrowLeft,
  Menu,
  X,
  Shield,
  ShieldCheck,
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blogs', label: 'Blog Posts', icon: FileText },
  { href: '/admin/products', label: 'Products', icon: ShoppingBag },
  { href: '/admin/inquiries', label: 'Inquiries', icon: Mail },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/content', label: 'Content', icon: LayoutTemplate },
  { href: '/admin/media', label: 'Media Library', icon: FolderOpen },
  { href: '/admin/theme', label: 'Theme', icon: Palette },
  { href: '/admin/social', label: 'Social Media', icon: Share2 },
  { href: '/admin/ai-reports', label: 'AI Reports', icon: Sparkles },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/permissions', label: 'Permissions', icon: ShieldCheck },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

function getInitialAuth(): { user: AdminUser | null; loading: boolean } {
  if (typeof window === 'undefined') return { user: null, loading: true };
  const token = localStorage.getItem('shringarika_token');
  const userStr = localStorage.getItem('shringarika_user');
  if (!token || !userStr) return { user: null, loading: true };
  try {
    const parsed = JSON.parse(userStr);
    if (parsed.role === 'admin' || parsed.role === 'super_admin') {
      return { user: parsed, loading: false };
    }
  } catch {
    // ignore
  }
  return { user: null, loading: true };
}

function Sidebar({
  user,
  pathname,
  onNavigate,
}: {
  user: AdminUser | null;
  pathname: string;
  onNavigate: () => void;
}) {
  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 pb-4">
        <Link href="/admin" className="block">
          <Image
            src="/images/logo.png"
            alt="Shringarika Admin"
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
          <p className="font-dm-sans text-ivory/40 text-[10px] tracking-[0.3em] mt-2">
            Admin Panel
          </p>
        </Link>
        {user?.role === 'super_admin' && (
          <div className="flex items-center gap-1.5 mt-3 px-2 py-1 bg-zari-gold/10 rounded-sm w-fit">
            <Shield size={12} className="text-zari-gold" />
            <span className="font-dm-sans text-zari-gold text-[10px] tracking-widest uppercase">
              Super Admin
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-4 overflow-y-auto min-h-0 admin-sidebar-scroll">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-2.5 mb-0.5 font-dm-sans text-sm transition-all duration-300 ${
                active
                  ? 'text-zari-gold bg-ivory/5 border-l-2 border-zari-gold'
                  : 'text-ivory/60 hover:text-zari-gold hover:bg-ivory/5 border-l-2 border-transparent'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="h-[1px] bg-ivory/10 my-4 mx-4" />

        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 font-dm-sans text-sm text-ivory/40 hover:text-ivory/70 transition-all duration-300"
        >
          <ArrowLeft size={18} />
          <span>Back to Website</span>
        </Link>
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-ivory/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zari-gold/20 flex items-center justify-center">
            <span className="font-cinzel text-zari-gold text-xs">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-dm-sans text-ivory/80 text-sm truncate">{user?.name}</p>
            <p className="font-dm-sans text-ivory/30 text-[11px] truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authState, setAuthState] = useState(getInitialAuth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRedirect = useCallback(() => {
    if (authState.loading && typeof window !== 'undefined') {
      router.push('/auth/login');
    }
  }, [authState.loading, router]);

  useEffect(() => {
    if (authState.loading) {
      handleRedirect();
    }
  }, [authState.loading, handleRedirect]);

  if (authState.loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-zari-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-dm-sans text-noir/40 text-sm tracking-wider">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-[260px] bg-noir z-40">
        <Sidebar user={authState.user} pathname={pathname} onNavigate={() => setMobileMenuOpen(false)} />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-noir z-40 flex items-center justify-between px-4">
        <Link href="/admin" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Shringarika"
            width={100}
            height={32}
            className="h-7 w-auto object-contain"
          />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-ivory/60 hover:text-ivory p-1"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-noir/60 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`lg:hidden fixed left-0 top-0 bottom-0 w-[260px] bg-noir z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar user={authState.user} pathname={pathname} onNavigate={() => setMobileMenuOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="lg:ml-[260px] bg-ivory min-h-screen pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
