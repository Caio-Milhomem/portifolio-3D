export type Technology = {
  id: string;
  name: string;
  icon: string;
  icon3D: string;
  iconScale?: number;
  asciiFile?: string;
  asciiFontSize?: number;
  text: string;
};

export const technologies: Technology[] = [
  {
    id: "azure",
    name: "Azure",
    icon: "/icons/azure-icon.svg",
    icon3D: "/icons/azure-icon.png",
    asciiFile: "/ascii-icons/azure.txt",
    asciiFontSize: 2,
    text: `
Descreva aqui sua experiência com Azure.
    `,
  },

  {
    id: "bootstrap",
    name: "Bootstrap",
    icon: "/icons/bootstrap-icon.png",
    icon3D: "/icons/bootstrap-icon.png",
    asciiFile: "/ascii-icons/bootstrap.txt",
    asciiFontSize: 3,
    text: `
Descreva aqui sua experiência com Bootstrap.
    `,
  },

  {
    id: "cpp",
    name: "C++",
    icon: "/icons/cpp-icon.svg",
    icon3D: "/icons/cpp-icon.svg",
    asciiFile: "/ascii-icons/cpp.txt",
    asciiFontSize: 2,
    text: `
Descreva aqui sua experiência com C++.
    `,
  },

  {
    id: "css",
    name: "CSS",
    icon: "/icons/css-icon.svg",
    icon3D: "/icons/css-icon.svg",
    asciiFile: "/ascii-icons/css.txt",
    asciiFontSize: 1.5,
    text: `
Descreva aqui sua experiência com CSS.
    `,
  },

  {
    id: "docker",
    name: "Docker",
    icon: "/icons/docker-icon.svg",
    icon3D: "/icons/docker-icon.svg",
    asciiFile: "/ascii-icons/docker.txt",
    asciiFontSize: 1.5,
    text: `
Descreva aqui sua experiência com Docker.
    `,
  },

  {
    id: "git",
    name: "Git",
    icon: "/icons/git-icon.svg",
    icon3D: "/icons/git-icon.svg",
    asciiFile: "/ascii-icons/git.txt",
    asciiFontSize: 1.5,
    text: `
Descreva aqui sua experiência com Git.
    `,
  },

  {
    id: "github",
    name: "GitHub",
    icon: "/icons/github-icon.svg",
    icon3D: "/icons/github-icon.svg",
    asciiFile: "/ascii-icons/github.txt",
    asciiFontSize: 2,
    text: `
Descreva aqui sua experiência com GitHub.
    `,
  },

  {
    id: "html",
    name: "HTML",
    icon: "/icons/html-icon.svg",
    icon3D: "/icons/html-icon.svg",
    asciiFile: "/ascii-icons/html.txt",
    asciiFontSize: 2,
    text: `
Descreva aqui sua experiência com HTML.
    `,
  },

  {
    id: "java",
    name: "Java",
    icon: "/icons/java-icon.svg",
    icon3D: "/icons/java-icon.svg",
    asciiFile: "/ascii-icons/java.txt",
    asciiFontSize: 1.5,
    text: `
Descreva aqui sua experiência com Java.
    `,
  },

  {
    id: "javascript",
    name: "JavaScript",
    icon: "/icons/js-icon.svg",
    icon3D: "/icons/js-icon.svg",
    asciiFile: "/ascii-icons/js.txt",
    text: `
Descreva aqui sua experiência com JavaScript.
    `,
  },

  {
    id: "mongodb",
    name: "MongoDB",
    icon: "/icons/mongodb-icon.svg",
    icon3D: "/icons/mongodb-icon.svg",
    asciiFile: "/ascii-icons/mongodb.txt",
    asciiFontSize: 2,
    text: `
Descreva aqui sua experiência com MongoDB.
    `,
  },

  {
    id: "nodejs",
    name: "Node.js",
    icon: "/icons/node-js-icon.svg",
    icon3D: "/icons/node-js-icon.svg",
    asciiFile: "/ascii-icons/node-js.txt",
    asciiFontSize: 1.5,
    text: `
Descreva aqui sua experiência com Node.js.
    `,
  },

  {
    id: "npm",
    name: "npm",
    icon: "/icons/npm-icon.svg",
    icon3D: "/icons/npm-icon.svg",
    asciiFile: "/ascii-icons/npm.txt",
    iconScale: 2,
    text: `
Descreva aqui sua experiência com npm.
    `,
  },

  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: "/icons/postgre-icon.svg",
    icon3D: "/icons/postgre-icon.svg",
    asciiFile: "/ascii-icons/postgresql.txt",
    text: `
Descreva aqui sua experiência com PostgreSQL.
    `,
  },

  {
    id: "postman",
    name: "Postman",
    icon: "/icons/postman-icon.svg",
    icon3D: "/icons/postman-icon.svg",
    asciiFile: "/ascii-icons/postman.txt",
    text: `
Descreva aqui sua experiência com Postman.
    `,
  },

  {
    id: "prisma",
    name: "Prisma",
    icon: "/icons/prisma-icon.svg",
    icon3D: "/icons/prisma-icon.svg",
    asciiFile: "/ascii-icons/prisma.txt",
    text: `
Descreva aqui sua experiência com Prisma.
    `,
  },

  {
    id: "react",
    name: "React",
    icon: "/icons/react-icon.svg",
    icon3D: "/icons/react-icon.svg",
    asciiFile: "/ascii-icons/react.txt",
    text: `
Utilizo React para desenvolver interfaces modernas e componentizadas,
trabalhando com estados, propriedades, hooks e organização de componentes.

Tenho utilizado React principalmente no desenvolvimento de interfaces
interativas e experiências web integradas com recursos 3D.
    `,
  },

  {
    id: "threejs",
    name: "Three.js",
    icon: "/icons/threejs-icon.svg",
    icon3D: "/icons/threejs-icon.svg",
    asciiFile: "/ascii-icons/threejs.txt",
    text: `
Utilizo Three.js em conjunto com React Three Fiber para trabalhar com
modelos, animações e experiências tridimensionais diretamente no navegador.
    `,
  },

  {
    id: "typescript",
    name: "TypeScript",
    icon: "/icons/typescript-icon.svg",
    icon3D: "/icons/typescript-icon.svg",
    asciiFile: "/ascii-icons/typescript.txt",
    text: `
Utilizo TypeScript para adicionar tipagem ao desenvolvimento JavaScript,
deixando componentes, propriedades e estruturas de dados mais previsíveis.
    `,
  },

  {
    id: "vite",
    name: "Vite",
    icon: "/icons/vite-icon.svg",
    icon3D: "/icons/vite-icon.png",
    asciiFile: "/ascii-icons/vite.txt",
    text: `
Descreva aqui sua experiência com Vite.
    `,
  },

  {
    id: "n8n",
    name: "n8n",
    icon: "/icons/n8n-icon.svg",
    icon3D: "/icons/n8n-icon.svg",
    asciiFile: "/ascii-icons/n8n.txt",
    iconScale: 1.9,
    text: `
Descreva aqui sua experiência com n8n.
    `,
  },
];
