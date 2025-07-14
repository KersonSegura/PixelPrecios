'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CurrencyService } from '@/services/currencyService'
import ReactDOM from 'react-dom'

interface HeaderProps {
  selectedCurrency: string
  setSelectedCurrency: (currency: string) => void
  selectedCountry: string
  setSelectedCountry: (country: string) => void
}

export default function Header({ selectedCurrency, setSelectedCurrency, selectedCountry, setSelectedCountry }: HeaderProps) {
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  // Estado de sesión mock (cambiar a false para probar sin sesión)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleCurrencyChange = (currency: string, country: string) => {
    setSelectedCurrency(currency)
    setSelectedCountry(country)
    setIsCurrencyMenuOpen(false)
  }

  const currencies = CurrencyService.getAllCurrencies()

  // Render del drawer usando portal
  const drawerPortal = drawerOpen ? ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity"
        onClick={() => setDrawerOpen(false)}
      ></div>
      {/* Drawer */}
      <aside className="fixed top-0 right-0 h-full w-80 bg-dark-900 z-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header del drawer */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-dark-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 1000 678.8" fill="currentColor">
                <path d="M666.45,380.56H542.89V284.2H666.45ZM646.54,158.69H604.67v41.87h41.87ZM666.7,56H610.23v56.47H666.7Zm-63.83,158.7h-43.4V284.2h43.4Zm-43.4,304.8H423.08V657.77H559.47Zm193.87-407H666.7v88.07h86.64ZM650.19,427.31H559.47v92.21h90.72Zm271,16.58c54.91-61.82,56.69-133.55,56.62-151.54,0-1.29,0-3-.07-5.17-1.22-48.27-19.22-116.26-73.7-166.39-52.22-48-112.66-56.4-134.18-58.34H724.48v50l28.86,88.07c8.27.75,40.34,4.64,64.91,31.74,5.76,6.37,26.13,28.83,24.59,61.76-1.58,33.72-25,54.46-32.6,61.19-23.49,20.81-49.92,24.45-59.62,25.31h-139v139h139C764.87,519.53,855.31,518.07,921.18,443.89Z"/>
                <path d="M265.82,297.49H169.74V201.42h96.08Zm-78.92-211H120v66.91H186.9Zm-71.2,109.8H48.79v66.91H115.7Zm32.17,129.1H64.66v83.21h83.21ZM278.94,21h-43.4V64.42h43.4ZM158.59,450.18H22.2V657.77H158.59ZM352.46,112.49H265.82v88.07h86.64ZM249.31,427.31H158.59v92.21h90.72Zm271,16.58c54.91-61.82,56.69-133.55,56.62-151.54,0-1.29,0-3-.08-5.17-1.21-48.27-19.21-116.26-73.7-166.39-52.21-48-112.65-56.4-134.17-58.34H323.6v50l28.86,88.07c8.27.75,40.34,4.64,64.9,31.74,5.77,6.37,26.13,28.83,24.59,61.76-1.57,33.72-25,54.46-32.59,61.19-23.49,20.81-49.93,24.45-59.62,25.31h-139v139h139C364,519.53,454.42,518.07,520.3,443.89Z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">PixelPrecios</h3>
              <p className="text-xs text-dark-400">Menú</p>
            </div>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
            onClick={() => setDrawerOpen(false)}
            aria-label="Cerrar menú"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido del menú */}
        <div className="flex-1 px-6 py-6">
          {!isLoggedIn ? (
            <div className="space-y-4">
              {/* Sección de autenticación */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-dark-400 uppercase tracking-wider">Cuenta</h4>
                <button className="w-full flex items-center space-x-3 p-4 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Iniciar Sesión</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 rounded-xl bg-dark-700 text-white font-semibold border border-dark-600 hover:bg-dark-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Crear Cuenta</span>
                </button>
              </div>

              {/* Enlaces rápidos */}
              <div className="space-y-3 pt-6 border-t border-dark-700">
                <h4 className="text-sm font-semibold text-dark-400 uppercase tracking-wider">Navegación</h4>
                <a href="#trending" className="flex items-center space-x-3 p-3 rounded-lg text-dark-300 hover:bg-dark-700 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>Trending</span>
                </a>
                <a href="#deals" className="flex items-center space-x-3 p-3 rounded-lg text-dark-300 hover:bg-dark-700 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7a1 1 0 011-1h4.586a1 1 0 01.707.293l6.414 6.414a2 2 0 010 2.828l-5.586 5.586a2 2 0 01-2.828 0L3.293 13.707a1 1 0 010-1.414l5.586-5.586A1 1 0 0110 7V7z" />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                  </svg>
                  <span>Ofertas</span>
                </a>
                <a href="#wishlist" className="flex items-center space-x-3 p-3 rounded-lg text-dark-300 hover:bg-dark-700 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Wishlist</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Información del usuario */}
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-dark-700">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Usuario</p>
                  <p className="text-sm text-dark-400">usuario@email.com</p>
                </div>
              </div>

              {/* Menú del usuario */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-dark-400 uppercase tracking-wider">Mi Cuenta</h4>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-dark-300 hover:bg-dark-700 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Mi Perfil</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-dark-300 hover:bg-dark-700 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Lista de Deseos</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-dark-300 hover:bg-dark-700 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span>Notificaciones</span>
                </button>
              </div>

              {/* Cerrar sesión */}
              <div className="pt-6 border-t border-dark-700">
                <button 
                  className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors" 
                  onClick={() => setIsLoggedIn(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer del drawer */}
        <div className="px-6 py-4 border-t border-dark-700">
          <div className="text-xs text-dark-400 text-center">
            <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="underline hover:text-white transition-colors">
              Simular {isLoggedIn ? 'logout' : 'login'}
            </button>
          </div>
        </div>
      </aside>
      {/* Animación slide-in */}
      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.25s cubic-bezier(0.4,0,0.2,1); }
      `}</style>
    </>, document.body) : null

  return (
    <header className="bg-dark-800/50 backdrop-blur-sm border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-white" viewBox="0 0 1000 678.8" fill="currentColor">
                <path d="M666.45,380.56H542.89V284.2H666.45ZM646.54,158.69H604.67v41.87h41.87ZM666.7,56H610.23v56.47H666.7Zm-63.83,158.7h-43.4V284.2h43.4Zm-43.4,304.8H423.08V657.77H559.47Zm193.87-407H666.7v88.07h86.64ZM650.19,427.31H559.47v92.21h90.72Zm271,16.58c54.91-61.82,56.69-133.55,56.62-151.54,0-1.29,0-3-.07-5.17-1.22-48.27-19.22-116.26-73.7-166.39-52.22-48-112.66-56.4-134.18-58.34H724.48v50l28.86,88.07c8.27.75,40.34,4.64,64.91,31.74,5.76,6.37,26.13,28.83,24.59,61.76-1.58,33.72-25,54.46-32.6,61.19-23.49,20.81-49.92,24.45-59.62,25.31h-139v139h139C764.87,519.53,855.31,518.07,921.18,443.89Z"/>
                <path d="M265.82,297.49H169.74V201.42h96.08Zm-78.92-211H120v66.91H186.9Zm-71.2,109.8H48.79v66.91H115.7Zm32.17,129.1H64.66v83.21h83.21ZM278.94,21h-43.4V64.42h43.4ZM158.59,450.18H22.2V657.77H158.59ZM352.46,112.49H265.82v88.07h86.64ZM249.31,427.31H158.59v92.21h90.72Zm271,16.58c54.91-61.82,56.69-133.55,56.62-151.54,0-1.29,0-3-.08-5.17-1.21-48.27-19.21-116.26-73.7-166.39-52.21-48-112.65-56.4-134.17-58.34H323.6v50l28.86,88.07c8.27.75,40.34,4.64,64.9,31.74,5.77,6.37,26.13,28.83,24.59,61.76-1.57,33.72-25,54.46-32.59,61.19-23.49,20.81-49.93,24.45-59.62,25.31h-139v139h139C364,519.53,454.42,518.07,520.3,443.89Z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white group-hover:underline">PixelPrecios</h1>
              <p className="text-xs text-dark-400">Descuentos LATAM</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#trending" className="text-dark-300 hover:text-white transition-colors">
              Trending
            </a>
            <a href="#deals" className="text-dark-300 hover:text-white transition-colors">
              Ofertas
            </a>
            <a href="#wishlist" className="text-dark-300 hover:text-white transition-colors">
              Wishlist
            </a>
          </nav>

          {/* Currency Selector y menú hamburguesa */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
                className="flex items-center space-x-2 bg-dark-700 hover:bg-dark-600 px-4 py-2 rounded-lg transition-colors"
              >
                <span className="text-white font-medium">
                  {selectedCurrency}
                </span>
                <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCurrencyMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-dark-800 border border-dark-700 rounded-lg shadow-xl z-50">
                  <div className="p-2">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => handleCurrencyChange(currency.code, currency.country)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCurrency === currency.code
                            ? 'bg-primary-600 text-white'
                            : 'text-dark-300 hover:bg-dark-700 hover:text-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{currency.code}</span>
                          <span className="text-sm">{currency.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Menú hamburguesa */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-lg hover:bg-dark-700 transition-colors md:hidden"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Portal del drawer */}
      {drawerPortal}
    </header>
  )
} 