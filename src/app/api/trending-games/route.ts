import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { TrendingGameAPI } from '@/types/Game';

const RAWG_API_KEY = 'c191b3a2896a4a24990494fa5ef10a9a';

// TypeScript interfaces
interface RAWGGame {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  platforms?: Array<{ platform: { name: string } }>;
  rating: number;
  stores?: Array<{ store: { name: string } }>;
}

// Cargar prices.json una sola vez por request
function loadPrices() {
  const pricesPath = path.join(process.cwd(), 'scripts', 'prices.json');
  if (fs.existsSync(pricesPath)) {
    return JSON.parse(fs.readFileSync(pricesPath, 'utf-8'));
  }
  return {};
}

export async function GET(req: NextRequest) {
  try {
    // 1. Obtener juegos populares desde RAWG
    const { data: rawgData } = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: RAWG_API_KEY,
        ordering: '-added',
        page_size: 10
      }
    });

    // 2. Cargar precios desde prices.json
    const prices: Record<string, any> = loadPrices();

    // 3. Armar la respuesta usando los precios cacheados
    const trendingGames: TrendingGameAPI[] = rawgData.results.map((game: RAWGGame) => {
      const price = prices[game.name] || null;
      return {
        id: game.id,
        name: game.name,
        slug: game.slug,
        background_image: game.background_image,
        platforms: game.platforms?.map((p) => p.platform.name),
        rating: game.rating,
        stores: game.stores?.map((s) => s.store.name),
        price
      };
    });

    // Filtrar solo juegos con precio
    const filteredGames = trendingGames.filter((game: TrendingGameAPI) => game.price !== null);
    return Response.json({ games: filteredGames });
  } catch (err) {
    console.error('🔥 Error en trending-games:', err);
    return new Response(JSON.stringify({ error: 'Error fetching trending games' }), {
      status: 500
    });
  }
} 