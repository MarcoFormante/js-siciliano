import { ColoreCSS } from "../constants.ts";
import type {
  Color,
  CuluriSicliani,
  ProprietaStili,
  ScolluNtaVistaOpzioni,
  ValuriPer,
} from "../types.ts";
import { Elementi } from "./elementi.ts";

/**
 * Wrapper attorno a un elemento HTML, con metodi in siciliano.
 * Tutti i metodi restituiscono l'istanza stessa, quindi si possono concatenare.
 *
 * @typeParam T Tipo dell'elemento HTML contenuto (es. `HTMLAnchorElement`).
 *
 */
export class Elementu<T extends HTMLElement = HTMLElement> {
  /**
   * @param nodu Elemento HTML da avvolgere. Resta accessibile come `.nodu`.
   */
  constructor(readonly nodu: T) {}

  /**
   * Aggiunge un ascoltatore di evento all'elemento (equivale a `addEventListener`).
   *
   * @param eventu Nome dell'evento, ad esempio `"click"` o `"keydown"`.
   * Il tipo dell'evento passato alla funzione dipende da questo valore.
   * @param funzioni Funzione eseguita ogni volta che l'evento si verifica.
   * @returns L'istanza stessa, per il concatenamento.
   *
   * @remarks Per rimuoverlo con {@link togghiEventu} devi passare la stessa
   * funzione: salvala in una variabile invece di scriverla inline.
   *
   * @example
   * ```ts
   * el.scutaEventu("click", (e) => console.log(e.clientX));
   *
   * ```
   */
  scutaEventu<K extends keyof HTMLElementEventMap>(
    eventu: K,
    funzioni: (e: HTMLElementEventMap[K]) => void,
  ): this {
    this.nodu.addEventListener(eventu, funzioni);
    return this;
  }

  /**
   * Rimuove un ascoltatore di evento (equivale a `removeEventListener`).
   *
   * @param eventu Nome dell'evento usato in {@link scutaEventu}.
   * @param funzioni La **stessa** funzione registrata in precedenza.
   * Due funzioni scritte uguali ma separate non vengono considerate la stessa.
   * @returns L'istanza stessa, per il concatenamento.
   *
   * @example
   * ```ts
   * const alClick = () => el.culuri("russu");
   * el.scutaEventu("click", alClick);
   * el.togghiEventu("click", alClick);
   *
   * ```
   */
  togghiEventu<K extends keyof HTMLElementEventMap>(
    eventu: K,
    funzioni: (e: HTMLElementEventMap[K]) => void,
  ): this {
    this.nodu.removeEventListener(eventu, funzioni);
    return this;
  }

  /**
   * Imposta il testo dell'elemento (equivale a `textContent`).
   * Il testo viene inserito come testo semplice, non come HTML.
   *
   * @param valuri Testo da mostrare. Sostituisce il contenuto precedente.
   * @returns L'istanza stessa, per il concatenamento.
   */
  testu(valuri: string): this {
    this.nodu.textContent = valuri;
    return this;
  }

  /**
   * Cambia il colore del testo (equivale a `style.color`).
   *
   * @param valuri Nome di un colore siciliano (es. `"russu"`) oppure
   * qualsiasi valore CSS valido (es. `"#ff0000"`, `"rgb(0 0 0)"`).
   * @returns L'istanza stessa, per il concatenamento.
   *
   * @example
   * ```ts
   * el.culuri("russu");
   * el.culuri("#ff00aa");
   *
   * ```
   */
  culuri(valuri: Color | (string & {})): this {
    this.nodu.style.color = valuri in ColoreCSS ? ColoreCSS[valuri as CuluriSicliani] : valuri;

    return this;
  }

  /**
   * Imposta una proprietà di stile inline (equivale a `style[proprietà] = valuri`).
   * Per `color` e per le proprietà che finiscono con `Color` (come `backgroundColor`)
   * puoi usare i nomi dei colori in siciliano.
   *
   * @param proprieta Nome della proprietà in camelCase (es. `"fontSize"`,
   * non `"font-size"`).
   * @param valuri Valore della proprietà. Per le proprietà di colore accetta
   * anche i nomi siciliani; per le altre una stringa CSS normale.
   * @returns L'istanza stessa, per il concatenamento.
   *
   * @example
   * ```ts
   * el.canciaStili("backgroundColor", "giallu")
   *   .canciaStili("fontSize", "24px");
   *
   *
   * ```
   */
  canciaStili<K extends keyof ProprietaStili>(proprieta: K, valuri: ValuriPer<K>): this {
    const isColor = proprieta.endsWith("Color") || proprieta === "color";
    this.nodu.style[proprieta] = isColor
      ? valuri in ColoreCSS
        ? ColoreCSS[valuri as keyof typeof ColoreCSS]
        : valuri
      : valuri;

    return this;
  }

