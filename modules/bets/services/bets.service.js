import { betsRepository } from "../repository/bets.repository";

export const betsService = {
  async getTicketsByContest(contestId, page, limit, searchTerm, user_id) {
    const { data, count } = await betsRepository.getTicketsByContest(
      contestId,
      page,
      limit,
      searchTerm,
      user_id
    );

    return {
      tickets: data.map((ticket) => ({
        id: ticket.id,
        ticket_number: ticket.ticket_number,
        bet_price: ticket.bet_price,
        // bets: ticket.bets.map((bet) => bet.numbers),
        avatar_url: ticket.customers?.avatar_url || "N/A",
        name: ticket.customers?.name || "N/A",
        phone: ticket.customers?.phone || "N/A",
        endereco: `${ticket.customers?.city || ""}-${ticket.customers?.state || ""}`,
        jogos: ticket.total_bets,
        total_value: ticket.total_value,
        status: ticket.status === "paid" ? "Pago" : "Pendente",
      })),
      totalCount: count,
    };
  },
};
