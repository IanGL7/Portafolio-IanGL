import React from 'react';

export default function Inicio() {
  return (
    <>
      <section 
        id="inicio" 
        className="relative min-h-svh flex items-center justify-center overflow-hidden bg-[#010B07] py-25"
      >
        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col items-center text-center gap-5 px-6 max-w-7xl mx-auto w-full">
          {/* Título principal */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-arial tracking-tight">
            Hola, soy <span className="bg-linear-to-r from-[#00f5a0] to-[#00d4ff] bg-clip-text text-transparent">Ian</span>
          </h1>
          
          {/* Frontend Developer */}
          <span className="relative inline-block">
            <span className="text-white text-[2.5rem] sm:text-[4rem] md:text-[5.25rem] font-outfit whitespace-nowrap">
              Frontend Developer
            </span>
          </span>
          
          {/* Descripción */}
          <p className="max-w-2xl text-zinc-300 font-mono">
            Apasionado en la tecnología y en la innovación tecnológica.
          </p>

          {/* Botones de acción - Aparecen aquí en móvil */}
          <div className="flex sm:flex-row gap-3 mt-4 lg:hidden">
            <a 
              href="#contacto" 
              className="rounded-2xl px-6 py-3 bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition text-center"
            >
              Contáctame
            </a>
            <a 
              href="#email" 
              className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 transition backdrop-blur-sm mx-auto sm:mx-0"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </a>
          </div>

          {/* Layout responsive para avatar y cajas */}
          <div className="w-full mt-3">
            {/* Desktop: layout horizontal */}
            <div className="hidden lg:flex justify-center gap-12">
              {/* Caja izquierda */}
              <div className="w-56 h-86 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-start justify-start p-6">
                  <h3 className="text-white font-semibold text-base mb-2">Desarrollador texto font</h3>
                  <p className="text-white/50 text-sm font-mono leading-tight">
                    Testcio descripcionjkhbuhdf bujfsdbhjuhb
                  </p>
                </div>
              </div>
              
              {/* Espacio central para avatar */}
              <div className="w-180 h-96" />
              
              {/* Caja derecha */}
              <div className="w-56 h-56 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-start justify-start p-6">
                  <h3 className="text-white font-semibold text-base mb-2">Título derecho</h3>
                  <p className="text-white/50 text-sm font-mono leading-tight">
                    Descripción de la caja derecha aquí
                  </p>
                </div>
              </div>
            </div>

            {/* Móvil: layout vertical centrado */}
            <div className="lg:hidden flex flex-col items-center gap-6">
              {/* Avatar primero */}
              <div className="w-80 h-96" />
              
              {/* Caja 1 */}
              <div className="w-full max-w-sm h-56 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-white font-semibold text-base mb-2">Desarrollador texto font</h3>
                  <p className="text-white/50 text-sm font-mono leading-tight">
                    Testcio descripcionjkhbuhdf bujfsdbhjuhb
                  </p>
                </div>
              </div>
              
              {/* Caja 2 */}
              <div className="w-full max-w-sm h-56 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-white font-semibold text-base mb-2">Título derecho</h3>
                  <p className="text-white/50 text-sm font-mono leading-tight">
                    Descripción de la caja derecha aquí
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción - Solo en desktop */}
        <div className="hidden lg:flex absolute right-8 bottom-20 gap-3">
          <a 
            href="#contacto" 
            className="rounded-2xl px-6 py-3 bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition"
          >
            Contáctame
          </a>
          <a 
            href="#email" 
            className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 transition backdrop-blur-sm"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
          </a>
        </div>

        {/* Navegación por puntos */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-3">
          {[1,2,3,4].map((i) => (
            <button 
              key={i}
              className={`w-3 h-3 rounded-full transition ${i === 1 ? 'bg-emerald-400 scale-125' : 'bg-white/30 hover:bg-white/50'}`}
              aria-label={`Ir a sección ${i}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}