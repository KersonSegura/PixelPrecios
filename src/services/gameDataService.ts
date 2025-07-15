import { rawgApiService, type RAWGGame } from './rawgApi'
import { steamApiService, type SteamGameDetails } from './steamApi'
import { itadApiService, type ITADGame } from './itadApi'

export interface UnifiedGameData {
  // Basic Info (Priority: RAWG, Backup: Steam)
  id: string
  title: string
  description: string
  image: string
  releaseDate: string
  genres: string[]
  developers: string[]
  publishers: string[]
  platforms: string[]
  screenshots: string[]
  videos: string[]
  
  // Ratings (Priority: Steam + RAWG)
  rating: number
  metacritic: number | null
  reviewsCount: number
  
  // Pricing (Priority: ITAD, Backup: Steam)
  price: number | null
  originalPrice: number | null
  discount: number | null
  currency: string
  stores: string[]
  
  // Achievements (Only Steam)
  achievements: {
    total: number
    list: any[]
  } | null
  
  // Requirements (Priority: RAWG, Backup: Steam)
  systemRequirements: {
    minimum: string[]
    recommended: string[]
  }
  
  // Data Sources
  dataSources: {
    metadata: 'RAWG' | 'Steam' | 'Mock'
    pricing: 'ITAD' | 'Steam' | 'Mock'
    achievements: 'Steam' | null
    ratings: 'Steam' | 'RAWG' | 'Mock'
  }
}

class GameDataService {
  private async getGameMetadata(gameId: string, steamAppId?: number): Promise<Partial<UnifiedGameData>> {
    try {
      // Try RAWG first (primary source for metadata)
      const rawgGame = await rawgApiService.searchAndGetBestMatch(gameId)
      if (rawgGame) {
        return {
          id: rawgGame.slug,
          title: rawgGame.name,
          description: rawgGame.description,
          image: rawgGame.background_image,
          releaseDate: rawgGame.released,
          genres: rawgGame.genres?.map(g => g.name) || [],
          developers: rawgGame.developers?.map(d => d.name) || [],
          publishers: rawgGame.publishers?.map(p => p.name) || [],
          platforms: rawgGame.platforms?.map(p => p.platform.name) || [],
          screenshots: rawgGame.screenshots?.map(s => s.image) || [],
          videos: rawgGame.movies?.map(m => m.data.max) || [],
          rating: rawgGame.rating,
          metacritic: rawgGame.metacritic,
          reviewsCount: rawgGame.ratings_count,
          systemRequirements: rawgApiService.getGameRequirements(rawgGame),
          dataSources: {
            metadata: 'RAWG',
            pricing: 'Mock',
            achievements: null,
            ratings: 'RAWG'
          }
        }
      }
    } catch (error) {
      console.warn('RAWG API failed, trying Steam...', error)
    }

    // Try Steam as backup
    if (steamAppId) {
      try {
        const steamGame = await steamApiService.getGameDetails(steamAppId)
        if (steamGame.success) {
          const data = steamGame.data
          return {
            id: data.steam_appid.toString(),
            title: data.name,
            description: data.short_description,
            image: data.header_image,
            releaseDate: data.release_date?.date || '2024-01-01',
            genres: data.genres?.map(g => g.description) || [],
            developers: data.developers || [],
            publishers: data.publishers || [],
            platforms: [
              ...(data.platforms?.windows ? ['Windows'] : []),
              ...(data.platforms?.mac ? ['macOS'] : []),
              ...(data.platforms?.linux ? ['Linux'] : [])
            ],
            screenshots: data.screenshots?.map(s => s.path_full) || [],
            videos: data.movies?.map(m => m.mp4?.max).filter(Boolean) || [],
            rating: 0, // Steam doesn't provide rating in this endpoint
            metacritic: null,
            reviewsCount: 0,
            systemRequirements: {
              minimum: [],
              recommended: []
            },
            dataSources: {
              metadata: 'Steam',
              pricing: 'Mock',
              achievements: 'Steam',
              ratings: 'Mock'
            }
          }
        }
      } catch (error) {
        console.warn('Steam API failed', error)
      }
    }

    // Return mock data as last resort
    return {
      id: gameId,
      title: gameId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: 'Descripción no disponible',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
      releaseDate: '2024-01-01',
      genres: ['Action', 'Adventure'],
      developers: ['Desarrollador Desconocido'],
      publishers: ['Editor Desconocido'],
      platforms: ['PC'],
      screenshots: [],
      videos: [],
      rating: 0,
      metacritic: null,
      reviewsCount: 0,
      systemRequirements: {
        minimum: [],
        recommended: []
      },
      dataSources: {
        metadata: 'Mock',
        pricing: 'Mock',
        achievements: null,
        ratings: 'Mock'
      }
    }
  }

  private async getGamePricing(gameId: string, steamAppId?: number): Promise<Partial<UnifiedGameData>> {
    try {
      // Try ITAD first (primary source for pricing)
      const itadData = await itadApiService.getGameDeals(gameId, 'us')
      if (itadData && itadData.deals && itadData.deals.length > 0) {
        const bestDeal = itadData.deals[0] // Get the best deal
        return {
          price: bestDeal.price?.amount || 0,
          originalPrice: bestDeal.price_old?.amount || 0,
          discount: bestDeal.price_cut || 0,
          currency: bestDeal.price?.currency || 'USD',
          stores: [bestDeal.shop?.name || 'Unknown'],
          dataSources: {
            metadata: 'Mock',
            pricing: 'ITAD',
            achievements: null,
            ratings: 'Mock'
          }
        }
      }
    } catch (error) {
      console.warn('ITAD API failed, trying Steam...', error)
    }

    // Try Steam as backup for pricing
    if (steamAppId) {
      try {
        const steamGame = await steamApiService.getGameDetails(steamAppId)
        if (steamGame.success && steamGame.data.price_overview) {
          const price = steamGame.data.price_overview
          return {
            price: price.final / 100, // Convert from cents
            originalPrice: price.initial / 100,
            discount: price.discount_percent || 0,
            currency: price.currency || 'USD',
            stores: ['Steam'],
            dataSources: {
              metadata: 'Mock',
              pricing: 'Steam',
              achievements: null,
              ratings: 'Mock'
            }
          }
        }
      } catch (error) {
        console.warn('Steam pricing failed', error)
      }
    }

    // Return mock pricing
    return {
      price: 29.99,
      originalPrice: 59.99,
      discount: 50,
      currency: 'USD',
      stores: ['Steam'],
      dataSources: {
        metadata: 'Mock',
        pricing: 'Mock',
        achievements: null,
        ratings: 'Mock'
      }
    }
  }

