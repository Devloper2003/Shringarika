'use client';

import { useState, useEffect } from 'react';
import {
  Search, Trash2, Shield, ShieldAlert, Lock, Eye, KeyRound,
  ShieldCheck, UserCog, X, ChevronDown
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  decryptedInfo?: Record<string, unknown> | null;
}

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

const PERMISSION_LABELS: Record<string, string> = {
  canAccessDashboard: 'Dashboard Access',
  canManageBlogs: 'Manage Blogs',
  canManageProducts: 'Manage Products',
  canViewInquiries: 'View Inquiries',
  canManageAppointments: 'Manage Appointments',
  canManageGallery: 'Manage Gallery',
  canViewUsers: 'View Users',
  canManageSettings: 'Manage Settings',
  canChangePassword: 'Can Change Password',
};

const SUPER_ADMIN_ONLY = ['canViewUsers', 'canManageSettings'];

type ViewTab = 'all-users' | 'staff-permissions';

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [permissions, setPermissions] = useState<StaffPermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ViewTab>('all-users');

  // Encrypted data modal
  const [encryptedModalOpen, setEncryptedModalOpen] = useState(false);
  const [encryptedUser, setEncryptedUser] = useState<AdminUser | null>(null);
  const [decrypting, setDecrypting] = useState(false);

  // Password change modal
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  // Grant access modal
  const [grantModalOpen, setGrantModalOpen] = useState(false);
  const [grantUserId, setGrantUserId] = useState('');
  const [grantPermissions, setGrantPermissions] = useState<Record<string, boolean>>({
    canAccessDashboard: true,
    canManageBlogs: false,
    canManageProducts: false,
    canViewInquiries: false,
    canManageAppointments: false,
    canManageGallery: false,
    canViewUsers: false,
    canManageSettings: false,
    canChangePassword: true,
  });
  const [granting, setGranting] = useState(false);

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
      fetchUsers();
      if (activeTab === 'staff-permissions') fetchPermissions();
    } else {
      setLoading(false);
    }
  }, [isSuperAdmin, search, activeTab]);

  const getToken = () => localStorage.getItem('shringarika_token');

  const fetchUsers = async () => {
    try {
      const token = getToken();
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      const res = await fetch(`/api/admin/users?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const token = getToken();
      const res = await fetch('/api/admin/permissions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setPermissions(data.permissions);
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
    }
  };

  const handleRoleChange = async (id: string, role: string) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (data.success) fetchUsers();
      else alert(data.message);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleActiveToggle = async (id: string, isActive: boolean) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isActive }),
      });
      const data = await res.json();
      if (data.success) fetchUsers();
      else alert(data.message);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirmDelete !== id) {
      setConfirmDelete(id);
      return;
    }
    setDeletingId(id);
    setConfirmDelete(null);
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) fetchUsers();
      else alert(data.message);
    } catch (error) {
      console.error('Failed to delete user:', error);
    } finally {
      setDeletingId(null);
    }
  };

  // View encrypted data
  const handleViewEncrypted = async (user: AdminUser) => {
    setEncryptedUser(user);
    setEncryptedModalOpen(true);
    setDecrypting(true);
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/users?decrypt=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        const found = data.users.find((u: AdminUser) => u.id === user.id);
        if (found) setEncryptedUser(found);
      }
    } catch (error) {
      console.error('Failed to decrypt data:', error);
    } finally {
      setDecrypting(false);
    }
  };

  // Change password
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
        setTimeout(() => {
          setPasswordModalOpen(false);
          setPasswordMessage('');
        }, 2000);
      } else {
        setPasswordMessage(data.message || 'Failed to change password');
      }
    } catch {
      setPasswordMessage('Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  // Grant permissions
  const handleGrantAccess = async () => {
    if (!grantUserId) {
      alert('Please select a user');
      return;
    }
    setGranting(true);
    try {
      const token = getToken();
      const res = await fetch('/api/admin/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: grantUserId, permissions: grantPermissions }),
      });
      const data = await res.json();
      if (data.success) {
        setGrantModalOpen(false);
        fetchPermissions();
        setGrantUserId('');
      } else {
        alert(data.message || 'Failed to grant access');
      }
    } catch {
      alert('Failed to grant access');
    } finally {
      setGranting(false);
    }
  };

  // Save single permission toggle
  const handlePermissionToggle = async (userId: string, permKey: string, value: boolean) => {
    const perm = permissions.find(p => p.userId === userId);
    if (!perm) return;
    const updatedPermissions = {
      canAccessDashboard: perm.canAccessDashboard,
      canManageBlogs: perm.canManageBlogs,
      canManageProducts: perm.canManageProducts,
      canViewInquiries: perm.canViewInquiries,
      canManageAppointments: perm.canManageAppointments,
      canManageGallery: perm.canManageGallery,
      canViewUsers: perm.canViewUsers,
      canManageSettings: perm.canManageSettings,
      canChangePassword: perm.canChangePassword,
      [permKey]: value,
    };
    try {
      const token = getToken();
      const res = await fetch('/api/admin/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId, permissions: updatedPermissions }),
      });
      const data = await res.json();
      if (data.success) fetchPermissions();
      else alert(data.message);
    } catch (error) {
      console.error('Failed to update permission:', error);
    }
  };

  const roleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-ruby/10 text-ruby';
      case 'admin': return 'bg-zari-gold/10 text-zari-gold';
      default: return 'bg-noir/10 text-noir/40';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  // Staff users for grant modal dropdown
  const staffUsers = users.filter(u => u.role === 'admin' || u.role === 'super_admin');
  const usersWithoutPermissions = staffUsers.filter(
    u => !permissions.some(p => p.userId === u.id)
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
        <p className="font-dm-sans text-sm text-noir/40">Only Super Admins can manage users.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Users</h1>
          <p className="font-dm-sans text-noir/40 text-sm mt-1">
            {activeTab === 'all-users' ? `${users.length} users total` : `${permissions.length} staff with permissions`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPasswordModalOpen(true)}
            className="inline-flex items-center gap-2 border border-noir/20 text-noir font-dm-sans text-sm px-4 py-2 hover:bg-noir/5 transition-all duration-300"
          >
            <KeyRound size={16} />
            Change Password
          </button>
        </div>
      </div>

      {/* Tab Toggle */}
      <div className="flex items-center gap-1 mb-6 border border-zari-gold/10 bg-white p-1 w-fit">
        <button
          onClick={() => setActiveTab('all-users')}
          className={`font-dm-sans text-sm px-5 py-2 transition-all duration-300 ${
            activeTab === 'all-users'
              ? 'bg-noir text-ivory'
              : 'text-noir/50 hover:text-noir'
          }`}
        >
          All Users
        </button>
        <button
          onClick={() => setActiveTab('staff-permissions')}
          className={`font-dm-sans text-sm px-5 py-2 transition-all duration-300 flex items-center gap-2 ${
            activeTab === 'staff-permissions'
              ? 'bg-noir text-ivory'
              : 'text-noir/50 hover:text-noir'
          }`}
        >
          <ShieldCheck size={15} />
          Staff Permissions
        </button>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/30" />
          <input
            type="text"
            placeholder={activeTab === 'all-users' ? 'Search by name or email...' : 'Search staff...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 transition-colors"
          />
        </div>
        {activeTab === 'staff-permissions' && (
          <button
            onClick={() => {
              setGrantUserId('');
              setGrantPermissions({
                canAccessDashboard: true,
                canManageBlogs: false,
                canManageProducts: false,
                canViewInquiries: false,
                canManageAppointments: false,
                canManageGallery: false,
                canViewUsers: false,
                canManageSettings: false,
                canChangePassword: true,
              });
              setGrantModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-sm px-5 py-2 hover:bg-zari-gold hover:text-noir transition-all duration-300"
          >
            <UserCog size={16} />
            Grant Access
          </button>
        )}
      </div>

      {/* All Users Tab */}
      {activeTab === 'all-users' && (
        <div className="border border-zari-gold/10 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-noir/5">
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Name</th>
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3 hidden sm:table-cell">Email</th>
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3 hidden md:table-cell">Phone</th>
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Role</th>
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Status</th>
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3 hidden lg:table-cell">Joined</th>
                <th className="text-left font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center font-dm-sans text-sm text-noir/30">No users found</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-noir/5 hover:bg-noir/[0.02] transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-zari-gold/10 flex items-center justify-center flex-shrink-0">
                          <span className="font-cinzel text-zari-gold text-[10px]">{user.name.charAt(0)}</span>
                        </div>
                        <span className="font-dm-sans text-sm text-noir">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-3 font-dm-sans text-xs text-noir/50 hidden sm:table-cell">{user.email}</td>
                    <td className="p-3 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Lock size={11} className="text-zari-gold/50 flex-shrink-0" />
                        <span className="font-dm-sans text-xs text-noir/30">Encrypted</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className={`font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 border-0 cursor-pointer ${roleColor(user.role)}`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleActiveToggle(user.id, !user.isActive)}
                        className={`inline-block font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 cursor-pointer transition-colors ${
                          user.isActive
                            ? 'bg-emerald/10 text-emerald hover:bg-emerald/20'
                            : 'bg-ruby/10 text-ruby hover:bg-ruby/20'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-3 font-dm-sans text-xs text-noir/40 hidden lg:table-cell">{formatDate(user.createdAt)}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleViewEncrypted(user)}
                          className="p-1.5 hover:bg-zari-gold/10 transition-colors"
                          title="View Encrypted Data"
                        >
                          <Eye size={15} className="text-zari-gold" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={deletingId === user.id}
                          className={`p-1.5 transition-colors ${confirmDelete === user.id ? 'bg-ruby/10' : 'hover:bg-ruby/10'}`}
                          title={confirmDelete === user.id ? 'Click again to confirm' : 'Delete user'}
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
      )}

      {/* Staff Permissions Tab */}
      {activeTab === 'staff-permissions' && (
        <div>
          {permissions.length === 0 ? (
            <div className="text-center py-12 border border-zari-gold/10 bg-white">
              <ShieldCheck size={32} className="text-noir/20 mx-auto mb-3" />
              <p className="font-dm-sans text-sm text-noir/30">No staff permissions configured</p>
              <p className="font-dm-sans text-xs text-noir/20 mt-1">Click &quot;Grant Access&quot; to set up staff permissions</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {permissions.map((perm) => (
                <div key={perm.id} className="border border-zari-gold/10 bg-white p-5">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-noir/5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-zari-gold/10 flex items-center justify-center">
                        <span className="font-cinzel text-zari-gold text-sm">{perm.user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-dm-sans text-sm text-noir font-medium">{perm.user.name}</p>
                        <p className="font-dm-sans text-[11px] text-noir/40">{perm.user.email}</p>
                      </div>
                    </div>
                    <span className={`font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 ${roleColor(perm.user.role)}`}>
                      {perm.user.role === 'super_admin' ? 'Super Admin' : perm.user.role}
                    </span>
                  </div>

                  {/* Permission Toggles */}
                  <div className="space-y-3">
                    {Object.entries(PERMISSION_LABELS).map(([key, label]) => {
                      const isSuperAdminOnly = SUPER_ADMIN_ONLY.includes(key);
                      const isLocked = isSuperAdminOnly && perm.user.role !== 'super_admin';
                      return (
                        <div key={key} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-dm-sans text-sm text-noir/70">{label}</span>
                            {isSuperAdminOnly && (
                              <Lock size={11} className="text-ruby/40" />
                            )}
                          </div>
                          <button
                            onClick={() => !isLocked && handlePermissionToggle(perm.userId, key, !(perm as Record<string, unknown>)[key] as boolean)}
                            disabled={isLocked}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300 ${
                              isLocked
                                ? 'bg-noir/10 cursor-not-allowed'
                                : (perm as Record<string, unknown>)[key]
                                  ? 'bg-zari-gold'
                                  : 'bg-noir/20 hover:bg-noir/30'
                            }`}
                          >
                            <span
                              className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform duration-300 ${
                                (perm as Record<string, unknown>)[key] ? 'translate-x-[18px]' : 'translate-x-[3px]'
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Encrypted Data Modal */}
      {encryptedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/60" onClick={() => setEncryptedModalOpen(false)} />
          <div className="relative bg-ivory border border-zari-gold/20 w-full max-w-md p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEncryptedModalOpen(false)}
              className="absolute top-4 right-4 text-noir/30 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-zari-gold/10 flex items-center justify-center">
                <Lock size={16} className="text-zari-gold" />
              </div>
              <div>
                <h3 className="font-cormorant text-xl text-noir">Encrypted Data</h3>
                <p className="font-dm-sans text-[11px] text-noir/40">{encryptedUser?.name} &middot; {encryptedUser?.email}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 mb-4 px-2 py-1 bg-emerald/10 border border-emerald/20">
              <Shield size={12} className="text-emerald" />
              <span className="font-dm-sans text-[10px] text-emerald tracking-wider uppercase">E2E Encrypted</span>
            </div>

            {decrypting ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-zari-gold border-t-transparent rounded-full animate-spin" />
              </div>
            ) : encryptedUser?.decryptedInfo ? (
              <div className="space-y-4">
                {/* Phone */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Phone</label>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald/5 border border-emerald/20">
                      <Lock size={8} className="text-emerald" />
                      <span className="font-dm-sans text-[8px] text-emerald">E2E</span>
                    </span>
                  </div>
                  <p className="font-dm-sans text-sm text-noir bg-white border border-noir/5 px-3 py-2">
                    {(encryptedUser.decryptedInfo as Record<string, unknown>)?.phone as string || '—'}
                  </p>
                </div>
                {/* Address */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Address</label>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald/5 border border-emerald/20">
                      <Lock size={8} className="text-emerald" />
                      <span className="font-dm-sans text-[8px] text-emerald">E2E</span>
                    </span>
                  </div>
                  <p className="font-dm-sans text-sm text-noir bg-white border border-noir/5 px-3 py-2">
                    {(encryptedUser.decryptedInfo as Record<string, unknown>)?.address
                      ? JSON.stringify((encryptedUser.decryptedInfo as Record<string, unknown>)?.address)
                      : '—'}
                  </p>
                </div>
                {/* Measurements */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase">Measurements</label>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald/5 border border-emerald/20">
                      <Lock size={8} className="text-emerald" />
                      <span className="font-dm-sans text-[8px] text-emerald">E2E</span>
                    </span>
                  </div>
                  <p className="font-dm-sans text-sm text-noir bg-white border border-noir/5 px-3 py-2">
                    {(encryptedUser.decryptedInfo as Record<string, unknown>)?.measurements
                      ? JSON.stringify((encryptedUser.decryptedInfo as Record<string, unknown>)?.measurements)
                      : '—'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Lock size={24} className="text-noir/20 mx-auto mb-2" />
                <p className="font-dm-sans text-sm text-noir/30">No encrypted data found for this user</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/60" onClick={() => { setPasswordModalOpen(false); setPasswordMessage(''); }} />
          <div className="relative bg-ivory border border-zari-gold/20 w-full max-w-md p-6 shadow-xl">
            <button
              onClick={() => { setPasswordModalOpen(false); setPasswordMessage(''); }}
              className="absolute top-4 right-4 text-noir/30 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-zari-gold/10 flex items-center justify-center">
                <KeyRound size={16} className="text-zari-gold" />
              </div>
              <h3 className="font-cormorant text-xl text-noir">Change Password</h3>
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

            <div className="space-y-4">
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-noir/10 bg-white font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                />
              </div>
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-noir/10 bg-white font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                />
              </div>
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-noir/10 bg-white font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                />
              </div>
              <button
                onClick={handleChangePassword}
                disabled={changingPassword || !currentPassword || !newPassword || !confirmPassword}
                className="w-full bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
              >
                {changingPassword ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grant Access Modal */}
      {grantModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/60" onClick={() => setGrantModalOpen(false)} />
          <div className="relative bg-ivory border border-zari-gold/20 w-full max-w-md p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setGrantModalOpen(false)}
              className="absolute top-4 right-4 text-noir/30 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-zari-gold/10 flex items-center justify-center">
                <UserCog size={16} className="text-zari-gold" />
              </div>
              <h3 className="font-cormorant text-xl text-noir">Grant Staff Access</h3>
            </div>

            <div className="space-y-4">
              {/* User Select */}
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Select User</label>
                <div className="relative">
                  <select
                    value={grantUserId}
                    onChange={(e) => setGrantUserId(e.target.value)}
                    className="w-full px-3 py-2 border border-noir/10 bg-white font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 appearance-none pr-8"
                  >
                    <option value="">Choose a user...</option>
                    {usersWithoutPermissions.map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-noir/30 pointer-events-none" />
                </div>
              </div>

              {/* Permission Toggles */}
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-2">Set Permissions</label>
                <div className="space-y-3">
                  {Object.entries(PERMISSION_LABELS).map(([key, label]) => {
                    const isSuperAdminOnly = SUPER_ADMIN_ONLY.includes(key);
                    return (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-dm-sans text-sm text-noir/70">{label}</span>
                          {isSuperAdminOnly && <Lock size={11} className="text-ruby/40" />}
                        </div>
                        <button
                          type="button"
                          onClick={() => setGrantPermissions(prev => ({ ...prev, [key]: !prev[key] }))}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300 ${
                            grantPermissions[key] ? 'bg-zari-gold' : 'bg-noir/20 hover:bg-noir/30'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform duration-300 ${
                              grantPermissions[key] ? 'translate-x-[18px]' : 'translate-x-[3px]'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleGrantAccess}
                disabled={granting || !grantUserId}
                className="w-full bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
              >
                {granting ? 'Granting...' : 'Grant Access'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
