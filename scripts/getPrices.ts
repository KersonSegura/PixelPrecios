import axios from 'axios';
import fs from 'fs';
import path from 'path';

const ITAD_API_KEY = '1ba426956f1fba899440b9e452a1a68f9b6b0c1d';
const uuidsPath = path.join(__dirname, 'uuids.json');
const outputPath = path.join(__dirname, 'prices.json');

const uuidsData: Record<string, string> = JSON.parse(fs.readFileSync(uuidsPath, 'utf-8'));

async function fetchDeals(uuid: string) {
  try {
    const url = `https://api.isthereanydeal.com/game/prices/v2?key=${ITAD_API_KEY}&id=${uuid}&region=us&country=US`;
    const res = await axios.get(url);
    return res.data?.deals || [];
  } catch (error) {
    console.warn(`⚠️ Error buscando deals para UUID: ${uuid}`);
    return [];
  }
}

async function buildDealMap(uuids: Record<string, string>) {
  const dealMap: Record<string, any[]> = {};

  for (const [title, uuid] of Object.entries(uuids)) {
    console.log(`💰 Buscando deals para: ${title} (${uuid})`);
    const deals = await fetchDeals(uuid);
    if (deals.length > 0) {
      dealMap[title] = deals;
      console.log(`✅ ${title} => ${dealMap[title].length} ofertas encontradas`);
    } else {
      console.log(`❌ Sin deals para: ${title}`);
    }
    await new Promise(r => setTimeout(r, 300));
  }

  fs.writeFileSync(outputPath, JSON.stringify(dealMap, null, 2));
  console.log(`📝 prices.json guardado en ${outputPath}`);
}

buildDealMap(uuidsData); 