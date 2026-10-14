import { technologies } from "../Technologies/TechnologiesData";

import { preloadTechnologyAscii } from "../Technologies/TechnologyAsciiCache";

/* ==============================
   ASSETS FIXOS

   Somente arquivos que NÃO vêm
   de arrays/dados do projeto.
============================== */

const fixedAssets = [
  "/models/character.glb",

  "/fonts/ChakraPetch-Regular.typeface.json",

  "/files/curriculo-caio-milhomem.pdf",
];

/* ==============================
   TECNOLOGIAS

   Todos os ícones 2D e 3D.
============================== */

const technologyAssets = technologies.flatMap((technology) => [
  technology.icon,
  technology.icon3D,
]);

/* ==============================
   CONTACT
============================== */

const contactAssets = [
  "/icons/whatsapp-icon.svg",
  "/icons/email-icon.svg",
  "/icons/linkedin-icon.svg",
];

/* ==============================
   REMOVE DUPLICADOS
============================== */

const siteAssets = [
  ...new Set([...fixedAssets, ...technologyAssets, ...contactAssets]),
];

/* ==============================
   PRELOAD DE ARQUIVO
============================== */

async function preloadFile(url: string) {
  const response = await fetch(url, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Falha ao carregar asset: ${url}`);
  }

  await response.blob();
}

/* ==============================
   PRELOAD DO SITE
============================== */

export async function preloadSiteAssets() {
  await Promise.all([
    /*
     * Todos os arquivos estáticos.
     */
    ...siteAssets.map(preloadFile),

    /*
     * Todos os ASCII.
     */
    preloadTechnologyAscii(),

    /*
     * Fontes registradas no browser.
     */
    document.fonts.ready,
  ]);
}
