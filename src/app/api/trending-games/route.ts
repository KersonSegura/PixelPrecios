import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { TrendingGameAPI } from '../../../types/Game';
import { getGameUUID, getGameDealsByUUID } from '@/services/itadApiService';

const RAWG_API_KEY = 'c191b3a2896a4a24990494fa5ef10a9a';

// TypeScript interfaces
interface RAWGGame {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  platforms?: Array<{ platform: { name: string } }>;
  rating: number;
  stores?: Array<{ store: { name: string } }>;
}

// Cargar prices.json una sola vez por request
function loadPrices() {
  const pricesPath = path.join(process.cwd(), 'scripts', 'prices.json');
  if (fs.existsSync(pricesPath)) {
    return JSON.parse(fs.readFileSync(pricesPath, 'utf-8'));
  }
  return {};
}

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'discountedGames.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const games = JSON.parse(data);
    // Aquí puedes personalizar la respuesta si trending-games requiere filtrado especial
    return NextResponse.json({ games });
  } catch (error) {
    console.error('Error leyendo discountedGames.json:', error);
    return NextResponse.json({ games: [] }, { status: 500 });
  }
} 