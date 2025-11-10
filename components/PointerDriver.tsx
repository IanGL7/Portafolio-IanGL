'use client';
import { useEffect, useRef } from 'react';
import { useAvatar } from '@/stores/avatar';

export default function PointerDriver() {
  const set = useAvatar((s) => s.set);
  const raf = useRef<number | null>(null);
  const target = useRef<[number, number]>([0, 0]); // nx, ny (-1..1)

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = matchMedia('(pointer: coarse)').matches; // móvil/touch
    if (reduce || coarse) return; // sin interacción en móvil o reduce-motion

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;   // -1..1
      const ny = (e.clientY / window.innerHeight) * 2 - 1;  // -1..1
      target.current = [nx, ny];
      if (raf.current == null) {
        raf.current = requestAnimationFrame(tick);
      }
    };

    const onLeave = () => {
      target.current = [0, 0];
      if (raf.current == null) raf.current = requestAnimationFrame(tick);
    };

    const tick = () => {
      raf.current = null;
      const [nx, ny] = target.current;
      set({ pointer: [nx, ny] });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [set]);

  return null;
}
