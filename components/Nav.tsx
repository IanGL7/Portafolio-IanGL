'use client';
const ITEMS = [
  { id: 'inicio',      label: 'Inicio' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'proyectos',   label: 'Proyectos' },
  { id: 'contacto',    label: 'Contacto' },
];

export default function Nav() {
  const go = (id: string) => {
    const el = document.getElementById(id);
    const lenis = (window as any)?.__lenis;
    if (!el) return;
    lenis ? lenis.scrollTo(el, { offset: 0 }) : el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        {/* Logo */}
        <div className="flex items-center w-18 h-auto">
          <img src="/icons/ianL.png" alt="" />
        </div>

        {/* Links y botón CV */}
        <div className="flex items-center gap-4">
          {/* Contenedor de links */}
          <div className="hidden md:flex items-center gap-1 px-6 py-3 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm">
            <a href="#inicio" className="px-4 py-2 text-emerald-400 text-sm font-medium">
              Inicio
            </a>
            <a href="#habilidades" className="px-4 py-2 text-white/70 hover:text-white text-sm transition">
              Habilidades
            </a>
            <a href="#proyectos" className="px-4 py-2 text-white/70 hover:text-white text-sm transition">
              Proyectos
            </a>
            <a href="#contacto" className="px-4 py-2 text-white/70 hover:text-white text-sm transition">
              Contacto
            </a>
          </div>

          {/* Botón CV */}

          
       <div 
  className="inline-block rounded-full bg-linear-to-r from-[#00f5a0] to-[#00d4ff] p-0.5"
>
  
  <a 
    href="#cv" 
    className="flex items-center gap-2 rounded-full bg-[#101010] px-5 py-3 text-sm font-medium text-white transition hover:bg-linear-to-r from-[#00f5a0] to-[#00d4ff]"
  >
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
    </svg>
    Descargar CV
  </a>

</div>
        </div>
      </nav>
  );
}
