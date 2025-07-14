// API de tipos de cambio real
const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'

// Símbolos de monedas
const currencySymbols: { [key: string]: string } = {
  CRC: '₡',
  MXN: '$',
  ARS: '$',
  CLP: '$',
  COP: '$',
  PEN: 'S/',
  BRL: 'R$',
}

export interface Game {
  id: string
  title: string
  image: string
  priceCRC: number // Precio base en CRC
  originalPriceCRC: number // Precio original en CRC
  discount: number
  store: string
  tags: string[] // Tags del juego (ej: ['RPG', 'Acción', 'Mundo Abierto'])
}

export class CurrencyService {
  private static exchangeRates: { [key: string]: number } = {}
  private static lastUpdate: number = 0
  private static readonly CACHE_DURATION = 3600000 // 1 hora en ms

  // Obtener tasas de cambio actualizadas desde la API
  static async fetchExchangeRates(): Promise<void> {
    const now = Date.now()
    
    // Verificar si el cache está actualizado
    if (now - this.lastUpdate < this.CACHE_DURATION && Object.keys(this.exchangeRates).length > 0) {
      return
    }

    try {
      const response = await fetch(EXCHANGE_RATE_API_URL)
      const data = await response.json()
      
      // Convertir las tasas para que USD sea la base
      this.exchangeRates = {
        USD: 1,
        CRC: data.rates.CRC || 500, // Fallback si no está disponible
        MXN: data.rates.MXN || 17.5,
        ARS: data.rates.ARS || 1000,
        CLP: data.rates.CLP || 950,
        COP: data.rates.COP || 4000,
        PEN: data.rates.PEN || 3.7,
        BRL: data.rates.BRL || 5.2,
      }
      
      this.lastUpdate = now
    } catch (error) {
      console.error('Error fetching exchange rates:', error)
      // Usar tasas de fallback si la API falla
      this.exchangeRates = {
        USD: 1,
        CRC: 500,
        MXN: 17.5,
        ARS: 1000,
        CLP: 950,
        COP: 4000,
        PEN: 3.7,
        BRL: 5.2,
      }
    }
  }

  static async convertPrice(priceUSD: number, targetCurrency: string): Promise<number> {
    await this.fetchExchangeRates()
    const rate = this.exchangeRates[targetCurrency] || 1
    return Math.round(priceUSD * rate)
  }

  // Convertir precio desde CRC a otra moneda
  static async convertFromCRC(priceCRC: number, targetCurrency: string): Promise<number> {
    await this.fetchExchangeRates()
    
    if (targetCurrency === 'CRC') {
      return priceCRC
    }
    
    // Convertir CRC a USD primero, luego a la moneda objetivo
    const usdRate = this.exchangeRates.CRC || 500
    const priceUSD = priceCRC / usdRate
    const targetRate = this.exchangeRates[targetCurrency] || 1
    
    return Math.round(priceUSD * targetRate)
  }

  static formatPrice(price: number, currency: string): string {
    const symbol = currencySymbols[currency] || '₡'
    // Redondear el precio para que se vea más limpio y sin decimales
    const roundedPrice = Math.round(price)
    // Usar toLocaleString sin decimales
    return `${symbol}${roundedPrice.toLocaleString('es-ES', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    })}`
  }

  // Método específico para redondear precios de filtros según reglas de cada moneda
  static roundFilterPrice(price: number, currency: string): number {
    switch (currency) {
      case 'CRC':
        // Múltiplos de 500 para CRC
        return Math.round(price / 500) * 500
      case 'MXN':
      case 'BRL':
      case 'PEN':
        // Múltiplos de 5 para MXN, BRL, PEN
        return Math.round(price / 5) * 5
      case 'ARS':
      case 'CLP':
      case 'COP':
        // Múltiplos de 100 para ARS, CLP, COP
        return Math.round(price / 100) * 100
      default:
        return Math.round(price)
    }
  }

  // Método para formatear precios de filtros con las reglas de redondeo específicas
  static formatFilterPrice(price: number, currency: string): string {
    const symbol = currencySymbols[currency] || '₡'
    const roundedPrice = this.roundFilterPrice(price, currency)
    return `${symbol}${roundedPrice.toLocaleString('es-ES', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    })}`
  }

  static getCurrencySymbol(currency: string): string {
    return currencySymbols[currency] || '₡'
  }

  static getAllCurrencies(): Array<{ code: string; name: string; country: string }> {
    return [
      { code: 'CRC', name: 'Colón Costarricense', country: 'CR' },
      { code: 'MXN', name: 'Peso Mexicano', country: 'MX' },
      { code: 'ARS', name: 'Peso Argentino', country: 'AR' },
      { code: 'CLP', name: 'Peso Chileno', country: 'CL' },
      { code: 'COP', name: 'Peso Colombiano', country: 'CO' },
      { code: 'PEN', name: 'Sol Peruano', country: 'PE' },
      { code: 'BRL', name: 'Real Brasileño', country: 'BR' },
    ]
  }

  // Método para debug - mostrar las tasas de cambio
  static async getExchangeRates(): Promise<{ [key: string]: number }> {
    await this.fetchExchangeRates()
    return this.exchangeRates
  }
} 