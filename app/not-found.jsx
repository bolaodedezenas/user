'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className='relative h-full flex items-center justify-center overflow-hidden bg-black text-white'>
      {/* Fundo animado */}
      <div className='absolute inset-0 animate-pulse bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-black/40' />

      {/* Efeito de partículas */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className='absolute w-1 h-1 bg-white rounded-full opacity-60 animate-float'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className='relative z-10 text-center px-6'>
        <h1 className='text-[5rem] md:text-[8rem] font-extrabold tracking-widest glitch relative select-none'>
          404
        </h1>
        <p className='mt-4 text-lg opacity-80'>
          Ops! Parece que essa página se perdeu no caminho.
        </p>
        <div
          onClick={() => router.replace('/login')}
          className='mt-8 inline-block px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all shadow-lg'
        >
          Voltar ao início
        </div>
      </div>

      <style jsx>{`
        /* Glitch effect */
        .glitch {
          position: relative;
          color: white;
        }

        .glitch::before,
        .glitch::after {
          content: '404';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .glitch::before {
          left: 2px;
          text-shadow: -3px 0 red;
          animation: glitch-1 2s infinite linear alternate-reverse;
        }

        .glitch::after {
          left: -2px;
          text-shadow: -3px 0 blue;
          animation: glitch-2 2s infinite linear alternate-reverse;
        }

        @keyframes glitch-1 {
          0% {
            clip-path: inset(10% 0 85% 0);
          }
          20% {
            clip-path: inset(40% 0 43% 0);
          }
          40% {
            clip-path: inset(80% 0 5% 0);
          }
          60% {
            clip-path: inset(50% 0 30% 0);
          }
          80% {
            clip-path: inset(20% 0 65% 0);
          }
          100% {
            clip-path: inset(70% 0 20% 0);
          }
        }

        @keyframes glitch-2 {
          0% {
            clip-path: inset(80% 0 5% 0);
          }
          20% {
            clip-path: inset(10% 0 85% 0);
          }
          40% {
            clip-path: inset(50% 0 30% 0);
          }
          60% {
            clip-path: inset(20% 0 65% 0);
          }
          80% {
            clip-path: inset(40% 0 43% 0);
          }
          100% {
            clip-path: inset(70% 0 20% 0);
          }
        }

        /* Floating particles */
        @keyframes float {
          0% {
            transform: translateY(0px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-25px);
            opacity: 1;
          }
          100% {
            transform: translateY(0px);
            opacity: 0.5;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </main>
  );
}
