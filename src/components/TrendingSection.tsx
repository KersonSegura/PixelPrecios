'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { TrendingGameComponent } from '@/types/Game'

interface TrendingSectionProps {
  currency: string
  trendingGamesITAD?: TrendingGameComponent[]
}

export default function TrendingSection({ currency, trendingGamesITAD }: TrendingSectionProps) {
  const [isClient, setIsClient] = useState(false)
  const [trendingGames, setTrendingGames] = useState<TrendingGameComponent[]>([])

  useEffect(() => {
    setIsClient(true)
    if (trendingGamesITAD && Array.isArray(trendingGamesITAD)) {
      setTrendingGames(trendingGamesITAD)
    } else {
      // fallback: fetch or use mock data
      setTrendingGames([])
    }
  }, [trendingGamesITAD])

  return (
    <section id="trending" className="py-16 px-4 sm:px-6 lg:px-8 relative -mt-16 z-10 bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trending en <span className="text-primary-400">LATAM</span>
          </h2>
          <p className="text-lg text-dark-300">
            Los juegos más populares con los mejores descuentos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingGames.map((game, idx) => (
            <div key={game.name + idx} className="bg-dark-800 rounded-lg p-4 text-white flex flex-col items-center">
              <Image 
                src={game.image} 
                alt={game.name} 
                width={400}
                height={160}
                className="w-full h-40 object-cover rounded mb-3" 
              />
              <div className="font-bold text-lg mb-2 text-center">{game.name}</div>
              {game.shop && <div className="text-sm text-dark-300 mb-1">{game.shop}</div>}
              {game.cut !== undefined && <div className="text-sm text-green-400">{game.cut}% OFF</div>}
              {game.priceNew !== undefined && <div className="text-sm text-primary-400">Ahora: ${game.priceNew.toFixed(2)}</div>}
              {game.priceOld !== undefined && <div className="text-xs text-dark-300 line-through">Antes: ${game.priceOld.toFixed(2)}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 