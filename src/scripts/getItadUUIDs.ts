import fs from 'fs';
import path from 'path';
import { getGameUUID } from '../services/itadApi';

async function main() {
  const inputPath = path.join(__dirname, '../data/popularGames.json');
  const outputPath = path.join(__dirname, '../data/gamesWithUUID.json');
  const games = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const results: { title: string; uuid: string | null }[] = [];

  for (const game of games) {
    const title = game.name || game.title;
    try {
      const uuid = await getGameUUID(title);
      if (uuid) {
        console.log(`✅ ${title} => ${uuid}`);
        results.push({ title, uuid });
      } else {
        console.warn(`❌ No UUID for: ${title}`);
        results.push({ title, uuid: null });
      }
    } catch (err) {
      console.error(`Error buscando UUID para: ${title}`, err);
      results.push({ title, uuid: null });
    }
  }
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`Guardado en ${outputPath}`);
}

main(); 