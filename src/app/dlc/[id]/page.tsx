"use client"

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getDlcDetailsById } from '@/data/games';
import { CurrencyService } from '@/services/currencyService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function DlcDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [currency, setCurrency] = useState('CRC');
  const [dlcData, setDlcData] = useState<any>(null);
  const [convertedPrice, setConvertedPrice] = useState('');
  const [convertedOriginalPrice, setConvertedOriginalPrice] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const data = getDlcDetailsById(params.id as string);
      setDlcData(data);
    }
  }, [params.id]);

  useEffect(() => {
    if (dlcData) {
      setIsLoading(true);
      Promise.all([
        CurrencyService.convertFromCRC(dlcData.dlc.priceCRC, currency),
        CurrencyService.convertFromCRC(dlcData.dlc.originalPriceCRC, currency)
      ]).then(([price, originalPrice]) => {
        setConvertedPrice(CurrencyService.formatPrice(price, currency));
        setConvertedOriginalPrice(CurrencyService.formatPrice(originalPrice, currency));
        setIsLoading(false);
      });
    }
  }, [dlcData, currency]);

  if (!dlcData) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Header selectedCurrency={currency} setSelectedCurrency={setCurrency} selectedCountry="CR" setSelectedCountry={() => {}} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Cargando...</div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  const { dlc, baseGame } = dlcData;

  return (
    <div className="min-h-screen bg-dark-900">
      <Header selectedCurrency={currency} setSelectedCurrency={setCurrency} selectedCountry="CR" setSelectedCountry={() => {}} />
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <nav className="text-dark-400 text-sm flex gap-2 items-center">
          <button onClick={() => router.push('/')} className="hover:underline">Inicio</button>
          <span>/</span>
          <button onClick={() => router.push(`/game/${baseGame.id}`)} className="hover:underline">{baseGame.title}</button>
          <span>/</span>
          <span className="text-white">{dlc.title}</span>
        </nav>
      </div>
      {/* Hero Section */}
      <div className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Imagen de portada del DLC */}
            <div className="relative w-full lg:w-[498px] h-48 lg:h-[280px] rounded-xl overflow-hidden shadow-2xl flex-shrink-0 lg:mt-1">
              <Image
                src={dlc.image}
                alt={dlc.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Info principal y bloque de compra */}
            <div className="flex-1 flex flex-col justify-between h-full lg:h-[280px]">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">{dlc.title}</h1>
                <div className="flex items-center gap-4 text-dark-200 mb-4">
                  <span className="font-medium">{baseGame.developer}</span>
                  <span>•</span>
                  <span>{baseGame.releaseDate}</span>
                </div>
                {/* Bloque de compra */}
                <div className="mt-2 w-full max-w-xl">
                  <div className="flex items-center justify-between bg-dark-900 rounded-lg px-6 py-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary-400">
                        {isLoading ? '...' : convertedPrice}
                      </span>
                      {dlc.discount > 0 && (
                        <span className="ml-2 text-lg text-dark-400 line-through">
                          {isLoading ? '...' : convertedOriginalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {dlc.discount > 0 && (
                        <span className="px-3 py-1 bg-red-500 text-white font-bold rounded">
                          -{dlc.discount}%
                        </span>
                      )}
                      <span className="px-3 py-1 bg-dark-700 text-dark-200 rounded">
                        {dlc.store || baseGame.store}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-1">
                      Comprar Ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción */}
            <div className="bg-dark-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Descripción</h2>
              <p className="text-dark-200 leading-relaxed">{dlc.description}</p>
            </div>
            {/* Bloque Juego Base */}
            <div className="bg-dark-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Juego Base</h2>
              <div className="flex items-center gap-4">
                <div className="relative w-[92px] h-[35px] rounded overflow-hidden flex-shrink-0 bg-dark-700">
                  <Image
                    src={baseGame.image}
                    alt={baseGame.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-lg font-semibold truncate">{baseGame.title}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded font-bold text-sm"
                    onClick={() => router.push(`/game/${baseGame.id}`)}
                  >
                    Ver juego base
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Información del DLC */}
            <div className="bg-dark-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Información del DLC</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-dark-400 text-sm">Juego Base</span>
                  <p className="text-white">{baseGame.title}</p>
                </div>
                <div>
                  <span className="text-dark-400 text-sm">Desarrollador</span>
                  <p className="text-white">{baseGame.developer}</p>
                </div>
                <div>
                  <span className="text-dark-400 text-sm">Fecha de Lanzamiento</span>
                  <p className="text-white">{baseGame.releaseDate}</p>
                </div>
                <div>
                  <span className="text-dark-400 text-sm">Tienda</span>
                  <p className="text-white">{dlc.store || baseGame.store}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
} 