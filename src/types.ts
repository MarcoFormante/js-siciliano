import type { ColoreCSS } from "./constants.ts";

/** RGB color in functional notation (e.g. rgb(255, 0, 0)) */
export type RGB = `rgb(${number}, ${number}, ${number})`;

/** RGBA color in functional notation (e.g. rgba(255, 0, 0, 0.5)) */
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;

/** HSL color in functional notation (e.g. hsl(0, 100%, 50%)) */
export type HSL = `hsl(${number}, ${number}%, ${number}%)`;

/** HSLA color in functional notation (e.g. hsla(0, 100%, 50%, 0.5)) */
export type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;

/** Hexadecimal color (e.g. #ff0000, #f00) */
export type HEX = `#${string}`;

/** Modern space-separated RGB(A) notation (e.g. rgb(255 0 0 / 50%)) */
export type ModernRGB = `rgb(${number} ${number} ${number}${"" | ` / ${number}%`})`;

/** Modern space-separated HSL(A) notation (e.g. hsl(0 100% 50% / 50%)) */
export type ModernHSL = `hsl(${number} ${number}% ${number}%${"" | ` / ${number}%`})`;

/** CSS color keywords (e.g. 'red', 'blue', 'transparent') */

/** CSS custom property reference (e.g. var(--my-color)) */
export type CSSVar = `var(${string})`;

export type CuluriSicliani = keyof typeof ColoreCSS;

/** Any valid CSS color value */
export type Color = RGB | RGBA | HSL | HSLA | HEX | ModernRGB | ModernHSL | CuluriSicliani | CSSVar;

export type ProprietaStili = {
  [
    K in keyof CSSStyleDeclaration as K extends string
      ? CSSStyleDeclaration[K] extends string
        ? K
        : never
      : never
  ]: CSSStyleDeclaration[K];
};

export type ProprietaStiliCuluri = Extract<keyof ProprietaStili, "color" | `${string}Color`>;

export type ValuriPer<K extends keyof ProprietaStili> = K extends ProprietaStiliCuluri
  ? CuluriSicliani | (string & {})
  : string;

type PosizioniLuogicaDuScrollu = "center" | "end" | "nearest" | "start";
type CumpurtamentuDuScrollu = "auto" | "instant" | "smooth";

interface ScrolluOpzioni {
  behavior?: CumpurtamentuDuScrollu;
}

export interface ScolluNtaVistaOpzioni extends ScrolluOpzioni {
  bloccu?: PosizioniLuogicaDuScrollu;
  alliniatu?: PosizioniLuogicaDuScrollu;
}
