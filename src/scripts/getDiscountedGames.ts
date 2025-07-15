import fs from 'fs';
import path from 'path';
import { getPricesByIds } from '../services/itadApi';

async function main() {
  const inputPath = path.join(__dirname, '../data/gamesWithUUID.json');
  const outputPath = path.join(__dirname, '../data/discountedGames.json');
  const games = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const validGames = games.filter((g: any) => g.uuid);
  const uuids = validGames.map((g: any) => g.uuid);

  const pricesData = await getPricesByIds(uuids);
  const discounted: any[] = [];

  for (const game of validGames) {
    const uuid = game.uuid;
    const priceInfo = pricesData[uuid];
    if (!priceInfo || !priceInfo.deals) continue;
    // Buscar el mejor deal con descuento
    const bestDeal = priceInfo.deals.find((deal: any) => deal.cut > 0);
    if (bestDeal) {
      discounted.push({
        ...game,
        deal: bestDeal
      });
      console.log(`💸 Descuento para: ${game.title}`);
    } else {
      console.log(`⏩ Sin descuento: ${game.title}`);
    }
  }
  fs.writeFileSync(outputPath, JSON.stringify(discounted, null, 2));
  console.log(`Guardado en ${outputPath} (${discounted.length} juegos con descuento)`);
}

main(); 