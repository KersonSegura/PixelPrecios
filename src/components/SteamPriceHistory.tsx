'use client'

import { useState, useEffect } from 'react'
import { steamApiService } from '@/services/steamApi'
import { CurrencyService } from '@/services/currencyService'

interface SteamPriceHistoryProps {
  steamAppId: number
  currency: string
}

interface PricePoint {
  date: string
  price: number
  discount: number
}

export default function SteamPriceHistory({ steamAppId, currency }: SteamPriceHistoryProps) {
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([])
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Get current game details
        const gameDetails = await steamApiService.getGameDetails(steamAppId)
        
        if (gameDetails.success && gameDetails.data.price_overview) {
          const price = gameDetails.data.price_overview.final / 100 // Convert from cents
          setCurrentPrice(price)
          
          // Generate mock price history (in a real app, this would come from Steam's price history API)
          const mockHistory: PricePoint[] = []
          const today = new Date()
          
          for (let i = 30; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)
            
            // Simulate price variations
            const basePrice = price * 1.2 // Original price
            const randomDiscount = Math.random() > 0.7 ? Math.floor(Math.random() * 60) + 10 : 0
            const currentPrice = basePrice * (1 - randomDiscount / 100)
            
            mockHistory.push({
              date: date.toISOString().split('T')[0],
              price: currentPrice,
              discount: randomDiscount
            })
          }
          
          setPriceHistory(mockHistory)
        } else {
          setError('No se pudo obtener información de precios')
        }
      } catch (err) {
        setError('Error al cargar el historial de precios')
        console.error('Error fetching price history:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (steamAppId) {
      fetchPriceData()
    }
  }, [steamAppId, currency])

  const formatPrice = (price: number) => {
    return CurrencyService.formatPrice(price, currency)
  }

  const getLowestPrice = () => {
    if (priceHistory.length === 0) return null
    return Math.min(...priceHistory.map(p => p.price))
  }

  const getHighestPrice = () => {
    if (priceHistory.length === 0) return null
    return Math.max(...priceHistory.map(p => p.price))
  }

  const getAveragePrice = () => {
    if (priceHistory.length === 0) return null
    const sum = priceHistory.reduce((acc, p) => acc + p.price, 0)
    return sum / priceHistory.length
  }

  if (isLoading) {
    return (
      <div className="bg-dark-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Historial de Precios</h3>
        <div className="space-y-4">
          <div className="h-4 bg-dark-700 rounded animate-pulse"></div>
          <div className="h-4 bg-dark-700 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-dark-700 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error || !currentPrice) {
    return (
      <div className="bg-dark-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Historial de Precios</h3>
        <div className="text-center text-dark-300">
          <svg className="w-12 h-12 mx-auto mb-4 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-lg font-medium">{error || 'Información de precios no disponible'}</p>
        </div>
      </div>
    )
  }

  const lowestPrice = getLowestPrice()
  const highestPrice = getHighestPrice()
  const averagePrice = getAveragePrice()

  return (
    <div className="bg-dark-800 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Historial de Precios</h3>
      
      {/* Current Price */}
      <div className="mb-6 p-4 bg-dark-700 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-dark-300">Precio Actual</span>
          <span className="text-2xl font-bold text-primary-400">
            {formatPrice(currentPrice)}
          </span>
        </div>
      </div>

      {/* Price Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-dark-700 rounded-lg">
          <div className="text-green-400 text-lg font-bold">
            {lowestPrice ? formatPrice(lowestPrice) : 'N/A'}
          </div>
          <div className="text-dark-300 text-sm">Precio más bajo</div>
        </div>
        
        <div className="text-center p-3 bg-dark-700 rounded-lg">
          <div className="text-white text-lg font-bold">
            {averagePrice ? formatPrice(averagePrice) : 'N/A'}
          </div>
          <div className="text-dark-300 text-sm">Precio promedio</div>
        </div>
        
        <div className="text-center p-3 bg-dark-700 rounded-lg">
          <div className="text-red-400 text-lg font-bold">
            {highestPrice ? formatPrice(highestPrice) : 'N/A'}
          </div>
          <div className="text-dark-300 text-sm">Precio más alto</div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="mb-4">
        <h4 className="text-white font-semibold mb-3">Últimos 30 días</h4>
        <div className="relative h-32 bg-dark-700 rounded-lg p-4">
          {priceHistory.length > 0 && (
            <div className="flex items-end justify-between h-full">
              {priceHistory.map((point, index) => {
                const maxPrice = Math.max(...priceHistory.map(p => p.price))
                const minPrice = Math.min(...priceHistory.map(p => p.price))
                const priceRange = maxPrice - minPrice
                const height = priceRange > 0 ? ((point.price - minPrice) / priceRange) * 100 : 50
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-2 bg-primary-500 rounded-t transition-all duration-300 hover:bg-primary-400"
                      style={{ height: `${height}%` }}
                      title={`${point.date}: ${formatPrice(point.price)}`}
                    />
                    {point.discount > 0 && (
                      <div className="w-2 h-1 bg-red-500 rounded mt-1"></div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Price Alerts */}
      <div className="mt-6 p-4 bg-dark-700 rounded-lg">
        <h4 className="text-white font-semibold mb-3">Alertas de Precio</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-dark-300 text-sm">Notificar cuando baje a</span>
            <button className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded transition-colors">
              {formatPrice(currentPrice * 0.8)}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-dark-300 text-sm">Notificar en descuento</span>
            <button className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded transition-colors">
              50% o más
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 