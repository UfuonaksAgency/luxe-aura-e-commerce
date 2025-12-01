import React, { createContext, useContext, useState } from 'react';

type Currency = 'NGN' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  formatPrice: (priceNGN: number, priceUSD: number) => string;
  formatSinglePrice: (price: number, currency: Currency) => string;
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

  const formatSinglePrice = (price: number, currency: Currency): string => {
    if (currency === 'NGN') {
      return `₦${price.toLocaleString()}`;
    }
    return `$${price}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice, formatSinglePrice }}>
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
