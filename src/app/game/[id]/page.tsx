'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Game, CurrencyService } from '@/services/currencyService'
import { findSimilarGames, GameWithTags } from '@/data/games'
import { gameDataService, type UnifiedGameData } from '@/services/gameDataService'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import GameDetailNav from '@/components/GameDetailNav'
import SteamGameDetails from '@/components/SteamGameDetails'
import SteamAchievements from '@/components/SteamAchievements'
import SteamPriceHistory from '@/components/SteamPriceHistory'
import DataSourceInfo from '@/components/DataSourceInfo'

interface GameDetails extends Game {
  description: string
  releaseDate: string
  developer: string
  publisher: string
  tags: string[]
  screenshots: string[]
  videos: string[]
  steamAppId?: number
  dlcs: Array<{
    id: string
    title: string
    priceCRC: number
    originalPriceCRC: number
    discount: number
    description: string
    image: string
  }>
  systemRequirements: {
    minimum: string[]
    recommended: string[]
  }
  rating: number
  reviews: number
}

// Datos simulados para el juego (en un proyecto real vendrían de una API)
const getGameDetails = (id: string): GameDetails => {
  const games = {
    'cyberpunk-2077': {
      id: 'cyberpunk-2077',
      title: 'Cyberpunk 2077',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
      priceCRC: 25000,
      originalPriceCRC: 35000,
      discount: 29,
      store: 'Steam',
      steamAppId: 1091500,
      description: 'Cyberpunk 2077 es un RPG de acción y aventura de mundo abierto que se desarrolla en Night City, una megalópolis obsesionada con el poder, el glamour y la modificación corporal.',
      releaseDate: '2020-12-10',
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt',
      tags: ['RPG', 'Acción', 'Mundo Abierto', 'Cyberpunk', 'Futurista', 'Modificación Corporal'],
      screenshots: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop'
      ],
      videos: [
        'https://www.youtube.com/embed/LembwKDo1Dk',
        'https://www.youtube.com/embed/8X2kIfS6fb8'
      ],
      dlcs: [
        {
          id: 'phantom-liberty',
          title: 'Phantom Liberty',
          priceCRC: 15000,
          originalPriceCRC: 20000,
          discount: 25,
          description: 'Expansión principal que añade nuevas misiones, personajes y contenido.',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=320&h=200&fit=crop&crop=center'
        },
        {
          id: 'ultimate-pack',
          title: 'Ultimate Pack',
          priceCRC: 5000,
          originalPriceCRC: 8000,
          discount: 38,
          description: 'Pack con contenido adicional y cosméticos exclusivos.',
          image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=320&h=200&fit=crop&crop=center'
        }
      ],
      systemRequirements: {
        minimum: [
          'OS: Windows 10',
          'Processor: Intel Core i5-3570K',
          'Memory: 8 GB RAM',
          'Graphics: NVIDIA GeForce GTX 970',
          'Storage: 70 GB'
        ],
        recommended: [
          'OS: Windows 10',
          'Processor: Intel Core i7-4790',
          'Memory: 12 GB RAM',
          'Graphics: NVIDIA GeForce GTX 1060',
          'Storage: 70 GB SSD'
        ]
      },
      rating: 4.2,
      reviews: 125000
    },
    'elden-ring': {
      id: 'elden-ring',
      title: 'Elden Ring',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
      priceCRC: 30000,
      originalPriceCRC: 40000,
      discount: 25,
      store: 'Steam',
      steamAppId: 1245620,
      description: 'Elden Ring es un RPG de acción desarrollado por FromSoftware. Explora un vasto mundo de fantasía oscura lleno de misterios y desafíos épicos.',
      releaseDate: '2022-02-25',
      developer: 'FromSoftware',
      publisher: 'Bandai Namco',
      tags: ['RPG', 'Acción', 'Mundo Abierto', 'Fantasía', 'Difícil', 'Souls-like'],
      screenshots: [
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=1200&h=800&fit=crop'
      ],
      videos: [
        'https://www.youtube.com/embed/E3Huy2cdih0',
        'https://www.youtube.com/embed/OT8if6DXOFQ'
      ],
      dlcs: [
        {
          id: 'shadow-of-the-erdtree',
          title: 'Shadow of the Erdtree',
          priceCRC: 20000,
          originalPriceCRC: 25000,
          discount: 20,
          description: 'Expansión masiva que añade nuevas áreas, jefes y contenido.',
          image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=320&h=200&fit=crop&crop=center'
        }
      ],
      systemRequirements: {
        minimum: [
          'OS: Windows 10',
          'Processor: Intel Core i5-8400',
          'Memory: 12 GB RAM',
          'Graphics: NVIDIA GeForce GTX 1060',
          'Storage: 60 GB'
        ],
        recommended: [
          'OS: Windows 10/11',
          'Processor: Intel Core i7-8700K',
          'Memory: 16 GB RAM',
          'Graphics: NVIDIA GeForce GTX 1070',
          'Storage: 60 GB SSD'
        ]
      },
      rating: 4.8,
      reviews: 89000
    }
  }

  return games[id as keyof typeof games] || games['cyberpunk-2077']
}

