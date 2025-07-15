// Shared Game interface for the entire application
export interface Game {
  id: string;
  uuid?: string;
  title: string;
  price: number;
  originalPrice: number;
  currency: string;
  image: string;
  priceCRC?: number;              // ⬅ opcionales
  originalPriceCRC?: number;
  discount?: number;
  store?: string;
  [key: string]: any; // opcional, si tienes propiedades extra
}

export interface GameWithTags extends Game {
  tags: string[];
}

// Interface for trending games from API
export interface TrendingGameAPI {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  platforms?: string[];
  rating: number;
  stores?: string[];
  price: any; // ITAD price data or null
}

// Interface for trending games in components
export interface TrendingGameComponent {
  name: string;
  image: string;
  shop?: string;
  priceNew?: number;
  priceOld?: number;
  cut?: number;
  url?: string;
  slug?: string;
  platforms?: string[];
  rating?: number;
  stores?: string[];
  price?: any; // ITAD price data or null
} 