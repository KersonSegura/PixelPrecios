'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { steamApiService, type SteamAchievement } from '@/services/steamApi'

interface SteamAchievementsProps {
  steamAppId: number
  maxDisplay?: number
}

export default function SteamAchievements({ steamAppId, maxDisplay = 12 }: SteamAchievementsProps) {
  const [achievements, setAchievements] = useState<SteamAchievement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const schema = await steamApiService.getGameSchema(steamAppId)
        if (schema.game?.availableGameStats?.achievements) {
          setAchievements(schema.game.availableGameStats.achievements)
        } else {
          setError('No se encontraron logros para este juego')
        }
      } catch (err) {
        setError('No se pudieron cargar los logros')
        console.error('Error fetching achievements:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (steamAppId) {
      fetchAchievements()
    }
  }, [steamAppId])

  if (isLoading) {
    return (
      <div className="bg-dark-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Logros de Steam</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-dark-700 rounded-lg p-4 animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-dark-600 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-dark-600 rounded mb-2"></div>
                  <div className="h-3 bg-dark-600 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error || achievements.length === 0) {
    return (
      <div className="bg-dark-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Logros de Steam</h3>
        <div className="text-center text-dark-300">
          <svg className="w-12 h-12 mx-auto mb-4 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium">{error || 'No hay logros disponibles'}</p>
        </div>
      </div>
    )
  }

  const displayedAchievements = showAll ? achievements : achievements.slice(0, maxDisplay)

  return (
    <div className="bg-dark-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Logros de Steam</h3>
        <span className="px-3 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full">
          {achievements.length} logros
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedAchievements.map((achievement, index) => (
          <div key={index} className="bg-dark-700 rounded-lg p-4 hover:bg-dark-600 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image 
                  src={steamApiService.getAchievementIconUrl(steamAppId, achievement.icon)}
                  alt={achievement.displayName}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-achievement.png'
                  }}
                />
                {achievement.hidden === 1 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium text-sm truncate">
                  {achievement.displayName}
                </h4>
                <p className="text-dark-300 text-xs mt-1 line-clamp-2">
                  {achievement.description}
                </p>
                {achievement.hidden === 1 && (
                  <span className="inline-block mt-1 px-2 py-1 bg-dark-600 text-dark-300 text-xs rounded">
                    Oculto
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {achievements.length > maxDisplay && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
          >
            {showAll ? 'Mostrar Menos' : `Mostrar Todos (${achievements.length})`}
          </button>
        </div>
      )}
    </div>
  )
} 