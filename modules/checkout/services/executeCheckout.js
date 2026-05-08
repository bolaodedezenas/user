export async function executeCheckout(selectedPaymentMethod, selectedCustomer, updateTicketsStatus, handleCheckout, registerTransaction, setVerifiedClientID) {
  
  const newStatus = selectedPaymentMethod === "cash" ? "paid" : "pending";

  const updatedTickets = updateTicketsStatus(
    newStatus,
    selectedCustomer?.id,
    selectedPaymentMethod,
  );

  if (!updatedTickets) return;

  setVerifiedClientID(updatedTickets[0].customer_id);

  const registeredTickets = await handleCheckout(updatedTickets);

  if (!registeredTickets) return;

  const transaction = await registerTransaction(
    registeredTickets,
    selectedPaymentMethod,
    newStatus,
  );

  if (!transaction) return;

  return transaction;
};

