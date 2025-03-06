// client/src/utils/currency.js
export const exchangeRates = {
    SAR: 1, // Base currency
    AED: 0.98,
    KWD: 0.082,
    QAR: 1.01,
    BHD: 0.1,
  };
  
  export const convertCurrency = (amount, fromCurrency, toCurrency) => {
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    return (amount * rate).toFixed(2);
  };