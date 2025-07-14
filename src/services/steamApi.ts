const STEAM_API_KEY = process.env.STEAM_API_KEY!;
const BASE_URL = "https://store.steampowered.com/api";

export interface SteamGameDetails {
  data: {
    name: string;
    header_image: string;
    short_description: string;
    developers?: string[];
    publishers?: string[];
    genres?: Array<{ description: string }>;
    categories?: Array<{ description: string }>;
    price_overview?: {
      final: number;
      initial: number;
      discount_percent: number;
    };
    achievements?: {
      total: number;
    };
    screenshots?: Array<{
      id: number;
      path_thumbnail: string;
      path_full: string;
    }>;
    platforms?: {
      windows?: boolean;
      mac?: boolean;
      linux?: boolean;
    };
    release_date?: {
      coming_soon: boolean;
      date: string;
    };
  };
}

export interface SteamAchievement {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  hidden: number;
}

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

export async function getGameDetails(appId: number): Promise<SteamGameDetails> {
  const url = `${BASE_URL}/appdetails?appids=${appId}&cc=us`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[appId.toString()];
  } catch (err) {
    console.error("Steam API failed", err);
    throw err;
  }
}

export async function getGameSchema(appId: number) {
  const url = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${STEAM_API_KEY}&appid=${appId}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.response;
  } catch (err) {
    console.error("Steam Schema API failed", err);
    throw err;
  }
}

export function getAchievementIconUrl(appId: number, iconName: string): string {
  return `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${appId}/${iconName}`;
}

// Crear el objeto steamApiService que están importando los componentes
export const steamApiService = {
  getGameDetails,
  getGameSchema,
  getAchievementIconUrl
}; 