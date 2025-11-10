'use client';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { ensureGsap, gsap } from '@/lib/gsap';

type Props = PropsWithChildren<{
  className?: string;
  y?: number;        // desplazamiento inicial vertical
  duration?: number; // duración de la animación
  delay?: number;    // retardo opcional
}>;

export default function Reveal({
  children,
  className = '',
  y = 40,
  duration = 0.6,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsap();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !ref.current) return;

    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        }
      );
    });

    return () => ctx.revert();
  }, [y, duration, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
