import * as repo from "../repository/ticketsRepositoryAdmin";

export const checkoutTicketsServiceServerAdimin = async (ticketsList) => {
  const savedTickets = [];

  for (const ticket of ticketsList) {
    const savedTicket = await repo.createTicket(ticket);
    savedTickets.push(savedTicket);

    const bets = ticket.bets.map((bet) => ({
      ticket_id: savedTicket.id,
      numbers: bet.numbers,
      created_at: new Date().toISOString(),
    }));

    await repo.createBets(bets);
  }

  return savedTickets;
};
