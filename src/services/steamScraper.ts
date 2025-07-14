// @ts-ignore
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export interface SteamTopSeller {
  title: string;
  url: string;
  appid: string | null;
}

const fallbackGames: SteamTopSeller[] = [
  { title: 'Portal 2', url: 'https://store.steampowered.com/app/620/Portal_2/', appid: '620' },
  { title: 'Terraria', url: 'https://store.steampowered.com/app/105600/Terraria/', appid: '105600' },
  { title: 'Stardew Valley', url: 'https://store.steampowered.com/app/413150/Stardew_Valley/', appid: '413150' },
  { title: 'Hollow Knight', url: 'https://store.steampowered.com/app/367520/Hollow_Knight/', appid: '367520' },
  { title: 'Celeste', url: 'https://store.steampowered.com/app/504230/Celeste/', appid: '504230' },
  { title: 'Undertale', url: 'https://store.steampowered.com/app/391540/Undertale/', appid: '391540' }
];

export async function getSteamTopSellers(): Promise<SteamTopSeller[]> {
  try {
    const res = await fetch('https://store.steampowered.com/search/?filter=topsellers');
    const html = await res.text();
    const $ = cheerio.load(html);

    const games: SteamTopSeller[] = [];
    $('.search_result_row').each((i: number, el: cheerio.Element) => {
      const title = $(el).find('.title').text().trim();
      const url = $(el).attr('href') || '';
      const appidMatch = url.match(/app\/(\d+)/);
      const appid = appidMatch ? appidMatch[1] : null;
      games.push({ title, url, appid });
    });
    // Si el scraping no devuelve juegos, usa el fallback
    return games.length > 0 ? games : fallbackGames;
  } catch (error) {
    // Si hay error, usa el fallback
    return fallbackGames;
  }
} 