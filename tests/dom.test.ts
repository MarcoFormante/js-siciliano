// @vitest-environment happy-dom
import { afterEach, describe, expect, test, vi } from "vite-plus/test";
import {
  appinniNtoCorpuDuDocumentu,
  criaElementu,
  criaElementuEAppinniNtoCorpuduDocumentu,
  Elementi,
  Elementu,
  pigghiaElementi,
  pigghiaElementu,
  pigghiaElementuCuID,
  scutaEventu,
  uCorpuDuDocumentu,
} from "../src";

// Dopo ogni test: globali originali, spy puliti e pagina vuota.
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("uCorpuDuDocumentu", () => {
  test("restituisce il body del documento", () => {
    expect(uCorpuDuDocumentu()).toBe(document.body);
  });

  test("lancia un errore se document non esiste", () => {
    vi.stubGlobal("document", undefined);
    expect(() => uCorpuDuDocumentu()).toThrow();
  });
});

describe("pigghiaElementu (querySelector)", () => {
  test("restituisce un'istanza di Elementu", () => {
    document.body.append(document.createElement("a"));
    expect(pigghiaElementu("a")).toBeInstanceOf(Elementu);
  });

  test("lancia un errore se non trova l'elemento", () => {
    document.body.append(document.createElement("a"));
    expect(() => pigghiaElementu("b")).toThrow('Nessun elemento trovato per "b"');
  });
});

describe("pigghiaElementuCuID (getElementById)", () => {
  test("restituisce un'istanza di Elementu", () => {
    const a = document.createElement("a");
    a.id = "test";
    document.body.append(a);
    expect(pigghiaElementuCuID("test")).toBeInstanceOf(Elementu);
  });

  test("lancia un errore se l'id non esiste", () => {
    const a = document.createElement("a");
    a.id = "test";
    document.body.append(a);
    expect(() => pigghiaElementuCuID("t")).toThrow('Nessun elemento trovato con "t"');
  });
});

describe("pigghiaElementi (querySelectorAll)", () => {
  test("restituisce un'istanza di Elementi", () => {
    document.body.append(document.createElement("a"), document.createElement("a"));
    expect(pigghiaElementi("a")).toBeInstanceOf(Elementi);
  });

  test("lancia un errore se non trova nessun elemento", () => {
    document.body.append(document.createElement("a"));
    expect(() => pigghiaElementi("t")).toThrow("Elementi mancanti con selettore t");
  });
});

describe("criaElementu (createElement)", () => {
  test("crea un Elementu con il tag richiesto", () => {
    const el = criaElementu("div");
    expect(el).toBeInstanceOf(Elementu);
    expect(el.nodu.tagName).toBe("DIV");
  });

  test("non lo aggiunge alla pagina", () => {
    const el = criaElementu("div");
    expect(document.body.contains(el.nodu)).toBe(false);
  });
});

describe("criaElementuEAppinniNtoCorpuduDocumentu", () => {
  test("crea l'elemento e lo aggiunge al body", () => {
    const el = criaElementuEAppinniNtoCorpuduDocumentu("a");
    expect(document.body.contains(el.nodu)).toBe(true);
  });

  test("restituisce un'istanza di Elementu", () => {
    expect(criaElementuEAppinniNtoCorpuduDocumentu("a")).toBeInstanceOf(Elementu);
  });
});

describe("appinniNtoCorpuDuDocumentu (appendChild)", () => {
  test("aggiunge un elemento al body", () => {
    const a = document.createElement("a");
    appinniNtoCorpuDuDocumentu(a);
    expect(document.body.contains(a)).toBe(true);
  });
});

describe("scutaEventu (addEventListener)", () => {
  test("esegue la funzione quando l'evento si verifica", () => {
    const spy = vi.fn();
    const el = criaElementuEAppinniNtoCorpuduDocumentu("a");
    scutaEventu(el, "focus", spy);

    el.nodu.dispatchEvent(new Event("focus"));

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(expect.any(Event));
  });

  test("non esegue la funzione per un altro evento", () => {
    const spy = vi.fn();
    const el = criaElementuEAppinniNtoCorpuduDocumentu("a");
    scutaEventu(el, "focus", spy);

    el.nodu.dispatchEvent(new Event("blur"));

    expect(spy).not.toHaveBeenCalled();
  });
});

describe("Elementu: metodi concatenabili", () => {
  test("culuri traduce un colore in sicilianu", () => {
    const el = criaElementu("p").culuri("russu");
    expect(el.nodu.style.color).toBe("red");
  });

  test("culuri lascia invariati i valori CSS normali", () => {
    const el = criaElementu("p").culuri("#ff0000");
    const riferimentu = document.createElement("p");
    riferimentu.style.color = "#ff0000";
    expect(el.nodu.style.color).toBe(riferimentu.style.color);
  });

  test("testu imposta il testo e restituisce lo stesso Elementu", () => {
    const el = criaElementu("p");
    expect(el.testu("ciao")).toBe(el);
    expect(el.nodu.textContent).toBe("ciao");
  });

  test("togghiEventu rimuove l'ascoltatore registrato", () => {
    const spy = vi.fn();
    const el = criaElementu("button").scutaEventu("click", spy);

    el.togghiEventu("click", spy);
    el.nodu.dispatchEvent(new Event("click"));

    expect(spy).not.toHaveBeenCalled();
  });
});
