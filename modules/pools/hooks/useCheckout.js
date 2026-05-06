import { useState } from "react";
import { checkoutTicketsService } from "../services/ticketsService";
import { useBetsStore } from "../stores/useBetsStore";
import toast from "react-hot-toast";

export function useCheckout() {
  const [isPending, setIsPending] = useState(false);
  const { clearTickets } = useBetsStore();

  const handleCheckout = async (updatedTickets) => {
    // Obtemos o estado mais recente do store no momento da execução
    const tickets = updatedTickets || useBetsStore.getState().tickets;

    if (tickets.length === 0) return false;

    setIsPending(true);
    try {
      const savedTickets = await checkoutTicketsService(tickets);

      toast.success(
        "Bilhetes enviados cadastrados no banco de dados com sucesso!",
        { duration: 5000 },
      );

      // Limpa o carrinho global após o sucesso
      clearTickets();

      // return true;
      return savedTickets;
    } catch (error) {
      toast.error(`Falha ao finalizar: ${error.message || "Erro interno"}`);
      return false;
    } finally {
      setIsPending(false);
    }
  };

  return { handleCheckout, isPending };
}