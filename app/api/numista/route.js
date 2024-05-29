


import { fetchCoinData } from "../../../utils/api";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "liberty";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "9", 10);
  const offset = (page - 1) * limit;

  try {
    const data = await fetchCoinData(query);
    if (data && data.types) {
      const paginatedData = data.types.slice(offset, offset + limit);
      return new Response(
        JSON.stringify({ coins: paginatedData, total: data.types.length }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ coins: [], total: 0 }), {
        status: 200,
      });
    }
  } catch (error) {
    console.error("Server - Error:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching data from Numista API" }),
      { status: 500 }
    );
  }
}
