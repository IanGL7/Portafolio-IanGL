'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroAvatar({ src = '/avatar.png' }: { src?: string }) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const dx = (e.clientX - w / 2) / (w / 2);  // -1..1
      const dy = (e.clientY - h / 2) / (h / 2);  // -1..1
      gsap.to(el, {
        x: dx * 25,
        y: dy * 15,
        rotateY: dx * 10,
        rotateX: -dy * 8,
        transformPerspective: 800,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="relative z-10 mt-6">
      {/* brillo sutil */}
      <div
        className="absolute -inset-16 rounded-full blur-3xl opacity-50"
        style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(16,255,224,0.25) 0%, rgba(0,0,0,0) 70%)' }}
      />
      <img
        ref={ref}
        src={src}
        alt="Avatar"
        className="relative w-[220px] md:w-[300px] select-none pointer-events-none drop-shadow-[0_20px_80px_rgba(16,255,224,0.35)]"
      />
    </div>
  );
}
