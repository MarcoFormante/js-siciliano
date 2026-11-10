# js-siciliano 🍋

[![npm](https://img.shields.io/npm/v/js-siciliano)](https://www.npmjs.com/package/js-siciliano)
[![licenza: MIT](https://img.shields.io/badge/licenza-MIT-green)](./LICENSE)

**JavaScript con i nomi in sicilianu.** Una libreria TypeScript che avvolge le API del DOM con nomi in sicilianu, con metodi concatenabili e tipi completi.

> **English:** a small TypeScript library that wraps common DOM APIs with Sicilian method names, chainable and fully typed. Open source, contributions welcome, especially from Sicilian speakers.

> ⚠️ **Stato del progetto:** versione sperimentale (`0.x`). Le API possono cambiare tra una versione e l'altra.

```ts
import { criaElementu } from "js-siciliano";

criaElementu("a").testu("Ciao Sicilia!").culuri("russu").appinniNtoCorpuDuDocumentu();
```

## Indice

- [Installazione](#installazione)
- [Uso](#uso)
- [Cosa c'è dentro](#cosa-cè-dentro)
- [Colori in sicilianu](#colori-in-sicilianu)
- [Licenza](#licenza)

## Installazione

```bash
npm install js-siciliano
# oppure
pnpm add js-siciliano
```

La libreria è un modulo ES (ESM) con i tipi TypeScript inclusi. Se usi TypeScript, nel `tsconfig.json` del tuo progetto `moduleResolution` deve essere `"bundler"` o `"nodenext"`, altrimenti i sottopercorsi come `/globale` non vengono trovati.

## Uso

### Import con nome (consigliato)

```ts
import { pigghiaElementu, criaElementu } from "js-siciliano";

pigghiaElementu(".titulu")?.culuri("giallu");
```

Importi solo ciò che usi, e il bundler elimina il resto.

### Funzioni globali (facoltativo)

Se vuoi scrivere senza import dei singoli nomi, importa una volta il modulo globale:

```ts
import "js-siciliano/globale";

pigghiaElementu("a");
"ciao".maiusculu(); // "CIAO"
```

Questo modulo modifica oggetti globali (per esempio `String.prototype`), quindi è una scelta esplicita: se non lo importi, non cambia nulla nell'ambiente. Può entrare in conflitto con altre librerie che definiscono gli stessi nomi.

### Browser e Node

La libreria lavora sul DOM, quindi **funziona nel browser**. In Node puoi importarla senza errori, ma le funzioni che toccano la pagina (come `pigghiaElementu`) hanno bisogno di un DOM, per esempio quello di `jsdom`.

## Cosa c'è dentro

### Funzioni

| Siciliano                           | Equivale a               | Note                                                 |
| ----------------------------------- | ------------------------ | ---------------------------------------------------- |
| `criaElementu(tag)`                 | `document.createElement` | restituisce un `Elementu` con il tipo giusto del tag |
| `pigghiaElementu(selettori)`        | `querySelector`          | restituisce `Elementu` oppure `null`                 |
| `pigghiaElementi(selettori)`        | `querySelectorAll`       | restituisce un oggetto `Elementi`                    |
| `scutaEventu(elementu, evento, fn)` | `addEventListener`       |                                                      |
| `pirOgnunu(lista, fn)`              | `forEach`                | funziona su `Elementi` e su array                    |
| `trova(lista, fn)`                  | `find`                   | funziona su `Elementi` e su array                    |
| `mannaAlletta(dati)`                | `alert`                  | nel browser mostra l'avviso                          |
| `uCorpuDuDocumentu()`               | `document.body`          |                                                      |

### Metodi di `Elementu`

Ogni metodo concatenabile restituisce l'`Elementu` stesso. Il nodo HTML vero resta sempre accessibile come `.nodu`.

| Siciliano                                | Equivale a                                    |
| ---------------------------------------- | --------------------------------------------- |
| `scutaEventu(evento, fn)`                | `addEventListener`                            |
| `togghiEventu(evento, fn)`               | `removeEventListener`                         |
| `testu(valuri)`                          | `textContent`                                 |
| `htmlDintra(html)`                       | `innerHTML`                                   |
| `culuri(valuri)`                         | `style.color` (accetta i colori in sicilianu) |
| `mudificaStili(proprieta, valuri)`       | `style[proprieta]`                            |
| `classi.nova / leva / addumaStutaClassi` | `classList.add / remove / toggle`             |
| `indirizzuVersu(url)`                    | `href` (solo sui link)                        |
| `appinniNtoCorpuDuDocumentu()`           | `document.body.appendChild`                   |
| `appinniNtaNuNodu(radice)`               | `appendChild` su un nodo a scelta             |

### Metodi di `Elementi` (liste)

| Siciliano       | Equivale a                                 |
| --------------- | ------------------------------------------ |
| `filtra(fn)`    | `filter` (restituisce un nuovo `Elementi`) |
| `pirOgnunu(fn)` | `forEach`                                  |
| `trova(fn)`     | `find`                                     |
| `lunghizza`     | `length`                                   |

### Stringhe (modulo globale)

| Siciliano             | Equivale a      |
| --------------------- | --------------- |
| `"testo".maiusculu()` | `toUpperCase()` |
| `"testo".minusculu()` | `toLowerCase()` |

### Esempio completo

```ts
import { pigghiaElementi, criaElementu } from "js-siciliano";

// Colora i paragrafi dispari
pigghiaElementi("p")
  .filtra((el, i) => i % 2 === 0)
  .pirOgnunu((el) => el.culuri("russu"));

// Crea un bottone con un evento
const alClick = () => alert("Ciao!");

criaElementu("button").testu("Cliccami").scutaEventu("click", alClick).appinniNtoCorpuDuDocumentu();
```

Per togliere un ascoltatore con `togghiEventu` serve la **stessa funzione** passata a `scutaEventu`: salvala in una variabile (`alClick`) invece di scriverla due volte inline.

## Colori in sicilianu

I metodi `culuri` e `mudificaStili` (per `color` e per le proprietà che finiscono con `Color`, come `backgroundColor`) accettano nomi di colore in sicilianu, oltre ai normali valori CSS.

```ts
el.culuri("russu"); // red
el.mudificaStili("backgroundColor", "giallu"); // yellow
el.culuri("#13234d"); // valore CSS normale
```

Alcuni esempi: `russu` (red), `virdi` (green), `blu` (blue), `giallu` (yellow), `aranciuni` (orange), `viola` (purple), `niru` (black), `jancu` (white), `grigiu` (gray). L'elenco completo è nel codice, in `src/constants.ts`.

## Licenza

Distribuito con licenza MIT, vedi il file [LICENSE](./LICENSE).

---


Vuoi contribuire? Leggi CONTRIBUTING.md.

_Fatta pi siciliani, cu l'aiutu di tutti._ 🍋

