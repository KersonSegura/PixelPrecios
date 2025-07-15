'use client'

import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { GameWithTags } from '@/types/Game'
import GameCard from './GameCard'

interface SearchContentProps {
  allGames: GameWithTags[]
}

export default function SearchContent({ allGames }: SearchContentProps) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams?.get('q')?.toLowerCase() || ''

  const filteredGames = useMemo(() => {
    return allGames.filter(game =>
      game.title.toLowerCase().includes(searchQuery)
    )
  }, [allGames, searchQuery])

  useEffect(() => {
    // Aquí podrías registrar búsquedas o métricas si lo deseas
  }, [searchQuery])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filteredGames.map((game, index) => (
        <GameCard key={game.id ?? index} game={game} currency="CRC" />
      ))}
    </div>
  )
} 