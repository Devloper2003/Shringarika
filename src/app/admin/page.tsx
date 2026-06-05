'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Calendar, FileText, ShoppingBag, Users, Plus, Eye, ArrowRight } from 'lucide-react';

interface Stats {
  totalInquiries: number;
  pendingAppointments: number;
  publishedPosts: number;
  activeProducts: number;
  totalUsers: number;
}

interface Inquiry {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string;
  type: string;
  status: string;
  createdAt: string;
}

interface Appointment {
  id: string;
  name: string;
  phone: string;
  appointmentType: string;
  preferredDate: string | null;
  preferredTime: string | null;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('shringarika_token');
      const res = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setRecentInquiries(data.recentInquiries);
        setRecentAppointments(data.recentAppointments);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-zari-gold/10 text-zari-gold';
      case 'pending': return 'bg-zari-gold/10 text-zari-gold';
      case 'contacted': return 'bg-emerald/10 text-emerald';
      case 'confirmed': return 'bg-emerald/10 text-emerald';
      case 'converted': return 'bg-rose-gold/10 text-rose-gold';
      case 'completed': return 'bg-emerald/10 text-emerald';
      case 'archived': return 'bg-noir/10 text-noir/40';
      case 'cancelled': return 'bg-ruby/10 text-ruby';
      default: return 'bg-noir/10 text-noir/40';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-zari-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Dashboard</h1>
        <p className="font-dm-sans text-noir/40 text-sm mt-1">Welcome back to House of Shringarika</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <div className="bg-ivory border border-zari-gold/10 p-6 hover:border-zari-gold/20 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <Mail size={20} className="text-rose-gold" />
            <ArrowRight size={14} className="text-noir/20" />
          </div>
          <p className="font-cormorant text-3xl text-noir">{stats?.totalInquiries || 0}</p>
          <p className="font-dm-sans text-[10px] text-noir/40 tracking-[0.2em] uppercase mt-1">
            Total Inquiries
          </p>
        </div>

        <div className="bg-ivory border border-zari-gold/10 p-6 hover:border-zari-gold/20 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <Calendar size={20} className="text-zari-gold" />
            <ArrowRight size={14} className="text-noir/20" />
          </div>
          <p className="font-cormorant text-3xl text-noir">{stats?.pendingAppointments || 0}</p>
          <p className="font-dm-sans text-[10px] text-noir/40 tracking-[0.2em] uppercase mt-1">
            Pending Appointments
          </p>
        </div>

        <div className="bg-ivory border border-zari-gold/10 p-6 hover:border-zari-gold/20 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <FileText size={20} className="text-mauve" />
            <ArrowRight size={14} className="text-noir/20" />
          </div>
          <p className="font-cormorant text-3xl text-noir">{stats?.publishedPosts || 0}</p>
          <p className="font-dm-sans text-[10px] text-noir/40 tracking-[0.2em] uppercase mt-1">
            Published Posts
          </p>
        </div>

        <div className="bg-ivory border border-zari-gold/10 p-6 hover:border-zari-gold/20 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag size={20} className="text-emerald" />
            <ArrowRight size={14} className="text-noir/20" />
          </div>
          <p className="font-cormorant text-3xl text-noir">{stats?.activeProducts || 0}</p>
          <p className="font-dm-sans text-[10px] text-noir/40 tracking-[0.2em] uppercase mt-1">
            Active Products
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300"
        >
          <Plus size={16} />
          New Blog Post
        </Link>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300"
        >
          <Plus size={16} />
          Add Product
        </Link>
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-2 border border-noir/20 text-noir font-dm-sans text-sm px-5 py-2.5 hover:bg-noir/5 transition-all duration-300"
        >
          <Eye size={16} />
          View All Inquiries
        </Link>
      </div>

      {/* Recent Data Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="border border-zari-gold/10">
          <div className="p-4 border-b border-noir/5 flex items-center justify-between">
            <h2 className="font-playfair text-lg text-noir">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="font-dm-sans text-xs text-zari-gold hover:text-zari-gold-light transition-colors">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-noir/5">
                  <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Name</th>
                  <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Type</th>
                  <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Status</th>
                  <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center font-dm-sans text-sm text-noir/30">
                      No inquiries yet
                    </td>
                  </tr>
                ) : (
                  recentInquiries.map((inq) => (
                    <tr key={inq.id} className="border-b border-noir/5 hover:bg-noir/[0.02] transition-colors">
                      <td className="p-3 font-dm-sans text-sm text-noir">{inq.name}</td>
                      <td className="p-3 font-dm-sans text-xs text-noir/50 capitalize">{inq.type}</td>
                      <td className="p-3">
                        <span className={`inline-block font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 ${statusColor(inq.status)}`}>
                          {inq.status}
                        </span>
                      </td>
                      <td className="p-3 font-dm-sans text-xs text-noir/40">{formatDate(inq.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="border border-zari-gold/10">
          <div className="p-4 border-b border-noir/5 flex items-center justify-between">
            <h2 className="font-playfair text-lg text-noir">Recent Appointments</h2>
            <Link href="/admin/appointments" className="font-dm-sans text-xs text-zari-gold hover:text-zari-gold-light transition-colors">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-noir/5">
                  <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Name</th>
                  <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Type</th>
                  <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Date</th>
                  <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center font-dm-sans text-sm text-noir/30">
                      No appointments yet
                    </td>
                  </tr>
                ) : (
                  recentAppointments.map((apt) => (
                    <tr key={apt.id} className="border-b border-noir/5 hover:bg-noir/[0.02] transition-colors">
                      <td className="p-3 font-dm-sans text-sm text-noir">{apt.name}</td>
                      <td className="p-3 font-dm-sans text-xs text-noir/50 capitalize">{apt.appointmentType}</td>
                      <td className="p-3 font-dm-sans text-xs text-noir/40">
                        {apt.preferredDate ? formatDate(apt.preferredDate) : '—'}
                      </td>
                      <td className="p-3">
                        <span className={`inline-block font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 ${statusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Total Users stat at bottom */}
      <div className="mt-6 p-4 border border-zari-gold/10 bg-ivory flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users size={18} className="text-noir/30" />
          <span className="font-dm-sans text-sm text-noir/60">Total Registered Users</span>
        </div>
        <span className="font-cormorant text-2xl text-noir">{stats?.totalUsers || 0}</span>
      </div>
    </div>
  );
}
