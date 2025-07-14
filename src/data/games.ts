import { Game } from '@/services/currencyService'

// Extender la interfaz Game para incluir tags
export interface GameWithTags extends Game {
  tags: string[];
  dlcs?: Array<{
    id: string;
    title: string;
    plain: string;
    image: string;
  }>;
}

export const highlightGames: GameWithTags[] = [
  {
    id: '1',
    title: 'Cyberpunk 2077',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_184x69.jpg',
    priceCRC: 25000,
    originalPriceCRC: 50000,
    discount: 50,
    store: 'Steam',
    tags: ['RPG', 'Acción', 'Mundo Abierto', 'Cyberpunk', 'Futurista'],
    dlcs: [
      {
        id: 'phantom-liberty',
        title: 'Phantom Liberty',
        plain: 'cyberpunk-2077-phantom-liberty',
        image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2138330/capsule_184x69.jpg'
      },
      {
        id: 'ultimate-pack',
        title: 'Ultimate Pack',
        plain: 'cyberpunk-2077-ultimate-pack',
        image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2345678/capsule_184x69.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Red Dead Redemption 2',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_184x69.jpg',
    priceCRC: 30000,
    originalPriceCRC: 60000,
    discount: 50,
    store: 'Epic Store',
    tags: ['Acción', 'Aventura', 'Mundo Abierto', 'Western', 'Histórico']
  },
  {
    id: '3',
    title: 'The Witcher 3: Wild Hunt',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/capsule_184x69.jpg',
    priceCRC: 15000,
    originalPriceCRC: 45000,
    discount: 67,
    store: 'GOG',
    tags: ['RPG', 'Acción', 'Mundo Abierto', 'Fantasía', 'Aventura']
  },
  {
    id: '4',
    title: "Baldur's Gate 3",
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/capsule_184x69.jpg',
    priceCRC: 34900,
    originalPriceCRC: 34900,
    discount: 0,
    store: 'Steam',
    tags: ['RPG', 'Estrategia', 'Fantasía', 'Cooperativo', 'Narrativo']
  },
  {
    id: '5',
    title: 'Starfield',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/capsule_184x69.jpg',
    priceCRC: 35000,
    originalPriceCRC: 70000,
    discount: 50,
    store: 'Epic Store',
    tags: ['RPG', 'Acción', 'Mundo Abierto', 'Ciencia Ficción', 'Exploración']
  },
  {
    id: '6',
    title: 'Alan Wake 2',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1176900/capsule_184x69.jpg',
    priceCRC: 40000,
    originalPriceCRC: 80000,
    discount: 50,
    store: 'Epic Store',
    tags: ['Terror', 'Acción', 'Narrativo', 'Psicológico', 'Sobrenatural']
  },
  {
    id: '7',
    title: 'Spider-Man Remastered',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/capsule_184x69.jpg',
    priceCRC: 30000,
    originalPriceCRC: 60000,
    discount: 50,
    store: 'Steam',
    tags: ['Acción', 'Aventura', 'Superhéroes', 'Mundo Abierto', 'Narrativo']
  },
  {
    id: '8',
    title: 'God of War',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/capsule_184x69.jpg',
    priceCRC: 25000,
    originalPriceCRC: 50000,
    discount: 50,
    store: 'Steam',
    tags: ['Acción', 'Aventura', 'Mitología', 'Narrativo', 'Hack and Slash']
  },
  {
    id: '9',
    title: 'Horizon Zero Dawn',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/capsule_184x69.jpg',
    priceCRC: 20000,
    originalPriceCRC: 40000,
    discount: 50,
    store: 'Steam',
    tags: ['Acción', 'RPG', 'Mundo Abierto', 'Ciencia Ficción', 'Post-apocalíptico']
  }
]

export const trendingGames: GameWithTags[] = [
  {
    id: '10',
    title: 'Portal 2',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/620/capsule_184x69.jpg',
    priceCRC: 5000,
    originalPriceCRC: 20000,
    discount: 75,
    store: 'Steam',
    tags: ['Puzzle', 'Ciencia Ficción', 'Cooperativo', 'Narrativo', 'Humor']
  },
  {
    id: '11',
    title: 'Terraria',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/capsule_184x69.jpg',
    priceCRC: 3000,
    originalPriceCRC: 15000,
    discount: 80,
    store: 'Steam',
    tags: ['Sandbox', 'Aventura', 'Construcción', '2D', 'Cooperativo']
  },
  {
    id: '12',
    title: 'Stardew Valley',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/capsule_184x69.jpg',
    priceCRC: 4000,
    originalPriceCRC: 12000,
    discount: 67,
    store: 'GOG',
    tags: ['Simulación', 'Granja', 'RPG', 'Relajante', 'Cooperativo']
  },
  {
    id: '13',
    title: 'Undertale',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/391540/capsule_184x69.jpg',
    priceCRC: 2000,
    originalPriceCRC: 8000,
    discount: 75,
    store: 'Steam',
    tags: ['RPG', 'Indie', 'Narrativo', 'Humor', 'Música']
  },
  {
    id: '14',
    title: 'Hollow Knight',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/capsule_184x69.jpg',
    priceCRC: 6000,
    originalPriceCRC: 18000,
    discount: 67,
    store: 'Steam',
    tags: ['Metroidvania', 'Acción', 'Aventura', 'Indie', 'Difícil']
  },
  {
    id: '15',
    title: 'Celeste',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/504230/capsule_184x69.jpg',
    priceCRC: 4000,
    originalPriceCRC: 12000,
    discount: 67,
    store: 'Epic Store',
    tags: ['Plataformas', 'Indie', 'Difícil', 'Narrativo', 'Música']
  }
]

export const dealsGames: GameWithTags[] = [
  {
    id: '16',
    title: 'Portal 2',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/620/capsule_184x69.jpg',
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
    priceCRC: 4000,
    originalPriceCRC: 12000,
    discount: 67,
    store: 'Epic Store',
    tags: ['Plataformas', 'Indie', 'Difícil', 'Narrativo', 'Música']
  }
]

// Función para encontrar juegos similares basados en tags y descuento
export const findSimilarGames = (currentGameTags: string[], currentGameId: string, allGames: GameWithTags[]): GameWithTags[] => {
  return allGames
    .filter(game => game.id !== currentGameId && game.discount > 0) // Excluir el juego actual y solo juegos con descuento
    .map(game => {
      const commonTags = game.tags.filter(tag => currentGameTags.includes(tag))
      return {
        ...game,
        commonTagsCount: commonTags.length,
        commonTags
      }
    })
    .filter(game => game.commonTagsCount > 0) // Solo juegos con al menos un tag en común
    .sort((a, b) => {
      // Ordenar por: 1) Más tags en común, 2) Mayor descuento, 3) Precio más bajo
      if (b.commonTagsCount !== a.commonTagsCount) {
        return b.commonTagsCount - a.commonTagsCount
      }
      if (b.discount !== a.discount) {
        return b.discount - a.discount
      }
      return a.priceCRC - b.priceCRC
    })
    .slice(0, 5) // Limitar a 5 juegos similares
    .map(({ commonTagsCount, commonTags, ...game }) => game) // Remover propiedades temporales
}

// Devuelve el DLC y el juego base al que pertenece
export function getDlcDetailsById(dlcId: string) {
  const allGames = [
    ...highlightGames,
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