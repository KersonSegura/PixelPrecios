const RAWG_API_KEY = process.env.RAWG_API_KEY!;
const RAWG_BASE_URL = "https://api.rawg.io/api";

export async function getTrendingGamesRAWG() {
  const url = `${RAWG_BASE_URL}/games/lists/popular?key=${RAWG_API_KEY}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("Error fetching RAWG data", err);
    throw err;
  }
}

export async function searchGameRAWG(query: string) {
  const url = `${RAWG_BASE_URL}/games?search=${encodeURIComponent(query)}&key=${RAWG_API_KEY}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("RAWG search failed", err);
    throw err;
  }
} 