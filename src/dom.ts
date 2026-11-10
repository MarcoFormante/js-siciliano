import { Elementu } from "./core/elementu.ts";
import { Elementi } from "./core/elementi.ts";

export function pigghiaElementu<K extends keyof HTMLElementTagNameMap>(
  selettori: K | (string & {}),
  radice: ParentNode = document,
): Elementu {
  const nodu = radice.querySelector(selettori);
  if (!nodu) {
    throw new Error(`Nessun elemento trovato per "${selettori}"`);
  }
  return new Elementu(nodu as HTMLElement);
}

export function pigghiaElementuCuID(id: string): Elementu {
  const nodu = document.getElementById(id);
  if (!nodu) {
    throw new Error(`Nessun elemento trovato con "${id}"`);
  }
  return new Elementu(nodu as HTMLElement);
}

export function pigghiaElementi<K extends keyof HTMLElementTagNameMap>(
  selettori: K | (string & {}),
  radice: ParentNode = document,
): Elementi {
  const array: Elementu[] = [];
  const elements = radice.querySelectorAll(selettori);
  if (!elements.length) {
    throw new Error(`Elementi mancanti con selettore ${selettori}`);
  }
  elements.forEach((el) => {
    array.push(new Elementu(el as HTMLElement));
  });

  return new Elementi(array);
}

export function criaElementu<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: {},
): Elementu<HTMLElementTagNameMap[K]> {
  const node = document.createElement(tag, options);
  return new Elementu(node);
}

export function criaElementuEAppinniNtoCorpuduDocumentu<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: {},
): Elementu<HTMLElementTagNameMap[K]> {
  const node = document.createElement(tag, options);
  appinniNtoCorpuDuDocumentu(node);
  return new Elementu(node);
}

export function appinniNtoCorpuDuDocumentu<T extends HTMLElement>(
  elementu: Elementu<T> | T,
): Elementu<T> | T {
  const node = elementu instanceof Elementu ? elementu.nodu : elementu;
  document.body.appendChild(node);
  return elementu;
}

export function scutaEventu<K extends keyof HTMLElementEventMap>(
  elementu: string | HTMLElement | Elementu | null,
  eventu: K,
  funzioni: (e: HTMLElementEventMap[K]) => void,
): void {
  const nodu =
    typeof elementu === "string"
      ? document.querySelector<HTMLElement>(elementu)
      : elementu instanceof Elementu
        ? elementu.nodu
        : elementu;

  if (!nodu) {
    throw new Error(`scutaEventu: nuddu elementu truvatu pi "${nodu}"`);
  }
  nodu.addEventListener(eventu, funzioni);
}
