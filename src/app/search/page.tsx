'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { Game, CurrencyService } from '@/services/currencyService'

interface SearchFilters {
  query: string
  tags: string[]
  priceRange: [number, number]
  discount: number
  store: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currency, setCurrency] = useState('CRC')
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    tags: searchParams.get('tags')?.split(',') || [],
    priceRange: [0, 100000],
    discount: 0,
    store: ''
  })

  // Datos simulados de juegos (en un proyecto real vendrían de una API)
  const allGames: Game[] = [
    {
      id: 'cyberpunk-2077',
      title: 'Cyberpunk 2077',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      priceCRC: 25000,
      originalPriceCRC: 35000,
      discount: 29,
      store: 'Steam',
      tags: ['RPG', 'Acción', 'Mundo Abierto', 'Cyberpunk', 'Futurista', 'Modificación Corporal', 'Cibernética', 'Distopía', 'Narrativa', 'Exploración']
    },
    {
      id: 'elden-ring',
      title: 'Elden Ring',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
      priceCRC: 30000,
      originalPriceCRC: 40000,
      discount: 25,
      store: 'Steam',
      tags: ['RPG', 'Acción', 'Mundo Abierto', 'Fantasía', 'Difícil', 'Souls-like', 'Exploración', 'Jefes', 'Misterio', 'Lore', 'Desafío']
    },
    {
      id: 'red-dead-redemption-2',
      title: 'Red Dead Redemption 2',
      image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=400&h=300&fit=crop',
      priceCRC: 20000,
      originalPriceCRC: 30000,
      discount: 33,
      store: 'Steam',
      tags: ['Acción', 'Mundo Abierto', 'Western', 'Aventura', 'Histórico', 'Caballos', 'Armas', 'Bandidos', 'Exploración', 'Narrativa', 'Siglo XIX']
    },
    {
      id: 'the-witcher-3',
      title: 'The Witcher 3: Wild Hunt',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      priceCRC: 15000,
      originalPriceCRC: 25000,
      discount: 40,
      store: 'Steam',
      tags: ['RPG', 'Acción', 'Mundo Abierto', 'Fantasía', 'Aventura', 'Monstruos', 'Magia', 'Exploración', 'Narrativa', 'Cazador', 'Medieval']
    },
    {
      id: 'god-of-war',
      title: 'God of War',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
      priceCRC: 35000,
      originalPriceCRC: 45000,
      discount: 22,
      store: 'Steam',
      tags: ['Acción', 'Aventura', 'Mitología', 'Hack and Slash', 'Griego', 'Dioses', 'Combate', 'Narrativa', 'Exploración', 'Puzzles']
    },
    {
      id: 'gta-v-free',
      title: 'Grand Theft Auto V',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      priceCRC: 0,
      originalPriceCRC: 25000,
      discount: 100,
      store: 'Epic Games',
      tags: ['Acción', 'Mundo Abierto', 'Crimen', 'Aventura', 'Coches', 'Armas', 'Gangsters', 'Exploración', 'Misiones', 'Libertad']
    },
    {
      id: 'watch-dogs-free',
      title: 'Watch Dogs 2',
      image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=400&h=300&fit=crop',
      priceCRC: 0,
      originalPriceCRC: 30000,
      discount: 100,
      store: 'GOG',
      tags: ['Acción', 'Mundo Abierto', 'Hacking', 'Aventura', 'Tecnología', 'Vigilancia', 'San Francisco', 'Misiones', 'Exploración', 'Sigilo']
    }
  ]

  useEffect(() => {
    // Simular carga de datos y inicializar filtros desde URL
    setTimeout(() => {
      setGames(allGames)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredGames = games.filter(game => {
    // Filtro por query
    if (filters.query && !game.title.toLowerCase().includes(filters.query.toLowerCase())) {
      return false
    }
    
    // Filtro por tags
    if (filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        game.tags.some(gameTag => 
          gameTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
      if (!hasMatchingTag) return false
    }
    
    // Filtro por precio
    if (game.priceCRC < filters.priceRange[0] || game.priceCRC > filters.priceRange[1]) {
      return false
    }
    
    // Filtro por descuento
    if (game.discount < filters.discount) {
      return false
    }
    
    // Filtro por tienda
    if (filters.store && game.store.toLowerCase() !== filters.store.toLowerCase()) {
      return false
    }
    
    return true
  })

  const handleTagClick = (tag: string) => {
    const newTags = filters.tags.includes(tag) 
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag]
    
    setFilters(prev => ({ ...prev, tags: newTags }))
    
    // Actualizar URL
    const params = new URLSearchParams()
    if (filters.query) params.set('q', filters.query)
    if (newTags.length > 0) params.set('tags', newTags.join(','))
    router.push(`/search?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      query: '',
      tags: [],
      priceRange: [0, 100000],
      discount: 0,
      store: ''
    })
    router.push('/search')
  }

  // Función para obtener tags únicos y ordenados por frecuencia
  const getAllTags = () => {
    const tagCount: { [key: string]: number } = {}
    
    allGames.forEach(game => {
      game.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    })
    
    // Ordenar por frecuencia (más comunes primero) y luego alfabéticamente
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag)
  }

  const [showAllTags, setShowAllTags] = useState(false)
  const allTags = getAllTags()
  const displayedTags = showAllTags ? allTags : allTags.slice(0, 20) // Limitar a los 20 tags más populares

  return (
    <div className="min-h-screen bg-dark-900">
      <Header 
        selectedCurrency={currency} 
        setSelectedCurrency={setCurrency}
        selectedCountry="CR"
        setSelectedCountry={() => {}}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header de búsqueda */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Búsqueda de Juegos</h1>
          
          {/* Barra de búsqueda */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar juegos..."
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              className="flex-1 bg-dark-800 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500"
            />
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
            >
              Limpiar
            </button>
          </div>

          {/* Filtros activos */}
          {filters.tags.length > 0 && (
            <div className="mb-4">
              <span className="text-dark-300 text-sm mr-2">Filtros activos:</span>
              {filters.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500 text-white text-sm rounded-full mr-2 mb-2"
                >
                  {tag}
                  <button
                    onClick={() => handleTagClick(tag)}
                    className="ml-1 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de filtros */}
          <div className="lg:col-span-1">
            <div className="bg-dark-800 rounded-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-4">Filtros</h3>
              
              {/* Tags */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Géneros y Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {displayedTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        filters.tags.includes(tag)
                          ? 'bg-primary-500 text-white'
                          : 'bg-dark-700 text-dark-200 hover:bg-dark-600'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {allTags.length > 20 && (
                  <button
                    onClick={() => setShowAllTags(!showAllTags)}
                    className="mt-3 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                  >
                    {showAllTags ? 'Mostrar menos' : `Mostrar más (${allTags.length - 20} más)`}
                  </button>
                )}
              </div>

              {/* Rango de precio */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Rango de Precio</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
                    }))}
                    className="w-full accent-primary-500"
                  />
                  <div className="flex justify-between text-sm text-dark-300">
                    <span>₡0</span>
                    <span>₡{filters.priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

                            {/* Descuento mínimo */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Descuento Mínimo</h4>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.discount}
                  onChange={(e) => setFilters(prev => ({ ...prev, discount: parseInt(e.target.value) }))}
                  className="w-full accent-primary-500"
                />
                <div className="flex justify-between text-sm text-dark-300">
                  <span>0%</span>
                  <span>{filters.discount >= 95 ? 'Gratis' : `${filters.discount}%`}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-white text-xl">Cargando...</div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {filteredGames.length} juego{filteredGames.length !== 1 ? 's' : ''} encontrado{filteredGames.length !== 1 ? 's' : ''}
                  </h2>
                </div>

                {filteredGames.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-dark-400 text-lg mb-2">No se encontraron juegos</div>
                    <div className="text-dark-500 text-sm">Intenta ajustar los filtros</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredGames.map(game => (
                      <div
                        key={game.id}
                        onClick={() => router.push(`/game/${game.id}`)}
                        className="bg-dark-800 rounded-xl overflow-hidden cursor-pointer hover:bg-dark-700 transition-colors group"
                      >
                        <div className="relative h-48">
                          <img
                            src={game.image}
                            alt={game.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {game.discount > 0 && (
                            <div className={`absolute top-2 right-2 text-white px-2 py-1 rounded text-sm font-bold ${
                              game.discount === 100 ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                              {game.discount === 100 ? 'Gratis' : `-${game.discount}%`}
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                            {game.title}
                          </h3>
                          <div className="flex items-center justify-between mb-3">
                            <span className={`font-bold ${game.priceCRC === 0 ? 'text-green-400' : 'text-primary-400'}`}>
                              {game.priceCRC === 0 ? 'Gratis' : `₡${game.priceCRC.toLocaleString()}`}
                            </span>
                            {game.originalPriceCRC > game.priceCRC && (
                              <span className="text-dark-400 text-sm line-through">
                                ₡{game.originalPriceCRC.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-dark-300 text-sm">{game.store}</span>
                            <div className="flex flex-wrap gap-1">
                              {game.tags.slice(0, 3).map(tag => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-dark-700 text-dark-200 text-xs rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}