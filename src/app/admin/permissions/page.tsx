'use client';

import { useState, useEffect } from 'react';
import {
  ShieldAlert, Search, ShieldCheck, UserCog, X, Lock,
  RotateCcw, Save, ChevronDown, Users
} from 'lucide-react';

interface StaffPermission {
  id: string;
  userId: string;
  user: { id: string; name: string; email: string; role: string; isActive: boolean };
  canAccessDashboard: boolean;
  canManageBlogs: boolean;
  canManageProducts: boolean;
  canViewInquiries: boolean;
  canManageAppointments: boolean;
  canManageGallery: boolean;
  canViewUsers: boolean;
  canManageSettings: boolean;
  canChangePassword: boolean;
}

interface SimpleUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const PERMISSION_LABELS: Record<string, { label: string; icon: string }> = {
  canAccessDashboard: { label: 'Dashboard Access', icon: 'dashboard' },
  canManageBlogs: { label: 'Manage Blogs', icon: 'blog' },
  canManageProducts: { label: 'Manage Products', icon: 'product' },
  canViewInquiries: { label: 'View Inquiries', icon: 'inquiry' },
  canManageAppointments: { label: 'Manage Appointments', icon: 'appointment' },
  canManageGallery: { label: 'Manage Gallery', icon: 'gallery' },
  canViewUsers: { label: 'View Users', icon: 'users' },
  canManageSettings: { label: 'Manage Settings', icon: 'settings' },
  canChangePassword: { label: 'Can Change Password', icon: 'password' },
};

const SUPER_ADMIN_ONLY = ['canViewUsers', 'canManageSettings'];

const DEFAULT_PERMISSIONS: Record<string, boolean> = {
  canAccessDashboard: true,
  canManageBlogs: false,
  canManageProducts: false,
  canViewInquiries: false,
  canManageAppointments: false,
  canManageGallery: false,
  canViewUsers: false,
  canManageSettings: false,
  canChangePassword: true,
};

