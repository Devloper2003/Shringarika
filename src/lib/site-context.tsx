'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface SiteSettings {
  [key: string]: string;
}

interface SiteContextValue {
  settings: SiteSettings;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const SiteContext = createContext<SiteContextValue>({
  settings: {},
  loading: true,
  error: null,
  refetch: () => {},
});

interface SiteProviderProps {
  children: React.ReactNode;
  /** If provided, fetches settings from admin API with this token */
  adminToken?: string;
}

export function SiteProvider({ children, adminToken }: SiteProviderProps) {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  const refetch = useCallback(() => {
    setFetchKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchSettings() {
      setLoading(true);
      setError(null);

      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        if (adminToken) {
          headers['Authorization'] = `Bearer ${adminToken}`;
        }

        const res = await fetch('/api/admin/settings', { headers });
        if (!res.ok) {
          // On public pages without auth, settings endpoint will 401 — that's fine
          if (isMounted) {
            setSettings({});
            setLoading(false);
          }
          return;
        }

        const json = await res.json();
        if (!json.success) {
          throw new Error(json.message || 'Failed to fetch settings');
        }

        if (isMounted) {
          setSettings(json.settings || {});
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setSettings({});
          setLoading(false);
        }
      }
    }

    fetchSettings();

    return () => {
      isMounted = false;
    };
  }, [adminToken, fetchKey]);

  return (
    <SiteContext.Provider value={{ settings, loading, error, refetch }}>
      {children}
    </SiteContext.Provider>
  );
}

/**
 * Hook to access site settings from context
 */
export function useSiteSettings() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteProvider');
  }
  return context;
}

/**
 * Hook to get a single setting value with optional fallback
 */
export function useSetting(key: string, fallback: string = ''): string {
  const { settings } = useSiteSettings();
  return settings[key] || fallback;
}

export default SiteContext;
