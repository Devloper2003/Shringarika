'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Search, X, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  price: number | null;
  priceType: string;
  images: string;
  fabric: string | null;
  craftsmanship: string | null;
  care: string | null;
  sizes: string | null;
  customization: string | null;
  deliveryDays: number | null;
  featured: boolean;
  active: boolean;
  createdAt: string;
}

const CATEGORIES = [
  'bridal-lehenga', 'designer-saree', 'festive', 'western-fusion', 'ready-to-wear', 'bespoke',
];

const emptyForm = {
  name: '',
  slug: '',
  description: '',
  category: 'bridal-lehenga',
  price: '',
  priceType: 'show',
  images: '',
  fabric: '',
  craftsmanship: '',
  care: '',
  sizes: '',
  customization: '',
  deliveryDays: '',
  featured: false,
  active: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getToken = () => localStorage.getItem('shringarika_token');

  const fetchProducts = useCallback(async () => {
    try {
      const token = getToken();
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (categoryFilter !== 'all') params.set('category', categoryFilter);

      const res = await fetch(`/api/admin/products?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (name: string) => {
    setForm((prev) => ({ ...prev, name, slug: generateSlug(name) }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = getToken();
      const url = editingId
        ? `/api/admin/products/${editingId}`
        : '/api/admin/products';
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
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to save product:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      category: product.category,
      price: product.price?.toString() || '',
      priceType: product.priceType,
      images: product.images,
      fabric: product.fabric || '',
      craftsmanship: product.craftsmanship || '',
      care: product.care || '',
      sizes: product.sizes || '',
      customization: product.customization || '',
      deliveryDays: product.deliveryDays?.toString() || '',
      featured: product.featured,
      active: product.active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setDeletingId(id);
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatPrice = (price: number | null, priceType: string) => {
    if (priceType === 'inquire') return 'Inquire';
    if (priceType === 'range') return `₹${price?.toLocaleString('en-IN')}*`;
    return price ? `₹${price.toLocaleString('en-IN')}` : '—';
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
          <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Products</h1>
          <p className="font-dm-sans text-noir/40 text-sm mt-1">{products.length} products total</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setForm(emptyForm);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 w-fit"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/30" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 transition-colors"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 transition-colors"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat.replace(/-/g, ' ')}</option>
          ))}
        </select>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-6 border border-zari-gold/10 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-xl text-noir">
              {editingId ? 'Edit Product' : 'Add Product'}
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
            <div className="md:col-span-2">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="Product name"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
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
                  <option key={cat} value={cat}>{cat.replace(/-/g, ' ')}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 resize-y"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Price (₹)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="e.g. 150000"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Price Type</label>
              <select
                value={form.priceType}
                onChange={(e) => setForm((prev) => ({ ...prev, priceType: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              >
                <option value="show">Show Price</option>
                <option value="inquire">Inquire</option>
                <option value="range">Price Range</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Image URLs (comma-separated)</label>
              <input
                type="text"
                value={form.images}
                onChange={(e) => setForm((prev) => ({ ...prev, images: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="https://img1.jpg, https://img2.jpg"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Fabric</label>
              <input
                type="text"
                value={form.fabric}
                onChange={(e) => setForm((prev) => ({ ...prev, fabric: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="e.g. Silk, Velvet"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Craftsmanship</label>
              <input
                type="text"
                value={form.craftsmanship}
                onChange={(e) => setForm((prev) => ({ ...prev, craftsmanship: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="e.g. Hand-embroidered"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Care Instructions</label>
              <input
                type="text"
                value={form.care}
                onChange={(e) => setForm((prev) => ({ ...prev, care: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="e.g. Dry clean only"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Sizes (comma-separated)</label>
              <input
                type="text"
                value={form.sizes}
                onChange={(e) => setForm((prev) => ({ ...prev, sizes: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="S, M, L, XL, Custom"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Customization Notes</label>
              <input
                type="text"
                value={form.customization}
                onChange={(e) => setForm((prev) => ({ ...prev, customization: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="Customization options"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Delivery Days</label>
              <input
                type="number"
                value={form.deliveryDays}
                onChange={(e) => setForm((prev) => ({ ...prev, deliveryDays: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="e.g. 30"
              />
            </div>
            <div className="flex items-center gap-6">
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
              <div className="flex items-center gap-2">
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Active</label>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, active: !prev.active }))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${form.active ? 'bg-emerald' : 'bg-noir/20'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving || !form.name || !form.slug}
              className="bg-noir text-ivory font-dm-sans text-sm px-6 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
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

      {/* Products Table */}
      <div className="border border-zari-gold/10 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-noir/5">
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Name</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Category</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Price</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Featured</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Active</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center font-dm-sans text-sm text-noir/30">
                  No products found. Add your first product!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-noir/5 hover:bg-noir/[0.02] transition-colors">
                  <td className="p-3">
                    <p className="font-dm-sans text-sm text-noir font-medium">{product.name}</p>
                    <p className="font-dm-sans text-[11px] text-noir/30 mt-0.5">{product.slug}</p>
                  </td>
                  <td className="p-3 font-dm-sans text-xs text-noir/50 capitalize">
                    {product.category.replace(/-/g, ' ')}
                  </td>
                  <td className="p-3 font-dm-sans text-sm text-noir">
                    {formatPrice(product.price, product.priceType)}
                  </td>
                  <td className="p-3">
                    {product.featured ? (
                      <Star size={16} className="text-zari-gold fill-zari-gold" />
                    ) : (
                      <Star size={16} className="text-noir/15" />
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`inline-block font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 ${product.active ? 'bg-emerald/10 text-emerald' : 'bg-noir/10 text-noir/40'}`}>
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-1.5 hover:bg-noir/5 transition-colors"
                        title="Edit"
                      >
                        <Edit size={15} className="text-noir/50" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
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
    </div>
  );
}
