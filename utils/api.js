import axios from "axios";

const headers = {
  "Numista-API-Key": process.env.NEXT_PUBLIC_NUMISTA_API_KEY,
};

export const fetchCoinData = async (query) => {
  try {
    const response = await axios.get(
      `https://api.numista.com/api/v3/types?q=${query}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching coin data:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};


export const fetchExchangeRates = async (baseCurrency = "USD") => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
    );
    return response.data.conversion_rates;
  } catch (error) {
    console.error(
      "Error fetching exchange rates:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};


export const fetchCurrencyCodes = async () => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/codes`
    );
    return response.data.supported_codes;
  } catch (error) {
    console.error(
      "Error fetching currency codes:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};