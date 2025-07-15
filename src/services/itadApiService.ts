const ITAD_API_KEY = process.env.ITAD_API_KEY;

export async function getGameUUID(title: string): Promise<string | null> {
  const url = `https://api.isthereanydeal.com/games/search/v1?key=${ITAD_API_KEY}&q=${encodeURIComponent(title)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data?.results?.[0]?.id || null;
}

export async function getGameDealsByUUID(uuid: string, region = "us") {
  const url = `https://api.isthereanydeal.com/game/prices/v2?key=${ITAD_API_KEY}&id=${uuid}&region=${region}`;
  const res = await fetch(url);
  return await res.json();
}

export async function getGameDeals(title: string, region = "us") {
  const uuid = await getGameUUID(title);
  if (!uuid) return null;
  return await getGameDealsByUUID(uuid, region);
} 