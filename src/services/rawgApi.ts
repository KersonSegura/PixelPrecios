const RAWG_API_KEY = process.env.RAWG_API_KEY!;
const RAWG_BASE_URL = "https://api.rawg.io/api";

export interface RAWGGame {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  rating_top: number;
  released: string;
  metacritic: number;
  playtime: number;
  platforms: Array<{
    platform: {
      id: number;
      name: string;
    };
  }>;
  genres: Array<{
    id: number;
    name: string;
  }>;
}

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

export async function getGameDetailsFromRAWG(id: string): Promise<RAWGGame | null> {
  const url = `${RAWG_BASE_URL}/games/${id}?key=${RAWG_API_KEY}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("RAWG game details failed", err);
    return null;
  }
}

export async function searchAndGetBestMatch(query: string): Promise<RAWGGame | null> {
  try {
    const results = await searchGameRAWG(query);
    if (results && results.length > 0) {
      return results[0];
    }
    return null;
  } catch (err) {
    console.error("RAWG search and match failed", err);
    return null;
  }
}

// Crear el objeto rawgApiService que están importando los componentes
export const rawgApiService = {
  getTrendingGamesRAWG,
  searchGameRAWG,
  getGameDetailsFromRAWG,
  searchAndGetBestMatch
}; 