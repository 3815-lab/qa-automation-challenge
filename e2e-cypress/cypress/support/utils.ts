import type { Product } from './types';

const toCents = (amount: number): number => Math.round(amount * 100);

/** Suma montos trabajando en centavos para no arrastrar errores de punto flotante */
export const sumAmounts = (...amounts: number[]): number =>
  amounts.reduce((cents, amount) => cents + toCents(amount), 0) / 100;

export const sumPrices = (products: Product[]): number =>
  sumAmounts(...products.map(({ price }) => price));

/** "Item total: $39.98" -> 39.98 */
export const parsePrice = (text: string): number => {
  const match = text.match(/\$(\d+(?:\.\d+)?)/);
  if (!match) {
    throw new Error(`No se encontro un precio en el texto "${text}"`);
  }
  return Number(match[1]);
};

export const formatPrice = (amount: number): string => `$${amount.toFixed(2)}`;

/** Textos de una lista de elementos, en el orden en que aparecen en pantalla */
export const textsOf = ($elements: JQuery<HTMLElement>): string[] =>
  $elements.toArray().map((element) => element.innerText.trim());
