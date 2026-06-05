'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trash2, Eye, X } from 'lucide-react';

interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  appointmentType: string;
  occasion: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewModal, setViewModal] = useState<Appointment | null>(null);

  const getToken = () => localStorage.getItem('shringarika_token');

  const fetchAppointments = useCallback(async () => {
    try {
      const token = getToken();
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await fetch(`/api/admin/appointments?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setAppointments(data.appointments);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) fetchAppointments();
    } catch (error) {
      console.error('Failed to update appointment:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    setDeletingId(id);
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) fetchAppointments();
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-zari-gold/10 text-zari-gold';
      case 'confirmed': return 'bg-emerald/10 text-emerald';
      case 'completed': return 'bg-rose-gold/10 text-rose-gold';
      case 'cancelled': return 'bg-ruby/10 text-ruby';
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
        <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Appointments</h1>
        <p className="font-dm-sans text-noir/40 text-sm mt-1">{appointments.length} appointments total</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
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

      {/* Appointments Table */}
      <div className="border border-zari-gold/10 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-noir/5">
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Name</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3 hidden sm:table-cell">Phone</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Type</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Date</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3 hidden md:table-cell">Time</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Status</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center font-dm-sans text-sm text-noir/30">
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((apt) => (
                <tr key={apt.id} className="border-b border-noir/5 hover:bg-noir/[0.02] transition-colors">
                  <td className="p-3 font-dm-sans text-sm text-noir">{apt.name}</td>
                  <td className="p-3 font-dm-sans text-xs text-noir/50 hidden sm:table-cell">{apt.phone}</td>
                  <td className="p-3 font-dm-sans text-xs text-noir/50 capitalize">{apt.appointmentType}</td>
                  <td className="p-3 font-dm-sans text-xs text-noir/40">
                    {apt.preferredDate ? formatDate(apt.preferredDate) : '—'}
                  </td>
                  <td className="p-3 font-dm-sans text-xs text-noir/40 hidden md:table-cell">
                    {apt.preferredTime || '—'}
                  </td>
                  <td className="p-3">
                    <select
                      value={apt.status}
                      onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                      className={`font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 border-0 cursor-pointer ${statusColor(apt.status)}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setViewModal(apt)}
                        className="p-1.5 hover:bg-noir/5 transition-colors"
                        title="View details"
                      >
                        <Eye size={15} className="text-noir/50" />
                      </button>
                      <button
                        onClick={() => handleDelete(apt.id)}
                        disabled={deletingId === apt.id}
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

      {/* View Details Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-noir/50 z-50 flex items-center justify-center p-4" onClick={() => setViewModal(null)}>
          <div className="bg-ivory w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair text-xl text-noir">Appointment Details</h3>
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
                  <p className="font-dm-sans text-sm text-noir">{viewModal.phone}</p>
                </div>
                <div>
                  <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Email</span>
                  <p className="font-dm-sans text-sm text-noir">{viewModal.email || '—'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Type</span>
                  <p className="font-dm-sans text-sm text-noir capitalize">{viewModal.appointmentType}</p>
                </div>
                <div>
                  <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Occasion</span>
                  <p className="font-dm-sans text-sm text-noir capitalize">{viewModal.occasion || '—'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Preferred Date</span>
                  <p className="font-dm-sans text-sm text-noir">
                    {viewModal.preferredDate ? formatDate(viewModal.preferredDate) : '—'}
                  </p>
                </div>
                <div>
                  <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Preferred Time</span>
                  <p className="font-dm-sans text-sm text-noir">{viewModal.preferredTime || '—'}</p>
                </div>
              </div>
              {viewModal.message && (
                <div>
                  <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Message</span>
                  <p className="font-dm-sans text-sm text-noir whitespace-pre-wrap mt-1 p-3 bg-white border border-noir/5">
                    {viewModal.message}
                  </p>
                </div>
              )}
              <div>
                <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Status</span>
                <select
                  value={viewModal.status}
                  onChange={(e) => {
                    handleStatusChange(viewModal.id, e.target.value);
                    setViewModal({ ...viewModal, status: e.target.value });
                  }}
                  className={`font-dm-sans text-xs tracking-wider uppercase px-2 py-1 border border-noir/10 mt-1 block ${statusColor(viewModal.status)}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <span className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Submitted</span>
                <p className="font-dm-sans text-sm text-noir">{formatDate(viewModal.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
