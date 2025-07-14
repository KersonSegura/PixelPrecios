const ITAD_API_KEY = process.env.ITAD_API_KEY!;
const BASE_URL = "https://api.isthereanydeal.com";

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
async function getPricesByIds(ids: string[], region = "us") {
  const url = `${BASE_URL}/games/prices/v3?key=${ITAD_API_KEY}&country=${region}`;
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ids)
    });
    
    const data = await res.json();
    console.log("ITAD prices response:", JSON.stringify(data, null, 2));
    return data;
  } catch (err) {
    console.error("Error getting prices from ITAD:", err);
    throw err;
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