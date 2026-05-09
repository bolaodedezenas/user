import * as repo from "../repository/ticketsRepositoryAdmin";

export const checkoutTicketsServiceServerAdimin = async (ticketsList) => {
  const savedTickets = [];

  for (const ticket of ticketsList) {
    // salva apenas colunas reais da tabela tickets
    const ticketToSave = {
      user_id: ticket.user_id,
      customer_id: ticket.customer_id,
      contest_id: ticket.contest_id,
      pool_id: ticket.pool_id,
      pool_name: ticket.pool_name,
      bet_price: ticket.bet_price,
      total_value: ticket.total_value,
      total_bets: ticket.bets.length,
      status: ticket.status,
      created_at: new Date().toISOString(),
      payment_method: ticket.payment_method,
    };

    // cria ticket
    const savedTicket = await repo.createTicket(ticketToSave);

    savedTickets.push(savedTicket);

    // cria bets vinculadas
    const betsToSave = ticket.bets.map((bet) => ({
      ticket_id: savedTicket.id,
      numbers: bet.numbers,
      created_at: bet.created_at || new Date().toISOString(),
    }));

    // salva bets
    await repo.createBets(betsToSave);
  }

  return savedTickets;
};

