'use client'

import { useState, useEffect, useMemo } from 'react'
import GameCard from './GameCard'
import { CurrencyService, Game } from '@/services/currencyService'
import type { TrendingGameAPI } from '@/types/Game'

interface DealsSectionProps {
  currency: string
}

export default function DealsSection({ currency }: DealsSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [fiveUSDPrice, setFiveUSDPrice] = useState<string>('')
  const [tenUSDPrice, setTenUSDPrice] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<TrendingGameAPI[]>([])
  const [displayedGames, setDisplayedGames] = useState<TrendingGameAPI[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const gamesPerPage = 9

  useEffect(() => {
    setIsLoading(true)
    
    // Cargar juegos y convertir precios en paralelo
    Promise.all([
      fetch('/api/trending-games').then(res => res.json()).then(data => data.games || []),
      CurrencyService.convertPrice(5, currency).then(price => CurrencyService.formatFilterPrice(price, currency)).catch(() => '₡2,500'),
      CurrencyService.convertPrice(10, currency).then(price => CurrencyService.formatFilterPrice(price, currency)).catch(() => '₡5,000')
    ])
      .then(([gamesData, fiveUSD, tenUSD]) => {
        setGames(gamesData)
        setDisplayedGames(gamesData.slice(0, gamesPerPage))
        setFiveUSDPrice(fiveUSD)
        setTenUSDPrice(tenUSD)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
        setFiveUSDPrice('₡2,500')
        setTenUSDPrice('₡5,000')
      })
  }, [currency])

  // Filtrado de juegos según el filtro activo
  const filteredGames = useMemo(() => games.filter((game) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'under5') {
      const rates = {
        CRC: 500,
        MXN: 17.5,
        ARS: 1000,
        CLP: 950,
        COP: 4000,
        PEN: 3.7,
        BRL: 5.2
      }
      const rate = rates[currency as keyof typeof rates] || 500
      const fiveUSDInTargetCurrency = CurrencyService.roundFilterPrice(5 * rate, currency)
      // Extract price from ITAD data if available
      const gamePrice = game.price?.price?.amount || 0
      return gamePrice <= fiveUSDInTargetCurrency
    }
    if (activeFilter === 'under10') {
      const rates = {
        CRC: 500,
        MXN: 17.5,
        ARS: 1000,
        CLP: 950,
        COP: 4000,
        PEN: 3.7,
        BRL: 5.2
      }
      const rate = rates[currency as keyof typeof rates] || 500
      const tenUSDInTargetCurrency = CurrencyService.roundFilterPrice(10 * rate, currency)
      // Extract price from ITAD data if available
      const gamePrice = game.price?.price?.amount || 0
      return gamePrice <= tenUSDInTargetCurrency
    }
    if (activeFilter === 'over50') {
      // Extract discount from ITAD data if available
      const discount = game.price?.cut || 0
      return discount >= 50
    }
    if (activeFilter === 'steam') {
      // Extract shop from ITAD data if available
      const shop = game.price?.shop?.name || ''
      return shop.toLowerCase() === 'steam'
    }
    if (activeFilter === 'epic') {
      const shop = game.price?.shop?.name || ''
      return shop.toLowerCase().includes('epic')
    }
    if (activeFilter === 'gog') {
      const shop = game.price?.shop?.name || ''
      return shop.toLowerCase() === 'gog'
    }
    return true
  }), [games, activeFilter, currency])

  // Actualizar juegos mostrados cuando cambie el filtro o los juegos
  useEffect(() => {
    setDisplayedGames(filteredGames.slice(0, gamesPerPage))
    setCurrentPage(1)
  }, [filteredGames])

  // Cargar más juegos
  const loadMoreOffers = async () => {
    setIsLoadingMore(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setDisplayedGames(prev => [
      ...prev,
      ...filteredGames.slice(prev.length, prev.length + gamesPerPage)
    ])
    setCurrentPage(prev => prev + 1)
    setIsLoadingMore(false)
  }

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'under5', label: `Menos de ${isLoading ? '...' : fiveUSDPrice}` },
    { id: 'under10', label: `Menos de ${isLoading ? '...' : tenUSDPrice}` },
    { id: 'over50', label: '50%+ Descuento' },
    { id: 'steam', label: 'Steam' },
    { id: 'epic', label: 'Epic Store' },
    { id: 'gog', label: 'GOG' }
  ]

  return (
    <section id="deals" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ofertas <span className="text-primary-400">Imperdibles</span>
          </h2>
          <p className="text-lg text-dark-300 mb-8">
            Juegos con descuentos del 50% o más, o por menos de $5
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-3 text-center text-white">Cargando ofertas...</div>
          ) : displayedGames.length === 0 ? (
            <div className="col-span-3 text-center text-white">No hay ofertas relevantes.</div>
          ) : (
            displayedGames.map((game, idx) => {
              // Convertir TrendingGameAPI a Game
              const gameCard: Game = {
                id: game.id.toString(),
                title: game.name,
                image: game.background_image,
                priceCRC: game.price?.price?.amount * 500 || 0, // Convertir a CRC (aproximado)
                originalPriceCRC: game.price?.regular?.amount * 500 || 0,
                discount: game.price?.cut || 0,
                store: game.price?.shop?.name || '',
                tags: game.platforms || []
              }
              return <GameCard key={game.id + idx} game={gameCard} currency={currency} />
            })
          )}
        </div>
        {/* Botón para cargar más */}
        {displayedGames.length < filteredGames.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreOffers}
              className="px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
              disabled={isLoadingMore}
            >
              {isLoadingMore ? 'Cargando...' : 'Cargar más ofertas'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
} 