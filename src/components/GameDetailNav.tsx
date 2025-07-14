'use client'

import { useRouter } from 'next/navigation'

interface GameDetailNavProps {
  gameTitle: string
}

export default function GameDetailNav({ gameTitle }: GameDetailNavProps) {
  const router = useRouter()

  return (
    <div className="bg-dark-800/80 backdrop-blur-sm border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-dark-200 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Volver</span>
          </button>
          
          <div className="flex items-center gap-2 text-dark-400">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Inicio</span>
            </button>
            <span>/</span>
            <span className="text-white">{gameTitle}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 