'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, X, ShieldAlert, Palette, Check,
  ChevronDown, Edit,
} from 'lucide-react';

interface ThemeConfig {
  id: string;
  name: string;
  label: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  cardColor: string;
  borderColor: string;
  fontFamily: string;
  headingFont: string;
  bodyFont: string;
  customCss: string | null;
  showParticles: boolean;
  showCursorEffect: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const FONT_OPTIONS = [
  'Cormorant Garamond',
  'Playfair Display',
  'DM Sans',
  'Cinzel',
  'Lora',
  'Montserrat',
  'Raleway',
  'EB Garamond',
];

const emptyForm = {
  name: '',
  label: '',
  primaryColor: '#B76E79',
  secondaryColor: '#E8D9C0',
  accentColor: '#B89840',
  backgroundColor: '#F2EDE8',
  textColor: '#1A1A1A',
  cardColor: '#F7F3EF',
  borderColor: '#D4C2A5',
  fontFamily: 'Cormorant Garamond',
  headingFont: 'Playfair Display',
  bodyFont: 'DM Sans',
  customCss: '',
  showParticles: true,
  showCursorEffect: true,
  active: false,
};

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 border border-noir/10 cursor-pointer p-0 bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

export default function AdminTheme() {
  const [themes, setThemes] = useState<ThemeConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activatingId, setActivatingId] = useState<string | null>(null);
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

