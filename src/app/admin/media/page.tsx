'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, X, ShieldAlert, FolderOpen, Search,
  Star, Upload, ChevronDown, Edit, Eye,
} from 'lucide-react';

interface MediaItem {
  id: string;
  title: string | null;
  description: string | null;
  category: string | null;
  imageUrl: string;
  publicId: string | null;
  altText: string | null;
  tags: string | null;
  uploadedBy: string | null;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = ['all', 'hero', 'gallery', 'product', 'blog', 'lookbook', 'campaign', 'banner'];

const emptyForm = {
  title: '',
  description: '',
  category: 'gallery',
  imageUrl: '',
  altText: '',
  tags: '',
  featured: false,
};

const emptyDetail: MediaItem | null = null;

export default function AdminMedia() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<typeof emptyDetail>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);

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

  const fetchMedia = useCallback(async () => {
    try {
      const token = getToken();
      const params = new URLSearchParams();
      if (categoryFilter !== 'all') params.set('category', categoryFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/media?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setMedia(data.data);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, search]);

  useEffect(() => {
    if (isSuperAdmin) fetchMedia();
    else setLoading(false);
  }, [isSuperAdmin, fetchMedia]);

  const handleFileUpload = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) return data.url;
      return null;
    } catch (error) {
      console.error('Failed to upload file:', error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = getToken();
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          imageUrl: form.imageUrl,
          altText: form.altText,
          tags: form.tags,
          featured: form.featured,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Media uploaded successfully');
        setShowUploadForm(false);
        setForm(emptyForm);
        fetchMedia();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Failed to upload media');
      }
    } catch (error) {
      console.error('Failed to save media:', error);
      setMessage('Failed to upload media');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;
    setDeletingId(id);
    setMessage('');
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Media deleted successfully');
        if (selectedMedia?.id === id) setSelectedMedia(null);
        fetchMedia();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to delete media:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFeatured = async (item: MediaItem) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/media/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ featured: !item.featured }),
      });
      const data = await res.json();
      if (data.success) {
        fetchMedia();
        if (selectedMedia?.id === item.id) {
          setSelectedMedia({ ...item, featured: !item.featured });
        }
      }
    } catch (error) {
      console.error('Failed to toggle featured:', error);
    }
  };

  const handleViewDetail = (item: MediaItem) => {
    setSelectedMedia(item);
    setEditForm({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'gallery',
      imageUrl: item.imageUrl,
      altText: item.altText || '',
      tags: item.tags || '',
      featured: item.featured,
    });
  };

  const handleUpdateDetail = async () => {
    if (!selectedMedia) return;
    setSaving(true);
    setMessage('');
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/media/${selectedMedia.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Media updated successfully');
        fetchMedia();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Failed to update media');
      }
    } catch (error) {
      console.error('Failed to update media:', error);
      setMessage('Failed to update media');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
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
        <p className="font-dm-sans text-sm text-noir/40">Only Super Admins can manage the media library.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <FolderOpen size={28} className="text-zari-gold" />
            <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Media Library</h1>
          </div>
          <p className="font-dm-sans text-noir/40 text-sm ml-10">
            Upload and manage photos and content
          </p>
        </div>
        <button
          onClick={() => {
            setForm(emptyForm);
            setShowUploadForm(true);
          }}
          className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 w-fit"
        >
          <Upload size={16} />
          Upload Media
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/30" />
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 transition-colors"
          />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-2 font-dm-sans text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
                categoryFilter === cat
                  ? 'bg-noir text-ivory border-noir'
                  : 'bg-white text-noir/40 border-noir/10 hover:border-noir/20 hover:text-noir/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/60" onClick={() => setShowUploadForm(false)} />
          <div className="relative bg-ivory border border-zari-gold/20 w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowUploadForm(false)}
              className="absolute top-4 right-4 text-noir/30 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-zari-gold/10 flex items-center justify-center">
                <Upload size={18} className="text-zari-gold" />
              </div>
              <div>
                <h3 className="font-cormorant text-xl text-noir">Upload Media</h3>
                <p className="font-dm-sans text-[11px] text-noir/40">Add a new image to the media library</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = await handleFileUpload(file);
                      if (url) {
                        setForm((prev) => ({ ...prev, imageUrl: url }));
                      }
                    }
                  }}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                />
                {uploading && (
                  <p className="font-dm-sans text-xs text-zari-gold mt-1">Uploading file...</p>
                )}
              </div>

              {/* Image URL (manual) */}
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Or Enter Image URL</label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                  placeholder="https://..."
                />
              </div>

              {form.imageUrl && (
                <div className="aspect-video bg-blush overflow-hidden">
                  <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                  placeholder="Image title"
                />
              </div>
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 resize-y"
                  placeholder="Image description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Category</label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 appearance-none bg-white"
                    >
                      {CATEGORIES.filter(c => c !== 'all').map((cat) => (
                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-noir/30 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={form.altText}
                    onChange={(e) => setForm((prev) => ({ ...prev, altText: e.target.value }))}
                    className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                    placeholder="Alternative text"
                  />
                </div>
              </div>
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                  placeholder="bridal, lehenga, campaign"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Featured</label>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, featured: !prev.featured }))}
                  className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-all duration-300 ${
                    form.featured
                      ? 'bg-zari-gold shadow-sm shadow-zari-gold/20'
                      : 'bg-noir/15 hover:bg-noir/25'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full transition-all duration-300 ${
                      form.featured
                        ? 'translate-x-[22px] bg-white shadow-sm'
                        : 'translate-x-[3px] bg-noir/40'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={saving || uploading || !form.imageUrl}
                className="flex-1 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
              >
                {saving || uploading ? 'Uploading...' : 'Upload Media'}
              </button>
              <button
                onClick={() => setShowUploadForm(false)}
                className="px-5 py-2.5 border border-noir/15 font-dm-sans text-sm text-noir/50 hover:text-noir hover:border-noir/30 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Detail/Edit Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/60" onClick={() => setSelectedMedia(null)} />
          <div className="relative bg-ivory border border-zari-gold/20 w-full max-w-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 text-noir/30 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-4">
              <div className="aspect-video bg-blush overflow-hidden mb-4">
                <img src={selectedMedia.imageUrl} alt={selectedMedia.altText || 'Media'} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                />
              </div>
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 appearance-none bg-white"
                >
                  {CATEGORIES.filter(c => c !== 'all').map((cat) => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 resize-y"
                />
              </div>
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Alt Text</label>
                <input
                  type="text"
                  value={editForm.altText}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, altText: e.target.value }))}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                />
              </div>
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Tags</label>
                <input
                  type="text"
                  value={editForm.tags}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Featured</label>
                <button
                  type="button"
                  onClick={() => setEditForm((prev) => ({ ...prev, featured: !prev.featured }))}
                  className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-all duration-300 ${
                    editForm.featured
                      ? 'bg-zari-gold shadow-sm shadow-zari-gold/20'
                      : 'bg-noir/15 hover:bg-noir/25'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full transition-all duration-300 ${
                      editForm.featured
                        ? 'translate-x-[22px] bg-white shadow-sm'
                        : 'translate-x-[3px] bg-noir/40'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleUpdateDetail}
                disabled={saving}
                className="flex-1 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => handleDelete(selectedMedia.id)}
                disabled={deletingId === selectedMedia.id}
                className="inline-flex items-center gap-2 border border-ruby/30 text-ruby font-dm-sans text-sm px-5 py-2.5 hover:bg-ruby/5 transition-all duration-300 disabled:opacity-50"
              >
                <Trash2 size={14} />
                Delete
              </button>
              <button
                onClick={() => setSelectedMedia(null)}
                className="px-5 py-2.5 border border-noir/15 font-dm-sans text-sm text-noir/50 hover:text-noir hover:border-noir/30 transition-all duration-300"
              >
                Close
              </button>
            </div>

            <p className="font-dm-sans text-[10px] text-noir/20 mt-3">
              Uploaded: {formatDate(selectedMedia.createdAt)}
            </p>
          </div>
        </div>
      )}

      {/* Media Grid */}
      {media.length === 0 ? (
        <div className="text-center py-16 border border-zari-gold/10 bg-white">
          <FolderOpen size={40} className="text-noir/15 mx-auto mb-4" />
          <h3 className="font-cormorant text-xl text-noir/40 mb-2">No Media Found</h3>
          <p className="font-dm-sans text-sm text-noir/25">
            {search || categoryFilter !== 'all'
              ? 'No results match your filters'
              : 'Upload your first image to get started'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative border border-zari-gold/10 bg-white overflow-hidden cursor-pointer"
              onClick={() => handleViewDetail(item)}
            >
              <div className="aspect-square bg-blush relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.altText || item.title || 'Media'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="%23F5E6E0"%3E%3Crect width="200" height="200"/%3E%3Ctext x="100" y="100" text-anchor="middle" fill="%23C9A84C" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/30 transition-colors duration-300" />
                {/* Delete button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                  disabled={deletingId === item.id}
                  className="absolute top-2 right-2 p-1.5 bg-ivory/90 hover:bg-ruby/10 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete"
                >
                  <Trash2 size={14} className="text-ruby" />
                </button>
                {/* Featured badge */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleToggleFeatured(item); }}
                  className="absolute top-2 left-2 p-1.5 bg-ivory/90 hover:bg-zari-gold/10 transition-colors opacity-0 group-hover:opacity-100"
                  title={item.featured ? 'Remove featured' : 'Mark as featured'}
                >
                  <Star size={14} className={item.featured ? 'text-zari-gold fill-zari-gold' : 'text-noir/30'} />
                </button>
                {/* Category badge */}
                {item.category && (
                  <div className="absolute bottom-2 left-2">
                    <span className="font-dm-sans text-[9px] tracking-wider uppercase px-1.5 py-0.5 bg-noir/60 text-ivory/80">
                      {item.category}
                    </span>
                  </div>
                )}
                {/* Always show featured star if featured */}
                {item.featured && (
                  <div className="absolute top-2 left-2 group-hover:hidden">
                    <Star size={16} className="text-zari-gold fill-zari-gold" />
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-3">
                <p className="font-dm-sans text-sm text-noir truncate">{item.title || 'Untitled'}</p>
                <p className="font-dm-sans text-[10px] text-noir/30 mt-0.5">{formatDate(item.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
