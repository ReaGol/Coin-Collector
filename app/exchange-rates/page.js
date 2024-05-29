'use client'

import { useState, useEffect } from "react";
import { fetchExchangeRates } from "../../utils/api";

const ExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD");

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await fetchExchangeRates(baseCurrency);
      setExchangeRates(rates);
    };
    fetchRates();
  }, [baseCurrency]);

  return (
    <div className='container mx-auto p-4'>
      <div className='exchange-rates'>
        <h2 className='text-2xl font-bold mb-4'>
          Exchange Rates (Base: {baseCurrency})
        </h2>
        <select
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className='border p-2 mb-4'
        >
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
          <option value='GBP'>GBP</option>
          <option value='ILS'>ILS</option>
         
        </select>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {exchangeRates &&
            Object.entries(exchangeRates).map(([currency, rate]) => (
              <div key={currency} className='p-4 bg-white rounded-lg shadow-md'>
                <p className='text-xl'>
                  {currency}: {rate}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;
