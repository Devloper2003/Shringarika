'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, X, Star } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string | null;
  category: string | null;
  imageUrl: string;
  collection: string | null;
  featured: boolean;
  active: boolean;
  createdAt: string;
}

const CATEGORIES = ['bridal', 'festive', 'western', 'atelier', 'campaign'];

const emptyForm = {
  title: '',
  category: 'bridal',
  imageUrl: '',
  featured: false,
};

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getToken = () => localStorage.getItem('shringarika_token');

  const fetchImages = useCallback(async () => {
    try {
      const token = getToken();
      const params = new URLSearchParams();
      if (categoryFilter !== 'all') params.set('category', categoryFilter);

      const res = await fetch(`/api/admin/gallery?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setImages(data.images);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = getToken();
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        setForm(emptyForm);
        fetchImages();
      }
    } catch (error) {
      console.error('Failed to save image:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    setDeletingId(id);
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) fetchImages();
    } catch (error) {
      console.error('Failed to delete image:', error);
    } finally {
      setDeletingId(null);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Gallery</h1>
          <p className="font-dm-sans text-noir/40 text-sm mt-1">{images.length} images total</p>
        </div>
        <button
          onClick={() => {
            setForm(emptyForm);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 w-fit"
        >
          <Plus size={16} />
          Add Image
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 transition-colors"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="mb-6 border border-zari-gold/10 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-playfair text-xl text-noir">Add Gallery Image</h2>
            <button
              onClick={() => {
                setShowForm(false);
                setForm(emptyForm);
              }}
              className="text-noir/40 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
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
            <div className="flex items-center gap-2">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Featured</label>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, featured: !prev.featured }))}
                className={`w-10 h-5 rounded-full transition-colors relative ${form.featured ? 'bg-zari-gold' : 'bg-noir/20'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              disabled={saving || !form.imageUrl}
              className="bg-noir text-ivory font-dm-sans text-sm px-6 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Add Image'}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setForm(emptyForm);
              }}
              className="border border-noir/20 text-noir font-dm-sans text-sm px-6 py-2.5 hover:bg-noir/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="text-center py-16 border border-zari-gold/10">
          <p className="font-dm-sans text-sm text-noir/30">No gallery images found. Add your first image!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative border border-zari-gold/10 bg-white overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-[3/4] bg-blush relative overflow-hidden">
                <img
                  src={img.imageUrl}
                  alt={img.title || 'Gallery image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="260" fill="%23F5E6E0"%3E%3Crect width="200" height="260"/%3E%3Ctext x="100" y="130" text-anchor="middle" fill="%23C9A84C" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/30 transition-colors duration-300" />
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(img.id)}
                  disabled={deletingId === img.id}
                  className="absolute top-2 right-2 p-1.5 bg-ivory/90 hover:bg-ruby/10 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete"
                >
                  <Trash2 size={14} className="text-ruby" />
                </button>
                {/* Featured badge */}
                {img.featured && (
                  <div className="absolute top-2 left-2">
                    <Star size={16} className="text-zari-gold fill-zari-gold" />
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-3">
                <p className="font-dm-sans text-sm text-noir truncate">{img.title || 'Untitled'}</p>
                <p className="font-dm-sans text-[10px] text-noir/40 tracking-wider uppercase mt-0.5">
                  {img.category || '—'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
