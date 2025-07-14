# 🎯 Estrategia de APIs - PixelPrecios

## 📊 Arquitectura de Fuentes de Datos

### 🎨 1. Imágenes, descripciones y metadatos del juego

**Fuente Prioritaria: RAWG API**
- ✅ Portadas en alta calidad
- ✅ Descripciones limpias y bien formateadas
- ✅ Géneros, metacritic, multiplataforma
- ✅ Información de desarrolladores y editores
- ✅ Capturas de pantalla y trailers

**Backup: Steam API**
- 🟡 Si RAWG no tiene ese juego específico
- 🟡 Información básica del juego
- 🟡 Imágenes de Steam CDN

**Fallback: Datos simulados**
- ⚠️ Cuando las APIs fallan
- ⚠️ Datos básicos para mantener la funcionalidad

---

### 💵 2. Precios y descuentos actuales

**Fuente Prioritaria: IsThereAnyDeal**
- ✅ Centraliza precios de múltiples tiendas
- ✅ Steam, GOG, Epic, etc.
- ✅ Actualizado frecuentemente
- ✅ Comparación de precios

**Backup: APIs directas**
- 🟡 Steam API (precios directos)
- 🟡 Epic Store (endpoints no oficiales)
- 🟡 GOG (endpoints no oficiales)

**Notas importantes:**
- ⚠️ ITAD puede no mostrar promociones relámpago
- ⚠️ Monedas LATAM pueden no ser exactas
- ⚠️ Algunas tiendas regionales pueden faltar

---

### 📈 3. Historial de precios y alertas

**Fuente: IsThereAnyDeal**
- ✅ Histórico de precios disponible
- ✅ Permite crear alertas por juego
- ✅ Tracking de descuentos

**Limitaciones:**
- ❌ Las demás APIs no ofrecen esto directamente
- ❌ Requiere cuenta de ITAD para alertas

---

### 🏆 4. Ratings y reviews

**Fuente Prioritaria: Steam API**
- ✅ Si es un juego de PC, muy representativo
- ✅ Comunidad activa de Steam
- ✅ Reviews detalladas

**Backup: RAWG**
- 🟡 Incluye Metacritic
- 🟡 Valoración de usuarios
- 🟡 Ratings agregados

**Estrategia combinada:**
- 🔄 Mostrar ambos si querés comparar
- 🔄 RAWG + Steam para mejor cobertura

---

### 🎮 5. Datos de logros

**Fuente: Steam API**
- ✅ Única fuente que ofrece estadísticas globales
- ✅ Lista completa de logros
- ✅ Iconos y descripciones
- ✅ Porcentajes de completación

**Limitaciones:**
- ❌ Solo para juegos de Steam
- ❌ Requiere Steam App ID

---

### 🛒 6. Nombre del juego y normalización

**Fuente Prioritaria: RAWG**
- ✅ Base estandarizada
- ✅ Títulos bien formateados
- ✅ Slugs consistentes

**Backup: Steam (con AppID)**
- 🟡 Nombres oficiales de Steam
- 🟡 Consistencia con la tienda

**Ayuda: ITAD**
- 🟡 Puede ayudar con normalización interna
- 🟡 Via plain ID entre tiendas

---

## 🔧 Implementación Técnica

### Servicios Implementados

```typescript
// src/services/gameDataService.ts
class GameDataService {
  // Estrategia de fallback automático
  async getUnifiedGameData(gameId: string, steamAppId?: number): Promise<UnifiedGameData>
}
```

### Flujo de Datos

1. **Metadatos**: RAWG → Steam → Mock
2. **Precios**: ITAD → Steam → Mock
3. **Logros**: Steam (solo si disponible)
4. **Ratings**: Steam + RAWG combinados

### Manejo de Errores

```typescript
// Promise.allSettled para manejo robusto
const [metadata, pricing, achievements, ratings] = await Promise.allSettled([
  this.getGameMetadata(gameId, steamAppId),
  this.getGamePricing(gameId, steamAppId),
  this.getGameAchievements(steamAppId),
  this.getSteamRatings(steamAppId)
])
```

---

## 📋 Configuración de APIs

### Variables de Entorno Requeridas

```env
# Steam API (Ya configurada)
NEXT_PUBLIC_STEAM_API_KEY=E36F9EC2EFD4913EBE98A73B0D5ED647

# RAWG API (Necesaria para metadatos)
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_api_key_here

# ITAD API (Ya configurada)
NEXT_PUBLIC_ITAD_API_KEY=9ce8195154a7d378d917e2c29839d9633903334a

# Currency API (Opcional)
NEXT_PUBLIC_CURRENCY_API_KEY=your_currency_api_key_here
```

### Obtener API Keys

1. **RAWG API**: https://rawg.io/apidocs
   - Registro gratuito
   - 20,000 requests/mes
   - Sin límites estrictos

2. **Steam API**: Ya configurada
   - Sin límites conocidos
   - Pública para datos básicos

3. **ITAD API**: Ya configurada
   - 1000 requests/día
   - Registro gratuito

---

## 🚀 Próximas Mejoras

### Funcionalidades Planificadas

- [ ] **Caché inteligente**: Reducir llamadas a APIs
- [ ] **Rate limiting**: Manejo automático de límites
- [ ] **Alertas de precio**: Integración con ITAD
- [ ] **Comparación de tiendas**: Múltiples fuentes de precio
- [ ] **Reviews agregadas**: Combinar Steam + RAWG
- [ ] **Búsqueda avanzada**: Filtros por género, precio, rating

### Optimizaciones Técnicas

- [ ] **Service Worker**: Caché offline
- [ ] **WebSocket**: Actualizaciones en tiempo real
- [ ] **CDN**: Imágenes optimizadas
- [ ] **Lazy loading**: Carga progresiva de datos

---

## 📊 Métricas de Rendimiento

### Tiempos de Respuesta Objetivo

- **Metadatos**: < 500ms (RAWG)
- **Precios**: < 1s (ITAD)
- **Logros**: < 2s (Steam)
- **Fallback**: < 100ms (Mock)

### Disponibilidad

- **RAWG**: 99.9% uptime
- **Steam**: 99.5% uptime
- **ITAD**: 99.0% uptime
- **Mock**: 100% uptime (local)

---

## 🛠️ Troubleshooting

### Problemas Comunes

1. **RAWG API no responde**
   - Verificar API key
   - Comprobar límites de rate
   - Usar fallback a Steam

2. **ITAD sin datos de precio**
   - Verificar región
   - Comprobar ID del juego
   - Usar Steam como backup

3. **Steam sin logros**
   - Verificar Steam App ID
   - Comprobar si el juego tiene logros
   - Mostrar mensaje informativo

### Debugging

```typescript
// Habilitar logs detallados
console.log('Data sources:', dataSources)
console.log('RAWG response:', rawgData)
console.log('ITAD response:', itadData)
console.log('Steam response:', steamData)
```

---

## 📞 Soporte

Para problemas con las APIs:
1. Verificar logs del navegador
2. Comprobar configuración de API keys
3. Revisar límites de rate
4. Contactar al equipo de desarrollo

---

**Nota**: Esta estrategia asegura máxima disponibilidad de datos con fallbacks robustos para mantener la funcionalidad incluso cuando las APIs externas fallan. 