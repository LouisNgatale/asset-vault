import currency from 'currency.js';

export const toTSH = (price: string | number | currency = '') =>
  currency(price).format({
    precision: 2,
    symbol: 'Tsh ',
  });
