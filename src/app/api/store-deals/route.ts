import { NextResponse } from 'next/server';
import { getDealsByStoreList } from '@/services/itadApi';

export async function GET() {
  try {
    console.log("Store deals endpoint called");
    
    const deals = await getDealsByStoreList(
      ["steam", "epic", "gog", "origin", "uplay", "battlenet"],
      "us" // Puedes cambiarlo por "latam" o "cr" si ITAD lo soporta
    );

    console.log("Deals returned:", deals.length);
    return NextResponse.json({ deals });
  } catch (err) {
    console.error("Store deals error:", err);
    return NextResponse.json({ error: "No se pudieron cargar los deals." }, { status: 500 });
  }
} 