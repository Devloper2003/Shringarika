'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  ShoppingBag,
  Heart,
  Ruler,
  LogOut,
  Edit3,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  Package,
  Bookmark,
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  measurements: string | null;
  address: string | null;
  occasion: string | null;
  createdAt: string;
  _count: {
    orders: number;
    wishlist: number;
  };
}

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'measurements'>('orders');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('shringarika_token');

      if (!token) {
        window.location.href = '/auth/login';
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.removeItem('shringarika_token');
          localStorage.removeItem('shringarika_user');
          window.location.href = '/auth/login';
        }
      } catch {
        localStorage.removeItem('shringarika_token');
        localStorage.removeItem('shringarika_user');
        window.location.href = '/auth/login';
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('shringarika_token');
    localStorage.removeItem('shringarika_user');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-cinzel text-noir text-xl tracking-[0.2em] mb-4">SHRINGARIKA</h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-zari-gold to-transparent mx-auto mb-6" />
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-zari-gold" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="font-dm-sans text-noir/50 text-sm tracking-wider">Loading your account...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const parsedMeasurements = user.measurements ? (() => {
    try {
      return JSON.parse(user.measurements);
    } catch {
      return null;
    }
  })() : null;

  const parsedAddress = user.address ? (() => {
    try {
      return JSON.parse(user.address);
    } catch {
      return null;
    }
  })() : null;

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      {/* Header */}
      <header className="bg-noir py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-block">
            <h1 className="font-cinzel text-ivory text-lg sm:text-xl tracking-[0.2em]">
              SHRINGARIKA
            </h1>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="font-dm-sans text-ivory/50 text-xs tracking-wider uppercase hover:text-ivory transition-colors"
            >
              Home
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 font-dm-sans text-ivory/50 text-xs tracking-wider uppercase hover:text-zari-gold transition-colors"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <div className="mb-10">
          <p className="font-dm-sans text-zari-gold text-xs tracking-[0.2em] uppercase mb-2">
            My Account
          </p>
          <h2 className="font-cormorant text-3xl sm:text-4xl text-noir">
            Welcome, {user.name.split(' ')[0]}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-zari-gold to-transparent mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-sandalwood/50 rounded-sm p-6 sm:p-8">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-noir/5 border-2 border-zari-gold/30 flex items-center justify-center mb-4">
                  <User size={32} className="text-zari-gold" />
                </div>
                <h3 className="font-cormorant text-2xl text-noir">{user.name}</h3>
                <span className="font-dm-sans text-noir/40 text-xs tracking-widest uppercase mt-1">
                  {user.role === 'admin' ? 'Administrator' : 'Member'}
                </span>
              </div>

              {/* Divider */}
              <div className="luxury-divider mb-6" />

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-rose-gold shrink-0" />
                  <span className="font-dm-sans text-noir/70 text-sm truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-rose-gold shrink-0" />
                    <span className="font-dm-sans text-noir/70 text-sm">{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-rose-gold shrink-0" />
                  <span className="font-dm-sans text-noir/70 text-sm">
                    Member since {new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="luxury-divider my-6" />

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-ivory/60 rounded-sm">
                  <ShoppingBag size={18} className="text-zari-gold mx-auto mb-1" />
                  <p className="font-cinzel text-noir text-lg">{user._count.orders}</p>
                  <p className="font-dm-sans text-noir/40 text-[10px] tracking-wider uppercase">Orders</p>
                </div>
                <div className="text-center p-3 bg-ivory/60 rounded-sm">
                  <Heart size={18} className="text-rose-gold mx-auto mb-1" />
                  <p className="font-cinzel text-noir text-lg">{user._count.wishlist}</p>
                  <p className="font-dm-sans text-noir/40 text-[10px] tracking-wider uppercase">Wishlist</p>
                </div>
              </div>

              {/* Divider */}
              <div className="luxury-divider my-6" />

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-noir text-ivory font-dm-sans text-xs tracking-widest uppercase py-3 hover:bg-noir-soft transition-colors duration-300 rounded-sm">
                  <Edit3 size={14} />
                  Edit Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 border border-noir/20 text-noir/60 font-dm-sans text-xs tracking-widest uppercase py-3 hover:border-ruby hover:text-ruby transition-colors duration-300 rounded-sm"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex border-b border-sandalwood/50 mb-6 sm:mb-8">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 font-dm-sans text-xs tracking-widest uppercase transition-colors border-b-2 -mb-[1px] ${
                  activeTab === 'orders'
                    ? 'text-zari-gold border-zari-gold'
                    : 'text-noir/40 border-transparent hover:text-noir/60'
                }`}
              >
                <Package size={16} />
                My Orders
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 font-dm-sans text-xs tracking-widest uppercase transition-colors border-b-2 -mb-[1px] ${
                  activeTab === 'wishlist'
                    ? 'text-zari-gold border-zari-gold'
                    : 'text-noir/40 border-transparent hover:text-noir/60'
                }`}
              >
                <Heart size={16} />
                My Wishlist
              </button>
              <button
                onClick={() => setActiveTab('measurements')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 font-dm-sans text-xs tracking-widest uppercase transition-colors border-b-2 -mb-[1px] ${
                  activeTab === 'measurements'
                    ? 'text-zari-gold border-zari-gold'
                    : 'text-noir/40 border-transparent hover:text-noir/60'
                }`}
              >
                <Ruler size={16} />
                Measurements
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'orders' && (
              <div>
                <h3 className="font-cormorant text-2xl text-noir mb-6">My Orders</h3>
                {user._count.orders === 0 ? (
                  <div className="text-center py-16 bg-white border border-sandalwood/30 rounded-sm">
                    <ShoppingBag size={48} className="text-noir/10 mx-auto mb-4" />
                    <p className="font-cormorant text-xl text-noir/40 mb-2">No orders yet</p>
                    <p className="font-dm-sans text-noir/30 text-sm mb-6">
                      Begin your journey with a piece from our collection
                    </p>
                    <Link
                      href="/#collections"
                      className="inline-flex items-center gap-2 bg-zari-gold text-noir font-cinzel text-xs tracking-[0.15em] uppercase px-6 py-3 hover:bg-zari-gold-light transition-colors duration-300"
                    >
                      Explore Collections
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Orders would be listed here */}
                    <p className="font-dm-sans text-noir/50 text-sm">
                      You have {user._count.orders} order{user._count.orders !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h3 className="font-cormorant text-2xl text-noir mb-6">My Wishlist</h3>
                {user._count.wishlist === 0 ? (
                  <div className="text-center py-16 bg-white border border-sandalwood/30 rounded-sm">
                    <Bookmark size={48} className="text-noir/10 mx-auto mb-4" />
                    <p className="font-cormorant text-xl text-noir/40 mb-2">Your wishlist is empty</p>
                    <p className="font-dm-sans text-noir/30 text-sm mb-6">
                      Save your favourite pieces to revisit later
                    </p>
                    <Link
                      href="/#collections"
                      className="inline-flex items-center gap-2 bg-zari-gold text-noir font-cinzel text-xs tracking-[0.15em] uppercase px-6 py-3 hover:bg-zari-gold-light transition-colors duration-300"
                    >
                      Discover Pieces
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="font-dm-sans text-noir/50 text-sm">
                      You have {user._count.wishlist} item{user._count.wishlist !== 1 ? 's' : ''} in your wishlist
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'measurements' && (
              <div>
                <h3 className="font-cormorant text-2xl text-noir mb-6">My Measurements</h3>
                {parsedMeasurements ? (
                  <div className="bg-white border border-sandalwood/30 rounded-sm p-6 sm:p-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {Object.entries(parsedMeasurements).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="font-dm-sans text-noir/40 text-[10px] tracking-widest uppercase mb-1">
                            {key}
                          </p>
                          <p className="font-cormorant text-noir text-xl">
                            {value as string}
                            <span className="text-noir/30 text-sm ml-1">in</span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <button className="mt-6 flex items-center gap-2 font-dm-sans text-zari-gold text-xs tracking-widest uppercase hover:text-zari-gold-light transition-colors">
                      <Edit3 size={14} />
                      Update Measurements
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white border border-sandalwood/30 rounded-sm">
                    <Ruler size={48} className="text-noir/10 mx-auto mb-4" />
                    <p className="font-cormorant text-xl text-noir/40 mb-2">No measurements saved</p>
                    <p className="font-dm-sans text-noir/30 text-sm mb-6">
                      Add your measurements for a perfect bespoke fit
                    </p>
                    <button className="inline-flex items-center gap-2 bg-zari-gold text-noir font-cinzel text-xs tracking-[0.15em] uppercase px-6 py-3 hover:bg-zari-gold-light transition-colors duration-300">
                      Add Measurements
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}

                {/* Address Section */}
                <div className="mt-8">
                  <h4 className="font-cormorant text-xl text-noir mb-4">Saved Address</h4>
                  {parsedAddress ? (
                    <div className="bg-white border border-sandalwood/30 rounded-sm p-6">
                      <p className="font-dm-sans text-noir/70 text-sm leading-relaxed">
                        {parsedAddress.street && `${parsedAddress.street}, `}
                        {parsedAddress.city && `${parsedAddress.city}, `}
                        {parsedAddress.state && `${parsedAddress.state} `}
                        {parsedAddress.pincode && `- ${parsedAddress.pincode}`}
                        {parsedAddress.country && `, ${parsedAddress.country}`}
                      </p>
                      <button className="mt-4 flex items-center gap-2 font-dm-sans text-zari-gold text-xs tracking-widest uppercase hover:text-zari-gold-light transition-colors">
                        <Edit3 size={14} />
                        Update Address
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white border border-sandalwood/30 rounded-sm p-8 text-center">
                      <p className="font-dm-sans text-noir/40 text-sm mb-3">No address saved</p>
                      <button className="font-dm-sans text-zari-gold text-xs tracking-widest uppercase hover:text-zari-gold-light transition-colors">
                        + Add Address
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-noir py-6 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-cinzel text-ivory/40 text-xs tracking-[0.2em]">SHRINGARIKA</p>
          <p className="font-dm-sans text-ivory/20 text-[10px] tracking-wider">
            © {new Date().getFullYear()} House of Shringarika. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
