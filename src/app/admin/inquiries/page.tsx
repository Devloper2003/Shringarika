'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Trash2, Eye, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  occasion: string | null;
  message: string;
  type: string;
  source: string | null;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = ['new', 'contacted', 'converted', 'archived'];
const TYPE_OPTIONS = ['all', 'general', 'bespoke', 'appointment', 'product'];

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewModal, setViewModal] = useState<Inquiry | null>(null);

  const getToken = () => localStorage.getItem('shringarika_token');

  const fetchInquiries = useCallback(async () => {
    try {
      const token = getToken();
      const params = new URLSearchParams();
      if (typeFilter !== 'all') params.set('type', typeFilter);
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await fetch(`/api/admin/inquiries?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setInquiries(data.inquiries);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  }, [typeFilter, statusFilter]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) fetchInquiries();
    } catch (error) {
      console.error('Failed to update inquiry:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    setDeletingId(id);
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) fetchInquiries();
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-zari-gold/10 text-zari-gold';
      case 'contacted': return 'bg-emerald/10 text-emerald';
      case 'converted': return 'bg-rose-gold/10 text-rose-gold';
      case 'archived': return 'bg-noir/10 text-noir/40';
      default: return 'bg-noir/10 text-noir/40';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
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
      <div className="mb-6">
        <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Inquiries</h1>
        <p className="font-dm-sans text-noir/40 text-sm mt-1">{inquiries.length} inquiries total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 transition-colors"
        >
          {TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>{t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 transition-colors"
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Inquiries Table */}
      <div className="border border-zari-gold/10 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-noir/5">
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Name</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3 hidden sm:table-cell">Phone</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3 hidden md:table-cell">Email</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Type</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3 hidden lg:table-cell">Occasion</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Status</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3 hidden sm:table-cell">Date</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center font-dm-sans text-sm text-noir/30">
                  No inquiries found
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq.id} className="border-b border-noir/5 hover:bg-noir/[0.02] transition-colors">
                  <td className="p-3">
                    <p className="font-dm-sans text-sm text-noir">{inq.name}</p>
                  </td>
                  <td className="p-3 font-dm-sans text-xs text-noir/50 hidden sm:table-cell">{inq.phone || '—'}</td>
                  <td className="p-3 font-dm-sans text-xs text-noir/50 hidden md:table-cell">{inq.email || '—'}</td>
                  <td className="p-3 font-dm-sans text-xs text-noir/50 capitalize">{inq.type}</td>
                  <td className="p-3 font-dm-sans text-xs text-noir/50 capitalize hidden lg:table-cell">{inq.occasion || '—'}</td>
                  <td className="p-3">
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      className={`font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 border-0 cursor-pointer ${statusColor(inq.status)}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 font-dm-sans text-xs text-noir/40 hidden sm:table-cell">{formatDate(inq.createdAt)}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setViewModal(inq)}
                        className="p-1.5 hover:bg-noir/5 transition-colors"
                        title="View message"
                      >
                        <Eye size={15} className="text-noir/50" />
                      </button>
                      <button
                        onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
                        className="p-1.5 hover:bg-noir/5 transition-colors sm:hidden"
                        title="Toggle details"
                      >
                        {expandedId === inq.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        disabled={deletingId === inq.id}
                        className="p-1.5 hover:bg-ruby/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} className="text-ruby" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Message Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-noir/50 z-50 flex items-center justify-center p-4" onClick={() => setViewModal(null)}>
          <div className="bg-ivory w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair text-xl text-noir">Inquiry Details</h3>
              <button onClick={() => setViewModal(null)} className="text-noir/40 hover:text-noir">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Name</span>
                <p className="font-dm-sans text-sm text-noir">{viewModal.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Phone</span>
                  <p className="font-dm-sans text-sm text-noir">{viewModal.phone || '—'}</p>
                </div>
                <div>
                  <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Email</span>
                  <p className="font-dm-sans text-sm text-noir">{viewModal.email || '—'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Type</span>
                  <p className="font-dm-sans text-sm text-noir capitalize">{viewModal.type}</p>
                </div>
                <div>
                  <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Occasion</span>
                  <p className="font-dm-sans text-sm text-noir capitalize">{viewModal.occasion || '—'}</p>
                </div>
              </div>
              <div>
                <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Source</span>
                <p className="font-dm-sans text-sm text-noir capitalize">{viewModal.source || '—'}</p>
              </div>
              <div>
                <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Message</span>
                <p className="font-dm-sans text-sm text-noir whitespace-pre-wrap mt-1 p-3 bg-white border border-noir/5">
                  {viewModal.message}
                </p>
              </div>
              <div>
                <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Received</span>
                <p className="font-dm-sans text-sm text-noir">{formatDate(viewModal.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
