import { getTrendingGamesRAWG } from '../services/rawgApi';
import fs from 'fs';
import path from 'path';

async function main() {
  try {
    const results = await getTrendingGamesRAWG();
    // RAWG devuelve por defecto 20, pero puedes paginar para más
    let allGames = results;
    let next = results.next;
    let page = 2;
    while (allGames.length < 100 && next) {
      const url = `${next}&page=${page}`;
      const res = await fetch(url);
      const data = await res.json();
      allGames = allGames.concat(data.results);
      next = data.next;
      page++;
    }
    // Limitar a 100
    allGames = allGames.slice(0, 100);
    const filePath = path.join(__dirname, '../data/popularGames.json');
    fs.writeFileSync(filePath, JSON.stringify(allGames, null, 2));
    console.log(`Guardados ${allGames.length} juegos populares en ${filePath}`);
  } catch (err) {
    console.error('Error al obtener juegos populares de RAWG:', err);
  }
}

main(); 