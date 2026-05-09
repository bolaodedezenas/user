import { checkoutServiceAdmin } from "@/modules/checkout/services/checkoutServiceAdmin";

export async function registerTransactionServerAdmin({
  tickets,
  paymentMethod,
  status,
  userId,
}) {
  const ticketsArray = Array.isArray(tickets)
    ? tickets
    : tickets
      ? [tickets]
      : [];

  const totalAmount = ticketsArray.reduce(
    (acc, t) => acc + (t.total_value || 0),
    0,
  );

  const totalBets = ticketsArray.reduce(
    (acc, t) => acc + (t.bets?.length || t.total_bets || 0),
    0,
  );

  const transactionData = {
    user_id: userId,
    total_amount: totalAmount,
    total_tickets: ticketsArray.length,
    total_bets: totalBets,
    status,
    payment_method: paymentMethod,
    paid_at: status === "paid" ? new Date().toISOString() : null,
  };

  return checkoutServiceAdmin.createCompleteTransaction({
    tickets: ticketsArray,
    transactionData,
  });
}


