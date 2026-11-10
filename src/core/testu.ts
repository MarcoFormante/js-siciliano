export class Testu extends String {
  constructor(readonly valuri: string) {
    super(String(valuri));
  }

  maiusculu(): string {
    return this.valuri.toUpperCase();
  }

  minusculu(): string {
    return this.valuri.toLowerCase();
  }

  levaSpaziu(): string {
    return this.valuri.trim();
  }
}
