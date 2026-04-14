import { useState } from "react";
import { checkoutTicketsService } from "../services/ticketsService";
import { useBetsStore } from "../stores/useBetsStore";
import toast from "react-hot-toast";

export function useCheckout() {
  const [isPending, setIsPending] = useState(false);
  const { tickets, clearTickets } = useBetsStore();

  const handleCheckout = async () => {
    if (tickets.length === 0) return;

    setIsPending(true);
    try {
      await checkoutTicketsService(tickets);
      
      toast.success("Bilhetes enviados cadastrados no banco de dados com sucesso!", { duration: 5000 });
      
      // Limpa o carrinho global após o sucesso
      clearTickets();
      
      return true;
    } catch (error) {
      toast.error(`Falha ao finalizar: ${error.message || "Erro interno"}`);
      return false;
    } finally {
      setIsPending(false);
    }
  };

  return { handleCheckout, isPending };
}