  /**
   * Aggiunge l'elemento in fondo al `<body>` (equivale a `document.body.appendChild`).
   * Se l'elemento è già nella pagina, viene spostato.
   *
   * @returns L'istanza stessa, per il concatenamento.
   */
  appinniNtoCorpuDuDocumentu(): this {
    document.body.appendChild(this.nodu);
    return this;
  }

  appinniNtaNuNodu(radice: Node): this {
    if (radice instanceof Node) {
      radice.appendChild(this.nodu);
    } else {
      throw new Error("La radice deve essere un tipo NODE");
    }
    return this;
  }

  appinniChidduChiVoi(...cosi: Array<string | number | Node | Elementu | Elementi>): this {
    let array: Array<string | Node> = [];
    cosi.forEach((cosu) => {
      if (cosu instanceof Elementu) {
        array.push(cosu.nodu);
      } else if (cosu instanceof Elementi) {
        cosu.pirOgnunu((el) => {
          array.push(el.nodu);
        });
      } else if (cosu instanceof Node) {
        array.push(cosu);
      }
    });
    this.nodu.append(...array);
    return this;
  }

  readonly classi = {
    nova: (nomiDaClassi: string | string[]): this => {
      this.nodu.classList.add(...(Array.isArray(nomiDaClassi) ? nomiDaClassi : [nomiDaClassi]));
      return this;
    },
    leva: (nomiDaClassi: string | string[]): this => {
      this.nodu.classList.remove(...(Array.isArray(nomiDaClassi) ? nomiDaClassi : [nomiDaClassi]));
      return this;
    },
    addumaStutaClassi: (nomiDaClassi: string, fozza?: boolean): this => {
      this.nodu.classList.toggle(nomiDaClassi, fozza);
      return this;
    },
  };

  indirizzuVersu(this: Elementu<HTMLAnchorElement>, url: string): Elementu {
    this.nodu.href = url;
    return this;
  }

  /**
   * ⚠️ ATTENZIONE: questo metodo usa `innerHTML` e può esporre a XSS.
   * Non passare mai stringhe provenienti da input utente non sanitizzato.
   */
  /**
   * Legge o imposta l'HTML interno dell'elemento (equivale a `innerHTML`).
   *
   * @param html Stringa HTML o elemento da inserire. Se omesso, restituisce l'HTML attuale.
   * @returns L'istanza stessa (per il concatenamento) se viene passato un valore,
   * oppure una stringa con l'HTML interno se chiamato senza argomenti.
   *
   * @warning **Rischio XSS**: non passare mai stringhe provenienti da input utente
   * non sanitizzato. Usa {@link testu} per inserire testo in modo sicuro.
   */
  /**
   * Legge o imposta l'HTML interno dell'elemento (equivale a `innerHTML`).
   *
   * @param html Stringa HTML o elemento da inserire. Se omesso, restituisce l'HTML attuale.
   * @returns L'istanza stessa (per il concatenamento) se viene passato un valore,
   * oppure una stringa con l'HTML interno se chiamato senza argomenti.
   *
   * @warning **Rischio XSS**: non passare mai stringhe provenienti da input utente
   * non sanitizzato. Usa {@link testu} per inserire testo in modo sicuro.
   */
  htmlDintra(html?: string | HTMLElement): this | string {
    if (typeof html === "string") {
      this.nodu.innerHTML = html;
      return this;
    } else if (html instanceof HTMLElement) {
      this.nodu.innerHTML = html.outerHTML;
      return this;
    } else {
      return this.nodu.innerHTML;
    }
  }

  aFocu(): this {
    this.nodu.focus();
    return this;
  }

  sfoca(): this {
    this.nodu.blur();
    return this;
  }

  mettiAttribbutu(nomiAttribbutu: string, valuri: string): this {
    this.nodu.setAttribute(nomiAttribbutu, valuri);
    return this;
  }

  pigghiaAttributu(nomiAttribbutu: string): string | null {
    return this.nodu.getAttribute(nomiAttribbutu);
  }

  levaAttributu(nomiAttribbutu: string): this {
    this.nodu.removeAttribute(nomiAttribbutu);
    return this;
  }

  clicca(): this {
    this.nodu.click();
    return this;
  }

  scrullaNtaVista(argumenti?: boolean | ScolluNtaVistaOpzioni): this {
    this.nodu.scrollIntoView(argumenti);
    return this;
  }

  levaElementu(): this {
    this.nodu.remove();
    return this;
  }
}
