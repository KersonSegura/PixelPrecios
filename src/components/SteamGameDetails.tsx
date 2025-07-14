'use client'

import { useState, useEffect } from 'react'
import { steamApiService, type SteamGameDetails, type SteamAchievement } from '@/services/steamApi'
import { CurrencyService } from '@/services/currencyService'

interface SteamGameDetailsProps {
  steamAppId: number
  currency: string
}

export default function SteamGameDetails({ steamAppId, currency }: SteamGameDetailsProps) {
  const [gameDetails, setGameDetails] = useState<SteamGameDetails | null>(null)
  const [achievements, setAchievements] = useState<SteamAchievement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'details' | 'achievements' | 'screenshots'>('details')

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const details = await steamApiService.getGameDetails(steamAppId)
        setGameDetails(details)
        
        // Fetch achievements if available
        if (details.data.achievements && details.data.achievements.total > 0) {
          try {
            const schema = await steamApiService.getGameSchema(steamAppId)
            if (schema.game?.availableGameStats?.achievements) {
              setAchievements(schema.game.availableGameStats.achievements)
            }
          } catch (achievementError) {
            console.warn('Could not fetch achievements:', achievementError)
          }
        }
      } catch (err) {
        setError('No se pudo cargar la información de Steam')
        console.error('Error fetching Steam game details:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (steamAppId) {
      fetchGameDetails()
    }
  }, [steamAppId])

  const formatPrice = (priceInCents: number, currency: string) => {
    const priceInDollars = priceInCents / 100
    return CurrencyService.formatPrice(priceInDollars, currency)
  }

  if (isLoading) {
    return (
      <div className="bg-dark-800 rounded-xl p-6 animate-pulse">
        <div className="h-6 bg-dark-700 rounded mb-4"></div>
        <div className="h-4 bg-dark-700 rounded mb-2"></div>
        <div className="h-4 bg-dark-700 rounded mb-2"></div>
        <div className="h-4 bg-dark-700 rounded"></div>
      </div>
    )
  }

  if (error || !gameDetails) {
    return (
      <div className="bg-dark-800 rounded-xl p-6">
        <div className="text-center text-dark-300">
          <svg className="w-12 h-12 mx-auto mb-4 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-lg font-medium">{error || 'Información de Steam no disponible'}</p>
        </div>
      </div>
    )
  }

  const data = gameDetails.data

  return (
    <div className="bg-dark-800 rounded-xl overflow-hidden">
      {/* Header with game image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-600 to-primary-800">
        {data.header_image && (
          <img 
            src={data.header_image} 
            alt={data.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold text-white mb-2">{data.name}</h2>
          {data.price_overview && (
            <div className="flex items-center space-x-4 text-white">
              <span className="text-lg font-semibold">
                {formatPrice(data.price_overview.final, currency)}
              </span>
              {data.price_overview.discount_percent > 0 && (
                <>
                  <span className="line-through text-dark-300">
                    {formatPrice(data.price_overview.initial, currency)}
                  </span>
                  <span className="bg-primary-600 px-2 py-1 rounded text-sm font-medium">
                    -{data.price_overview.discount_percent}%
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-dark-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'details' 
                ? 'text-primary-400 border-b-2 border-primary-400' 
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Detalles
          </button>
          {data.achievements && data.achievements.total > 0 && (
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'achievements' 
                  ? 'text-primary-400 border-b-2 border-primary-400' 
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              Logros ({data.achievements.total})
            </button>
          )}
          {data.screenshots && data.screenshots.length > 0 && (
            <button
              onClick={() => setActiveTab('screenshots')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'screenshots' 
                  ? 'text-primary-400 border-b-2 border-primary-400' 
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              Capturas ({data.screenshots.length})
            </button>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Descripción</h3>
              <p className="text-dark-300 leading-relaxed">{data.short_description}</p>
            </div>

            {/* Game Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Developers & Publishers */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Desarrolladores</h3>
                <div className="space-y-2">
                  {data.developers?.map((dev, index) => (
                    <span key={index} className="inline-block bg-dark-700 px-3 py-1 rounded text-sm text-dark-300">
                      {dev}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Publicadores</h3>
                <div className="space-y-2">
                  {data.publishers?.map((pub, index) => (
                    <span key={index} className="inline-block bg-dark-700 px-3 py-1 rounded text-sm text-dark-300">
                      {pub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Genres & Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Géneros</h3>
                <div className="flex flex-wrap gap-2">
                  {data.genres?.map((genre, index) => (
                    <span key={index} className="bg-primary-600 px-3 py-1 rounded text-sm text-white">
                      {genre.description}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Categorías</h3>
                <div className="flex flex-wrap gap-2">
                  {data.categories?.map((category, index) => (
                    <span key={index} className="bg-dark-700 px-3 py-1 rounded text-sm text-dark-300">
                      {category.description}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Plataformas</h3>
              <div className="flex space-x-4">
                {data.platforms.windows && (
                  <span className="flex items-center space-x-2 text-dark-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 3.544A2.544 2.544 0 0 1 2.544 1H11.5L12 5.5H22a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3.544z"/>
                    </svg>
                    <span>Windows</span>
                  </span>
                )}
                {data.platforms.mac && (
                  <span className="flex items-center space-x-2 text-dark-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <span>macOS</span>
                  </span>
                )}
                {data.platforms.linux && (
                  <span className="flex items-center space-x-2 text-dark-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Linux</span>
                  </span>
                )}
              </div>
            </div>

            {/* Release Date */}
            {data.release_date && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Fecha de Lanzamiento</h3>
                <p className="text-dark-300">
                  {data.release_date.coming_soon ? 'Próximamente' : data.release_date.date}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'achievements' && achievements.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Logros Disponibles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.slice(0, 12).map((achievement, index) => (
                <div key={index} className="bg-dark-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={steamApiService.getAchievementIconUrl(steamAppId, achievement.icon)}
                      alt={achievement.displayName}
                      className="w-12 h-12 rounded"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-achievement.png'
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">{achievement.displayName}</h4>
                      <p className="text-dark-300 text-xs mt-1">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {achievements.length > 12 && (
              <p className="text-dark-300 text-sm mt-4 text-center">
                Mostrando 12 de {achievements.length} logros
              </p>
            )}
          </div>
        )}

        {activeTab === 'screenshots' && data.screenshots && data.screenshots.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Capturas de Pantalla</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.screenshots.slice(0, 9).map((screenshot, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img 
                    src={screenshot.path_thumbnail} 
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            {data.screenshots.length > 9 && (
              <p className="text-dark-300 text-sm mt-4 text-center">
                Mostrando 9 de {data.screenshots.length} capturas
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 