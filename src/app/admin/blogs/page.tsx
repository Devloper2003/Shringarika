'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Search, Check, X, Eye } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  author: string;
  metaTitle: string | null;
  metaDesc: string | null;
  tags: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = [
  'bridal-style', 'lehenga-saree', 'wedding-trends', 'styling-tips',
  'behind-craft', 'jaipur-fashion', 'celebrity', 'how-to-choose',
];

const emptyForm = {
  title: '',
  slug: '',
  category: 'bridal-style',
  excerpt: '',
  content: '',
  featuredImage: '',
  metaTitle: '',
  metaDesc: '',
  tags: '',
  published: false,
};

export default function AdminBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getToken = () => localStorage.getItem('shringarika_token');

  const fetchPosts = useCallback(async () => {
    try {
      const token = getToken();
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (categoryFilter !== 'all') params.set('category', categoryFilter);

      const res = await fetch(`/api/admin/blogs?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setPosts(data.posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({ ...prev, title, slug: generateSlug(title) }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = getToken();
      const url = editingId
        ? `/api/admin/blogs/${editingId}`
        : '/api/admin/blogs';
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
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to save post:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt || '',
      content: post.content,
      featuredImage: post.featuredImage || '',
      metaTitle: post.metaTitle || '',
      metaDesc: post.metaDesc || '',
      tags: post.tags || '',
      published: post.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setDeletingId(id);
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) fetchPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/blogs/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ published: !post.published }),
      });
      const data = await res.json();
      if (data.success) fetchPosts();
    } catch (error) {
      console.error('Failed to toggle publish:', error);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Blog Posts</h1>
          <p className="font-dm-sans text-noir/40 text-sm mt-1">{posts.length} posts total</p>
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
          New Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/30" />
          <input
            type="text"
            placeholder="Search posts..."
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

      {/* New/Edit Form */}
      {showForm && (
        <div className="mb-6 border border-zari-gold/10 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-xl text-noir">
              {editingId ? 'Edit Post' : 'New Blog Post'}
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
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="Post title"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="post-url-slug"
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
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 resize-y"
                placeholder="Brief excerpt..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Content (Markdown)</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                rows={10}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 resize-y"
                placeholder="Write your blog content here..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Featured Image URL</label>
              <input
                type="text"
                value={form.featuredImage}
                onChange={(e) => setForm((prev) => ({ ...prev, featuredImage: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Meta Title</label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => setForm((prev) => ({ ...prev, metaTitle: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="SEO title"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Meta Description</label>
              <input
                type="text"
                value={form.metaDesc}
                onChange={(e) => setForm((prev) => ({ ...prev, metaDesc: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="SEO description"
              />
            </div>
            <div>
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="bridal, lehenga, wedding"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Published</label>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, published: !prev.published }))}
                className={`w-10 h-5 rounded-full transition-colors relative ${form.published ? 'bg-emerald' : 'bg-noir/20'}`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`}
                />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving || !form.title || !form.content}
              className="bg-noir text-ivory font-dm-sans text-sm px-6 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
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

      {/* Posts Table */}
      <div className="border border-zari-gold/10 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-noir/5">
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Title</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Category</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Status</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Date</th>
              <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center font-dm-sans text-sm text-noir/30">
                  No blog posts found. Create your first post!
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-noir/5 hover:bg-noir/[0.02] transition-colors">
                  <td className="p-3">
                    <p className="font-dm-sans text-sm text-noir font-medium">{post.title}</p>
                    <p className="font-dm-sans text-[11px] text-noir/30 mt-0.5">{post.slug}</p>
                  </td>
                  <td className="p-3 font-dm-sans text-xs text-noir/50 capitalize">
                    {post.category.replace(/-/g, ' ')}
                  </td>
                  <td className="p-3">
                    <span className={`inline-block font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 ${post.published ? 'bg-emerald/10 text-emerald' : 'bg-noir/10 text-noir/40'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-3 font-dm-sans text-xs text-noir/40">{formatDate(post.createdAt)}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className="p-1.5 hover:bg-noir/5 transition-colors"
                        title={post.published ? 'Unpublish' : 'Publish'}
                      >
                        {post.published ? <Eye size={15} className="text-emerald" /> : <Eye size={15} className="text-noir/30" />}
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-1.5 hover:bg-noir/5 transition-colors"
                        title="Edit"
                      >
                        <Edit size={15} className="text-noir/50" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
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
