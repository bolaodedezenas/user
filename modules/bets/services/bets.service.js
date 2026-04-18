import { betsRepository } from "../repository/bets.repository";

export const betsService = {
  async getTicketsByContest(contestId, page, limit, searchTerm) {
    const { data, count } = await betsRepository.getTicketsByContest(
      contestId,
      page,
      limit,
      searchTerm
    );

    return {
      tickets: data.map((ticket) => ({
        id: ticket.ticket_number,
        nome: ticket.customers?.name || "N/A",
        telefone: ticket.customers?.phone || "N/A",
        endereco: `${ticket.customers?.city || ""}-${ticket.customers?.state || ""}`,
        jogos: ticket.total_bets,
        valor: ticket.total_value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        status: ticket.status === "paid" ? "Pago" : "Pendente",
      })),
      totalCount: count,
    };
  },
};
