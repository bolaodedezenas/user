import { useBetsStore } from "@/stores/useBetsStore";
import toast from "react-hot-toast";

const MAX_BALLS = 10;

export function generateBets(numbersArray, gamesCount = 1) {
  if (!numbersArray || numbersArray.length === 0) return;

  const start = Number(numbersArray[0]);
  const end = Number(numbersArray[numbersArray.length - 1]);

  if (end - start + 1 < MAX_BALLS) {
    throw new Error("Intervalo insuficiente para gerar 10 dezenas");
  }

  const { addBet } = useBetsStore.getState();

  for (let g = 0; g < gamesCount; g++) {
    const gameSet = new Set();

    while (gameSet.size < MAX_BALLS) {
      const random = Math.floor(Math.random() * (end - start + 1)) + start;
      gameSet.add(String(random).padStart(2, "0"));
    }

    addBet([...gameSet]); // 👈 salva direto no Zustand
  }

  toast.success(
    `${gamesCount} ${
      gamesCount > 1 ? " jogos adicionados com sucesso! " : " jogo adicionado com sucesso! "
    } `,
    { duration: 3000 }
  );
}
