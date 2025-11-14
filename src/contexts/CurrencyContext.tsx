import React, { createContext, useContext, useState } from 'react';

type Currency = 'NGN' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  formatPrice: (priceNGN: number, priceUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('NGN');

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'NGN' ? 'USD' : 'NGN');
  };

  const formatPrice = (priceNGN: number, priceUSD: number): string => {
    if (currency === 'NGN') {
      return `₦${priceNGN.toLocaleString()}`;
    }
    return `$${priceUSD}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
