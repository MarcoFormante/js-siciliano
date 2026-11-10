import { afterEach, describe, expect, test, vi } from "vite-plus/test";
import {
  accuminciaCu,
  criaTestu,
  mannaAlletta,
  mannaLogNtaConsol,
  pirOgniIntervallu,
  pirOgnunu,
  spetta,
  trova,
  uora,
} from "../src";
import { Testu } from "../src/core/testu";

// Dopo ogni test: timer,globali originali e spy puliti
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("console", () => {
  test("mannaLogNtaConsol chiama console.log con gli stessi argomenti", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    mannaLogNtaConsol("test");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("test");
  });
});

describe("mannaAlletta", () => {
  test("con window chiama alert con il messaggio", () => {
    const alertSpy = vi.fn();
    vi.stubGlobal("window", { alert: alertSpy });
    vi.stubGlobal("alert", alertSpy); // nel caso la funzione usi `alert` globale
    mannaAlletta("test");
    expect(alertSpy).toHaveBeenCalledWith("test");
  });

  test("senza window lancia errori", () => {
    vi.stubGlobal("window", undefined);
    expect(() => mannaAlletta("test")).toThrow();
  });
});

describe("data -> Date.now", () => {
  test("uora restituisce Date.now()", () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_000);
    expect(uora()).toBe(1_000);
  });

  test("spetta esegue la funzione solo dopo il tempo indicato", () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    spetta(100, spy);

    vi.advanceTimersByTime(99);
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("pirOgniIntervallu ripete la funzione a ogni intervallo", () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    pirOgniIntervallu(100, spy);

    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalledTimes(3);
  });
});

describe("stringhe", () => {
  test("accuminciaCu è vero se la stringa comincia con il prefisso", () => {
    expect(accuminciaCu("test", "t")).toBe(true);
  });

  test("accuminciaCu è falso se la stringa non comincia con il prefisso", () => {
    expect(accuminciaCu("test", "e")).toBe(false);
  });

  test("criaTestu restituisce un'istanza di Testu", () => {
    expect(criaTestu("test")).toBeInstanceOf(Testu);
  });
});

describe("liste", () => {
  test("pirOgnunu chiama la funzione per ogni elemento, in ordine", () => {
    const risultato: string[] = [];
    pirOgnunu([1, 2, 3], (el) => risultato.push(el.toString()));
    expect(risultato).toStrictEqual(["1", "2", "3"]);
  });

  test("pirOgnunu passa anche l'indice", () => {
    const indici: number[] = [];
    pirOgnunu(["a", "b"], (_el, i) => indici.push(i));
    expect(indici).toStrictEqual([0, 1]);
  });

  test("trova restituisce il primo elemento che soddisfa la condizione", () => {
    expect(trova([1, 2, 3], (el) => el === 1)).toBe(1);
  });

  test("trova restituisce undefined se nessun elemento corrisponde", () => {
    expect(trova([1, 2, 3], (el) => el === 99)).toBeUndefined();
  });
});
