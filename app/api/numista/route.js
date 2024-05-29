

import { fetchCoinData } from "../../../utils/api";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "liberty";
  console.log("Server - Query: ", query);

  try {

       
    const data = await fetchCoinData(query);
    if (data && data.types) {
      return new Response(JSON.stringify(data.types), { status: 200 });
    } else {
      return new Response(JSON.stringify([]), { status: 200 });
    }
  } catch (error) {
    console.error("Server - Error: ", error);
    return new Response(
      JSON.stringify({ error: "Error fetching data from Numista API" }),
      { status: 500 }
    );
  }
}
