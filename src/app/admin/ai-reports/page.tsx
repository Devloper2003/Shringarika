'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, X, ShieldAlert, Sparkles, Search,
  Bookmark, ChevronDown, Clock, FileText, Eye,
} from 'lucide-react';

interface AIReport {
  id: string;
  title: string;
  type: string;
  prompt: string;
  content: string;
  metadata: string | null;
  generatedBy: string;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
}

const REPORT_TYPES = [
  { value: 'analytics', label: 'Analytics' },
  { value: 'seo', label: 'SEO' },
  { value: 'content', label: 'Content' },
  { value: 'social', label: 'Social Media' },
  { value: 'performance', label: 'Performance' },
  { value: 'custom', label: 'Custom' },
];

const TYPE_COLORS: Record<string, string> = {
  analytics: 'bg-mauve/10 text-mauve',
  seo: 'bg-emerald/10 text-emerald',
  content: 'bg-zari-gold/10 text-zari-gold',
  social: 'bg-rose-gold/10 text-rose-gold',
  performance: 'bg-sandalwood/10 text-sandalwood',
  custom: 'bg-noir/10 text-noir/50',
};

function renderMarkdown(text: string) {
  // Basic markdown rendering
  let html = text
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="font-cormorant text-lg text-noir mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-cormorant text-xl text-noir mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-cormorant text-2xl text-noir mt-6 mb-3">$1</h1>')
    // Bold & italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-noir font-medium">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`(.+?)`/g, '<code class="px-1 py-0.5 bg-noir/5 text-noir/70 font-mono text-xs">$1</code>')
    // Unordered lists
    .replace(/^\s*[-*] (.+)$/gm, '<li class="font-dm-sans text-sm text-noir/60 ml-4">$1</li>')
    // Ordered lists
    .replace(/^\s*\d+\. (.+)$/gm, '<li class="font-dm-sans text-sm text-noir/60 ml-4">$1</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="font-dm-sans text-sm text-noir/60 mb-3">')
    // Line breaks
    .replace(/\n/g, '<br/>');

  // Wrap in paragraph if not starting with a heading
  if (!html.startsWith('<h')) {
    html = `<p class="font-dm-sans text-sm text-noir/60 mb-3">${html}</p>`;
  }

  return html;
}

