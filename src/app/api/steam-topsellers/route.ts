import { NextResponse } from 'next/server';
import { getSteamTopSellers } from '@/services/steamScraper';
import { rawgApiService } from '@/services/rawgApi';
import { itadApiService } from '@/services/itadApi';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop';

export async function GET() {
  try {
    const games = await getSteamTopSellers();
    const enriched = await Promise.all(games.map(async (game) => {
      let image = '';
      // 1. RAWG
      try {
        const rawg = await rawgApiService.searchAndGetBestMatch(game.title);
        if (rawg && rawg.background_image) image = rawg.background_image;
      } catch {}
      // 2. Steam CDN
      if (!image && game.appid) {
        image = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
      }
      // 3. ITAD
      if (!image) {
        try {
          const itad = await itadApiService.searchGames(game.title, 1);
          if (itad && itad.length > 0 && itad[0].image) image = itad[0].image;
        } catch {}
      }
      // 4. Placeholder
      if (!image) image = PLACEHOLDER_IMAGE;
      return { ...game, image };
    }));
    return NextResponse.json(enriched);
  } catch (error) {
    return NextResponse.json({ error: 'Error obteniendo los top sellers de Steam' }, { status: 500 });
  }
} 