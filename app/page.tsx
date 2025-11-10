'use client';
import { useEffect } from 'react';
import Nav from '@/components/Nav';
import AvatarOverlay from '@/components/AvatarOverlay';
import AvatarDirector from '@/components/AvatarDirector';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { useLenis } from '@/hooks/useLenis';
import PointerDriver from '@/components/PointerDriver';
import Hero from '@/components/Inicio';
import Habilidades from '@/components/Habilidades';

export default function Page() {
  const reduce = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useLenis(!reduce);
  useEffect(() => {
    document.documentElement.classList.add('lenis');
    return () => document.documentElement.classList.remove('lenis');
  }, []);

  return (
    <main className="min-h-svh text-white">
      <Nav />
      <AvatarOverlay />   {/* Canvas único en toda la página */}
      <AvatarDirector />  {/* Conecta el avatar al scroll */}
      <PointerDriver />
      <Hero />
      <Habilidades />

      {/* PROYECTOS */}
      <Section id="proyectos">
  <Reveal><h2 className="text-3xl md:text-4xl font-semibold">Proyectos</h2></Reveal>

  <div className="mt-8 grid md:grid-cols-3 gap-6">
    {[
      { title: 'Emonical — PWA Salud', desc: 'PWA con offline + métricas.', link: '#', image: '/p1.png' },
      { title: 'DentalCare AR',        desc: 'Demo AR educativa.',         link: '#', image: '/p2.png' },
      { title: 'Portafolio STH',       desc: 'Next.js + GSAP + R3F.',      link: '#', image: '/p3.png' },
    ].map((p) => (
      <Reveal key={p.title}>
        <article className="group rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-white/20 transition">
          <div className="aspect-video bg-black/30">
            {/* Usa tus imágenes reales en /public */}
            <img src={p.image} alt={p.title} className="w-full h-full object-cover transition transform group-hover:scale-[1.03]" />


          </div>
          <div className="p-5">
            <h3 className="text-lg font-medium">{p.title}</h3>
            <p className="mt-1 text-sm text-zinc-300">{p.desc}</p>
            <a href={p.link} className="mt-3 inline-block text-emerald-300 transition group-hover:translate-x-0.5">
              Visitar →
            </a>
          </div>
        </article>
      </Reveal>
    ))}
  </div>
      </Section>
    
    {/* CONTACTO */}
        <Section id="contacto" className="text-center">
          <Reveal><h2 className="text-3xl md:text-4xl font-semibold">¿Hablamos?</h2></Reveal>
          <Reveal>
            <p className="mt-3 text-zinc-300">
              Escríbeme a <a className="underline decoration-emerald-400 underline-offset-4"
              href="mailto:tu.email@dominio.com">tu.email@dominio.com</a>
            </p>
          </Reveal>
          <Reveal>
            <a href="mailto:tu.email@dominio.com"
               className="inline-block mt-8 rounded-2xl px-6 py-3 bg-emerald-400 text-black hover:bg-emerald-300 transition">
              Enviar correo
            </a>
          </Reveal>
        </Section>
        
        
    </main>
  );
}
