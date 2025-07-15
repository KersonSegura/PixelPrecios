const ITAD_API_KEY = process.env.ITAD_API_KEY!;
const BASE_URL = "https://api.isthereanydeal.com";

export interface ITADGame {
  id: string;
  title: string;
  image: string;
  plain: string;
}

// Función para hacer lookup de títulos a IDs
async function lookupGameIds(titles: string[]) {
  const url = `${BASE_URL}/lookup/id/title/v1?key=${ITAD_API_KEY}`;
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(titles)
    });
    
    const data = await res.json();
    console.log("ITAD lookup response:", JSON.stringify(data, null, 2));
    return data;
  } catch (err) {
    console.error("Error in ITAD lookup:", err);
    throw err;
  }
}

// Función para obtener precios usando IDs
export async function getPricesByIds(ids: string[], region = 'us', country = 'US') {
  if (!ids.length) return {};

  const params = ids.map(id => `ids[]=${encodeURIComponent(id)}`).join('&');
  const shops = 'steam,gog,epic';
  const url = `${BASE_URL}/games/prices/v3?key=${ITAD_API_KEY}&region=${region}&country=${country}&shops=${shops}&${params}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    console.error('ITAD GET error:', res.status, res.statusText);
    return {};
  }

  const data = await res.json();
  return data;
}

// Función para buscar juegos en ITAD
export async function searchGames(query: string, limit = 10): Promise<ITADGame[]> {
  const url = `${BASE_URL}/v01/search/plain/?key=${ITAD_API_KEY}&title=${encodeURIComponent(query)}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data && data.data && Array.isArray(data.data)) {
      return data.data.slice(0, limit).map((item: any) => ({
        id: item.id || '',
        title: item.title || query,
        image: item.image || '',
        plain: item.plain || ''
      }));
    }
    
    return [];
  } catch (err) {
    console.error("Error searching games in ITAD:", err);
    return [];
  }
}

// Función principal para obtener deals por tiendas usando el flujo correcto
export async function getDealsByStoreList(
  shops: string[] = ["steam", "epic", "gog", "origin", "uplay", "battlenet"],
  region = "us",
  limit = 50
) {
  // Lista de títulos de juegos populares para buscar
  const gameTitles = [
    "Elden Ring",
    "The Witcher 3: Wild Hunt",
    "Red Dead Redemption 2",
    "Cyberpunk 2077",
    "God of War",
    "Spider-Man Remastered",
    "Horizon Zero Dawn Complete Edition",
    "Death Stranding",
    "Control",
    "Assassin's Creed Valhalla",
    "Far Cry 6",
    "Watch Dogs: Legion",
    "Resident Evil 4",
    "Dead Space",
    "Hogwarts Legacy",
    "Starfield",
    "Baldur's Gate 3",
    "Diablo IV",
    "Street Fighter 6",
    "Grand Theft Auto V"
  ];
  
  console.log("Getting deals using ITAD lookup flow...");
  console.log("ITAD API Key exists:", !!ITAD_API_KEY);
  console.log("Looking up game IDs for titles:", gameTitles);

  try {
    // Paso 1: Lookup de títulos a IDs
    const idMap = await lookupGameIds(gameTitles);
    const validIds = Object.values(idMap).filter(Boolean) as string[];
    
    console.log("Valid game IDs found:", validIds);
    
    if (validIds.length === 0) {
      console.log("No valid game IDs found, returning empty array");
      return [];
    }
    
    // Crear mapeo inverso de ID a título
    const idToTitleMap: { [key: string]: string } = {};
    Object.entries(idMap).forEach(([title, id]) => {
      if (id) {
        idToTitleMap[id as string] = title;
      }
    });
    
    console.log("ID to title mapping:", idToTitleMap);
    
    // Paso 2: Obtener precios con IDs válidos
    const pricesData = await getPricesByIds(validIds, region);
    
    // Paso 3: Filtrar deals por tiendas y descuentos
    const allDeals: any[] = [];
    
    for (const game of pricesData) {
      if (game.deals && Array.isArray(game.deals)) {
        game.deals.forEach((deal: any) => {
          // Verificar que el deal tenga descuento y sea de una tienda válida
          if (deal.cut > 0 && deal.shop && deal.shop.name) {
            const shopName = deal.shop.name.toLowerCase();
            if (shops.some(shop => shopName.includes(shop))) {
              allDeals.push({
                ...deal,
                gameTitle: idToTitleMap[game.id] || game.title || game.name || 'Unknown Game',
                gameId: game.id
              });
            }
          }
        });
      }
    }
    
    console.log("Total deals found:", allDeals.length);
    console.log("Sample deals:", allDeals.slice(0, 3));
    
    return allDeals.slice(0, limit);
  } catch (err) {
    console.error("Error in getDealsByStoreList:", err);
    return [];
  }
}

// Función legacy para compatibilidad (mantener por si acaso)
export async function getDealsByPlain(plain: string, region = "us") {
  const url = `${BASE_URL}/v01/game/prices/?key=${ITAD_API_KEY}&plains=${plain}&region=${region}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("ITAD response for", plain, ":", JSON.stringify(data, null, 2));
    return data;
  } catch (err) {
    console.error("Error fetching from ITAD", err);
    throw err;
  }
}

// Función para obtener deals de un juego específico
export async function getGameDeals(gameId: string, region = "us") {
  try {
    // Primero buscar el plain del juego
    const searchResults = await searchGames(gameId, 1);
    if (searchResults.length === 0) {
      return null;
    }
    
    const game = searchResults[0];
    if (!game.plain) {
      return null;
    }
    
    // Obtener precios usando el plain
    const pricesData = await getDealsByPlain(game.plain, region);
    
    return {
      gameId: game.id,
      gameTitle: game.title,
      deals: pricesData[game.plain]?.deals || []
    };
  } catch (err) {
    console.error("Error getting game deals from ITAD:", err);
    return null;
  }
}

// Exportar función para obtener UUID de un solo título
export async function getGameUUID(title: string): Promise<string | null> {
  try {
    const idMap = await lookupGameIds([title]);
    const uuid = idMap[title];
    return uuid || null;
  } catch (err) {
    console.error(`Error en getGameUUID para: ${title}`, err);
    return null;
  }
}

// Crear el objeto itadApiService que están importando los componentes
export const itadApiService = {
  searchGames,
  getDealsByStoreList,
  getDealsByPlain,
  getGameDeals
}; 