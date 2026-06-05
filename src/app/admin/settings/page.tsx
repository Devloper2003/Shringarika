'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, Save } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('shringarika_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsSuperAdmin(user.role === 'super_admin');
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    if (isSuperAdmin) fetchSettings();
    else setLoading(false);
  }, [isSuperAdmin]);

  const getToken = () => localStorage.getItem('shringarika_token');

  const fetchSettings = async () => {
    try {
      const token = getToken();
      const res = await fetch('/api/admin/settings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = getToken();
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ settings }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Settings saved successfully');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      setMessage('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
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
        <p className="font-dm-sans text-sm text-noir/40">
          Only Super Admins can manage site settings.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Settings</h1>
          <p className="font-dm-sans text-noir/40 text-sm mt-1">Manage site configuration</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50 w-fit"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`mb-6 p-3 border font-dm-sans text-sm ${
          message.includes('success')
            ? 'border-emerald/30 bg-emerald/5 text-emerald'
            : 'border-ruby/30 bg-ruby/5 text-ruby'
        }`}>
          {message}
        </div>
      )}

      {/* General Settings */}
      <div className="mb-8 border border-zari-gold/10 bg-white p-6">
        <h2 className="font-playfair text-xl text-noir mb-4">General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Site Name</label>
            <input
              type="text"
              value={settings.site_name || ''}
              onChange={(e) => updateSetting('site_name', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="House of Shringarika"
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Tagline</label>
            <input
              type="text"
              value={settings.tagline || ''}
              onChange={(e) => updateSetting('tagline', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="Draped in Dreams. Crafted for You."
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Phone</label>
            <input
              type="text"
              value={settings.phone || ''}
              onChange={(e) => updateSetting('phone', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="+91 9876543210"
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Email</label>
            <input
              type="text"
              value={settings.email || ''}
              onChange={(e) => updateSetting('email', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="hello@shringarika.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Address</label>
            <input
              type="text"
              value={settings.address || ''}
              onChange={(e) => updateSetting('address', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="Jaipur, Rajasthan, India"
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Instagram URL</label>
            <input
              type="text"
              value={settings.instagram_url || ''}
              onChange={(e) => updateSetting('instagram_url', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="https://instagram.com/shringarika"
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">WhatsApp Number</label>
            <input
              type="text"
              value={settings.whatsapp_number || ''}
              onChange={(e) => updateSetting('whatsapp_number', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="+91 9876543210"
            />
          </div>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="mb-8 border border-zari-gold/10 bg-white p-6">
        <h2 className="font-playfair text-xl text-noir mb-4">SEO Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Default Meta Title</label>
            <input
              type="text"
              value={settings.meta_title || ''}
              onChange={(e) => updateSetting('meta_title', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="SHRINGARIKA | Luxury Bridal & Couture"
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Google Analytics ID</label>
            <input
              type="text"
              value={settings.google_analytics_id || ''}
              onChange={(e) => updateSetting('google_analytics_id', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="G-XXXXXXXXXX"
            />
          </div>
          <div className="md:col-span-2">
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Default Meta Description</label>
            <textarea
              value={settings.meta_description || ''}
              onChange={(e) => updateSetting('meta_description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 resize-y"
              placeholder="Luxury bridal wear, bespoke couture & ready-to-wear collections..."
            />
          </div>
        </div>
      </div>

      {/* Store Settings */}
      <div className="mb-8 border border-zari-gold/10 bg-white p-6">
        <h2 className="font-playfair text-xl text-noir mb-4">Store Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Currency</label>
            <input
              type="text"
              value={settings.currency || ''}
              onChange={(e) => updateSetting('currency', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="INR"
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">COD Available</label>
            <select
              value={settings.cod_available || 'true'}
              onChange={(e) => updateSetting('cod_available', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Return Policy</label>
            <textarea
              value={settings.return_policy || ''}
              onChange={(e) => updateSetting('return_policy', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 resize-y"
              placeholder="Return and exchange policy text..."
            />
          </div>
        </div>
      </div>

      {/* Save Button at Bottom */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-sm px-8 py-3 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>
    </div>
  );
}
