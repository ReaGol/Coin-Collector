import { fetchExchangeRates } from "../../../utils/api";

export async function GET() {
  try {
    const data = await fetchExchangeRates();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching data from ExchangeRate-API" }),
      { status: 500 }
    );
  }
}
