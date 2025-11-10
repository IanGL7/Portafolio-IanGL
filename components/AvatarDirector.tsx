'use client';
import { useEffect } from 'react';
import { ensureGsap, gsap } from '@/lib/gsap';
import { useAvatar, V3 } from '@/stores/avatar';

// Poses por sección (ajústalas a tu gusto)
const SCENES: Record<string, { pos: V3; rot: V3; scale: number }> = {
  inicio:      { pos: [0.00, -0.40, 0], rot: [0,  0.00, 0], scale: 1.00 },
  habilidades: { pos: [0.70, -0.08, 0], rot: [0,  0.25, 0], scale: 0.95 },
  proyectos:   { pos: [-0.65,-0.12, 0], rot: [0, -0.20, 0], scale: 0.92 },
  contacto:    { pos: [0.00, -0.08, 0], rot: [0,  0.00, 0], scale: 0.90 },
};

const lerp = (a:number,b:number,t:number)=>a+(b-a)*t;
const lerpV3 = (a:V3,b:V3,t:number):V3=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)];

export default function AvatarDirector() {
  const set = useAvatar(s=>s.set);

  useEffect(() => {
    ensureGsap();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ids = ['inicio','habilidades','proyectos','contacto'].filter(id => !!document.getElementById(id));
    const timelines: gsap.core.Timeline[] = [];

    // Pose inicial
    const start = SCENES[ids[0]];
    set({ position: start.pos, rotation: start.rot, scale: start.scale });

    for (let i=0;i<ids.length-1;i++){
      const from = SCENES[ids[i]];
      const to   = SCENES[ids[i+1]];
      const toEl = document.getElementById(ids[i+1])!;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: toEl,
          start: 'top bottom',   // cuando entra al viewport
          end:   'top center',   // hasta el centro
          scrub: 1,
        }
      })
      .to({}, {
        duration: 1,
        onUpdate: function(){
          const t = this.progress();
          set({
            position: lerpV3(from.pos, to.pos, t),
            rotation: lerpV3(from.rot, to.rot, t),
            scale: lerp(from.scale, to.scale, t),
          });
        }
      });

      timelines.push(tl);
    }
    return () => timelines.forEach(t => t.scrollTrigger?.kill());
  }, [set]);

  return null;
}
