'use client';

import { useState, useEffect, useCallback } from 'react';

export interface PageContentData {
  id: string;
  page: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  imageUrl: string | null;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseSiteContentResult {
  sections: PageContentData[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Simple in-memory cache keyed by page name
const contentCache = new Map<string, { data: PageContentData[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useSiteContent(page: string): UseSiteContentResult {
  const [sections, setSections] = useState<PageContentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  const refetch = useCallback(() => {
    // Clear cache for this page to force a fresh fetch
    contentCache.delete(page);
    setFetchKey((k) => k + 1);
  }, [page]);

  useEffect(() => {
    let isMounted = true;

    async function fetchContent() {
      // Check cache first
      const cached = contentCache.get(page);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        if (isMounted) {
          setSections(cached.data);
          setLoading(false);
          setError(null);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/site/content?page=${encodeURIComponent(page)}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch content: ${res.status}`);
        }

        const json = await res.json();
        if (!json.success) {
          throw new Error(json.message || 'Failed to fetch content');
        }

        const data: PageContentData[] = json.data || [];

        // Update cache
        contentCache.set(page, { data, timestamp: Date.now() });

        if (isMounted) {
          setSections(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    }

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, [page, fetchKey]);

  return { sections, loading, error, refetch };
}

/**
 * Helper to find a section by name from the sections array
 */
export function findSection(
  sections: PageContentData[],
  sectionName: string
): PageContentData | undefined {
  return sections.find((s) => s.section === sectionName);
}

/**
 * Helper to get a section's title, with a fallback
 */
export function getSectionTitle(
  sections: PageContentData[],
  sectionName: string,
  fallback: string = ''
): string {
  const section = findSection(sections, sectionName);
  return section?.title || fallback;
}

/**
 * Helper to get a section's subtitle, with a fallback
 */
export function getSectionSubtitle(
  sections: PageContentData[],
  sectionName: string,
  fallback: string = ''
): string {
  const section = findSection(sections, sectionName);
  return section?.subtitle || fallback;
}

/**
 * Clear the content cache (useful after admin updates)
 */
export function clearContentCache(page?: string) {
  if (page) {
    contentCache.delete(page);
  } else {
    contentCache.clear();
  }
}
