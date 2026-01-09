"use client";

import { useEffect, useState } from "react";

export function useCountTime(startAt, status) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!startAt) return;

    const updateTime = () => {
      const now = Date.now();
      const diff = startAt - now;

      // Sorteio iniciado
      if (status === "closed") {
        setText("🟠 Sorteio iniciado");
        return;
      }

      // Finalizado
      if (status === "finished") {
        setText("🔴 Sorteio finalizado");
        return;
      }

      if (diff <= 0) {
        setText("Sorteio iniciando...");
        return;
      }

      // Cálculo regressivo
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setText(`${days}d / ${hours}h / ${minutes}m`);
      } else {
        // Dia do sorteio: mostra horas/minutos/segundos
        setText(
          `${String(hours).padStart(2, "0")}h / ${String(minutes).padStart(
            2,
            "0"
          )}m / ${String(seconds).padStart(2, "0")}s`
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [startAt, status]);

  return text;
}
