'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('shringarika_token', data.token);
        localStorage.setItem('shringarika_user', JSON.stringify(data.user));
        // Redirect admins to admin panel, regular users to account
        if (data.user.role === 'admin' || data.user.role === 'super_admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/account';
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-noir flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-64 h-64 border border-ivory rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-ivory rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-ivory rounded-full" />
      </div>

      {/* Gold shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zari-gold/40 to-transparent" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block">
            <h1 className="font-cinzel text-ivory text-2xl sm:text-3xl tracking-[0.2em] mb-2">
              SHRINGARIKA
            </h1>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-zari-gold to-transparent mx-auto" />
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-noir-soft/50 backdrop-blur-sm border border-ivory/10 rounded-sm p-8 sm:p-10">
          <h2 className="font-cormorant text-3xl sm:text-4xl text-ivory text-center mb-2">
            Welcome Back
          </h2>
          <p className="font-dm-sans text-ivory/40 text-sm text-center mb-8 tracking-wide">
            Sign in to your account
          </p>

          {error && (
            <div className="mb-6 p-3 border border-ruby/30 bg-ruby/10 rounded-sm">
              <p className="font-dm-sans text-ruby text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="group">
              <label className="font-dm-sans text-ivory/50 text-xs tracking-widest uppercase block mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-ivory/20 text-ivory font-dm-sans text-sm py-3 px-0 focus:outline-none focus:border-zari-gold transition-colors duration-500 placeholder:text-ivory/20"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="font-dm-sans text-ivory/50 text-xs tracking-widest uppercase block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-ivory/20 text-ivory font-dm-sans text-sm py-3 pr-10 px-0 focus:outline-none focus:border-zari-gold transition-colors duration-500 placeholder:text-ivory/20"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-ivory/30 hover:text-ivory/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zari-gold text-noir font-cinzel text-sm tracking-[0.15em] uppercase py-4 mt-4 hover:bg-zari-gold-light transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed btn-luxury-glow relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[1px] bg-ivory/10" />
            <span className="font-dm-sans text-ivory/20 text-xs tracking-wider">OR</span>
            <div className="flex-1 h-[1px] bg-ivory/10" />
          </div>

          {/* Register Link */}
          <p className="font-dm-sans text-ivory/40 text-sm text-center">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/register"
              className="text-zari-gold hover:text-zari-gold-light transition-colors duration-300 underline underline-offset-4 decoration-zari-gold/30"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="font-dm-sans text-ivory/30 text-xs tracking-wider hover:text-ivory/50 transition-colors duration-300"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>

      {/* Bottom shimmer line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zari-gold/40 to-transparent" />
    </div>
  );
}