  private async getGameAchievements(steamAppId?: number): Promise<Partial<UnifiedGameData>> {
    if (!steamAppId) {
      return { achievements: null }
    }

    try {
      const schema = await steamApiService.getGameSchema(steamAppId)
      if (schema.game?.availableGameStats?.achievements) {
        return {
          achievements: {
            total: schema.game.availableGameStats.achievements.length,
            list: schema.game.availableGameStats.achievements
          }
        }
      }
    } catch (error) {
      console.warn('Failed to get Steam achievements:', error)
    }

    return { achievements: null }
  }

  private async getSteamRatings(steamAppId?: number): Promise<Partial<UnifiedGameData>> {
    if (!steamAppId) {
      return { rating: 0, metacritic: null, reviewsCount: 0 }
    }

    try {
      const steamGame = await steamApiService.getGameDetails(steamAppId)
      if (steamGame.success) {
        // Steam doesn't provide ratings in the basic endpoint
        // We'd need additional API calls for this
        return {
          rating: 0,
          metacritic: null,
          reviewsCount: 0
        }
      }
    } catch (error) {
      console.warn('Failed to get Steam ratings:', error)
    }

    return { rating: 0, metacritic: null, reviewsCount: 0 }
  }

  // Main method to get unified game data
  async getUnifiedGameData(gameId: string, steamAppId?: number): Promise<UnifiedGameData> {
    console.log(`Fetching unified data for game: ${gameId}, Steam App ID: ${steamAppId}`)

    // Get data from all sources in parallel
    const [metadata, pricing, achievements, steamRatings] = await Promise.allSettled([
      this.getGameMetadata(gameId, steamAppId),
      this.getGamePricing(gameId, steamAppId),
      this.getGameAchievements(steamAppId),
      this.getSteamRatings(steamAppId)
    ])

    // Merge all data
    const unifiedData: UnifiedGameData = {
      // Metadata (Priority: RAWG, Backup: Steam)
      ...(metadata.status === 'fulfilled' ? metadata.value : {}),
      
      // Pricing (Priority: ITAD, Backup: Steam)
      ...(pricing.status === 'fulfilled' ? pricing.value : {}),
      
      // Achievements (Only Steam)
      ...(achievements.status === 'fulfilled' ? achievements.value : {}),
      
      // Steam Ratings (if available)
      ...(steamRatings.status === 'fulfilled' ? steamRatings.value : {})
    } as UnifiedGameData

    // Ensure we have all required fields
    return {
      id: unifiedData.id || gameId,
      title: unifiedData.title || gameId,
      description: unifiedData.description || 'Descripción no disponible',
      image: unifiedData.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
      releaseDate: unifiedData.releaseDate || '2024-01-01',
      genres: unifiedData.genres || [],
      developers: unifiedData.developers || [],
      publishers: unifiedData.publishers || [],
      platforms: unifiedData.platforms || [],
      screenshots: unifiedData.screenshots || [],
      videos: unifiedData.videos || [],
      rating: unifiedData.rating || 0,
      metacritic: unifiedData.metacritic || null,
      reviewsCount: unifiedData.reviewsCount || 0,
      price: unifiedData.price || null,
      originalPrice: unifiedData.originalPrice || null,
      discount: unifiedData.discount || null,
      currency: unifiedData.currency || 'USD',
      stores: unifiedData.stores || [],
      achievements: unifiedData.achievements || null,
      systemRequirements: unifiedData.systemRequirements || { minimum: [], recommended: [] },
      dataSources: unifiedData.dataSources || {
        metadata: 'Mock',
        pricing: 'Mock',
        achievements: null,
        ratings: 'Mock'
      }
    }
  }

  // Search games with unified data
  async searchGames(query: string): Promise<UnifiedGameData[]> {
    try {
      // Try RAWG first
      const rawgResults = await rawgApiService.searchGameRAWG(query)
      if (rawgResults && rawgResults.length > 0) {
        const unifiedGames = await Promise.all(
          rawgResults.slice(0, 5).map(async (game: any) => {
            return await this.getUnifiedGameData(game.slug)
          })
        )
        return unifiedGames
      }
    } catch (error) {
      console.warn('RAWG search failed:', error)
    }

    // Fallback to mock data
    return []
  }

  // Get popular games
  async getPopularGames(): Promise<UnifiedGameData[]> {
    try {
      const rawgResults = await rawgApiService.getTrendingGamesRAWG()
      if (rawgResults && rawgResults.length > 0) {
        const unifiedGames = await Promise.all(
          rawgResults.slice(0, 5).map(async (game: any) => {
            return await this.getUnifiedGameData(game.slug)
          })
        )
        return unifiedGames
      }
    } catch (error) {
      console.warn('Failed to get popular games:', error)
    }

    return []
  }
}

export const gameDataService = new GameDataService() 