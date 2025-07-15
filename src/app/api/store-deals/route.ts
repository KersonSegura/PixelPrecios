import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'discountedGames.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const games = JSON.parse(data);
    // Aquí puedes personalizar la respuesta si store-deals requiere filtrado especial
    return NextResponse.json({ games });
  } catch (error) {
    console.error('Error leyendo discountedGames.json:', error);
    return NextResponse.json({ games: [] }, { status: 500 });
  }
} 