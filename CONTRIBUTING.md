# Contribuire a js-siciliano 🍋

Prima di tutto: grazie per l'interesse! Questo progetto accoglie contributi di ogni tipo — nuovi nomi siciliani, funzioni DOM, correzioni, test o miglioramenti alla documentazione.

> **English:** contributions are welcome in any language. Code and names should follow the Sicilian naming conventions; feel free to open an issue in English if you need guidance.

## Indice

- [Prerequisiti](#prerequisiti)
- [Setup del progetto](#setup-del-progetto)
- [Struttura del progetto](#struttura-del-progetto)
- [Come contribuire](#come-contribuire)
- [Convenzioni sui nomi](#convenzioni-sui-nomi)
- [Checklist prima di aprire una PR](#checklist-prima-di-aprire-una-pr)
- [Sicurezza](#sicurezza)

---

## Prerequisiti

- **Node.js** ≥ 22
- **pnpm** ≥ 12 — il progetto usa pnpm come package manager
- **Vite+** (`vite-plus`) — installato automaticamente con `pnpm install`

## Setup del progetto

```bash
# 1. Forka il repository su GitHub, poi clonalo
git clone https://github.com/<tuo-utente>/js-siciliano.git
cd js-siciliano

# 2. Installa le dipendenze
pnpm install

# 3. Avvia la build in modalità watch (si ricompila ad ogni modifica)
pnpm dev

# 4. Apri il playground nel browser per testare manualmente
pnpm vp dev --entry playground/index.html
```

---

## Struttura del progetto

```
src/
├── index.ts                      # Entry point principale — esporta tutto
├── types.ts                      # Tipi TypeScript condivisi
├── constants.ts                  # Costanti (es. ColoreCSS con i colori in siciliano)
├── functions.ts                  # Funzioni standalone (spetta, pirOgnunu, trova…)
├── dom.ts                        # Funzioni per il DOM (pigghiaElementu, criaElementu…)
└── core/
│   ├── elementu.ts               # Classe Elementu — wrapper su HTMLElement
│   └── elementi.ts               # Classe Elementi — lista di Elementu
└── extensions/
    └── globalExtensions.ts       # Estensioni su String, Number e Array (opt-in)

playground/
├── index.html                    # Pagina HTML per i test manuali nel browser
└── app.js                        # Script di prova (non fa parte della libreria)

tests/                            # Test automatici con Vitest
```

---

## Come contribuire

### 1. Aggiungere un nuovo nome siciliano

La tabella di riferimento dei nomi è in [`funzioni.md`](./funzioni.md).

- Se vuoi aggiungere una **funzione standalone** (es. `fetch` → `vaPigghia`), aggiungila in `src/functions.ts` o `src/dom.ts`.
- Se vuoi aggiungere un **metodo su `Elementu`**, modificalo in `src/core/elementu.ts`.
- Se vuoi aggiungere un **metodo su `String`, `Number` o `Array`**, modificalo in `src/extensions/globalExtensions.ts` (ricorda di aggiornare sia il `declare global` che il `prototype`).

### 2. Aprire una Issue prima di iniziare

Per modifiche importanti (nuove API, refactor, cambiamenti ai tipi) è meglio aprire prima una Issue per discutere l'approccio. Per fix semplici o documentazione puoi aprire direttamente una Pull Request.

### 3. Creare un branch

```bash
git checkout -b feat/vaPigghia-fetch
# oppure
git checkout -b fix/pigghiaAttributu-return
```

### 4. Scrivere i test

I test sono nella cartella `tests/` e usano [Vitest](https://vitest.dev/) con `happy-dom`.

```bash
pnpm vp test          # esegui i test una volta
pnpm vp test --watch  # esegui in modalità watch
```

Ogni nuova funzione o metodo dovrebbe avere almeno un test di base.

### 5. Aprire la Pull Request

Descrivi brevemente **cosa hai aggiunto** e **perché**. Se riguarda un nome in siciliano, spiega anche l'equivalente in italiano o inglese.

---

## Convenzioni sui nomi

I nomi seguono il siciliano parlato, non l'italiano. Alcune regole pratiche:

| Italiano | Siciliano | Esempio nel codice |
|---|---|---|
| elemento | `elementu` | `Elementu`, `criaElementu` |
| elementi | `elementi` | `Elementi`, `pigghiaElementi` |
| testo | `testu` | `testu()`, `criaTestu()` |
| colore | `culuri` | `culuri()`, `ColoreCSS` |
| lunghezza | `lunghizza` | `.lunghizza()` |
| per ognuno | `pirOgnunu` | `pirOgnunu()` |
| aspetta | `spetta` | `spetta()` |
| contiene | `cunteni` | `cunteni()` |
| aggiunge | `junci` / `appinni` | `appinniNtoCorpuDuDocumentu()` |

Se non sei sicuro di una traduzione, aprila come Issue o proponi più alternative nella PR — i parlanti siciliani sono benvenuti!

---

## Checklist prima di aprire una PR

Esegui tutti i comandi qui sotto e assicurati che non ci siano errori:

```bash
pnpm vp check        # formattazione e linting
pnpm vp test         # test automatici
pnpm run build       # build della libreria
```

> **Nota:** `vp check` esegue automaticamente la formattazione con `--fix` se trovi problemi di stile. Puoi anche eseguire `vp check --fix` direttamente.

---

## Sicurezza

Se trovi una **vulnerabilità di sicurezza**, non aprire una Issue pubblica: contatta l'autore direttamente via email (vedi `package.json`).

Per quanto riguarda il codice della libreria:

- **`htmlDintra()`** usa `innerHTML` internamente: è documentato come unsafe. Non aggiungere metodi che inseriscono HTML non sanitizzato senza documentarlo chiaramente con `@warning`.
- **Le estensioni su `prototype`** (in `globalExtensions.ts`) sono opt-in: non aggiungere side effects all'entry point principale (`src/index.ts`).

---

_Fatta pi siciliani, cu l'aiutu i tutti._ 🍋
