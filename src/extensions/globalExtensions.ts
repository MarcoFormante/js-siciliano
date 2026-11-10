declare global {
  interface String {
    maiusculu(): string;
    minusculu(): string;
    levaSpaziu(): string;
    levaSpaziJanchi(): string;
    al(innice: number): string | undefined;
    carattiriAl(posizioni: number): string;
    inniceDi(ceccaTestu: string, posizioni?: number): number;
    cunteni(ceccaTestu: string, posizioni?: number): boolean;
    lunghizza(): number;
  }

  interface Number {
    fissu(fraziuniDigitati?: number): string;
    precisu(nummuruPrecisu?: number): string;
    trasfommaInTestu(): string;
  }

  interface Array<T> {
    spinci(...items: T[]): this;
    lunghizza(): number;
  }
}

String.prototype.maiusculu = function () {
  return this.toUpperCase();
};

String.prototype.minusculu = function () {
  return this.toLowerCase();
};

String.prototype.levaSpaziu = function () {
  return this.trim();
};

String.prototype.levaSpaziJanchi = function () {
  return this.replaceAll(" ", "");
};

String.prototype.al = function (innice: number): string | undefined {
  return this.at(innice);
};

String.prototype.carattiriAl = function (posizioni: number) {
  return this.charAt(posizioni);
};

String.prototype.inniceDi = function (ceccaTestu: string, posizioni?: number): number {
  return this.indexOf(ceccaTestu, posizioni);
};

String.prototype.cunteni = function (ceccaTestu: string, posizioni?: number): boolean {
  return this.includes(ceccaTestu, posizioni);
};

String.prototype.lunghizza = function () {
  return this.length;
};

Number.prototype.fissu = function (fraziuniDigitati?: number) {
  return this.toFixed(fraziuniDigitati);
};

Number.prototype.precisu = function (nummuruPrecisu?: number) {
  return this.toPrecision(nummuruPrecisu);
};

Number.prototype.trasfommaInTestu = function () {
  return this.toString();
};

Array.prototype.spinci = function (...items: any[]) {
  this.push(...items);
  return this;
};

Array.prototype.lunghizza = function () {
  return this.length;
};

export {};
