import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "../../auth/stores/auth.store";

const MAX_BALLS = 10;
const userId = useAuthStore.getState().user?.id;

export const useBetsStore = create((set, get) => ({
  selectedBalls: [],
  tickets: [],
  activeContest: null,
  activePool: null,

  // ✅ Atualiza o estado global de bilhetes (usado na edição/exclusão e checkout)
  setTickets: (newTickets) => set({ tickets: newTickets }),

  // ✅ Define qual concurso está visualmente selecionado no cabeçalho
  setActiveContest: (contest) => set({ activeContest: contest }),

  // ✅ Define qual bolão está visualmente selecionado no cabeçalho
  setActivePool: (pool) => set({ activePool: pool }),

  // ✅ Adiciona   bolas ao jogo atual, com validações e feedbacks
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

  // ✅  Adiciona um jogo ao bilhete
  addBet: (gameNumbers) => {
    const { activeContest, activePool } = get();
    if (!activeContest || !activePool) return;

    set((state) => {
      // Busca se já existe um bilhete para este bolão e concurso específicos
      const existingTicketIndex = state.tickets.findIndex(
        (t) => t.contest_id === activeContest.id && t.pool_id === activePool.id,
      );

      const newTickets = [...state.tickets];

      // verifica se já existe um bilhete para o bolão e concurso atuais, e add  o bet no bilhete
      if (existingTicketIndex > -1) {
        console.log(existingTicketIndex);
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
          total_value: updatedBets.length * activeContest.bet_price,
        };
      } else {
        // Caso contrário, cria um novo bilhete para este bolão e concurso
        // Cria um novo bilhete estruturado para a tabela do banco
        newTickets.push({
          user_id: userId,
          customer_id: null, // id fixo de um cliente
          contest_id: activeContest.id,
          contest_number: activeContest.contest_number,
          pool_id: activePool.id,
          pool_name: activePool.name,
          total_bets: 1, // ✅ Correção: Inicia com 1, não 0
          bet_price: activeContest.bet_price,
          total_value: activeContest.bet_price,
          status: "pending",
          created_at: new Date().toISOString(),
          color: activePool.color, // nao envia para o banco, apenas para controle visual
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

  // ❌ remove um bilhete específico (por pool_id e contest_id)
  removeTicket: (pool_id, contest_id) => {
    set((state) => ({
      tickets: state.tickets.filter(
        (t) => !(t.pool_id === pool_id && t.contest_id === contest_id),
      ),
    }));
    toast.error(`O bilhete foi removido!`, { duration: 4000, icon: "🟠" });
  },


  updateTicketsStatus: (status, customerId, paymentMethod) => {
    const updated = get().tickets.map((ticket) => ({
      ...ticket,
      status,
      customer_id: customerId ? customerId : null,
      payment_method: paymentMethod,
    }));

    set({ tickets: updated });
    return updated; // 👈 ISSO AQUI MUDA TUDO
  },

  clearBalls: () => set({ selectedBalls: [] }),
  clearTickets: () => set({ tickets: [] }),
}));
