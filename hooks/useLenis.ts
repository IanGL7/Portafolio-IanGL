'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({ smoothWheel: true });
    // lo dejamos global para usarlo luego desde la navbar/dots
    (window as any).__lenis = lenis;

    let rafId = 0;
    const raf = (t: number) => { lenis.raf(t); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as any).__lenis = undefined;
    };
  }, [enabled]);
}
