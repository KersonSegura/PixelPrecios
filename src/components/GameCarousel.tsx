'use client'

import React, { useState } from 'react';
import Image from 'next/image';

interface Game {
  name: string;
  image: string;
  shop?: string;
  priceNew?: number;
  priceOld?: number;
  discount?: number;
}

interface GameCarouselProps {
  games: Game[];
  currency: string;
}

const GAMES_PER_PAGE = 3;

export default function GameCarousel({ games, currency }: GameCarouselProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(games.length / GAMES_PER_PAGE);

  const handlePrev = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  const handleNext = () => setPage((p) => (p === totalPages - 1 ? 0 : p + 1));

  const startIdx = page * GAMES_PER_PAGE;
  const pageGames = games.slice(startIdx, startIdx + GAMES_PER_PAGE);

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} className="text-primary-400 px-2 py-1 rounded hover:bg-dark-700">⟨</button>
        <div className="flex-1 flex justify-center gap-6">
          {pageGames.map((game, idx) => (
            <div key={game.name + idx} className="bg-dark-800 rounded-lg p-4 flex flex-col items-center shadow-lg w-72">
              <Image 
                src={game.image} 
                alt={game.name} 
                width={288}
                height={160}
                className="w-full h-40 object-cover rounded mb-3 border border-dark-700" 
              />
              <div className="font-bold text-lg text-white mb-1 text-center">{game.name}</div>
              {game.shop && <div className="text-sm text-dark-300 mb-1">{game.shop}</div>}
              {game.priceNew !== undefined && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-primary-400 text-xl font-bold">${game.priceNew.toFixed(2)}</span>
                  {game.priceOld !== undefined && <span className="text-xs text-dark-400 line-through">${game.priceOld.toFixed(2)}</span>}
                </div>
              )}
              {game.discount !== undefined && <div className="text-green-400 font-bold text-sm">-{game.discount}%</div>}
            </div>
          ))}
        </div>
        <button onClick={handleNext} className="text-primary-400 px-2 py-1 rounded hover:bg-dark-700">⟩</button>
      </div>
      <div className="flex justify-center gap-2 mt-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${i === page ? 'bg-primary-400' : 'bg-dark-700'}`}
            onClick={() => setPage(i)}
            aria-label={`Ir a la página ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 