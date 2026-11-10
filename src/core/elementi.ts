import type { Elementu } from "./elementu.ts";

export class Elementi<T extends HTMLElement = HTMLElement> {
  constructor(private nodi: Elementu<T>[]) {}

  filtra(chiAvaFiltrari: (el: Elementu<T>, i: number) => unknown): Elementi {
    return new Elementi(this.nodi.filter(chiAvaFiltrari));
  }

  get lunghizza() {
    return this.nodi.length;
  }

  pirOgnunu(chidduChiFa: (el: Elementu<T>, i: number) => void) {
    this.nodi.forEach(chidduChiFa);
    return this;
  }

  trova(richiamu: (el: Elementu<T>, i: number) => unknown): Elementu<T> | undefined {
    return this.nodi.find(richiamu);
  }

  mappa(chidduChiFa: (el: Elementu<T>, i: number) => void) {
    this.nodi.map(chidduChiFa);
    return this;
  }
}