export default function GameDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [currency, setCurrency] = useState('CRC')
  const [game, setGame] = useState<UnifiedGameData | null>(null)
  const [convertedPrice, setConvertedPrice] = useState<string>('')
  const [convertedOriginalPrice, setConvertedOriginalPrice] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [autoScrollPaused, setAutoScrollPaused] = useState(false)
  const [similarGames, setSimilarGames] = useState<GameWithTags[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      const loadGameData = async () => {
        try {
          setIsLoading(true)
          setError(null)
          
          // Obtener datos unificados del juego
          const gameData = await gameDataService.getUnifiedGameData(params.id as string)
          setGame(gameData)
          
          // Cargar favoritos
          const favs = JSON.parse(localStorage.getItem('pixelprecios_favs') || '{}')
          setIsFavorite(!!favs[gameData.id])
          
          // Encontrar juegos similares usando tags del juego unificado
          const allGames = [
            ...require('@/data/games').highlightGames,
            ...require('@/data/games').trendingGames,
            ...require('@/data/games').dealsGames
          ]
          const similar = findSimilarGames(gameData.genres, gameData.id, allGames)
          setSimilarGames(similar)
          
        } catch (err) {
          console.error('Error loading game data:', err)
          setError('Error al cargar los datos del juego')
        } finally {
          setIsLoading(false)
        }
      }
      
      loadGameData()
    }
  }, [params.id])

  useEffect(() => {
    if (game && game.price && game.originalPrice) {
      setIsLoading(true)
      
      // Convertir precios del juego principal
      Promise.all([
        CurrencyService.convertFromCRC(game.price * 100, currency), // Convertir USD a CRC
        CurrencyService.convertFromCRC(game.originalPrice * 100, currency)
      ])
        .then(([price, originalPrice]) => {
          setConvertedPrice(CurrencyService.formatPrice(price, currency))
          setConvertedOriginalPrice(CurrencyService.formatPrice(originalPrice, currency))
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Error converting prices:', error)
          setIsLoading(false)
        })
    }
  }, [game, currency])

  // Auto-scroll para capturas de pantalla
  useEffect(() => {
    if (!game || game.screenshots.length <= 1 || autoScrollPaused) return

    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % game.screenshots.length)
    }, 10000) // 10 segundos

    return () => clearInterval(interval)
  }, [game, autoScrollPaused])

  const toggleFavorite = () => {
    if (!game) return
    const favs = JSON.parse(localStorage.getItem('pixelprecios_favs') || '{}')
    if (isFavorite) {
      delete favs[game.id]
    } else {
      favs[game.id] = true
    }
    localStorage.setItem('pixelprecios_favs', JSON.stringify(favs))
    setIsFavorite(!isFavorite)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Header 
          selectedCurrency={currency} 
          setSelectedCurrency={setCurrency}
          selectedCountry="CR"
          setSelectedCountry={() => {}}
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Cargando...</div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header 
        selectedCurrency={currency} 
        setSelectedCurrency={setCurrency}
        selectedCountry="CR"
        setSelectedCountry={() => {}}
      />
      
      <GameDetailNav gameTitle={game.title} />
      
      {/* Hero Section */}
      <div className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Imagen de portada */}
            <div className="relative w-full lg:w-[498px] h-48 lg:h-[280px] rounded-xl overflow-hidden shadow-2xl flex-shrink-0 lg:mt-1">
              <Image
                src={game.image}
                alt={game.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Info principal y bloque de compra */}
            <div className="flex-1 flex flex-col justify-between h-full lg:h-[280px]">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                  {game.title}
                </h1>
                <div className="flex items-center gap-4 text-dark-200 mb-4">
                  <span className="font-medium">{game.developers.join(', ')}</span>
                  <span>•</span>
                  <span>{formatDate(game.releaseDate)}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium">{game.rating}</span>
                    <span className="text-dark-400">({game.reviewsCount.toLocaleString()})</span>
                  </div>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.genres.slice(0, 4).map((genre: string) => (
                    <button
                      key={genre}
                      onClick={() => router.push(`/search?tags=${genre}`)}
                      className="px-3 py-1 bg-dark-700 hover:bg-dark-600 text-dark-200 hover:text-white text-sm rounded-full border border-dark-600 transition-colors cursor-pointer"
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                {/* Bloque de compra */}
                <div className="mt-2 w-full max-w-xl">
                  <div className="flex items-center justify-between bg-dark-900 rounded-lg px-6 py-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary-400">
                        {isLoading ? '...' : convertedPrice}
                      </span>
                      {game.discount && game.discount > 0 && (
                        <span className="ml-2 text-lg text-dark-400 line-through">
                          {isLoading ? '...' : convertedOriginalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {game.discount && game.discount > 0 && (
                        <span className="px-3 py-1 bg-red-500 text-white font-bold rounded">
                          -{game.discount}%
                        </span>
                      )}
                      <span className="px-3 py-1 bg-dark-700 text-dark-200 rounded">
                        {game.stores.join(', ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-1">
                      Comprar Ahora
                    </button>
                    <button
                      onClick={toggleFavorite}
                      className="p-3 bg-dark-700 hover:bg-dark-600 rounded-full transition-colors h-full flex items-center justify-center mt-1"
                      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                      {isFavorite ? (
                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-dark-300 hover:text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-400 font-medium">{error}</span>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción */}
            <div className="bg-dark-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Descripción</h2>
              <p className="text-dark-200 leading-relaxed">{game.description}</p>
            </div>

            {/* Información de Steam */}
            {game.achievements && (
              <SteamGameDetails 
                steamAppId={parseInt(game.id)} 
                currency={currency} 
              />
            )}

            {/* Logros de Steam */}
            {game.achievements && (
              <SteamAchievements 
                steamAppId={parseInt(game.id)} 
                maxDisplay={6}
              />
            )}

            {/* Capturas de pantalla */}
            <div className="bg-dark-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Capturas de Pantalla</h2>
                {game.screenshots.length > 1 && (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {game.screenshots.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            selectedImage === index 
                              ? 'bg-primary-500' 
                              : 'bg-dark-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-dark-400">
                      {selectedImage + 1} / {game.screenshots.length}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <Image
                    src={game.screenshots[selectedImage]}
                    alt={`${game.title} screenshot ${selectedImage + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {game.screenshots.map((screenshot: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedImage(index)
                        setAutoScrollPaused(true)
                        // Reanudar auto-scroll después de 5 segundos de inactividad
                        setTimeout(() => setAutoScrollPaused(false), 5000)
                      }}
                      className={`relative h-20 rounded overflow-hidden transition-opacity ${
                        selectedImage === index ? 'ring-2 ring-primary-500' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={screenshot}
                        alt={`${game.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Videos */}
            {game.videos.length > 0 && (
              <div className="bg-dark-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Videos</h2>
                <div className="space-y-4">
                  {game.videos.map((video: string, index: number) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={video}
                        title={`${game.title} video ${index + 1}`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DLCs - Temporalmente deshabilitado hasta implementar en UnifiedGameData */}
            {/* 
            {game.dlcs && game.dlcs.length > 0 && (
              <div className="bg-dark-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">Contenido Descargable</h2>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full">
                      {game.dlcs.length} DLC{game.dlcs.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  {convertedDlcs.map((dlc) => (
                    <button
                      key={dlc.id}
                      className="w-full text-left border border-dark-600 rounded-lg p-4 hover:border-primary-500 transition-colors cursor-pointer bg-transparent"
                      onClick={() => router.push(`/dlc/${dlc.id}`)}
                      aria-label={`Ver detalles de ${dlc.title}`}
                    >
                      <div className="flex gap-4">
                        <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 self-center">
                          <Image
                            src={dlc.image}
                            alt={dlc.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-white">{dlc.title}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-primary-400 font-semibold">
                                {dlc.convertedPrice}
                              </span>
                              {dlc.discount > 0 && (
                                <span className="text-sm text-dark-400 line-through">
                                  {dlc.convertedOriginalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-dark-200 text-sm mb-3">{dlc.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-1 bg-dark-700 text-dark-200 text-xs rounded">
                              {dlc.store || game.stores.join(', ')}
                            </span>
                            {dlc.discount > 0 && (
                              <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                                -{dlc.discount}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            */}

            {/* Requisitos del sistema */}
            <div className="bg-dark-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Requisitos del Sistema</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Mínimos</h3>
                  <ul className="space-y-2">
                    {game.systemRequirements.minimum.map((req: string, index: number) => (
                      <li key={index} className="text-dark-200 text-sm">• {req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Recomendados</h3>
                  <ul className="space-y-2">
                    {game.systemRequirements.recommended.map((req: string, index: number) => (
                      <li key={index} className="text-dark-200 text-sm">• {req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fuentes de datos */}
            <DataSourceInfo dataSources={game.dataSources} />
            
            {/* Información del juego */}
            <div className="bg-dark-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Información del Juego</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-dark-400 text-sm">Desarrollador</span>
                  <p className="text-white">{game.developers.join(', ')}</p>
                </div>
                <div>
                  <span className="text-dark-400 text-sm">Editor</span>
                  <p className="text-white">{game.publishers.join(', ')}</p>
                </div>
                <div>
                  <span className="text-dark-400 text-sm">Fecha de Lanzamiento</span>
                  <p className="text-white">{formatDate(game.releaseDate)}</p>
                </div>
                <div>
                  <span className="text-dark-400 text-sm">Géneros</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {game.genres.map((genre: string) => (
                      <button
                        key={genre}
                        onClick={() => router.push(`/search?tags=${genre}`)}
                        className="px-2 py-1 bg-dark-700 hover:bg-dark-600 text-dark-200 hover:text-white text-xs rounded transition-colors cursor-pointer"
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Precio histórico de Steam */}
            {game.achievements && (
              <SteamPriceHistory 
                steamAppId={parseInt(game.id)} 
                currency={currency} 
              />
            )}

            {/* Ofertas similares */}
            <div className="bg-dark-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Ofertas Similares</h3>
              {similarGames.length > 0 ? (
                <div className="space-y-3">
                  {similarGames.map((similarGame) => (
                    <div key={similarGame.id} className="border border-dark-600 rounded-lg p-3 hover:border-primary-500 transition-colors cursor-pointer" onClick={() => router.push(`/game/${similarGame.id}`)}>
                      <div className="flex items-center gap-3">
                        <div className="relative w-[92px] h-[35px] rounded overflow-hidden flex-shrink-0 bg-dark-700">
                          <Image
                            src={similarGame.image}
                            alt={similarGame.title}
                            fill
                            className="object-contain"
                            onError={(e) => {
                              // Fallback a una imagen por defecto si la imagen no carga
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement!.innerHTML = `
                                <div class="w-full h-full bg-dark-600 flex items-center justify-center">
                                  <svg class="w-6 h-6 text-dark-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                  </svg>
                                </div>
                              `;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-semibold truncate">{similarGame.title}</p>
                          <p className="text-primary-400 text-sm">
                            {CurrencyService.formatPrice(similarGame.priceCRC ?? 0, currency)}{' '}
                            <span className="line-through opacity-60">
                              {CurrencyService.formatPrice(similarGame.originalPriceCRC ?? 0, currency)}
                            </span>
                          </p>
                          <span className="text-green-400 ml-2">
                            -{similarGame.discount ?? 0}%
                          </span>
                          <span className="block text-sm text-neutral-400">
                            {similarGame.store ?? 'Unknown'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-dark-400 text-sm">No se encontraron ofertas similares con descuento.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  )
} 