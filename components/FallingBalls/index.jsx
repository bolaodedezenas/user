"use client";

import { useEffect, useState } from "react";

const COLORS = [
  "#c62828",
  "#ad1457",
  "#6a1b9a",
  "#283593",
  "#1565c0",
  "#00838f",
  "#2e7d32",
  "#f9a825",
  "#ef6c00",
  "#d84315",
];

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function FallingBalls({ count = 8 }) {
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    const newBalls = Array.from({ length: count }).map(() => ({
      id: Math.random().toString(36).substring(2),
      startX: Math.random() * 100,
      size: random(70, 90),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      number: random(0, 99).toString().padStart(2, "0"),
      duration: random(6, 12),
      delay: Math.random() * 4,
    }));

    setBalls(newBalls);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {balls.map((ball) => (
        <div
          key={ball.id}
          style={{
            "--x": `${ball.startX}vw`,
            "--duration": `${ball.duration}s`,
            "--delay": `${ball.delay}s`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            background: ball.color,
          }}
          className="ball absolute flex items-center justify-center rounded-full animate-ballFall"
        >
          <span className="text-white font-extrabold text-2xl">{ball.number}</span>
        </div>
      ))}

      <style jsx>{`
        .ball {
          top: -120px;
          position: absolute;
          will-change: transform; /* ✅ GPU */
          transform: translate3d(calc(var(--x) - 50%), -150px, 0);

          box-shadow:
            0 8px 18px rgba(0, 0, 0, 0.35),
            inset 0 6px 10px rgba(0, 0, 0, 0.25);
        }

        .ball::after {
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

        /* ✅ ANIMAÇÃO GPU-OTIMIZADA */
        @keyframes ballFall {
          0% {
            transform: translate3d(calc(var(--x) - 50%), -150px, 0);
          }
          100% {
            transform: translate3d(calc(var(--x) - 50%), 120vh, 0);
          }
        }

        .animate-ballFall {
          animation: ballFall var(--duration) linear var(--delay) infinite;
        }
      `}</style>
    </div>
  );
}
