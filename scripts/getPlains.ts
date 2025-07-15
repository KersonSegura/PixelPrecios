import axios from 'axios';
import fs from 'fs';
import path from 'path';

const ITAD_API_KEY = '1ba426956f1fba899440b9e452a1a68f9b6b0c1d';

const gameTitles: string[] = [
  'Hades',
  'Cyberpunk 2077',
  'Red Dead Redemption 2',
  'The Witcher 3: Wild Hunt - Game of the Year Edition',
  'Elden Ring'
];

async function fetchUUID(title: string): Promise<string | null> {
  try {
    const url = `https://api.isthereanydeal.com/games/search/v1?key=${ITAD_API_KEY}&q=${encodeURIComponent(title)}`;
    const res = await axios.get(url);
    const match = res.data?.results?.[0];
    return match?.id || null;
  } catch (error) {
    console.warn(`⚠️ Error buscando UUID para: ${title}`);
    return null;
  }
}

async function buildUUIDMap(titles: string[]) {
  const uuidMap: Record<string, string> = {};

  for (const title of titles) {
    console.log(`🔍 Buscando UUID para: ${title}`);
    const uuid = await fetchUUID(title);
    if (uuid) {
      uuidMap[title] = uuid;
      console.log(`✅ ${title} => ${uuid}`);
    } else {
      console.log(`❌ No se encontró UUID para: ${title}`);
    }
    await new Promise(r => setTimeout(r, 300));
  }

  const outputPath = path.join(__dirname, 'uuids.json');
  fs.writeFileSync(outputPath, JSON.stringify(uuidMap, null, 2));
  console.log(`📝 uuids.json guardado en ${outputPath}`);
}

buildUUIDMap(gameTitles); 