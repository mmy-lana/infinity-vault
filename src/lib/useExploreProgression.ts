'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'infinity_vault_discovered_relics';
const STORAGE_EVENT = 'infinity_vault_storage_sync';

function subscribe(callback: () => void) {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

function getSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  try {
    return localStorage.getItem(STORAGE_KEY) || '[]';
  } catch {
    return '[]';
  }
}

function getServerSnapshot(): string {
  return '[]';
}

export function useExploreProgression() {
  const rawStorage = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const discoveredIds = useMemo<Set<string>>(() => {
    try {
      const parsed = JSON.parse(rawStorage);
      return new Set<string>(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set<string>();
    }
  }, [rawStorage]);

  const markDiscovered = useCallback((id: string) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const current = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(current) ? current : [];

      if (!list.includes(id)) {
        list.push(id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        window.dispatchEvent(new Event(STORAGE_EVENT));
      }
    } catch {
      // Graceful fallback for quota or private browsing restrictions
    }
  }, []);

  return {
    discoveredIds,
    discoveredCount: discoveredIds.size,
    markDiscovered,
  };
}