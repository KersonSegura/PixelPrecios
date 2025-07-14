import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'scripts', 'prices.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return Response.json({ prices: data });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'No se pudo cargar prices.json' }), { status: 500 });
  }
} 