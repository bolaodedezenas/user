
import { checkoutRepository } from "../repository/checkoutRepository";

export const checkoutService = {
  async createCompleteTransaction({ tickets, transactionData }) {
    console.log("TICKETS:", tickets);
    // 1. Salva a transação principal
    const transaction =
      await checkoutRepository.saveTransaction(transactionData);

    // 2. Prepara os registros da tabela de ligação (transaction_tickets)
    // Utilizamos os IDs reais que vieram do cadastro dos bilhetes
    const relations = tickets.map((ticket) => ({
      transaction_id: transaction.id,
      ticket_id: ticket.id,
      pool_id: ticket.pool_id,
      // amount: ticket.total_value,
    }));

    // 3. Salva os vínculos na tabela de relação
    await checkoutRepository.saveTransactionTickets(relations);

    return transaction;
  },
};