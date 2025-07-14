'use client'

interface DataSourceInfoProps {
  dataSources: {
    metadata: 'RAWG' | 'Steam' | 'Mock'
    pricing: 'ITAD' | 'Steam' | 'Mock'
    achievements: 'Steam' | null
    ratings: 'Steam' | 'RAWG' | 'Mock'
  }
}

export default function DataSourceInfo({ dataSources }: DataSourceInfoProps) {
  const getSourceColor = (source: string) => {
    switch (source) {
      case 'RAWG':
      case 'ITAD':
        return 'text-green-400'
      case 'Steam':
        return 'text-blue-400'
      case 'Mock':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'RAWG':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
      case 'Steam':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
      case 'ITAD':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
      case 'Mock':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
    }
  }

  return (
    <div className="bg-dark-800 rounded-xl p-4">
      <h3 className="text-lg font-semibold text-white mb-3">Fuentes de Datos</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-dark-300 text-sm">Metadatos</span>
          <div className="flex items-center gap-2">
            {getSourceIcon(dataSources.metadata)}
            <span className={`text-sm font-medium ${getSourceColor(dataSources.metadata)}`}>
              {dataSources.metadata}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-dark-300 text-sm">Precios</span>
          <div className="flex items-center gap-2">
            {getSourceIcon(dataSources.pricing)}
            <span className={`text-sm font-medium ${getSourceColor(dataSources.pricing)}`}>
              {dataSources.pricing}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-dark-300 text-sm">Logros</span>
          <div className="flex items-center gap-2">
            {dataSources.achievements ? getSourceIcon(dataSources.achievements) : (
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            )}
            <span className={`text-sm font-medium ${dataSources.achievements ? getSourceColor(dataSources.achievements) : 'text-gray-500'}`}>
              {dataSources.achievements || 'No disponible'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-dark-300 text-sm">Valoraciones</span>
          <div className="flex items-center gap-2">
            {getSourceIcon(dataSources.ratings)}
            <span className={`text-sm font-medium ${getSourceColor(dataSources.ratings)}`}>
              {dataSources.ratings}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-dark-700">
        <div className="flex items-center gap-2 text-xs text-dark-400">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Fuente Primaria</span>
          <div className="w-2 h-2 bg-blue-400 rounded-full ml-2"></div>
          <span>Backup</span>
          <div className="w-2 h-2 bg-yellow-400 rounded-full ml-2"></div>
          <span>Simulado</span>
        </div>
      </div>
    </div>
  )
} 