// Shared Game interface for the entire application
export interface Game {
  id?: number;
  name: string;
  image: string;
  shop?: string;
  priceNew?: number;
  priceOld?: number;
  discount?: number;
  cut?: number;
  url?: string;
  slug?: string;
  platforms?: string[];
  rating?: number;
  stores?: string[];
  price?: any; // ITAD price data or null
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