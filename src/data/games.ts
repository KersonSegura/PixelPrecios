import { GameWithTags } from "@/types/Game";

export const trendingGames: GameWithTags[] = [
  {
    id: "1",
    title: "Elden Ring",
    image: "https://example.com/eldenring.jpg",
    tags: ["Soulslike", "Open World", "Action"],
    price: 39.99,
    originalPrice: 59.99,
    currency: "USD",
    priceCRC: 22000,
    originalPriceCRC: 33000,
    discount: 33,
    store: "Steam",
  },
  {
    id: "2",
    title: "Stardew Valley",
    image: "https://example.com/stardew.jpg",
    tags: ["Relaxing", "Farming", "Indie"],
    price: 14.99,
    originalPrice: 14.99,
    currency: "USD",
    priceCRC: 8800,
    originalPriceCRC: 8800,
    discount: 0,
    store: "GOG",
  },
  // Puedes agregar más juegos siguiendo este formato
];

export const dealsGames: GameWithTags[] = [
  {
    id: '16',
    title: 'Portal 2',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/620/capsule_184x69.jpg',
    price: 4.99,
    originalPrice: 19.99,
    currency: 'USD',
    priceCRC: 5000,
    originalPriceCRC: 20000,
    discount: 75,
    store: 'Steam',
    tags: ['Puzzle', 'Ciencia Ficción', 'Cooperativo', 'Narrativo', 'Humor']
  },
  {
    id: '17',
    title: 'Terraria',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/capsule_184x69.jpg',
    price: 2.99,
    originalPrice: 14.99,
    currency: 'USD',
    priceCRC: 3000,
    originalPriceCRC: 15000,
    discount: 80,
    store: 'Steam',
    tags: ['Sandbox', 'Aventura', 'Construcción', '2D', 'Cooperativo']
  },
  {
    id: '18',
    title: 'Stardew Valley',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/capsule_184x69.jpg',
    price: 7.99,
    originalPrice: 23.99,
    currency: 'USD',
    priceCRC: 4000,
    originalPriceCRC: 12000,
    discount: 67,
    store: 'GOG',
    tags: ['Simulación', 'Granja', 'RPG', 'Relajante', 'Cooperativo']
  },
  {
    id: '19',
    title: 'Undertale',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/391540/capsule_184x69.jpg',
    price: 2.49,
    originalPrice: 9.99,
    currency: 'USD',
    priceCRC: 2000,
    originalPriceCRC: 8000,
    discount: 75,
    store: 'Steam',
    tags: ['RPG', 'Indie', 'Narrativo', 'Humor', 'Música']
  },
  {
    id: '20',
    title: 'Hollow Knight',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/capsule_184x69.jpg',
    price: 5.99,
    originalPrice: 17.99,
    currency: 'USD',
    priceCRC: 6000,
    originalPriceCRC: 18000,
    discount: 67,
    store: 'Steam',
    tags: ['Metroidvania', 'Acción', 'Aventura', 'Indie', 'Difícil']
  },
  {
    id: '21',
    title: 'Celeste',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/504230/capsule_184x69.jpg',
    price: 3.99,
    originalPrice: 11.99,
    currency: 'USD',
    priceCRC: 4000,
    originalPriceCRC: 12000,
    discount: 67,
    store: 'Epic Store',
    tags: ['Plataformas', 'Indie', 'Difícil', 'Narrativo', 'Música']
  }
];

// Función para encontrar juegos similares basados en tags y descuento
export const findSimilarGames = (currentGameTags: string[], currentGameId: string, allGames: GameWithTags[]): GameWithTags[] => {
  return allGames
    .filter(game => game.id !== currentGameId && (game as any).discount > 0) // Excluir el juego actual y solo juegos con descuento
    .map(game => {
      const commonTags = game.tags.filter(tag => currentGameTags.includes(tag))
      return {
        ...game,
        commonTagsCount: commonTags.length,
        commonTags
      }
    })
    .filter(game => (game as any).commonTagsCount > 0) // Solo juegos con al menos un tag en común
    .sort((a, b) => {
      // Ordenar por: 1) Más tags en común, 2) Mayor descuento, 3) Precio más bajo
      if ((b as any).commonTagsCount !== (a as any).commonTagsCount) {
        return (b as any).commonTagsCount - (a as any).commonTagsCount
      }
      if ((b as any).discount !== (a as any).discount) {
        return (b as any).discount - (a as any).discount
      }
      return (a as any).priceCRC - (b as any).priceCRC
    })
    .slice(0, 5) // Limitar a 5 juegos similares
    .map(({ commonTagsCount, commonTags, ...game }) => game) // Remover propiedades temporales
}

// Devuelve el DLC y el juego base al que pertenece
export function getDlcDetailsById(dlcId: string) {
  const allGames = [
    // ...highlightGames, // Si tienes highlightGames, asegúrate de que también tenga los campos requeridos
    ...trendingGames,
    ...dealsGames
  ];
  for (const game of allGames) {
    if (Array.isArray((game as any).dlcs)) {
      const found = (game as any).dlcs.find((dlc: any) => dlc.id === dlcId);
      if (found) {
        return { dlc: found, baseGame: game };
      }
    }
  }
  return null;
}

export type { GameWithTags }; 