import { Elementu } from "./core/elementu.ts";
import { Elementi } from "./core/elementi.ts";
import { Testu } from "./core/testu.ts";

export function mannaLogNtaConsol(data: any) {
  console.log(data);
}

export function mannaAlletta(data: any) {
  alert(data);
}

export function uora() {
  return Date.now();
}

export function accuminciaCu(testu: string, target: string) {
  return testu.startsWith(target);
}

export function spetta(tempu: number, funzioni: Function, ...argumenti: any[]): number {
  return setTimeout(funzioni, tempu, ...argumenti);
}

export function pirOgniIntervallu(tempu: number, funzioni: Function, ...argumenti: any[]): number {
  return setInterval(funzioni, tempu, ...argumenti);
}

export function pirOgnunu<T extends HTMLElement>(
  cosi: Elementi<T>,
  chidduChiFa: (el: Elementu<T>, i: number) => void,
): void;

export function pirOgnunu<T>(cosi: readonly T[], chidduChiFa: (el: T, i: number) => void): void;

export function pirOgnunu(
  cosi: Elementi<any> | readonly unknown[],
  chidduChiFa: (el: any, i: number) => void,
): void {
  if (cosi instanceof Elementi) {
    cosi.pirOgnunu(chidduChiFa);
  } else {
    cosi.forEach(chidduChiFa);
  }
}

export function trova<T extends HTMLElement>(
  cosi: Elementi<T>,
  richiamu: (el: Elementu<T>, i: number) => unknown,
): Elementu<T> | undefined;

export function trova<T>(
  cosi: readonly T[],
  richiamu: (el: T, i: number) => unknown,
): T | undefined;

export function trova(
  cosi: Elementi<any> | readonly unknown[],
  richiamu: (el: any, i: number) => unknown,
): unknown {
  return cosi instanceof Elementi ? cosi.trova(richiamu) : cosi.find(richiamu);
}

//Testu
export function criaTestu(testu: any) {
  return new Testu(testu.toString());
}
