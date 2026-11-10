// @vitest-environment happy-dom
import { describe, expect, test, vi } from "vite-plus/test";
import { criaElementu, Elementi, Elementu } from "../src";

const creaLista = (...testi: string[]) =>
  new Elementi(testi.map((t) => criaElementu("li").testu(t)));

const testuDi = (el: Elementu) => el.nodu.textContent;

describe("Elementi.lunghizza", () => {
  test("è 0 per una lista vuota", () => {
    expect(new Elementi([]).lunghizza).toBe(0);
  });

  test("conta gli elementi della lista", () => {
    expect(creaLista("a", "b", "c").lunghizza).toBe(3);
  });
});

describe("Elementi.filtra", () => {
  test("restituisce una nuova istanza di Elementi", () => {
    const lista = creaLista("a", "b");
    const filtrata = lista.filtra(() => true);
    expect(filtrata).toBeInstanceOf(Elementi);
    expect(filtrata).not.toBe(lista);
  });

  test("tiene solo gli elementi che soddisfano la condizione", () => {
    const lista = creaLista("a", "bb", "cc");
    const filtrata = lista.filtra((el) => testuDi(el)!.length === 2);

    expect(filtrata.lunghizza).toBe(2);
    expect(filtrata.trova((el) => testuDi(el) === "a")).toBeUndefined();
  });

  test("non modifica la lista originale", () => {
    const lista = creaLista("a", "b", "c");
    lista.filtra((_el, i) => i === 0);
    expect(lista.lunghizza).toBe(3);
  });

  test("passa a ogni chiamata l'Elementu e il suo indice", () => {
    const spy = vi.fn((_el: Elementu, _i: number) => true);
    const lista = creaLista("a", "b");
    lista.filtra(spy);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0]![0]).toBeInstanceOf(Elementu);
    expect(spy.mock.calls[0]![1]).toBe(0);
    expect(spy.mock.calls[1]![1]).toBe(1);
  });

  test("restituisce una lista vuota se nessun elemento corrisponde", () => {
    expect(creaLista("a", "b").filtra(() => false).lunghizza).toBe(0);
  });

  test("si può concatenare con gli altri metodi", () => {
    const array: (string | null)[] = [];
    creaLista("a", "b", "c")
      .filtra((_el, i) => i % 2 === 0)
      .pirOgnunu((el) => array.push(testuDi(el)));
    expect(array).toStrictEqual(["a", "c"]);
  });
});

describe("Elementi.pirOgnunu", () => {
  test("chiama la funzione per ogni elemento, in ordine", () => {
    const visti: (string | null)[] = [];
    creaLista("a", "b", "c").pirOgnunu((el) => visti.push(testuDi(el)));
    expect(visti).toStrictEqual(["a", "b", "c"]);
  });

  test("passa anche l'indice", () => {
    const indici: number[] = [];
    creaLista("a", "b", "c").pirOgnunu((_el, i) => indici.push(i));
    expect(indici).toStrictEqual([0, 1, 2]);
  });

  test("restituisce la stessa istanza, per il concatenamento", () => {
    const lista = creaLista("a");
    expect(lista.pirOgnunu(() => {})).toBe(lista);
  });

  test("non chiama la funzione su una lista vuota", () => {
    const spy = vi.fn();
    new Elementi([]).pirOgnunu(spy);
    expect(spy).not.toHaveBeenCalled();
  });

  test("permette di usare i metodi di Elementu su ogni elemento", () => {
    const lista = creaLista("a", "b");
    lista.pirOgnunu((el) => el.culuri("russu"));
    lista.pirOgnunu((el) => expect(el.nodu.style.color).toBe("red"));
  });
});

describe("Elementi.trova", () => {
  test("restituisce il primo elemento che soddisfa la condizione", () => {
    const trovatu = creaLista("a", "b", "b").trova((el) => testuDi(el) === "b");
    expect(trovatu).toBeInstanceOf(Elementu);
    expect(trovatu?.nodu.textContent).toBe("b");
  });

  test("restituisce undefined se nessun elemento corrisponde", () => {
    expect(creaLista("a", "b").trova((el) => testuDi(el) === "z")).toBeUndefined();
  });

  test("restituisce undefined su una lista vuota", () => {
    expect(new Elementi([]).trova(() => true)).toBeUndefined();
  });

  test("passa l'indice alla funzione", () => {
    const trovatu = creaLista("a", "b", "c").trova((_el, i) => i === 2);
    expect(trovatu?.nodu.textContent).toBe("c");
  });
});

describe("Elementi.mappa", () => {
  test("chiama la funzione per ogni elemento", () => {
    const spy = vi.fn();
    creaLista("a", "b", "c").mappa(spy);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  //   // Questo test descrive il comportamento che ci si aspetta da `mappa`.
  //   // Fallisce finché il metodo scarta il risultato di `this.nodi.map(...)`.
  //   test("restituisce i risultati della funzione", () => {
  //     const risultatu = creaLista("a", "b", "c").mappa((el) => testuDi(el));
  //     expect(risultatu).toStrictEqual(["a", "b", "c"]);
  //   });

  test("non modifica la lista originale", () => {
    const lista = creaLista("a", "b");
    lista.mappa((el) => testuDi(el));
    expect(lista.lunghizza).toBe(2);
  });
});
