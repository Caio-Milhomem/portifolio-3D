import { technologies } from "./TechnologiesData";

/* ==============================
   CACHE GLOBAL DOS ASCII
============================== */

/*
 * O Map fica no módulo.
 *
 * Portanto o conteúdo continua
 * disponível enquanto a aplicação
 * estiver aberta.
 */
const asciiCache = new Map<string, string>();

/*
 * Guarda carregamentos que já
 * estão acontecendo.
 *
 * Evita duas requisições para o
 * mesmo arquivo ao mesmo tempo.
 */
const pendingLoads = new Map<string, Promise<string>>();

/* ==============================
   CARREGA UM ASCII
============================== */

async function loadAsciiFile(file: string): Promise<string> {
  /* ============================
     JÁ ESTÁ NO CACHE
  ============================ */

  const cached = asciiCache.get(file);

  if (cached !== undefined) {
    return cached;
  }

  /* ============================
     JÁ ESTÁ SENDO CARREGADO
  ============================ */

  const pending = pendingLoads.get(file);

  if (pending) {
    return pending;
  }

  /* ============================
     NOVO CARREGAMENTO
  ============================ */

  const loadPromise = fetch(file, {
    cache: "force-cache",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar ASCII: ${file}`);
      }

      return response.text();
    })
    .then((text) => {
      asciiCache.set(file, text);

      pendingLoads.delete(file);

      return text;
    })
    .catch((error) => {
      pendingLoads.delete(file);

      throw error;
    });

  pendingLoads.set(file, loadPromise);

  return loadPromise;
}

/* ==============================
   PRELOAD DE TODOS OS ASCII
============================== */

export async function preloadTechnologyAscii() {
  /*
   * Pega somente tecnologias
   * que realmente possuem ASCII.
   */
  const asciiFiles = technologies
    .map((technology) => technology.asciiFile)
    .filter((file): file is string => Boolean(file));

  /*
   * Remove arquivos duplicados.
   */
  const uniqueFiles = [...new Set(asciiFiles)];

  /*
   * Só termina quando TODOS os
   * ASCII terminaram de carregar.
   *
   * Se um falhar, rejeita.
   *
   * Isso é importante porque o
   * loading global não deve liberar
   * o site enquanto faltar asset.
   */
  await Promise.all(uniqueFiles.map(loadAsciiFile));
}

/* ==============================
   BUSCA UM ASCII DO CACHE
============================== */

export function getTechnologyAscii(file: string): string | null {
  return asciiCache.get(file) ?? null;
}

/* ==============================
   VERIFICA SE EXISTE NO CACHE
============================== */

export function hasTechnologyAscii(file: string): boolean {
  return asciiCache.has(file);
}
