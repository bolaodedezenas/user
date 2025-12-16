// import { create } from "zustand";
// import toast from "react-hot-toast";

// const MAX_BALLS = 10;

// export const useBetsStore = create((set, get) => ({
//   selectedBalls: [],
//   bets: [],

//   setBall: (ball) =>
//     set((state) => {
//       // já existe
//       if (state.selectedBalls.includes(ball)) {
//         toast.error(`A bola ${ball} já foi selecionada!`, { duration: 4000 });
//         return state;
//       }

//       // já atingiu o limite
//       if (state.selectedBalls.length >= MAX_BALLS) {
//         toast.error(`Você só pode escolher ${MAX_BALLS} dezenas`, {
//           duration: 3000,
//         });
//         return state;
//       }

//       const updatedBalls = [...state.selectedBalls, ball];

//       // completou as 10 dezenas
//       if (updatedBalls.length === MAX_BALLS) {
//         const newBet = [...updatedBalls]; // snapshot do jogo

//         toast.success("Jogo adicionado com sucesso!", {
//           duration: 4000,
//         });

//         // limpa após 2 segundos
//         setTimeout(() => {
//           set((current) => ({
//             bets: [...current.bets, newBet], // 👈 salva jogo
//             selectedBalls: [], // limpa para nova seleção
//           }));
//         }, 1000);
//       }

//       return {
//         selectedBalls: updatedBalls,
//       };
//     }),

//   clearBalls: () => set({ selectedBalls: [] }),
//   // clearBets: () => set({ bets: [] }),
// }));



import { create } from "zustand";
import toast from "react-hot-toast";

const MAX_BALLS = 10;

export const useBetsStore = create((set, get) => ({
  selectedBalls: [],
  bets: [],

  setBall: (ball) =>
    set((state) => {
      if (state.selectedBalls.includes(ball)) {
        toast.error(`A bola ${ball} já foi selecionada!`, { duration: 4000 });
        return state;
      }

      if (state.selectedBalls.length >= MAX_BALLS) {
        toast.error(`Você só pode escolher ${MAX_BALLS} dezenas`, {
          duration: 3000,
        });
        return state;
      }

      const updatedBalls = [...state.selectedBalls, ball];

      if (updatedBalls.length === MAX_BALLS) {
        toast.success("Jogo adicionado com sucesso!", { duration: 3000 });

        // usa a action explícita
        setTimeout(() => {
          get().addBet(updatedBalls);
          get().clearBalls();
        }, 1000);
      }

      return { selectedBalls: updatedBalls };
    }),

  // 👇 ACTION EXPLÍCITA
  addBet: (bet) =>
    set((state) => ({
      bets: [...state.bets, bet],
    })),

  clearBalls: () => set({ selectedBalls: [] }),
  clearBets: () => set({ bets: [] }),
  
}));
