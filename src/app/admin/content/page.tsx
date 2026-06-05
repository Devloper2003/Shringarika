'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Edit, Trash2, X, ShieldAlert, LayoutTemplate,
  ChevronDown, Eye, EyeOff, Image as ImageIcon,
} from 'lucide-react';

interface PageContentItem {
  id: string;
  page: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  imageUrl: string | null;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const PAGES = ['home', 'about', 'collections', 'bespoke', 'lookbook', 'blog', 'contact'];
const SECTIONS: Record<string, string[]> = {
  home: ['hero', 'brand_story', 'collections_preview', 'bespoke_cta', 'lookbook_preview', 'testimonials', 'instagram', 'cta'],
  about: ['hero', 'story', 'values', 'craftsmanship', 'team'],
  collections: ['hero', 'featured', 'categories', 'cta'],
  bespoke: ['hero', 'process', 'fabrics', 'testimonials', 'cta'],
  lookbook: ['hero', 'gallery', 'seasons'],
  blog: ['hero', 'featured_posts'],
  contact: ['hero', 'info', 'map', 'hours'],
};

const emptyForm = {
  page: 'home',
  section: '',
  title: '',
  subtitle: '',
  content: '',
  imageUrl: '',
  order: 0,
  active: true,
};

export default function AdminContent() {
  const [contents, setContents] = useState<PageContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

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

  const fetchContents = useCallback(async () => {
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/content?page=${activePage}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setContents(data.data);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  }, [activePage]);

  useEffect(() => {
    if (isSuperAdmin) fetchContents();
    else setLoading(false);
  }, [isSuperAdmin, fetchContents]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = getToken();
      const url = editingId
        ? `/api/admin/content/${editingId}`
        : '/api/admin/content';
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
        setMessage(editingId ? 'Content updated successfully' : 'Content created successfully');
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        fetchContents();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Failed to save content');
      }
    } catch (error) {
      console.error('Failed to save content:', error);
      setMessage('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: PageContentItem) => {
    setEditingId(item.id);
    setForm({
      page: item.page,
      section: item.section,
      title: item.title || '',
      subtitle: item.subtitle || '',
      content: item.content || '',
      imageUrl: item.imageUrl || '',
      order: item.order,
      active: item.active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content section?')) return;
    setDeletingId(id);
    setMessage('');
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/content/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Content deleted successfully');
        fetchContents();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Failed to delete content');
      }
    } catch (error) {
      console.error('Failed to delete content:', error);
      setMessage('Failed to delete content');
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleActive = async (item: PageContentItem) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/content/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ active: !item.active }),
      });
      const data = await res.json();
      if (data.success) fetchContents();
    } catch (error) {
      console.error('Failed to toggle active:', error);
    }
  };

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
        <p className="font-dm-sans text-sm text-noir/40">Only Super Admins can manage page content.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <LayoutTemplate size={28} className="text-zari-gold" />
            <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Content Management</h1>
          </div>
          <p className="font-dm-sans text-noir/40 text-sm ml-10">
            Manage all page content sections across your website
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setForm({ ...emptyForm, page: activePage });
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 w-fit"
        >
          <Plus size={16} />
          Add Section
        </button>
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

      {/* Page Tabs */}
      <div className="flex gap-1 mb-6 border-b border-noir/10 overflow-x-auto">
        {PAGES.map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`px-4 py-2.5 font-dm-sans text-sm tracking-wider uppercase whitespace-nowrap transition-all duration-300 border-b-2 ${
              activePage === page
                ? 'text-zari-gold border-zari-gold'
                : 'text-noir/40 border-transparent hover:text-noir/60'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-6 border border-zari-gold/10 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-xl text-noir">
              {editingId ? 'Edit Content Section' : 'Add Content Section'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="text-noir/40 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Page</label>
              <select
                value={form.page}
                onChange={(e) => setForm((prev) => ({ ...prev, page: e.target.value, section: '' }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 bg-white"
              >
                {PAGES.map((p) => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Section</label>
              <div className="relative">
                <select
                  value={form.section}
                  onChange={(e) => setForm((prev) => ({ ...prev, section: e.target.value }))}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 appearance-none bg-white"
                >
                  <option value="">Select section...</option>
                  {(SECTIONS[form.page] || []).map((s) => (
                    <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-noir/30 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Subtitle</label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => setForm((prev) => ({ ...prev, subtitle: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="Section subtitle"
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                rows={6}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 resize-y"
                placeholder="Section content (supports JSON for complex data)..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Image URL</label>
              <input
                type="text"
                value={form.imageUrl}
                onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="https://..."
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
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Active</label>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, active: !prev.active }))}
                className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-all duration-300 ${
                  form.active
                    ? 'bg-zari-gold shadow-sm shadow-zari-gold/20'
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
              disabled={saving || !form.section}
              className="bg-noir text-ivory font-dm-sans text-sm px-6 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update Section' : 'Create Section'}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="border border-noir/20 text-noir font-dm-sans text-sm px-6 py-2.5 hover:bg-noir/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Content List */}
      {contents.length === 0 ? (
        <div className="text-center py-16 border border-zari-gold/10 bg-white">
          <LayoutTemplate size={40} className="text-noir/15 mx-auto mb-4" />
          <h3 className="font-cormorant text-xl text-noir/40 mb-2">No Content Sections</h3>
          <p className="font-dm-sans text-sm text-noir/25">
            No content found for the <span className="capitalize">{activePage}</span> page. Click &quot;Add Section&quot; to create one.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {contents.map((item) => (
            <div
              key={item.id}
              className="border border-zari-gold/10 bg-white p-4 sm:p-5 group hover:border-zari-gold/20 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Image Thumbnail */}
                {item.imageUrl ? (
                  <div className="w-16 h-16 flex-shrink-0 bg-blush overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title || 'Content image'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 flex-shrink-0 bg-noir/5 flex items-center justify-center">
                    <ImageIcon size={20} className="text-noir/20" />
                  </div>
                )}

                {/* Content Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-dm-sans text-sm text-noir font-medium truncate">
                          {item.title || 'Untitled Section'}
                        </h3>
                        <span className="font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 bg-zari-gold/10 text-zari-gold flex-shrink-0">
                          {item.section.replace(/_/g, ' ')}
                        </span>
                        {!item.active && (
                          <span className="font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 bg-noir/10 text-noir/40 flex-shrink-0">
                            Inactive
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="font-dm-sans text-xs text-noir/40 mb-1">{item.subtitle}</p>
                      )}
                      {item.content && (
                        <p className="font-dm-sans text-xs text-noir/30 line-clamp-2 max-w-lg">
                          {item.content.substring(0, 150)}{item.content.length > 150 ? '...' : ''}
                        </p>
                      )}
                    </div>
                    <span className="font-dm-sans text-[10px] text-noir/20 flex-shrink-0">
                      Order: {item.order}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleToggleActive(item)}
                    className="p-1.5 hover:bg-noir/5 transition-colors"
                    title={item.active ? 'Deactivate' : 'Activate'}
                  >
                    {item.active
                      ? <Eye size={15} className="text-emerald" />
                      : <EyeOff size={15} className="text-noir/30" />
                    }
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 hover:bg-noir/5 transition-colors"
                    title="Edit"
                  >
                    <Edit size={15} className="text-noir/50" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="p-1.5 hover:bg-ruby/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={15} className="text-ruby" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
