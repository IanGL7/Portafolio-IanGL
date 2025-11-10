import React from 'react';

export default function Habilidades() {
  const habilidades = [
    { numero: '01', titulo: 'HTML & CSS', descripcion: 'Estructura y diseño web moderno' },
    { numero: '02', titulo: 'JavaScript/TypeScript', descripcion: 'Programación avanzada y tipado' },
    { numero: '03', titulo: 'React & Next.js', descripcion: 'Frameworks modernos de frontend' },
    { numero: '04', titulo: 'Tailwind CSS', descripcion: 'Utilidades CSS para desarrollo ágil' },
    { numero: '05', titulo: 'Git & GitHub', descripcion: 'Control de versiones y colaboración' },
    { numero: '06', titulo: 'Responsive Design', descripcion: 'Diseño adaptable a todos los dispositivos' }
  ];

  return (
    <section 
      id="habilidades" 
      className="py-20 px-6 relative min-h-svh  overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Grid de habilidades con bordes tipo tarjeta */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {habilidades.map((habilidad) => (
            <div 
              key={habilidad.numero}
              className="relative border border-white/10 p-8 hover:bg-white/5 transition-all duration-300 group"
            >
              {/* Esquinas decorativas */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-emerald-400/50 group-hover:border-emerald-400 transition-colors" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-emerald-400/50 group-hover:border-emerald-400 transition-colors" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-emerald-400/50 group-hover:border-emerald-400 transition-colors" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-emerald-400/50 group-hover:border-emerald-400 transition-colors" />
              
              {/* Contenido */}
              <div className="relative z-10">
                <p className="text-emerald-400 font-mono text-sm mb-3">
                  {habilidad.numero}
                </p>
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 uppercase tracking-wider">
                  {habilidad.titulo}
                </h3>
                <p className="text-zinc-400 text-sm font-mono">
                  {habilidad.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className=' text-white font-semibold text-6xl  mb-2 max-w-7xl mx-auto w-screen mt-60'>
        <h1>Habilidades en software</h1>
      </div>

      <div className=' text-2xl ml-300 mb-8'>
        <p>haolaaaaajdhihbcbdcbin</p>
      </div>

    </section>
  );
}