'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, Save, KeyRound, Eye, EyeOff, Palette, Globe, MessageCircle, Type } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [message, setMessage] = useState('');

  // Password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('shringarika_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsSuperAdmin(user.role === 'super_admin');
      } catch { /* ignore */ }
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

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMessage('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage('New password must be at least 6 characters');
      return;
    }
    setChangingPassword(true);
    setPasswordMessage('');
    try {
      const token = getToken();
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setPasswordMessage('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordMessage(''), 3000);
      } else {
        setPasswordMessage(data.message || 'Failed to change password');
      }
    } catch {
      setPasswordMessage('Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const toggleBooleanSetting = (key: string) => {
    const current = settings[key] === 'true';
    updateSetting(key, (!current).toString());
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
        <p className="font-dm-sans text-sm text-noir/40">Only Super Admins can manage site settings.</p>
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

      {/* ━━━ Super Admin Password Change ━━━ */}
      <div className="mb-8 border border-zari-gold/10 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <KeyRound size={18} className="text-ruby" />
          <h2 className="font-cormorant text-xl text-noir">Super Admin Password</h2>
        </div>
        {passwordMessage && (
          <div className={`mb-4 p-3 border font-dm-sans text-sm ${
            passwordMessage.includes('success')
              ? 'border-emerald/30 bg-emerald/5 text-emerald'
              : 'border-ruby/30 bg-ruby/5 text-ruby'
          }`}>
            {passwordMessage}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 pr-9 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-noir/30 hover:text-noir/60"
              >
                {showCurrentPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 pr-9 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-noir/30 hover:text-noir/60"
              >
                {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleChangePassword}
            disabled={changingPassword || !currentPassword || !newPassword || !confirmPassword}
            className="inline-flex items-center gap-2 bg-ruby text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-ruby/80 transition-all duration-300 disabled:opacity-50"
          >
            <KeyRound size={16} />
            {changingPassword ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </div>

      {/* ━━━ General Settings ━━━ */}
      <div className="mb-8 border border-zari-gold/10 bg-white p-6">
        <h2 className="font-cormorant text-xl text-noir mb-4">General Settings</h2>
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

      {/* ━━━ Website Content Management ━━━ */}
      <div className="mb-8 border border-zari-gold/10 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <Type size={18} className="text-zari-gold" />
          <h2 className="font-cormorant text-xl text-noir">Website Content</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Hero Section Title</label>
            <input
              type="text"
              value={settings.hero_title || ''}
              onChange={(e) => updateSetting('hero_title', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="Draped in Dreams"
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Hero Section Subtitle</label>
            <input
              type="text"
              value={settings.hero_subtitle || ''}
              onChange={(e) => updateSetting('hero_subtitle', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="Crafted for You"
            />
          </div>
          <div className="md:col-span-2">
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Hero Section Description</label>
            <textarea
              value={settings.hero_description || ''}
              onChange={(e) => updateSetting('hero_description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 resize-y"
              placeholder="Where heritage meets haute couture — each piece is a love letter to Indian craftsmanship..."
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Announcement Bar Text</label>
            <input
              type="text"
              value={settings.announcement_bar_text || ''}
              onChange={(e) => updateSetting('announcement_bar_text', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="✨ New Bridal Collection 2025 — Book Your Appointment ✨"
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Footer Copyright Text</label>
            <input
              type="text"
              value={settings.footer_copyright || ''}
              onChange={(e) => updateSetting('footer_copyright', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="© 2025 House of Shringarika. All rights reserved."
            />
          </div>
          <div className="md:col-span-2">
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Footer About Text</label>
            <textarea
              value={settings.footer_about_text || ''}
              onChange={(e) => updateSetting('footer_about_text', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 resize-y"
              placeholder="House of Shringarika — where every thread tells a story of heritage and haute couture..."
            />
          </div>
        </div>
      </div>

      {/* ━━━ Appearance Settings ━━━ */}
      <div className="mb-8 border border-zari-gold/10 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette size={18} className="text-rose-gold" />
          <h2 className="font-cormorant text-xl text-noir">Appearance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Primary Color</label>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 border border-noir/10 flex-shrink-0"
                style={{ backgroundColor: settings.primary_color || '#B76E79' }}
              />
              <input
                type="text"
                value={settings.primary_color || ''}
                onChange={(e) => updateSetting('primary_color', e.target.value)}
                className="flex-1 px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="#B76E79"
              />
            </div>
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Secondary Color</label>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 border border-noir/10 flex-shrink-0"
                style={{ backgroundColor: settings.secondary_color || '#F7E7CE' }}
              />
              <input
                type="text"
                value={settings.secondary_color || ''}
                onChange={(e) => updateSetting('secondary_color', e.target.value)}
                className="flex-1 px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="#F7E7CE"
              />
            </div>
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Accent Color</label>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 border border-noir/10 flex-shrink-0"
                style={{ backgroundColor: settings.accent_color || '#C9A84C' }}
              />
              <input
                type="text"
                value={settings.accent_color || ''}
                onChange={(e) => updateSetting('accent_color', e.target.value)}
                className="flex-1 px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                placeholder="#C9A84C"
              />
            </div>
          </div>
          <div className="flex flex-col justify-end">
            {/* Spacer for alignment */}
          </div>
          {/* Toggles */}
          <div className="flex items-center justify-between py-1">
            <span className="font-dm-sans text-sm text-noir/70">Show Gold Particles</span>
            <button
              onClick={() => toggleBooleanSetting('show_gold_particles')}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300 ${
                settings.show_gold_particles !== 'false' ? 'bg-zari-gold' : 'bg-noir/20 hover:bg-noir/30'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform duration-300 ${
                  settings.show_gold_particles !== 'false' ? 'translate-x-[18px]' : 'translate-x-[3px]'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="font-dm-sans text-sm text-noir/70">Show Cursor Effects</span>
            <button
              onClick={() => toggleBooleanSetting('show_cursor_effects')}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300 ${
                settings.show_cursor_effects === 'true' ? 'bg-zari-gold' : 'bg-noir/20 hover:bg-noir/30'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform duration-300 ${
                  settings.show_cursor_effects === 'true' ? 'translate-x-[18px]' : 'translate-x-[3px]'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between py-1 md:col-span-2">
            <span className="font-dm-sans text-sm text-noir/70">Announcement Bar Visible</span>
            <button
              onClick={() => toggleBooleanSetting('announcement_bar_visible')}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300 ${
                settings.announcement_bar_visible === 'true' ? 'bg-zari-gold' : 'bg-noir/20 hover:bg-noir/30'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform duration-300 ${
                  settings.announcement_bar_visible === 'true' ? 'translate-x-[18px]' : 'translate-x-[3px]'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ━━━ WhatsApp & Social Settings ━━━ */}
      <div className="mb-8 border border-zari-gold/10 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle size={18} className="text-emerald" />
          <h2 className="font-cormorant text-xl text-noir">WhatsApp &amp; Social</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">WhatsApp Pre-filled Message</label>
            <input
              type="text"
              value={settings.whatsapp_message || ''}
              onChange={(e) => updateSetting('whatsapp_message', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="Hello! I'd like to inquire about..."
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Facebook URL</label>
            <input
              type="text"
              value={settings.facebook_url || ''}
              onChange={(e) => updateSetting('facebook_url', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="https://facebook.com/shringarika"
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Pinterest URL</label>
            <input
              type="text"
              value={settings.pinterest_url || ''}
              onChange={(e) => updateSetting('pinterest_url', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="https://pinterest.com/shringarika"
            />
          </div>
          <div>
            <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">YouTube URL</label>
            <input
              type="text"
              value={settings.youtube_url || ''}
              onChange={(e) => updateSetting('youtube_url', e.target.value)}
              className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
              placeholder="https://youtube.com/@shringarika"
            />
          </div>
        </div>
      </div>

      {/* ━━━ SEO Settings ━━━ */}
      <div className="mb-8 border border-zari-gold/10 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={18} className="text-mauve" />
          <h2 className="font-cormorant text-xl text-noir">SEO Settings</h2>
        </div>
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

      {/* ━━━ Store Settings ━━━ */}
      <div className="mb-8 border border-zari-gold/10 bg-white p-6">
        <h2 className="font-cormorant text-xl text-noir mb-4">Store Settings</h2>
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
