// API Configuration
export const API_CONFIG = {
  // Steam API
  STEAM: {
    API_KEY: process.env.STEAM_API_KEY || 'E36F9EC2EFD4913EBE98A73B0D5ED647',
    BASE_URL: 'https://api.steampowered.com',
    CDN_URL: 'https://cdn.cloudflare.steamstatic.com',
    COMMUNITY_URL: 'https://steamcommunity.com'
  },
  
  // RAWG API (Primary for metadata)
  RAWG: {
    API_KEY: process.env.RAWG_API_KEY || 'YOUR_RAWG_API_KEY',
    BASE_URL: 'https://api.rawg.io/api'
  },
  
  // ITAD API (Primary for pricing)
  ITAD: {
    API_KEY: process.env.ITAD_API_KEY || '1ba426956f1fba899440b9e452a1a68f9b6b0c1d',
    BASE_URL: 'https://api.isthereanydeal.com/v01'
  },
  
  // Currency API
  CURRENCY: {
    API_KEY: process.env.CURRENCY_API_KEY || '',
    BASE_URL: 'https://api.exchangerate-api.com/v4/latest'
  }
}

// Steam App IDs for popular games
export const STEAM_APP_IDS = {
  'cyberpunk-2077': 1091500,
  'elden-ring': 1245620,
  'red-dead-redemption-2': 1174180,
  'grand-theft-auto-v': 271590,
  'the-witcher-3': 292030,
  'god-of-war': 1593500,
  'spider-man-remastered': 1817070,
  'horizon-zero-dawn': 1151640,
  'resident-evil-4': 2050650,
  'dead-space': 1693980,
  'call-of-duty-modern-warfare-2': 1938090,
  'fifa-23': 1811260,
  'minecraft': 322170,
  'fortnite': 1172620,
  'valorant': 1270790,
  'league-of-legends': 1234567, // Placeholder
  'overwatch-2': 1240440,
  'destiny-2': 1085660,
  'borderlands-3': 729040,
  'resident-evil-4-remake': 2050650
}

// Steam API Endpoints
export const STEAM_ENDPOINTS = {
  GET_APP_DETAILS: '/ISteamApps/GetAppDetails/v2/',
  GET_USER_OWNED_GAMES: '/IPlayerService/GetOwnedGames/v1/',
  GET_USER_RECENT_GAMES: '/IPlayerService/GetRecentlyPlayedGames/v1/',
  GET_USER_ACHIEVEMENTS: '/ISteamUserStats/GetPlayerAchievements/v1/',
  GET_GLOBAL_ACHIEVEMENTS: '/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/',
  GET_GAME_SCHEMA: '/ISteamUserStats/GetSchemaForGame/v2/',
  GET_FEATURED_GAMES: '/ISteamApps/GetAppList/v2/'
}

// ITAD API Endpoints
export const ITAD_ENDPOINTS = {
  SEARCH_GAMES: '/search/search',
  GET_GAME_DEALS: '/game/deals',
  GET_GAME_PRICES: '/game/prices',
  GET_GAME_INFO: '/game/info'
}

// Currency codes for LATAM
export const LATAM_CURRENCIES = {
  CRC: 'Costa Rican Colón',
  MXN: 'Mexican Peso',
  ARS: 'Argentine Peso',
  CLP: 'Chilean Peso',
  COP: 'Colombian Peso',
  PEN: 'Peruvian Sol',
  BRL: 'Brazilian Real'
}

// Store identifiers
export const STORES = {
  STEAM: 'steam',
  EPIC: 'epic',
  GOG: 'gog',
  UBISOFT: 'ubisoft',
  ORIGIN: 'origin',
  BATTLE_NET: 'battlenet',
  MICROSOFT: 'microsoft'
}

// Game categories and genres
export const GAME_CATEGORIES = {
  ACTION: 'Action',
  ADVENTURE: 'Adventure',
  RPG: 'RPG',
  STRATEGY: 'Strategy',
  SIMULATION: 'Simulation',
  SPORTS: 'Sports',
  RACING: 'Racing',
  PUZZLE: 'Puzzle',
  INDIE: 'Indie',
  CASUAL: 'Casual',
  HORROR: 'Horror',
  SHOOTER: 'Shooter',
  FIGHTING: 'Fighting',
  PLATFORMER: 'Platformer',
  SANDBOX: 'Sandbox',
  SURVIVAL: 'Survival',
  STEALTH: 'Stealth',
  TACTICAL: 'Tactical',
  TOWER_DEFENSE: 'Tower Defense',
  VISUAL_NOVEL: 'Visual Novel'
}

// Price alert thresholds
export const PRICE_ALERTS = {
  LOW_PRICE_THRESHOLD: 0.8, // 20% below current price
  HIGH_DISCOUNT_THRESHOLD: 50, // 50% or more discount
  FREE_GAME_THRESHOLD: 0.01 // Games under $0.01 are considered free
}

// Cache configuration
export const CACHE_CONFIG = {
  STEAM_GAME_DETAILS: 3600, // 1 hour
  STEAM_ACHIEVEMENTS: 7200, // 2 hours
  ITAD_DEALS: 1800, // 30 minutes
  CURRENCY_RATES: 3600, // 1 hour
  PRICE_HISTORY: 86400 // 24 hours
} 