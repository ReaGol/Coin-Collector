

import { fetchExchangeRates, fetchCurrencyCodes } from '../../../utils/api';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const baseCurrency = searchParams.get("baseCurrency");
  const fetchCodes = searchParams.get("fetchCodes");

  try {
    let data;
    if (fetchCodes === "true") {
      data = await fetchCurrencyCodes();
    } else if (baseCurrency) {
      data = await fetchExchangeRates(baseCurrency); 
    }

    if (data) {
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response(JSON.stringify([]), { status: 200 });
    }
  } catch (error) {
    console.error("Server - Error:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching data from API" }),
      { status: 500 }
    );
  }
}