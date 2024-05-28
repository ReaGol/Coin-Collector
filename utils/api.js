import axios from "axios";

const headers = {
  "Numista-API-Key": process.env.NEXT_PUBLIC_NUMISTA_API_KEY,
  // 'EXCHANGERATE_API_KEY': process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY,
};

export const fetchCoinData = async (query) => {
  try {
    console.log("Fetching coin data for query: ", query);
    const response = await axios.get(
      `https://api.numista.com/api/v3/types?q=${query}`,
      {
        headers,
      }
    );
    console.log("Coin Data Response: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching coin data:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

// export const fetchExchangeRates = async (baseCurrency = "USD") => {
//   try {
//     const response = await axios.get(
//       `https://v6.exchangerate-api.com/v6/${EXCHANGERATE_API_KEY}/latest/${baseCurrency}`,
//       {
//         headers,
//       }
//     );
//     return response.data.conversion_rates;
//   } catch (error) {
//     console.error("Error fetching exchange rates:", error);
//     return null;
//   }
// };
