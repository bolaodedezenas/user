"use client";

import { useEffect, useState } from "react";

const COLORS = [
  "#c62828", "#ad1457", "#6a1b9a", "#202a79", "#1565c0",
];

export default function NumberBallsLoader() {
  const BALL_COUNT = 5;
  const [balls, setBalls] = useState([]);

  const randomNumber = () =>
    Math.floor(Math.random() * 100).toString().padStart(2, "0");

  // Inicializa bolas com números aleatórios e cores fixas
  useEffect(() => {
    const initialBalls = Array.from({ length: BALL_COUNT }).map((_, i) => ({
      number: randomNumber(),
      color: COLORS[i % COLORS.length], // cor fixa por bola
    }));
    setBalls(initialBalls);
  }, []);

  // Atualiza números continuamente
  useEffect(() => {
    const interval = setInterval(() => {
      setBalls(prev =>
        prev.map(ball => ({
          ...ball,
          number: randomNumber(), // só muda o número
        }))
      );
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute h-screen inset-0 flex items-center justify-center z-100 bg-gradient-to-r from-[rgb(var(--background))] to-[rgb(var(--background-secundary))]">
      <div className="flex items-center gap-3">
        {balls.map((ball, index) => (
          <div
            key={index}
            className={`number-ball delay-${index * 200}`}
            style={{ backgroundColor: ball.color }}
          >
            <span className="text-white font-bold">{ball.number}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .number-ball {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: pulse 1s ease infinite;
          transform-origin: center;
          box-shadow:
            0 8px 18px rgba(0, 0, 0, 0.35),
            inset 0 6px 10px rgba(0, 0, 0, 0.25);
        }

        /* Efeito luminoso */
        .number-ball::after {
          content: "";
          position: absolute;
          top: 18%;
          left: 18%;
          width: 55%;
          height: 55%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0.4) 35%,
            rgba(255, 255, 255, 0) 70%
          );
          border-radius: 50%;
          filter: blur(2px);
        }

        /* delays sequenciais */
        .delay-0 { animation-delay: 0s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }

        @keyframes pulse {
          0%, 80%, 100% {
            transform: scale(0.5);
            opacity: 0.7;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Mobile: bolas menores até 450px */
        @media (max-width: 450px) {
          .number-ball {
            width: 35px;
            height: 35px;
          }

          .number-ball::after {
            top: 15%;
            left: 15%;
            width: 70%;
            height: 70%;
          }
        }
      `}</style>
    </div>
  );
}
