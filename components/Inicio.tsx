import AvatarOverlay from "@/components/AvatarOverlay";
import { profile } from "@/lib/portfolio";

export default function Inicio() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> Hola, soy Ian González
        </p>
        <h1>
          Desarrollo web.
          <br />
          <span>
            Ideas que toman
            <br className="desktop-break" /> forma.
          </span>
        </h1>
        <p className="hero-description">
          Construyo interfaces y aplicaciones web con atención al diseño, la
          funcionalidad y la experiencia de quienes las usan.
        </p>
        <div className="hero-buttons">
          <a className="button button-primary" href="#proyectos">
            Explorar proyectos <span aria-hidden="true">↗</span>
          </a>
          <a className="button button-quiet" href="#contacto">
            Hablemos <span aria-hidden="true">→</span>
          </a>
        </div>
        <ul className="hero-stack" aria-label="Tecnologías principales">
          <li>React</li>
          <li>Next.js</li>
          <li>TypeScript</li>
        </ul>
      </div>
      <div className="hero-visual">
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <span className="floating-label label-top" aria-hidden="true">
          &lt;developer /&gt;
        </span>
        <AvatarOverlay />
        <div className="visual-caption">
          <span className="status-dot" />
          <span>
            IanGL <small>Desarrollo · Diseño · Código</small>
          </span>
          <a
            href={profile.github}
            aria-label="Ver perfil de IanGL7 en GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            ↗
          </a>
        </div>
      </div>
      <a href="#habilidades" className="scroll-cue">
        Conoce mi trabajo <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
