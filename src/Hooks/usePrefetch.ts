import { useCallback, useRef } from 'react';
import { getEvent, getMembers } from '../lib/sanity';

// Simple dedup set stored per module
const prefetched = new Set<string>();
const depPrefetched = new Set<string>();

function warmChunk(importer: () => Promise<unknown>) {
  const w = window as Window & { requestIdleCallback?: (cb: () => void) => void };
  if (typeof w.requestIdleCallback === 'function') {
    w.requestIdleCallback(() => { void importer(); });
  } else {
    setTimeout(() => importer(), 300);
  }
}

export function usePrefetchEventDetail() {
  const lastIdRef = useRef<string | null>(null);

  const prefetch = useCallback((id: string) => {
    if (!id || prefetched.has(id)) return;
    prefetched.add(id);
    lastIdRef.current = id;
    // Add a small delay to prevent excessive prefetches on rapid hover
    setTimeout(() => {
      warmChunk(() => import('../Pages/EventDetail'));
      getEvent(id).catch(() => undefined);
    }, 200);
  }, []);

  return prefetch;
}

// Call the provided callback once when the element first becomes visible
export function useOnVisiblePrefetch(cb: () => void) {
  const ref = useRef<HTMLElement | null>(null);
  const calledRef = useRef(false);

  const setRef = useCallback((node: HTMLElement | null) => {
    ref.current = node;
    if (!node || calledRef.current) return;
    if (!('IntersectionObserver' in window)) {
      // Fallback: call immediately
      calledRef.current = true;
      cb();
      return;
    }
    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (e && e.isIntersecting && !calledRef.current) {
        calledRef.current = true;
        cb();
        io.disconnect();
      }
    }, { rootMargin: '200px' });
    io.observe(node);
  }, [cb]);

  return setRef;
}

export function usePrefetchDepartmentDetail() {
  return useCallback((departmentName: string | undefined) => {
    if (!departmentName) return;
    if (depPrefetched.has(departmentName)) return;
    depPrefetched.add(departmentName);
    warmChunk(() => import('../Pages/DepartmentDetail'));
    // DepartmentDetail filtra miembros por nombre, así que precargamos todo
    getMembers().catch(() => undefined);
  }, []);
}
