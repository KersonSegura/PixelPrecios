import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PixelPrecios - Descuentos de Juegos en LATAM',
  description: 'Encuentra los mejores descuentos de juegos en Steam, Epic Store, GOG y Ubisoft. Precios en monedas latinoamericanas.',
  keywords: 'juegos, descuentos, steam, epic, gog, ubisoft, latam, gaming',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          {children}
        </div>
      </body>
    </html>
  )
} 