  const fetchThemes = useCallback(async () => {
    try {
      const token = getToken();
      const res = await fetch('/api/admin/theme', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setThemes(data.data);
    } catch (error) {
      console.error('Failed to fetch themes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isSuperAdmin) fetchThemes();
    else setLoading(false);
  }, [isSuperAdmin, fetchThemes]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = getToken();
      const url = editingId
        ? `/api/admin/theme/${editingId}`
        : '/api/admin/theme';
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
        setMessage(editingId ? 'Theme updated successfully' : 'Theme created successfully');
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        fetchThemes();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Failed to save theme');
      }
    } catch (error) {
      console.error('Failed to save theme:', error);
      setMessage('Failed to save theme');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (theme: ThemeConfig) => {
    setEditingId(theme.id);
    setForm({
      name: theme.name,
      label: theme.label,
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor,
      accentColor: theme.accentColor,
      backgroundColor: theme.backgroundColor,
      textColor: theme.textColor,
      cardColor: theme.cardColor,
      borderColor: theme.borderColor,
      fontFamily: theme.fontFamily,
      headingFont: theme.headingFont,
      bodyFont: theme.bodyFont,
      customCss: theme.customCss || '',
      showParticles: theme.showParticles,
      showCursorEffect: theme.showCursorEffect,
      active: theme.active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this theme?')) return;
    setDeletingId(id);
    setMessage('');
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/theme/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Theme deleted successfully');
        fetchThemes();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Failed to delete theme');
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      console.error('Failed to delete theme:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleActivate = async (id: string) => {
    setActivatingId(id);
    setMessage('');
    try {
      const token = getToken();
      const res = await fetch('/api/admin/theme/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Theme activated successfully');
        fetchThemes();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Failed to activate theme');
      }
    } catch (error) {
      console.error('Failed to activate theme:', error);
      setMessage('Failed to activate theme');
    } finally {
      setActivatingId(null);
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
        <p className="font-dm-sans text-sm text-noir/40">Only Super Admins can manage themes.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Palette size={28} className="text-zari-gold" />
            <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Theme Management</h1>
          </div>
          <p className="font-dm-sans text-noir/40 text-sm ml-10">
            Customize website appearance and create themes
          </p>
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
          Add Theme
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

      {/* Theme Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/60" onClick={() => setShowForm(false)} />
          <div className="relative bg-ivory border border-zari-gold/20 w-full max-w-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-noir/30 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-zari-gold/10 flex items-center justify-center">
                <Palette size={18} className="text-zari-gold" />
              </div>
              <div>
                <h3 className="font-cormorant text-xl text-noir">{editingId ? 'Edit Theme' : 'Create New Theme'}</h3>
                <p className="font-dm-sans text-[11px] text-noir/40">Configure colors, fonts, and effects</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Theme Name (unique)</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                    placeholder="e.g. default, dark-luxe"
                    disabled={!!editingId}
                  />
                </div>
                <div>
                  <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Display Label</label>
                  <input
                    type="text"
                    value={form.label}
                    onChange={(e) => setForm((prev) => ({ ...prev, label: e.target.value }))}
                    className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                    placeholder="e.g. Default Luxury, Dark Luxe"
                  />
                </div>
              </div>

              {/* Colors */}
              <div>
                <h4 className="font-cormorant text-lg text-noir mb-3">Color Palette</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <ColorPicker label="Primary" value={form.primaryColor} onChange={(v) => setForm((prev) => ({ ...prev, primaryColor: v }))} />
                  <ColorPicker label="Secondary" value={form.secondaryColor} onChange={(v) => setForm((prev) => ({ ...prev, secondaryColor: v }))} />
                  <ColorPicker label="Accent" value={form.accentColor} onChange={(v) => setForm((prev) => ({ ...prev, accentColor: v }))} />
                  <ColorPicker label="Background" value={form.backgroundColor} onChange={(v) => setForm((prev) => ({ ...prev, backgroundColor: v }))} />
                  <ColorPicker label="Text" value={form.textColor} onChange={(v) => setForm((prev) => ({ ...prev, textColor: v }))} />
                  <ColorPicker label="Card" value={form.cardColor} onChange={(v) => setForm((prev) => ({ ...prev, cardColor: v }))} />
                  <ColorPicker label="Border" value={form.borderColor} onChange={(v) => setForm((prev) => ({ ...prev, borderColor: v }))} />
                </div>
              </div>

              {/* Live Preview */}
              <div>
                <h4 className="font-cormorant text-lg text-noir mb-3">Live Preview</h4>
                <div
                  className="border overflow-hidden"
                  style={{ borderColor: form.borderColor }}
                >
                  <div
                    className="p-4"
                    style={{ backgroundColor: form.backgroundColor }}
                  >
                    <p className="font-cormorant text-xl mb-1" style={{ color: form.primaryColor }}>
                      Heading Preview
                    </p>
                    <p className="font-dm-sans text-sm mb-2" style={{ color: form.textColor }}>
                      Body text preview with the selected text color.
                    </p>
                    <div
                      className="p-3 inline-block"
                      style={{ backgroundColor: form.cardColor, borderColor: form.borderColor, border: '1px solid' }}
                    >
                      <p className="font-dm-sans text-xs" style={{ color: form.accentColor }}>
                        Accent colored text
                      </p>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span
                        className="inline-block w-6 h-6 rounded-full"
                        style={{ backgroundColor: form.primaryColor }}
                        title="Primary"
                      />
                      <span
                        className="inline-block w-6 h-6 rounded-full"
                        style={{ backgroundColor: form.secondaryColor }}
                        title="Secondary"
                      />
                      <span
                        className="inline-block w-6 h-6 rounded-full"
                        style={{ backgroundColor: form.accentColor }}
                        title="Accent"
                      />
                      <span
                        className="inline-block w-6 h-6 rounded-full"
                        style={{ backgroundColor: form.textColor }}
                        title="Text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fonts */}
              <div>
                <h4 className="font-cormorant text-lg text-noir mb-3">Typography</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Display Font</label>
                    <div className="relative">
                      <select
                        value={form.fontFamily}
                        onChange={(e) => setForm((prev) => ({ ...prev, fontFamily: e.target.value }))}
                        className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 appearance-none bg-white"
                      >
                        {FONT_OPTIONS.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-noir/30 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Heading Font</label>
                    <div className="relative">
                      <select
                        value={form.headingFont}
                        onChange={(e) => setForm((prev) => ({ ...prev, headingFont: e.target.value }))}
                        className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 appearance-none bg-white"
                      >
                        {FONT_OPTIONS.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-noir/30 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Body Font</label>
                    <div className="relative">
                      <select
                        value={form.bodyFont}
                        onChange={(e) => setForm((prev) => ({ ...prev, bodyFont: e.target.value }))}
                        className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 appearance-none bg-white"
                      >
                        {FONT_OPTIONS.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-noir/30 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between py-1">
                  <span className="font-dm-sans text-sm text-noir/70">Show Gold Particles</span>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, showParticles: !prev.showParticles }))}
                    className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-all duration-300 ${
                      form.showParticles
                        ? 'bg-zari-gold shadow-sm shadow-zari-gold/20'
                        : 'bg-noir/15 hover:bg-noir/25'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full transition-all duration-300 ${
                        form.showParticles
                          ? 'translate-x-[22px] bg-white shadow-sm'
                          : 'translate-x-[3px] bg-noir/40'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-dm-sans text-sm text-noir/70">Show Cursor Effects</span>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, showCursorEffect: !prev.showCursorEffect }))}
                    className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-all duration-300 ${
                      form.showCursorEffect
                        ? 'bg-zari-gold shadow-sm shadow-zari-gold/20'
                        : 'bg-noir/15 hover:bg-noir/25'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full transition-all duration-300 ${
                        form.showCursorEffect
                          ? 'translate-x-[22px] bg-white shadow-sm'
                          : 'translate-x-[3px] bg-noir/40'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Custom CSS */}
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Custom CSS</label>
                <textarea
                  value={form.customCss}
                  onChange={(e) => setForm((prev) => ({ ...prev, customCss: e.target.value }))}
                  rows={5}
                  className="w-full px-3 py-2 border border-noir/10 font-mono text-sm focus:outline-none focus:border-zari-gold/50 resize-y"
                  placeholder="/* Your custom CSS here */"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.label}
                className="flex-1 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingId ? 'Update Theme' : 'Create Theme'}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}
                className="px-5 py-2.5 border border-noir/15 font-dm-sans text-sm text-noir/50 hover:text-noir hover:border-noir/30 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Theme Cards */}
      {themes.length === 0 ? (
        <div className="text-center py-16 border border-zari-gold/10 bg-white">
          <Palette size={40} className="text-noir/15 mx-auto mb-4" />
          <h3 className="font-cormorant text-xl text-noir/40 mb-2">No Themes</h3>
          <p className="font-dm-sans text-sm text-noir/25">Create your first theme to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`border bg-white overflow-hidden group transition-colors ${
                theme.active ? 'border-zari-gold/40' : 'border-zari-gold/10 hover:border-zari-gold/20'
              }`}
            >
              {/* Theme Preview */}
              <div
                className="h-28 relative"
                style={{ backgroundColor: theme.backgroundColor }}
              >
                <div className="absolute inset-0 flex items-center justify-center gap-3 p-4">
                  <div className="flex flex-col items-center">
                    <span className="font-cormorant text-lg" style={{ color: theme.primaryColor }}>Aa</span>
                    <span className="font-dm-sans text-[10px]" style={{ color: theme.textColor }}>Heading</span>
                  </div>
                  <div
                    className="w-16 h-12 flex items-center justify-center"
                    style={{ backgroundColor: theme.cardColor, border: `1px solid ${theme.borderColor}` }}
                  >
                    <span className="font-dm-sans text-[9px]" style={{ color: theme.accentColor }}>Card</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primaryColor }} />
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.secondaryColor }} />
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                  </div>
                </div>
                {/* Active badge */}
                {theme.active && (
                  <div className="absolute top-2 right-2">
                    <span className="font-dm-sans text-[9px] tracking-wider uppercase px-2 py-0.5 bg-zari-gold text-noir flex items-center gap-1">
                      <Check size={10} /> Active
                    </span>
                  </div>
                )}
              </div>

              {/* Theme Info */}
              <div className="p-4">
                <h3 className="font-cormorant text-lg text-noir mb-0.5">{theme.label}</h3>
                <p className="font-dm-sans text-[11px] text-noir/30 mb-3">{theme.name}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-dm-sans text-[10px] text-noir/30">{theme.fontFamily.split(' ')[0]}</span>
                  <span className="text-noir/10">|</span>
                  <span className="font-dm-sans text-[10px] text-noir/30">{theme.headingFont.split(' ')[0]}</span>
                  <span className="text-noir/10">|</span>
                  <span className="font-dm-sans text-[10px] text-noir/30">{theme.bodyFont}</span>
                </div>
                <div className="flex items-center gap-2">
                  {!theme.active && (
                    <button
                      onClick={() => handleActivate(theme.id)}
                      disabled={activatingId === theme.id}
                      className="inline-flex items-center gap-1.5 bg-noir text-ivory font-dm-sans text-xs px-3 py-1.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
                    >
                      <Check size={12} />
                      {activatingId === theme.id ? 'Activating...' : 'Activate'}
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(theme)}
                    className="p-1.5 hover:bg-noir/5 transition-colors"
                    title="Edit"
                  >
                    <Edit size={14} className="text-noir/40" />
                  </button>
                  {!theme.active && (
                    <button
                      onClick={() => handleDelete(theme.id)}
                      disabled={deletingId === theme.id}
                      className="p-1.5 hover:bg-ruby/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} className="text-ruby" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
