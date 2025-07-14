# Steam API Integration - PixelPrecios

## 🎮 Descripción

Esta integración permite a PixelPrecios obtener información detallada de juegos directamente desde la API de Steam, incluyendo precios, logros, capturas de pantalla y más.

## 🔑 Configuración

### API Key de Steam
- **API Key**: `E36F9EC2EFD4913EBE98A73B0D5ED647`
- **Base URL**: `https://api.steampowered.com`
- **Documentación**: [Steam Web API](https://developer.valvesoftware.com/wiki/Steam_Web_API)

### Variables de Entorno
```env
NEXT_PUBLIC_STEAM_API_KEY=E36F9EC2EFD4913EBE98A73B0D5ED647
```

## 📁 Estructura de Archivos

```
src/
├── services/
│   └── steamApi.ts          # Servicio principal de Steam API
├── components/
│   ├── SteamGameDetails.tsx  # Componente de detalles del juego
│   ├── SteamAchievements.tsx # Componente de logros
│   └── SteamPriceHistory.tsx # Componente de historial de precios
└── config/
    └── api.ts               # Configuración centralizada de APIs
```

## 🚀 Funcionalidades

### 1. Información de Juegos
- **Detalles completos**: Nombre, descripción, desarrollador, editor
- **Precios**: Precio actual, precio original, descuento
- **Plataformas**: Windows, macOS, Linux
- **Géneros y categorías**: Clasificación del juego
- **Capturas de pantalla**: Galería de imágenes
- **Videos**: Trailers y gameplay

### 2. Logros de Steam
- **Lista de logros**: Todos los logros disponibles
- **Iconos**: Imágenes de cada logro
- **Descripciones**: Explicación de cada logro
- **Logros ocultos**: Identificación de logros secretos
- **Contador total**: Número total de logros

### 3. Historial de Precios
- **Precio actual**: Información en tiempo real
- **Estadísticas**: Precio más bajo, promedio y más alto
- **Gráfico visual**: Evolución de precios en 30 días
- **Alertas**: Configuración de notificaciones de precio

### 4. Información de Usuario (Futuro)
- **Juegos propios**: Biblioteca del usuario
- **Juegos recientes**: Actividad reciente
- **Logros personales**: Progreso del usuario
- **Tiempo jugado**: Estadísticas de juego

## 🔧 Uso

### Servicio Principal
```typescript
import { steamApiService } from '@/services/steamApi'

// Obtener detalles de un juego
const gameDetails = await steamApiService.getGameDetails(1091500) // Cyberpunk 2077

// Obtener logros de un juego
const achievements = await steamApiService.getGameSchema(1091500)

// Obtener juegos de un usuario (requiere Steam ID)
const userGames = await steamApiService.getUserOwnedGames('STEAM_ID')
```

### Componentes React
```typescript
import SteamGameDetails from '@/components/SteamGameDetails'
import SteamAchievements from '@/components/SteamAchievements'
import SteamPriceHistory from '@/components/SteamPriceHistory'

// En tu componente
<SteamGameDetails steamAppId={1091500} currency="CRC" />
<SteamAchievements steamAppId={1091500} maxDisplay={6} />
<SteamPriceHistory steamAppId={1091500} currency="CRC" />
```

## 📊 Endpoints Utilizados

### Información de Juegos
- `GET /ISteamApps/GetAppDetails/v2/` - Detalles completos del juego
- `GET /ISteamApps/GetAppList/v2/` - Lista de juegos destacados

### Logros y Estadísticas
- `GET /ISteamUserStats/GetSchemaForGame/v2/` - Esquema de logros
- `GET /ISteamUserStats/GetPlayerAchievements/v1/` - Logros del usuario
- `GET /ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/` - Estadísticas globales

### Información de Usuario
- `GET /IPlayerService/GetOwnedGames/v1/` - Juegos del usuario
- `GET /IPlayerService/GetRecentlyPlayedGames/v1/` - Juegos recientes

## 🎯 Juegos Soportados

### Juegos Populares con Steam App ID
```typescript
export const STEAM_APP_IDS = {
  'cyberpunk-2077': 1091500,
  'elden-ring': 1245620,
  'red-dead-redemption-2': 1174180,
  'grand-theft-auto-v': 271590,
  'the-witcher-3': 292030,
  'god-of-war': 1593500,
  'spider-man-remastered': 1817070,
  'horizon-zero-dawn': 1151640,
  'resident-evil-4': 2050650,
  'dead-space': 1693980,
  // ... más juegos
}
```

## 🖼️ Imágenes de Steam

### URLs de Imágenes
- **Header**: `https://cdn.cloudflare.steamstatic.com/steam/apps/{appId}/header.jpg`
- **Logo**: `https://cdn.cloudflare.steamstatic.com/steam/apps/{appId}/logo.png`
- **Icon**: `https://cdn.cloudflare.steamstatic.com/steam/apps/{appId}/icon.jpg`
- **Achievement**: `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/{appId}/{iconName}`

### Configuración de Next.js
```javascript
// next.config.js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.cloudflare.steamstatic.com',
      port: '',
      pathname: '/steam/apps/**',
    },
    {
      protocol: 'https',
      hostname: 'cdn.akamai.steamstatic.com',
      port: '',
      pathname: '/steam/apps/**',
    }
  ]
}
```

## 🔄 Caché y Rendimiento

### Configuración de Caché
```typescript
export const CACHE_CONFIG = {
  STEAM_GAME_DETAILS: 3600,    // 1 hora
  STEAM_ACHIEVEMENTS: 7200,     // 2 horas
  ITAD_DEALS: 1800,            // 30 minutos
  CURRENCY_RATES: 3600,        // 1 hora
  PRICE_HISTORY: 86400         // 24 horas
}
```

### Optimizaciones
- **Lazy Loading**: Componentes cargan solo cuando son necesarios
- **Error Handling**: Manejo robusto de errores de API
- **Loading States**: Estados de carga para mejor UX
- **Fallback Images**: Imágenes por defecto cuando fallan

## 🚨 Limitaciones

### Steam API
- **Rate Limiting**: Límites de requests por minuto
- **User Data**: Requiere Steam ID para datos de usuario
- **Price History**: No disponible públicamente
- **Search**: No hay endpoint de búsqueda público

### Soluciones
- **Mock Data**: Datos simulados para funcionalidades no disponibles
- **ITAD Integration**: Uso de IsThereAnyDeal para precios
- **Caching**: Almacenamiento local para reducir requests

## 🔮 Próximas Mejoras

### Funcionalidades Planificadas
- [ ] **Autenticación Steam**: Login con cuenta de Steam
- [ ] **Biblioteca Personal**: Mostrar juegos del usuario
- [ ] **Logros Personales**: Progreso individual
- [ ] **Wishlist**: Lista de deseos sincronizada
- [ ] **Notificaciones**: Alertas de precio en tiempo real
- [ ] **Comparación**: Comparar precios entre tiendas
- [ ] **Reviews**: Integración con reseñas de Steam

### Optimizaciones Técnicas
- [ ] **Service Worker**: Caché offline
- [ ] **WebSocket**: Actualizaciones en tiempo real
- [ ] **PWA**: Aplicación web progresiva
- [ ] **Analytics**: Métricas de uso
- [ ] **A/B Testing**: Pruebas de funcionalidades

## 🛠️ Troubleshooting

### Problemas Comunes

#### Error: "Cannot find module './vendor-chunks/@heroicons.js'"
```bash
# Solución
rm -rf .next
npm run dev
```

#### Error: "Steam API Error"
- Verificar API key
- Comprobar conectividad
- Revisar rate limits

#### Imágenes no cargan
- Verificar configuración de Next.js
- Comprobar URLs de Steam CDN
- Usar fallback images

### Debugging
```typescript
// Habilitar logs detallados
console.log('Steam API Response:', response)
console.log('Game Details:', gameDetails)
console.log('Achievements:', achievements)
```

## 📞 Soporte

Para problemas con la integración de Steam:
1. Revisar logs del navegador
2. Verificar configuración de API
3. Comprobar conectividad a Steam
4. Contactar al equipo de desarrollo

---

**Nota**: Esta integración utiliza la API pública de Steam. Para funcionalidades avanzadas como datos de usuario, se requiere autenticación OAuth con Steam. 