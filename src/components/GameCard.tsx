'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Game, CurrencyService } from '@/services/currencyService'
import { useState, useEffect } from 'react'

interface GameCardProps {
  game: Game
  currency: string
}

export default function GameCard({ game, currency }: GameCardProps) {
  const router = useRouter()
  const [convertedPrice, setConvertedPrice] = useState<string>('')
  const [convertedOriginalPrice, setConvertedOriginalPrice] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  // Función para convertir y formatear precios
  const convertAndFormatPrice = (priceCRC: number, targetCurrency: string) => {
    return CurrencyService.convertFromCRC(priceCRC, targetCurrency)
      .then(price => CurrencyService.formatPrice(price, targetCurrency))
      .catch(error => {
        console.error('Error converting price:', error)
        // Fallback: usar tasas aproximadas consistentes con el servicio
        const rates = {
          CRC: 1,
          MXN: 0.035,
          ARS: 2,
          CLP: 1.9,
          COP: 8,
          PEN: 0.0074,
          BRL: 0.0104
        }
        const rate = rates[targetCurrency as keyof typeof rates] || 1
        const convertedPrice = Math.round(priceCRC * rate)
        return CurrencyService.formatPrice(convertedPrice, targetCurrency)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    
    // Cargar favoritos de localStorage
    const favs = JSON.parse(localStorage.getItem('pixelprecios_favs') || '{}')
    setIsFavorite(!!favs[game.id])
    
    // Convertir ambos precios
    Promise.all([
      convertAndFormatPrice(game.priceCRC, currency),
      convertAndFormatPrice(game.originalPriceCRC, currency)
    ])
      .then(([price, originalPrice]) => {
        setConvertedPrice(price)
        setConvertedOriginalPrice(originalPrice)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error converting prices:', error)
        setIsLoading(false)
      })
  }, [game.priceCRC, game.originalPriceCRC, currency, game.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const favs = JSON.parse(localStorage.getItem('pixelprecios_favs') || '{}')
    if (isFavorite) {
      delete favs[game.id]
    } else {
      favs[game.id] = true
    }
    localStorage.setItem('pixelprecios_favs', JSON.stringify(favs))
    setIsFavorite(!isFavorite)
  }

  const handleCardClick = () => {
    router.push(`/game/${game.id}`)
  }

  return (
    <div 
      className="relative bg-dark-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full group transition-transform hover:scale-105 duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Badge de descuento arriba a la derecha */}
      <div className="absolute top-3 right-3 z-10">
        {game.discount > 0 && (
          <span className="px-2 py-1 rounded bg-red-500 text-xs font-bold text-white shadow">
            -{game.discount}%
          </span>
        )}
      </div>
      <Image
        src={game.image}
        alt={game.title}
        width={400}
        height={300}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-white flex-1 line-clamp-2">{game.title}</h3>
          <button onClick={toggleFavorite} aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'} className="ml-2 mt-0.5 z-10">
            {isFavorite ? (
              <svg className="w-6 h-6 text-red-500 drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-dark-400 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex items-center mb-2 justify-between">
          <div className="flex items-center">
            <span className="text-primary-400 font-semibold text-lg">
              {isLoading ? '...' : convertedPrice}
            </span>
            {game.discount > 0 ? (
              <span className="ml-3 text-sm text-dark-400 line-through">
                {isLoading ? '...' : convertedOriginalPrice}
              </span>
            ) : (
              <span className="ml-3 px-2 py-1 rounded bg-dark-600 text-xs font-bold text-dark-200 border border-dark-400 shadow">
                Actualmente sin descuento
              </span>
            )}
          </div>
          <span className="text-xs bg-dark-700 text-dark-200 px-2 py-1 rounded ml-2">
            {game.store}
          </span>
        </div>
      </div>
    </div>
  )
} 