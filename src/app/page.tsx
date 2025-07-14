'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import TrendingSection from '@/components/TrendingSection'
import DealsSection from '@/components/DealsSection'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import GameCarousel from '@/components/GameCarousel'
import { TrendingGameAPI, Game, TrendingGameComponent } from '@/types/Game'

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState('CRC')
  const [selectedCountry, setSelectedCountry] = useState('CR')
  const [trendingGames, setTrendingGames] = useState<TrendingGameAPI[]>([])

  useEffect(() => {
    fetch('/api/trending-games')
      .then(res => res.json())
      .then(data => setTrendingGames(Array.isArray(data.games) ? data.games : []))
      .catch(() => setTrendingGames([]))
  }, [])

  // Convert API data to component format
  const convertToGameFormat = (apiGame: TrendingGameAPI): Game => ({
    id: apiGame.id,
    name: apiGame.name,
    image: apiGame.background_image,
    slug: apiGame.slug,
    platforms: apiGame.platforms,
    rating: apiGame.rating,
    stores: apiGame.stores,
    price: apiGame.price
  })

  const convertToTrendingFormat = (apiGame: TrendingGameAPI): TrendingGameComponent => ({
    name: apiGame.name,
    image: apiGame.background_image,
    slug: apiGame.slug,
    platforms: apiGame.platforms,
    rating: apiGame.rating,
    stores: apiGame.stores,
    price: apiGame.price
  })

  return (
    <div className="min-h-screen bg-dark-900">
      <Header 
        selectedCurrency={selectedCurrency} 
        setSelectedCurrency={setSelectedCurrency}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <section className="-mt-8">
        <HeroSection currency={selectedCurrency}>
          <GameCarousel games={trendingGames.slice(0, 9).map(convertToGameFormat)} currency={selectedCurrency} />
        </HeroSection>
      </section>
      <div className="-mt-16 md:-mt-24">
        <TrendingSection currency={selectedCurrency} trendingGamesITAD={trendingGames.slice(9, 21).map(convertToTrendingFormat)} />
      </div>
      <DealsSection currency={selectedCurrency} />
      <Footer />
      <ScrollToTop />
    </div>
  )
} 