export default function AdminAIReports() {
  const [reports, setReports] = useState<AIReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState('analytics');
  const [formPrompt, setFormPrompt] = useState('');

  // Detail view
  const [selectedReport, setSelectedReport] = useState<AIReport | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('shringarika_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsAdmin(user.role === 'admin' || user.role === 'super_admin');
      } catch { /* ignore */ }
    }
  }, []);

  const getToken = () => localStorage.getItem('shringarika_token');

  const fetchReports = useCallback(async () => {
    try {
      const token = getToken();
      const params = new URLSearchParams();
      if (typeFilter !== 'all') params.set('type', typeFilter);

      const res = await fetch(`/api/admin/ai-report?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setReports(data.data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  }, [typeFilter]);

  useEffect(() => {
    if (isAdmin) fetchReports();
    else setLoading(false);
  }, [isAdmin, fetchReports]);

  const handleGenerate = async () => {
    setGenerating(true);
    setMessage('');
    try {
      const token = getToken();
      const res = await fetch('/api/admin/ai-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formTitle,
          type: formType,
          prompt: formPrompt,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Report generated successfully');
        setShowForm(false);
        setFormTitle('');
        setFormType('analytics');
        setFormPrompt('');
        fetchReports();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Failed to generate report');
      }
    } catch (error) {
      console.error('Failed to generate report:', error);
      setMessage('Failed to generate report');
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    setDeletingId(id);
    setMessage('');
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/ai-report/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Report deleted successfully');
        if (selectedReport?.id === id) setSelectedReport(null);
        fetchReports();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to delete report:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleBookmark = async (report: AIReport) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/ai-report/${report.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isBookmarked: !report.isBookmarked }),
      });
      const data = await res.json();
      if (data.success) {
        fetchReports();
        if (selectedReport?.id === report.id) {
          setSelectedReport({ ...report, isBookmarked: !report.isBookmarked });
        }
      }
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredReports = reports.filter(r =>
    !searchQuery ||
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-zari-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShieldAlert size={48} className="text-ruby mb-4" />
        <h2 className="font-cormorant text-2xl text-noir mb-2">Access Denied</h2>
        <p className="font-dm-sans text-sm text-noir/40">Only Admins and Super Admins can access AI Reports.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Sparkles size={28} className="text-zari-gold" />
            <h1 className="font-cormorant text-3xl lg:text-4xl text-noir">AI Reports</h1>
          </div>
          <p className="font-dm-sans text-noir/40 text-sm ml-10">
            Generate AI-powered insights about your website
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 w-fit"
        >
          <Plus size={16} />
          Generate Report
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

      {/* Generate Report Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/60" onClick={() => setShowForm(false)} />
          <div className="relative bg-ivory border border-zari-gold/20 w-full max-w-lg p-6 shadow-xl">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-noir/30 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-zari-gold/10 flex items-center justify-center">
                <Sparkles size={18} className="text-zari-gold" />
              </div>
              <div>
                <h3 className="font-cormorant text-xl text-noir">Generate New Report</h3>
                <p className="font-dm-sans text-[11px] text-noir/40">AI will analyze and generate insights</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Report Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50"
                  placeholder="e.g. Monthly Analytics Summary"
                />
              </div>
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Report Type</label>
                <div className="relative">
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 appearance-none bg-white"
                  >
                    {REPORT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-noir/30 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="font-dm-sans text-[10px] text-noir/40 tracking-widest uppercase block mb-1">Prompt / Instructions</label>
                <textarea
                  value={formPrompt}
                  onChange={(e) => setFormPrompt(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 resize-y"
                  placeholder="Describe what the report should cover. For example: Analyze our website traffic trends for the past month, identify top-performing pages, and suggest improvements for underperforming content..."
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleGenerate}
                disabled={generating || !formTitle || !formPrompt}
                className="flex-1 bg-noir text-ivory font-dm-sans text-sm px-5 py-2.5 hover:bg-zari-gold hover:text-noir transition-all duration-300 disabled:opacity-50"
              >
                {generating ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-ivory border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles size={16} />
                    Generate Report
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 border border-noir/15 font-dm-sans text-sm text-noir/50 hover:text-noir hover:border-noir/30 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/60" onClick={() => setSelectedReport(null)} />
          <div className="relative bg-ivory border border-zari-gold/20 w-full max-w-3xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-4 right-4 text-noir/30 hover:text-noir transition-colors"
            >
              <X size={20} />
            </button>

            {/* Report Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 ${TYPE_COLORS[selectedReport.type] || 'bg-noir/10 text-noir/40'}`}>
                      {selectedReport.type}
                    </span>
                    <span className="font-dm-sans text-[10px] text-noir/20 flex items-center gap-1">
                      <Clock size={10} />
                      {formatDate(selectedReport.createdAt)}
                    </span>
                  </div>
                  <h2 className="font-cormorant text-2xl text-noir">{selectedReport.title}</h2>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleToggleBookmark(selectedReport)}
                    className="p-1.5 hover:bg-noir/5 transition-colors"
                    title={selectedReport.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                  >
                    <Bookmark
                      size={16}
                      className={selectedReport.isBookmarked ? 'text-zari-gold fill-zari-gold' : 'text-noir/30'}
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(selectedReport.id)}
                    disabled={deletingId === selectedReport.id}
                    className="p-1.5 hover:bg-ruby/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} className="text-ruby" />
                  </button>
                </div>
              </div>
              <div className="mt-3 p-3 bg-noir/[0.02] border border-noir/5">
                <p className="font-dm-sans text-[10px] text-noir/30 tracking-widest uppercase mb-1">Prompt</p>
                <p className="font-dm-sans text-xs text-noir/50">{selectedReport.prompt}</p>
              </div>
            </div>

            {/* Report Content */}
            <div className="border-t border-noir/5 pt-4">
              <div
                dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedReport.content) }}
              />
            </div>

            <div className="mt-6 pt-4 border-t border-noir/5 flex justify-between items-center">
              <span className="font-dm-sans text-[10px] text-noir/20">
                Generated by {selectedReport.generatedBy}
              </span>
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 border border-noir/15 font-dm-sans text-sm text-noir/50 hover:text-noir hover:border-noir/30 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/30" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-noir/10 font-dm-sans text-sm focus:outline-none focus:border-zari-gold/50 transition-colors"
          />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-2 font-dm-sans text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
              typeFilter === 'all'
                ? 'bg-noir text-ivory border-noir'
                : 'bg-white text-noir/40 border-noir/10 hover:border-noir/20'
            }`}
          >
            All
          </button>
          {REPORT_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTypeFilter(t.value)}
              className={`px-3 py-2 font-dm-sans text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
                typeFilter === t.value
                  ? 'bg-noir text-ivory border-noir'
                  : 'bg-white text-noir/40 border-noir/10 hover:border-noir/20'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <div className="text-center py-16 border border-zari-gold/10 bg-white">
          <Sparkles size={40} className="text-noir/15 mx-auto mb-4" />
          <h3 className="font-cormorant text-xl text-noir/40 mb-2">No Reports Found</h3>
          <p className="font-dm-sans text-sm text-noir/25">
            {searchQuery || typeFilter !== 'all'
              ? 'No results match your filters'
              : 'Generate your first AI report to get started'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="border border-zari-gold/10 bg-white p-4 sm:p-5 hover:border-zari-gold/20 transition-colors cursor-pointer group"
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`font-dm-sans text-[10px] tracking-wider uppercase px-2 py-0.5 ${TYPE_COLORS[report.type] || 'bg-noir/10 text-noir/40'}`}>
                      {report.type}
                    </span>
                    {report.isBookmarked && (
                      <Bookmark size={12} className="text-zari-gold fill-zari-gold" />
                    )}
                    <span className="font-dm-sans text-[10px] text-noir/20 flex items-center gap-1">
                      <Clock size={10} />
                      {formatDate(report.createdAt)}
                    </span>
                  </div>
                  <h3 className="font-dm-sans text-sm text-noir font-medium mb-1 group-hover:text-zari-gold transition-colors">
                    {report.title}
                  </h3>
                  <p className="font-dm-sans text-xs text-noir/30 line-clamp-2">
                    {report.prompt}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedReport(report); }}
                    className="p-1.5 hover:bg-noir/5 transition-colors"
                    title="View"
                  >
                    <Eye size={15} className="text-noir/40" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleBookmark(report); }}
                    className="p-1.5 hover:bg-noir/5 transition-colors"
                    title={report.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                  >
                    <Bookmark
                      size={15}
                      className={report.isBookmarked ? 'text-zari-gold fill-zari-gold' : 'text-noir/30'}
                    />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(report.id); }}
                    disabled={deletingId === report.id}
                    className="p-1.5 hover:bg-ruby/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={15} className="text-ruby" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
