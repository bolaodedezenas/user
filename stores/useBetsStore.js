import { create } from "zustand";
import toast from "react-hot-toast";

const MAX_BALLS = 10;

export const useBetsStore = create((set, get) => ({
  selectedBalls: [],
  tickets: [],
  activeContest: null,
  activePool: null,

  // ✅ Define a lista completa de apostas (usado para edição/exclusão no Cart)
  setTickets: (newTickets) => set({ tickets: newTickets }),

  // ✅ Sincroniza o concurso atual do layout com o store
  setActiveContest: (contest) => set({ activeContest: contest }),

  // ✅ Sincroniza o bolão atual do layout com o store
  setActivePool: (pool) => set({ activePool: pool }),

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

        setTimeout(() => {
          get().addBet(updatedBalls);
          get().clearBalls();
        }, 1000);
      }

      return { selectedBalls: updatedBalls };
    }),

  // ✅ adiciona um jogo ao bilhete do concurso ativo
  addBet: (gameNumbers) => {
    const { activeContest, activePool } = get();
    if (!activeContest || !activePool) return;

    set((state) => {
      // Busca se já existe um bilhete para este bolão e concurso específicos
      const existingTicketIndex = state.tickets.findIndex(
        (t) => t.contest_id === activeContest.id && t.pool_id === activePool.id,
      );

      const newTickets = [...state.tickets];
      const unitValue = 2.5; // Valor unitário fixo

      if (existingTicketIndex > -1) {
        // Adiciona jogo ao bilhete existente
        const ticket = newTickets[existingTicketIndex];
        const updatedBets = [
          ...ticket.bets,
          {
            numbers: gameNumbers,
            created_at: new Date().toISOString(),
            ticket_id: null,
          },
        ];

        newTickets[existingTicketIndex] = {
          ...ticket,
          bets: updatedBets,
          total_bets: updatedBets.length,
          total_value: updatedBets.length * unitValue,
        };
      } else {
        // Cria um novo bilhete estruturado para a tabela do banco
        newTickets.push({
          user_id: null, // Será preenchido ao finalizar/salvar
          pool_id: activePool.id,
          pool_name: activePool.name,
          contest_id: activeContest.id,
          unit_value: unitValue,
          total_value: unitValue,
          total_bets: 1,
          status: "pending",
          created_at: new Date().toISOString(),
          bets: [
            {
              numbers: gameNumbers,
              created_at: new Date().toISOString(),
              ticket_id: null,
            },
          ],
        });
      }
      return { tickets: newTickets };
    });
  },

  // ❌ remove uma bola específica
  removeBall: (ball) => {
    set((state) => ({
      selectedBalls: state.selectedBalls.filter(
        (selected) => selected !== ball,
      ),
    }));

    toast.error(`A bola ${ball} foi removida!`, { duration: 4000, icon: "🟠" });
  },

  // ❌ remove um bilhete específico (por índice)
  removeTicket: (ticketIndex) => {
    set((state) => ({
      tickets: state.tickets.filter((_, index) => index !== ticketIndex),
    }));
    toast.error(`O bilhete foi removido!`, { duration: 4000, icon: "🟠" });
  },

  clearBalls: () => set({ selectedBalls: [] }),
  clearTickets: () => set({ tickets: [] }),
}));
