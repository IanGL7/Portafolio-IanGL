// Datos públicos. Agrega un PDF real en public/cv y su URL para mostrar la descarga.
export const profile: {
  name: string;
  github: string;
  contactUrl: string;
  cvUrl: string | null;
} = {
  name: "Ian González",
  github: "https://github.com/IanGL7",
  contactUrl: "https://github.com/IanGL7",
  cvUrl: null,
};

export const projects = [
  {
    title: "Emonical",
    category: "Aplicación web",
    description:
      "Proyecto de aplicación web construido con Angular. Su repositorio permite explorar la estructura y el código del frontend.",
    tags: ["Angular", "TypeScript"],
    url: "https://github.com/IanGL7/Emonical",
    symbol: "{ }",
  },
  {
    title: "E-Commerce Hoodies",
    category: "Comercio electrónico",
    description:
      "Proyecto de comercio electrónico desarrollado con Laravel. Una muestra de desarrollo web dentro del ecosistema PHP.",
    tags: ["Laravel", "PHP"],
    url: "https://github.com/IanGL7/E-Commerce-Hoodies",
    symbol: "↗",
  },
  {
    title: "Portafolio IanGL",
    category: "Sitio personal",
    description:
      "Mi espacio para presentar habilidades y proyectos, con diseño adaptable y un avatar 3D que puedes activar.",
    tags: ["Next.js", "React", "Three.js"],
    url: "https://github.com/IanGL7/Portafolio-IanGL",
    symbol: "</>",
  },
];
