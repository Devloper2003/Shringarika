'use client';

import { useState, useEffect } from 'react';
import { Search, Trash2, Shield, ShieldAlert } from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

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
    if (isSuperAdmin) fetchUsers();
    else setLoading(false);
  }, [isSuperAdmin, search]);

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

  const handleRoleChange = async (id: string, role: string) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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

  const roleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-ruby/10 text-ruby';
      case 'admin': return 'bg-zari-gold/10 text-zari-gold';
      default: return 'bg-noir/10 text-noir/40';
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

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShieldAlert size={48} className="text-ruby mb-4" />
        <h2 className="font-cormorant text-2xl text-noir mb-2">Access Denied</h2>
        <p className="font-dm-sans text-sm text-noir/40">
          Only Super Admins can manage users.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">Users</h1>
        <p className="font-dm-sans text-noir/40 text-sm mt-1">{users.length} users total</p>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/30" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 transition-colors"
          />
        </div>
      </div>

      {/* Users Table */}
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
                <td colSpan={7} className="p-8 text-center font-dm-sans text-sm text-noir/30">
                  No users found
                </td>
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
                  <td className="p-3 font-dm-sans text-xs text-noir/50 hidden md:table-cell">{user.phone || '—'}</td>
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
                      className={`inline-block font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 cursor-pointer transition-colors ${user.isActive ? 'bg-emerald/10 text-emerald hover:bg-emerald/20' : 'bg-ruby/10 text-ruby hover:bg-ruby/20'}`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-3 font-dm-sans text-xs text-noir/40 hidden lg:table-cell">{formatDate(user.createdAt)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingId === user.id}
                      className={`p-1.5 transition-colors ${confirmDelete === user.id ? 'bg-ruby/10' : 'hover:bg-ruby/10'}`}
                      title={confirmDelete === user.id ? 'Click again to confirm' : 'Delete user'}
                    >
                      <Trash2 size={15} className="text-ruby" />
                    </button>
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
