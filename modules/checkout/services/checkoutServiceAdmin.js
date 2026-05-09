import { checkoutRepositoryAdmin } from "../repository/checkoutRepositoryAdmin";

export const checkoutServiceAdmin = {
  async createCompleteTransaction({ tickets, transactionData }) {
    const transaction =
      await checkoutRepositoryAdmin.saveTransaction(transactionData);

    const relations = tickets.map((ticket) => ({
      transaction_id: transaction.id,
      ticket_id: ticket.id,
      pool_id: ticket.pool_id,
    }));

    await checkoutRepositoryAdmin.saveTransactionTickets(relations);

    return transaction;
  },
};

