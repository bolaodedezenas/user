import * as ticketsRepository from "../repository/ticketsRepository";

export const checkoutTicketsService = async (ticketsList) => {
  try {
    const savedTickets = [];

    for (const ticket of ticketsList) {
      // 1. Preparar dados do bilhete (Ticket)
      const ticketToSave = {
        user_id: ticket.user_id,
        customer_id: ticket.customer_id,
        contest_id: ticket.contest_id,
        pool_id: ticket.pool_id,
        pool_name: ticket.pool_name,
        bet_price: ticket.bet_price,
        total_value: ticket.total_value,
        total_bets: ticket.bets.length,
        status: ticket.status, // Ou 'completed' dependendo da sua regra de pagamento
        created_at: new Date().toISOString(),
        payment_method: ticket.payment_method,
      };

      // 2. Salvar o bilhete e obter o ID
      const savedTicket = await ticketsRepository.createTicket(ticketToSave);
      savedTickets.push(savedTicket);

      // 3. Preparar as apostas (Bets) vinculando o ticket_id recém-criado
      const betsToSave = ticket.bets.map((bet) => ({
        ticket_id: savedTicket.id,
        numbers: bet.numbers,
        created_at: bet.created_at || new Date().toISOString(),
      }));

      // 4. Salvar as apostas em lote (Bulk Insert)
      await ticketsRepository.createBets(betsToSave);
    }

    return savedTickets;
  } catch (error) {
    console.error("Erro no serviço de checkout:", error);
    throw error;
  }
};
