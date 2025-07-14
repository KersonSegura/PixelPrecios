# PixelPrecios - Descuentos de Juegos en LATAM

Una plataforma moderna para trackear descuentos y juegos gratis en las principales tiendas de videojuegos digitales, diseñada específicamente para el público latinoamericano.

## 🎮 Características

- **Monedas LATAM**: Soporte para múltiples monedas latinoamericanas (CRC, MXN, ARS, CLP, COP, PEN, BRL)
- **Tiendas Soportadas**: Steam, Epic Store, GOG, Ubisoft
- **Diseño Moderno**: Interfaz oscura y tecnológica con animaciones suaves
- **Juegos Destacados**: Sección de juegos en highlight al inicio
- **Trending**: Juegos más populares con mejores descuentos
- **Filtros Avanzados**: Búsqueda por precio, descuento y tienda
- **API Integration**: Integración con IsThereAnyDeal.com para datos en tiempo real

## 🚀 Tecnologías

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS
- **API**: IsThereAnyDeal.com API
- **Deployment**: Vercel (recomendado)

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd pixelprecios
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

4. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
ITAD_API_KEY=tu_api_key_de_isthereanydeal
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### API Key de IsThereAnyDeal

Para obtener una API key:
1. Ve a [IsThereAnyDeal.com](https://isthereanydeal.com)
2. Regístrate para una cuenta
3. Ve a tu perfil y genera una API key
4. Agrega la key a tu archivo `.env.local`

## 🎨 Estructura del Proyecto

```
src/
├── app/                 # App Router de Next.js
│   ├── globals.css     # Estilos globales
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página principal
├── components/         # Componentes React
│   ├── Header.tsx      # Header con selector de moneda
│   ├── HeroSection.tsx # Sección principal
│   ├── TrendingSection.tsx # Juegos trending
│   ├── DealsSection.tsx   # Ofertas por categorías
│   └── Footer.tsx      # Footer
└── services/           # Servicios y APIs
    └── itadApi.ts      # Servicio de IsThereAnyDeal
```

## 🎯 Funcionalidades Principales

### Selector de Moneda
- Soporte para 7 monedas latinoamericanas
- Conversión automática de precios
- Persistencia de preferencias

### Juegos Destacados
- Sección hero con juegos en oferta
- Estadísticas en tiempo real
- Diseño responsive

### Trending
- Juegos más populares
- Filtros por categoría
- Actualización automática

### Ofertas
- Filtros por precio (< $5)
- Filtros por descuento (50%+)
- Filtros por tienda
- Carga infinita

## 🔮 Próximas Funcionalidades

- [ ] Sistema de usuarios y autenticación
- [ ] Wishlist personalizada
- [ ] Notificaciones por email
- [ ] Comparador de precios
- [ ] Historial de precios
- [ ] Alertas de descuento
- [ ] App móvil

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [IsThereAnyDeal.com](https://isthereanydeal.com) por su API
- [Next.js](https://nextjs.org) por el framework
- [Tailwind CSS](https://tailwindcss.com) por los estilos
- [Vercel](https://vercel.com) por el hosting

## 📞 Contacto

- **Website**: [pixelprecios.com](https://pixelprecios.com)
- **Email**: contacto@pixelprecios.com
- **Twitter**: [@PixelPrecios](https://twitter.com/PixelPrecios)

---

Hecho con ❤️ para la comunidad gamer de LATAM 