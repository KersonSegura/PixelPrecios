'use client'

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 1000 678.8" fill="currentColor">
                  <path d="M666.45,380.56H542.89V284.2H666.45ZM646.54,158.69H604.67v41.87h41.87ZM666.7,56H610.23v56.47H666.7Zm-63.83,158.7h-43.4V284.2h43.4Zm-43.4,304.8H423.08V657.77H559.47Zm193.87-407H666.7v88.07h86.64ZM650.19,427.31H559.47v92.21h90.72Zm271,16.58c54.91-61.82,56.69-133.55,56.62-151.54,0-1.29,0-3-.07-5.17-1.22-48.27-19.22-116.26-73.7-166.39-52.22-48-112.66-56.4-134.18-58.34H724.48v50l28.86,88.07c8.27.75,40.34,4.64,64.91,31.74,5.76,6.37,26.13,28.83,24.59,61.76-1.58,33.72-25,54.46-32.6,61.19-23.49,20.81-49.92,24.45-59.62,25.31h-139v139h139C764.87,519.53,855.31,518.07,921.18,443.89Z"/>
                  <path d="M265.82,297.49H169.74V201.42h96.08Zm-78.92-211H120v66.91H186.9Zm-71.2,109.8H48.79v66.91H115.7Zm32.17,129.1H64.66v83.21h83.21ZM278.94,21h-43.4V64.42h43.4ZM158.59,450.18H22.2V657.77H158.59ZM352.46,112.49H265.82v88.07h86.64ZM249.31,427.31H158.59v92.21h90.72Zm271,16.58c54.91-61.82,56.69-133.55,56.62-151.54,0-1.29,0-3-.08-5.17-1.21-48.27-19.21-116.26-73.7-166.39-52.21-48-112.65-56.4-134.17-58.34H323.6v50l28.86,88.07c8.27.75,40.34,4.64,64.9,31.74,5.77,6.37,26.13,28.83,24.59,61.76-1.57,33.72-25,54.46-32.59,61.19-23.49,20.81-49.93,24.45-59.62,25.31h-139v139h139C364,519.53,454.42,518.07,520.3,443.89Z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">PixelPrecios</h3>
                <p className="text-sm text-dark-400">Descuentos LATAM</p>
              </div>
            </div>
            <p className="text-dark-300 mb-4">
              Encuentra los mejores descuentos de juegos en las principales tiendas digitales. 
              Precios en monedas latinoamericanas para que ahorres más.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#trending" className="text-dark-300 hover:text-white transition-colors">
                  Trending
                </a>
              </li>
              <li>
                <a href="#deals" className="text-dark-300 hover:text-white transition-colors">
                  Ofertas
                </a>
              </li>
              <li>
                <a href="#wishlist" className="text-dark-300 hover:text-white transition-colors">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#notifications" className="text-dark-300 hover:text-white transition-colors">
                  Notificaciones
                </a>
              </li>
            </ul>
          </div>

          {/* Stores */}
          <div>
            <h4 className="text-white font-semibold mb-4">Tiendas</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://store.steampowered.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>Steam</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://store.epicgames.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>Epic Store</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.gog.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>GOG</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://store.ubisoft.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>Ubisoft</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-dark-400 text-sm">
            © 2024 PixelPrecios. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="/privacy" 
              className="text-dark-400 hover:text-white transition-colors"
              title="Política de Privacidad"
            >
              Privacidad
            </a>
            <a 
              href="/terms" 
              className="text-dark-400 hover:text-white transition-colors"
              title="Términos de Servicio"
            >
              Términos
            </a>
            <a 
              href="mailto:contacto@pixelprecios.com" 
              className="text-dark-400 hover:text-white transition-colors"
              title="Enviar email"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 