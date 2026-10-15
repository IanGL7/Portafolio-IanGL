import Section from "@/components/Section";

const skills = [
  {
    title: "Interfaces web",
    description:
      "Estructura y estilos para convertir una idea en una interfaz clara y adaptable.",
    tools: "HTML · CSS · Tailwind CSS",
    icon: "⌘",
  },
  {
    title: "Aplicaciones frontend",
    description:
      "Componentes reutilizables e interfaces interactivas con herramientas modernas.",
    tools: "React · Next.js · Angular",
    icon: "{ }",
  },
  {
    title: "Lógica y desarrollo",
    description:
      "Programación para dar comportamiento y estructura a las aplicaciones web.",
    tools: "JavaScript · TypeScript · PHP",
    icon: "</>",
  },
  {
    title: "Desarrollo con Laravel",
    description:
      "Proyectos web dentro del ecosistema PHP, incluyendo comercio electrónico.",
    tools: "PHP · Laravel",
    icon: "↗",
  },
  {
    title: "Control de versiones",
    description:
      "Organización del código y seguimiento de cambios a lo largo del proyecto.",
    tools: "Git · GitHub",
    icon: "⑂",
  },
  {
    title: "Diseño adaptable",
    description:
      "Experiencias que cuidan la legibilidad, la navegación y el uso en distintos dispositivos.",
    tools: "Responsive · Accesibilidad",
    icon: "▣",
  },
];
export default function Habilidades() {
  return (
    <Section id="habilidades">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Habilidades</p>
          <h2>
            De la idea
            <br />a la interfaz<span>.</span>
          </h2>
        </div>
        <p>Herramientas y enfoques que utilizo para construir proyectos web.</p>
      </div>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <article className="skill-card" key={skill.title}>
            <div className="skill-top">
              <span aria-hidden="true">{skill.icon}</span>
              <small>0{index + 1}</small>
            </div>
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
            <p className="skill-tools">{skill.tools}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
