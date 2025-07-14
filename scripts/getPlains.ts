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

async function fetchPlain(title: string): Promise<string | null> {
  try {
    const url = `https://api.isthereanydeal.com/v01/search/search/?key=${ITAD_API_KEY}&q=${encodeURIComponent(title)}`;
    const res = await axios.get(url);
    const match = res.data?.data?.results?.[0];
    return match?.plain || null;
  } catch (error) {
    console.warn(`⚠️ Error buscando plain para: ${title}`);
    return null;
  }
}

async function buildPlainMap(titles: string[]) {
  const plainMap: Record<string, string> = {};

  for (const title of titles) {
    console.log(`🔍 Buscando plain para: ${title}`);
    const plain = await fetchPlain(title);
    if (plain) {
      plainMap[title] = plain;
      console.log(`✅ ${title} => ${plain}`);
    } else {
      console.log(`❌ No se encontró plain para: ${title}`);
    }
    await new Promise(r => setTimeout(r, 300)); // para evitar rate limiting
  }

  const outputPath = path.join(__dirname, 'plains.json');
  fs.writeFileSync(outputPath, JSON.stringify(plainMap, null, 2));
  console.log(`📝 plains.json guardado en ${outputPath}`);
}

buildPlainMap(gameTitles); 