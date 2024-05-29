


"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const fetchCurrencyCodes = async () => {
  try {
    const response = await axios.get("/api/exchangeRate?fetchCodes=true");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching currency codes:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

const fetchExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(
      `/api/exchangeRate?baseCurrency=${baseCurrency}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching exchange rates:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

const ExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencyCodes, setCurrencyCodes] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("GBP");
  const [conversionRate, setConversionRate] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const codes = await fetchCurrencyCodes();
      if (codes) {
        setCurrencyCodes(codes);
      }

      const rates = await fetchExchangeRates(baseCurrency);
      if (rates) {
        setExchangeRates(rates);
      }
    };
    fetchInitialData();
  }, [baseCurrency]);

  const handleConversion = async () => {
    if (fromCurrency && toCurrency) {
      const rates = await fetchExchangeRates(fromCurrency);
      if (rates && rates[toCurrency]) {
        setConversionRate(rates[toCurrency]);
      } else {
        setConversionRate(null);
      }
    }
  };

  useEffect(() => {
    handleConversion();
  }, [fromCurrency, toCurrency]);

  return (
    <div className='container mx-auto p-4'>
      <div className='conversion mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Convert Currency</h2>
        <div className='flex flex-col sm:flex-row items-center mb-4'>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className='border p-2 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-48'
          >
            {currencyCodes.map(([code, name]) => (
              <option key={code} value={code}>
                {name} ({code})
              </option>
            ))}
          </select>
          <span className='mx-2'>to</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className='border p-2 ml-2 w-full sm:w-48'
          >
            {currencyCodes.map(([code, name]) => (
              <option key={code} value={code}>
                {name} ({code})
              </option>
            ))}
          </select>
        </div>
        {conversionRate !== null && (
          <div className='p-4 bg-white rounded-lg w-full shadow-md mb-8'>
            <p className='text-xl w-full sm:w-48 '>
              1 {fromCurrency} = {conversionRate} {toCurrency}
            </p>
          </div>
        )}
      </div>
      <div className='exchange-rates'>
        <h2 className='text-2xl font-bold mb-4'>
          Exchange Rates (Base: {baseCurrency})
        </h2>
        <select
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className='border p-2 mb-4 overflow-x-auto w-full sm:w-48'
        >
          {currencyCodes.map(([code, name]) => (
            <option key={code} value={code}>
              {name} ({code})
            </option>
          ))}
        </select>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {Object.entries(exchangeRates).map(([currency, rate]) => (
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
