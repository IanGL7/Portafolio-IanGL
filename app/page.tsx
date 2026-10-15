import Nav from "@/components/Nav";
import Hero from "@/components/Inicio";
import Habilidades from "@/components/Habilidades";
import Section from "@/components/Section";
import { profile, projects } from "@/lib/portfolio";

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido">
        <Hero />
        <Habilidades />
        <Section id="proyectos">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / Proyectos</p>
              <h2>
                Código que puedes explorar<span>.</span>
              </h2>
            </div>
            <p>
              Una selección de mis repositorios públicos. Conoce las tecnologías
              y explora su implementación.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article key={project.title} className="project-card">
                <div
                  className={`project-art project-art-${index}`}
                  aria-hidden="true"
                >
                  <div className="art-window">
                    <div className="art-dots">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="art-symbol">{project.symbol}</div>
                    <div className="art-lines">
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                  <span className="art-caption">{project.category}</span>
                </div>
                <div className="project-body">
                  <p className="project-number">
                    0{index + 1} / {project.category}
                  </p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="tags" aria-label="Tecnologías">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <a
                    className="text-link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver código de ${project.title} en GitHub (abre otra pestaña)`}
                  >
                    Ver código <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
          <a
            className="all-projects text-link"
            href={`${profile.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explorar mis repositorios <span aria-hidden="true">↗</span>
          </a>
        </Section>
        <Section id="contacto">
          <div className="contact-panel">
            <p className="eyebrow">03 / Contacto</p>
            <h2>
              ¿Creamos algo
              <br />
              <span>juntos?</span>
            </h2>
            <p>
              Si buscas colaborar en un proyecto de desarrollo web, conoce mi
              trabajo y conecta conmigo en GitHub.
            </p>
            <a
              className="button button-primary"
              href={profile.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conectar en GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Section>
      </main>
      <footer className="footer">
        <a href="#inicio" aria-label="IanGL, volver al inicio">
          ian<span>/&gt;</span>
        </a>
        <p>Ian González · Desarrollo web</p>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      </footer>
    </>
  );
}
