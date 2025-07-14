const STEAM_API_KEY = process.env.STEAM_API_KEY!;
const BASE_URL = "https://store.steampowered.com/api";

export async function getAppDetails(appId: string, country = "us") {
  const url = `${BASE_URL}/appdetails?appids=${appId}&cc=${country}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[appId]?.data;
  } catch (err) {
    console.error("Steam API failed", err);
    throw err;
  }
} 