export default function AdminPermissions() {
  const [permissions, setPermissions] = useState<StaffPermission[]>([]);
  const [allUsers, setAllUsers] = useState<SimpleUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [search, setSearch] = useState('');

  // Local permission edits per card
  const [localEdits, setLocalEdits] = useState<Record<string, Record<string, boolean>>>({});
  const [savingCard, setSavingCard] = useState<string | null>(null);
  const [resettingCard, setResettingCard] = useState<string | null>(null);
  const [cardMessages, setCardMessages] = useState<Record<string, { text: string; type: 'success' | 'error' }>>({});

  // Add staff modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addUserId, setAddUserId] = useState('');
  const [addPermissions, setAddPermissions] = useState<Record<string, boolean>>({ ...DEFAULT_PERMISSIONS });
  const [adding, setAdding] = useState(false);

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
    if (isSuperAdmin) {
      fetchPermissions();
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [isSuperAdmin]);

  const getToken = () => localStorage.getItem('shringarika_token');

  const fetchPermissions = async () => {
    try {
      const token = getToken();
      const res = await fetch('/api/admin/permissions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setPermissions(data.permissions);
        // Initialize local edits from fetched data
        const edits: Record<string, Record<string, boolean>> = {};
        data.permissions.forEach((p: StaffPermission) => {
          edits[p.userId] = {
            canAccessDashboard: p.canAccessDashboard,
            canManageBlogs: p.canManageBlogs,
            canManageProducts: p.canManageProducts,
            canViewInquiries: p.canViewInquiries,
            canManageAppointments: p.canManageAppointments,
            canManageGallery: p.canManageGallery,
            canViewUsers: p.canViewUsers,
            canManageSettings: p.canManageSettings,
            canChangePassword: p.canChangePassword,
          };
        });
        setLocalEdits(edits);
      }
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = getToken();
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAllUsers(data.users.map((u: { id: string; name: string; email: string; role: string }) => ({
          id: u.id, name: u.name, email: u.email, role: u.role,
        })));
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleTogglePermission = (userId: string, key: string) => {
    setLocalEdits(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [key]: !prev[userId]?.[key],
      },
    }));
  };

  const handleSaveCard = async (userId: string) => {
    setSavingCard(userId);
    setCardMessages(prev => ({ ...prev, [userId]: { text: '', type: 'success' } }));
    try {
      const token = getToken();
      const res = await fetch('/api/admin/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId, permissions: localEdits[userId] }),
      });
      const data = await res.json();
      if (data.success) {
        setCardMessages(prev => ({ ...prev, [userId]: { text: 'Permissions saved', type: 'success' } }));
        fetchPermissions();
      } else {
        setCardMessages(prev => ({ ...prev, [userId]: { text: data.message || 'Failed', type: 'error' } }));
      }
    } catch {
      setCardMessages(prev => ({ ...prev, [userId]: { text: 'Failed to save', type: 'error' } }));
    } finally {
      setSavingCard(null);
      setTimeout(() => {
        setCardMessages(prev => ({ ...prev, [userId]: { text: '', type: 'success' } }));
      }, 3000);
    }
  };

  const handleResetCard = async (userId: string) => {
    setResettingCard(userId);
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/permissions/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setLocalEdits(prev => ({
          ...prev,
          [userId]: { ...DEFAULT_PERMISSIONS },
        }));
        setCardMessages(prev => ({ ...prev, [userId]: { text: 'Permissions reset to default', type: 'success' } }));
        fetchPermissions();
      } else {
        setCardMessages(prev => ({ ...prev, [userId]: { text: data.message || 'Failed', type: 'error' } }));
      }
    } catch {
      setCardMessages(prev => ({ ...prev, [userId]: { text: 'Failed to reset', type: 'error' } }));
    } finally {
      setResettingCard(null);
      setTimeout(() => {
        setCardMessages(prev => ({ ...prev, [userId]: { text: '', type: 'success' } }));
      }, 3000);
    }
  };

  const handleAddStaff = async () => {
    if (!addUserId) return;
    setAdding(true);
    try {
      const token = getToken();
      const res = await fetch('/api/admin/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: addUserId, permissions: addPermissions }),
      });
      const data = await res.json();
      if (data.success) {
        setAddModalOpen(false);
        setAddUserId('');
        setAddPermissions({ ...DEFAULT_PERMISSIONS });
        fetchPermissions();
        fetchUsers();
      } else {
        alert(data.message || 'Failed to add staff');
      }
    } catch {
      alert('Failed to add staff');
    } finally {
      setAdding(false);
    }
  };

  const roleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-ruby/10 text-ruby';
      case 'admin': return 'bg-zari-gold/10 text-zari-gold';
      default: return 'bg-noir/10 text-noir/40';
    }
  };

  const roleLabel = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Admin';
      default: return 'User';
    }
  };

  // Filtered permissions
  const filteredPermissions = permissions.filter(p =>
    !search ||
    p.user.name.toLowerCase().includes(search.toLowerCase()) ||
    p.user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Users without permissions for the add modal
  const usersWithoutPermissions = allUsers.filter(
    u => (u.role === 'admin' || u.role === 'super_admin') && !permissions.some(p => p.userId === u.id)
  );

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
        <p className="font-dm-sans text-sm text-noir/40">Only Super Admins can manage staff permissions.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck size={28} className="text-zari-gold" />
          <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Staff Access Control</h1>
        </div>
        <p className="font-dm-sans text-noir/40 text-sm ml-10">
          Manage granular permissions for admin and staff members. Control who can access what across your panel.
        </p>
      </div>

      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/30" />
          <input
            type="text"
            placeholder="Search staff by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 transition-colors"
          />
        </div>
        <button
          onClick={() => {
            setAddUserId('');
            setAddPermissions({ ...DEFAULT_PERMISSIONS });
            setAddModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-sm px-5 py-2 hover:bg-zari-gold hover:text-noir transition-all duration-300"
        >
          <UserCog size={16} />
          Add Staff
        </button>
      </div>

      {/* Permission Cards Grid */}
      {filteredPermissions.length === 0 ? (
        <div className="text-center py-16 border border-zari-gold/10 bg-white">
          <Users size={40} className="text-noir/15 mx-auto mb-4" />
          <h3 className="font-cormorant text-xl text-noir/40 mb-2">No Staff Permissions</h3>
          <p className="font-dm-sans text-sm text-noir/25">
            {search ? 'No results match your search' : 'Click "Add Staff" to configure permissions for your team'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredPermissions.map((perm) => {
            const localPerm = localEdits[perm.userId] || {};
            const cardMsg = cardMessages[perm.userId];
            return (
              <div key={perm.id} className="border border-zari-gold/10 bg-white">
                {/* Card Header */}
                <div className="p-5 pb-4 border-b border-noir/5 bg-ivory/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zari-gold/10 flex items-center justify-center">
                        <span className="font-cinzel text-zari-gold text-sm">{perm.user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-dm-sans text-sm text-noir font-medium">{perm.user.name}</p>
                        <p className="font-dm-sans text-[11px] text-noir/40">{perm.user.email}</p>
                      </div>
                    </div>
                    <span className={`font-dm-sans text-[10px] tracking-wider uppercase px-2.5 py-1 ${roleColor(perm.user.role)}`}>
                      {roleLabel(perm.user.role)}
                    </span>
                  </div>
                  {cardMsg?.text && (
                    <div className={`mt-3 p-2 text-xs font-dm-sans border ${
                      cardMsg.type === 'success'
                        ? 'border-emerald/30 bg-emerald/5 text-emerald'
                        : 'border-ruby/30 bg-ruby/5 text-ruby'
                    }`}>
                      {cardMsg.text}
                    </div>
                  )}
                </div>

                {/* Permission Toggles */}
                <div className="p-5 space-y-3.5">
                  {Object.entries(PERMISSION_LABELS).map(([key, { label }]) => {
                    const isSuperAdminOnly = SUPER_ADMIN_ONLY.includes(key);
                    const isLocked = isSuperAdminOnly && perm.user.role !== 'super_admin';
                    const isEnabled = localPerm[key] ?? false;

                    return (
                      <div key={key} className="flex items-center justify-between group">
                        <div className="flex items-center gap-2.5">
                          <span className={`font-dm-sans text-sm transition-colors ${
                            isEnabled ? 'text-noir' : 'text-noir/50'
                          }`}>
                            {label}
                          </span>
                          {isSuperAdminOnly && (
                            <Lock size={11} className="text-ruby/40" title="Super Admin only" />
                          )}
                        </div>
                        <button
                          onClick={() => !isLocked && handleTogglePermission(perm.userId, key)}
                          disabled={isLocked}
                          className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-all duration-300 ${
                            isLocked
                              ? 'bg-noir/10 cursor-not-allowed'
                              : isEnabled
                                ? 'bg-zari-gold shadow-sm shadow-zari-gold/20'
                                : 'bg-noir/15 hover:bg-noir/25'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full transition-all duration-300 ${
                              isEnabled
                                ? 'translate-x-[22px] bg-white shadow-sm'
                                : 'translate-x-[3px] bg-noir/40'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => handleSaveCard(perm.userId)}
                    disabled={savingCard === perm.userId}
                    className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-xs px-4 py-2 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
                  >
                    <Save size={13} />
                    {savingCard === perm.userId ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => handleResetCard(perm.userId)}
                    disabled={resettingCard === perm.userId}
                    className="inline-flex items-center gap-2 border border-noir/15 text-noir/50 font-dm-sans text-xs px-4 py-2 hover:border-ruby/30 hover:text-ruby transition-all duration-300 disabled:opacity-50"
                  >
                    <RotateCcw size={13} />
                    {resettingCard === perm.userId ? 'Resetting...' : 'Reset to Default'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Staff Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/60" onClick={() => setAddModalOpen(false)} />
          <div className="relative bg-ivory border border-zari-gold/20 w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-4 right-4 text-noir/30 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-zari-gold/10 flex items-center justify-center">
                <UserCog size={18} className="text-zari-gold" />
              </div>
              <div>
                <h3 className="font-cormorant text-xl text-noir">Add Staff Member</h3>
                <p className="font-dm-sans text-[11px] text-noir/40">Set initial permissions for a team member</p>
              </div>
            </div>

            {/* User Search */}
            <div className="mb-5">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1.5">Select User</label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/30" />
                <select
                  value={addUserId}
                  onChange={(e) => setAddUserId(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 border border-noir/10 bg-white font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 appearance-none"
                >
                  <option value="">Choose a staff user...</option>
                  {usersWithoutPermissions.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name} — {u.email} ({roleLabel(u.role)})
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-noir/30 pointer-events-none" />
              </div>
              {usersWithoutPermissions.length === 0 && (
                <p className="font-dm-sans text-[11px] text-noir/30 mt-1.5">
                  No staff users available. Promote a user to Admin first.
                </p>
              )}
            </div>

            {/* Initial Permissions */}
            <div className="mb-6">
              <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-3">Initial Permissions</label>
              <div className="space-y-3 border border-noir/5 bg-white p-4">
                {Object.entries(PERMISSION_LABELS).map(([key, { label }]) => {
                  const isSuperAdminOnly = SUPER_ADMIN_ONLY.includes(key);
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-dm-sans text-sm text-noir/70">{label}</span>
                        {isSuperAdminOnly && <Lock size={11} className="text-ruby/40" />}
                      </div>
                      <button
                        type="button"
                        onClick={() => setAddPermissions(prev => ({ ...prev, [key]: !prev[key] }))}
                        className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-all duration-300 ${
                          addPermissions[key]
                            ? 'bg-zari-gold shadow-sm shadow-zari-gold/20'
                            : 'bg-noir/15 hover:bg-noir/25'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full transition-all duration-300 ${
                            addPermissions[key]
                              ? 'translate-x-[22px] bg-white shadow-sm'
                              : 'translate-x-[3px] bg-noir/40'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddStaff}
                disabled={adding || !addUserId}
                className="flex-1 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
              >
                {adding ? 'Adding...' : 'Add Staff & Grant Permissions'}
              </button>
              <button
                onClick={() => setAddModalOpen(false)}
                className="px-5 py-2.5 border border-noir/15 font-dm-sans text-sm text-noir/50 hover:text-noir hover:border-noir/30 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
