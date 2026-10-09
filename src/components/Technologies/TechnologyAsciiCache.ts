import { technologies } from "./TechnologiesData";

const asciiCache = new Map<string, string>();
const asciiRequests = new Map<string, Promise<string>>();

let preloadPromise: Promise<void> | null = null;

async function loadAscii(asciiFile: string) {
  const cached = asciiCache.get(asciiFile);

  if (cached !== undefined) {
    return cached;
  }

  const existingRequest = asciiRequests.get(asciiFile);

  if (existingRequest) {
    return existingRequest;
  }

  const request = fetch(asciiFile)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar ASCII: ${asciiFile}`);
      }

      return response.text();
    })
    .then((text) => {
      asciiCache.set(asciiFile, text);
      asciiRequests.delete(asciiFile);

      return text;
    })
    .catch((error) => {
      asciiRequests.delete(asciiFile);
      throw error;
    });

  asciiRequests.set(asciiFile, request);

  return request;
}

export function preloadTechnologyAscii() {
  if (preloadPromise) {
    return preloadPromise;
  }

  const asciiFiles = technologies
    .map((technology) => technology.asciiFile)
    .filter((asciiFile): asciiFile is string => Boolean(asciiFile));

  preloadPromise = Promise.all(
    asciiFiles.map((asciiFile) => loadAscii(asciiFile)),
  ).then(() => undefined);

  return preloadPromise;
}

export function getTechnologyAscii(asciiFile: string) {
  return asciiCache.get(asciiFile);
}

export function fetchTechnologyAscii(asciiFile: string) {
  return loadAscii(asciiFile);
}
