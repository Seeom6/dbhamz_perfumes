// client/src/utils/currency.js
export const exchangeRates = {
  KWD: 1, // Base currency (Kuwaiti Dinar)
  SAR: 12.18, // 1 KWD = 12.18 SAR
  AED: 11.95, // 1 KWD = 11.95 AED
  QAR: 12.32, // 1 KWD = 12.32 QAR
  BHD: 1.22,  // 1 KWD = 1.22 BHD
  OMR: 1.26,  // 1 KWD = 1.26 OMR
  };
  
  export const convertCurrency = (amount, fromCurrency, toCurrency) => {
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    return (amount * rate).toFixed(2);
  };