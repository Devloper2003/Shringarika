'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, X, ShieldAlert, Share2, Save,
  Instagram, Facebook, Youtube, Linkedin,
  ExternalLink, Globe, Lightbulb, Eye,
} from 'lucide-react';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username: string | null;
  icon: string | null;
  showInFooter: boolean;
  showInHeader: boolean;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const PLATFORMS = [
  { value: 'instagram', label: 'Instagram', icon: Instagram, color: '#E4405F' },
  { value: 'facebook', label: 'Facebook', icon: Facebook, color: '#1877F2' },
  { value: 'pinterest', label: 'Pinterest', icon: ExternalLink, color: '#BD081C' },
  { value: 'youtube', label: 'YouTube', icon: Youtube, color: '#FF0000' },
  { value: 'twitter', label: 'Twitter / X', icon: ExternalLink, color: '#000000' },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
  { value: 'whatsapp', label: 'WhatsApp', icon: ExternalLink, color: '#25D366' },
];

const emptyForm = {
  platform: 'instagram',
  url: '',
  username: '',
  showInFooter: true,
  showInHeader: false,
  order: 0,
  active: true,
};

export default function AdminSocial() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [showOptimize, setShowOptimize] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('shringarika_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsSuperAdmin(user.role === 'super_admin');
      } catch { /* ignore */ }
    }
  }, []);

  const getToken = () => localStorage.getItem('shringarika_token');

  const fetchLinks = useCallback(async () => {
    try {
      const token = getToken();
      const res = await fetch('/api/admin/social', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setLinks(data.data);
    } catch (error) {
      console.error('Failed to fetch social links:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isSuperAdmin) fetchLinks();
    else setLoading(false);
  }, [isSuperAdmin, fetchLinks]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = getToken();
      const url = editingId
        ? `/api/admin/social/${editingId}`
        : '/api/admin/social';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setMessage(editingId ? 'Social link updated successfully' : 'Social link added successfully');
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        fetchLinks();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Failed to save social link');
      }
    } catch (error) {
      console.error('Failed to save social link:', error);
      setMessage('Failed to save social link');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (link: SocialLink) => {
    setEditingId(link.id);
    setForm({
      platform: link.platform,
      url: link.url,
      username: link.username || '',
      showInFooter: link.showInFooter,
      showInHeader: link.showInHeader,
      order: link.order,
      active: link.active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this social link?')) return;
    setDeletingId(id);
    setMessage('');
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/social/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Social link deleted successfully');
        fetchLinks();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to delete social link:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleActive = async (link: SocialLink) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/social/${link.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ active: !link.active }),
      });
      const data = await res.json();
      if (data.success) fetchLinks();
    } catch (error) {
      console.error('Failed to toggle active:', error);
    }
  };

  const getPlatformInfo = (platform: string) => {
    return PLATFORMS.find(p => p.value === platform) || { value: platform, label: platform, icon: ExternalLink, color: '#666' };
  };

  const usedPlatforms = links.map(l => l.platform);
  const availablePlatforms = PLATFORMS.filter(p => !usedPlatforms.includes(p.value) || editingId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-zari-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShieldAlert size={48} className="text-ruby mb-4" />
        <h2 className="font-cormorant text-2xl text-noir mb-2">Access Denied</h2>
        <p className="font-dm-sans text-sm text-noir/40">Only Super Admins can manage social media links.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Share2 size={28} className="text-zari-gold" />
            <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Social Media</h1>
          </div>
          <p className="font-dm-sans text-noir/40 text-sm ml-10">
            Link and optimize your social media accounts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOptimize(!showOptimize)}
            className="inline-flex items-center gap-2 border border-zari-gold/30 text-zari-gold font-dm-sans text-sm px-4 py-2.5 hover:bg-zari-gold/5 transition-all duration-300"
          >
            <Lightbulb size={16} />
            Optimize
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300"
          >
            <Plus size={16} />
            Add Platform
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-3 border font-dm-sans text-sm ${
          message.includes('success')
            ? 'border-emerald/30 bg-emerald/5 text-emerald'
            : 'border-ruby/30 bg-ruby/5 text-ruby'
        }`}>
          {message}
        </div>
      )}

      {/* Optimize Section */}
      {showOptimize && (
        <div className="mb-6 border border-zari-gold/10 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb size={18} className="text-zari-gold" />
              <h2 className="font-cormorant text-xl text-noir">Social Media Optimization</h2>
            </div>
            <button
              onClick={() => setShowOptimize(false)}
              className="text-noir/40 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Open Graph Preview */}
          <div className="mb-6">
            <h3 className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase mb-3">Open Graph Preview</h3>
            <div className="border border-noir/10 overflow-hidden max-w-md">
              <div className="h-40 bg-blush flex items-center justify-center">
                <Globe size={32} className="text-noir/15" />
              </div>
              <div className="p-3 bg-white">
                <p className="font-dm-sans text-[10px] text-noir/30 uppercase tracking-wider">shringarika.com</p>
                <p className="font-dm-sans text-sm text-noir font-medium">SHRINGARIKA | Luxury Bridal &amp; Couture</p>
                <p className="font-dm-sans text-xs text-noir/40 mt-1">
                  Where heritage meets haute couture — luxury bridal wear, bespoke couture &amp; ready-to-wear collections.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase mb-3">Optimization Tips</h3>
            <div className="space-y-2">
              {[
                'Use high-quality profile images (400x400px minimum for Instagram)',
                'Add Open Graph meta tags for better link previews on social platforms',
                'Keep your bio/description consistent across all platforms',
                'Use branded hashtags consistently (e.g., #ShringarikaBrides)',
                'Cross-promote: Add Instagram feed to your website footer',
                'Enable WhatsApp Business API for customer inquiries',
                'Post regularly on Pinterest — it drives high fashion traffic',
                'Add social sharing buttons to your blog posts',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-ivory/50">
                  <span className="font-dm-sans text-[10px] text-zari-gold mt-0.5">●</span>
                  <span className="font-dm-sans text-sm text-noir/60">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link Preview Testing */}
          <div className="mt-6">
            <h3 className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase mb-3">Link Preview Testing</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter a URL to test preview..."
                className="flex-1 px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              />
              <button className="inline-flex items-center gap-1.5 bg-noir text-ivory font-dm-sans text-xs px-4 py-2 hover:bg-zari-gold hover:text-noir transition-all duration-300">
                <Eye size={13} />
                Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-6 border border-zari-gold/10 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-xl text-noir">
              {editingId ? 'Edit Social Link' : 'Add Social Platform'}
            </h2>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}
              className="text-noir/40 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Platform</label>
              <select
                value={form.platform}
                onChange={(e) => setForm((prev) => ({ ...prev, platform: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 bg-white"
                disabled={!!editingId}
              >
                {availablePlatforms.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">URL</label>
              <input
                type="text"
                value={form.url}
                onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="https://instagram.com/shringarika"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="@shringarika"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((prev) => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                min={0}
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Show in Footer</label>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, showInFooter: !prev.showInFooter }))}
                className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-all duration-300 ${
                  form.showInFooter
                    ? 'bg-zari-gold shadow-sm shadow-zari-gold/20'
                    : 'bg-noir/15 hover:bg-noir/25'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full transition-all duration-300 ${
                    form.showInFooter
                      ? 'translate-x-[22px] bg-white shadow-sm'
                      : 'translate-x-[3px] bg-noir/40'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Show in Header</label>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, showInHeader: !prev.showInHeader }))}
                className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-all duration-300 ${
                  form.showInHeader
                    ? 'bg-zari-gold shadow-sm shadow-zari-gold/20'
                    : 'bg-noir/15 hover:bg-noir/25'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full transition-all duration-300 ${
                    form.showInHeader
                      ? 'translate-x-[22px] bg-white shadow-sm'
                      : 'translate-x-[3px] bg-noir/40'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Active</label>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, active: !prev.active }))}
                className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-all duration-300 ${
                  form.active
                    ? 'bg-emerald shadow-sm shadow-emerald/20'
                    : 'bg-noir/15 hover:bg-noir/25'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full transition-all duration-300 ${
                    form.active
                      ? 'translate-x-[22px] bg-white shadow-sm'
                      : 'translate-x-[3px] bg-noir/40'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving || !form.url}
              className="bg-noir text-ivory font-dm-sans text-sm px-6 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update Link' : 'Add Platform'}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}
              className="border border-noir/20 text-noir font-dm-sans text-sm px-6 py-2.5 hover:bg-noir/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Social Links List */}
      {links.length === 0 ? (
        <div className="text-center py-16 border border-zari-gold/10 bg-white">
          <Share2 size={40} className="text-noir/15 mx-auto mb-4" />
          <h3 className="font-cormorant text-xl text-noir/40 mb-2">No Social Links</h3>
          <p className="font-dm-sans text-sm text-noir/25">Add your first social media platform to get started.</p>
        </div>
      ) : (
        <div className="border border-zari-gold/10 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-noir/5">
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Platform</th>
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">URL</th>
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Username</th>
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Display</th>
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Status</th>
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => {
                const platformInfo = getPlatformInfo(link.platform);
                const PlatformIcon = platformInfo.icon;
                return (
                  <tr key={link.id} className="border-b border-noir/5 hover:bg-noir/[0.02] transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${platformInfo.color}15` }}
                        >
                          <PlatformIcon size={14} style={{ color: platformInfo.color }} />
                        </div>
                        <span className="font-dm-sans text-sm text-noir font-medium capitalize">
                          {platformInfo.label}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-dm-sans text-xs text-zari-gold hover:text-zari-gold/70 transition-colors truncate block max-w-[200px]"
                      >
                        {link.url}
                      </a>
                    </td>
                    <td className="p-3 font-dm-sans text-xs text-noir/50">
                      {link.username || '—'}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1.5">
                        {link.showInFooter && (
                          <span className="font-dm-sans text-[9px] tracking-wider uppercase px-1.5 py-0.5 bg-noir/5 text-noir/40">
                            Footer
                          </span>
                        )}
                        {link.showInHeader && (
                          <span className="font-dm-sans text-[9px] tracking-wider uppercase px-1.5 py-0.5 bg-zari-gold/10 text-zari-gold">
                            Header
                          </span>
                        )}
                        {!link.showInFooter && !link.showInHeader && (
                          <span className="font-dm-sans text-[9px] text-noir/20">Hidden</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleActive(link)}
                        className={`font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 cursor-pointer ${
                          link.active ? 'bg-emerald/10 text-emerald' : 'bg-noir/10 text-noir/40'
                        }`}
                      >
                        {link.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(link)}
                          className="p-1.5 hover:bg-noir/5 transition-colors"
                          title="Edit"
                        >
                          <Save size={14} className="text-noir/40" />
                        </button>
                        <button
                          onClick={() => handleDelete(link.id)}
                          disabled={deletingId === link.id}
                          className="p-1.5 hover:bg-ruby/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} className="text-ruby" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
