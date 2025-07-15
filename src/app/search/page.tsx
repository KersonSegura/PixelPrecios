'use client'

import { Suspense } from 'react'
import SearchContent from '@/components/SearchContent'
import SearchLoading from '@/components/SearchLoading'
import { trendingGames } from '@/data/games'

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent allGames={trendingGames} />
    </Suspense>
  )
}