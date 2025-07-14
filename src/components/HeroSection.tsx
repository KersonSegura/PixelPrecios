'use client'

import { useState, ReactNode } from 'react'

interface HeroSectionProps {
  currency: string
  children?: ReactNode
}

export default function HeroSection({ currency, children }: HeroSectionProps) {
  const [search, setSearch] = useState('')

  return (
    <section className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Los Mejores <span className="text-primary-500">Descuentos</span> en Juegos
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Descubre las mejores ofertas en juegos de Steam, Epic Store, GOG y más. 
            Ahorra dinero en tus juegos favoritos.
          </p>
        </div>
        {/* Contenedor para centrar la barra de búsqueda entre subtítulo y sección */}
        <div className="flex flex-col items-center justify-center mb-6" style={{ minHeight: '80px' }}>
          <div className="w-full max-w-2xl relative">
            <input
              type="text"
              className="w-full py-5 pl-20 pr-4 text-lg rounded-xl bg-dark-700 text-white placeholder-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition shadow-lg"
              placeholder="Buscar juegos por nombre..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Buscar juegos"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2">
              <span className="bg-primary-600 w-12 h-12 rounded-xl ml-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
                </svg>
              </span>
            </span>
          </div>
        </div>
        {children}
      </div>
    </section>
  )
} 