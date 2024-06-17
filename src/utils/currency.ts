import currency from 'currency.js';

export const toTSH = (price: string) =>
  currency(price).format({
    precision: 2,
    symbol: 'Tsh ',
  });
