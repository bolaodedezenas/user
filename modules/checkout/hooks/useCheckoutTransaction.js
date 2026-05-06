import { useState } from "react";
import { checkoutService } from "../services/checkoutService";
import toast from "react-hot-toast";
import { useAuthStore } from "../../auth/stores/auth.store";

export function useCheckoutTransaction() {
  const [isSaving, setIsSaving] = useState(false);
  const [transaction, setTransaction] = useState(null);

  const registerTransaction = async (tickets, paymentMethod, status) => {
    // Garante que 'tickets' seja sempre um array para evitar o erro .reduce
    const ticketsArray = Array.isArray(tickets)
      ? tickets
      : tickets
        ? [tickets]
        : [];

    setIsSaving(true);
    
    try {
      const totalAmount = ticketsArray.reduce(
        (acc, t) => acc + (t.total_value || 0),
        0,
      );
      const totalBets = ticketsArray.reduce(
        (acc, t) => acc + (t.bets?.length || t.total_bets || 0),
        0,
      );

      // Obtém o ID do usuário logado para satisfazer as políticas de RLS do Supabase
      const userId = useAuthStore.getState().user?.id;

      const transactionData = {
        user_id: userId,
        total_amount: totalAmount,
        total_tickets: ticketsArray.length,
        total_bets: totalBets,
        status: status,
        payment_method: paymentMethod,
        paid_at: status === "paid" ? new Date().toISOString() : null,
      };

      const result = await checkoutService.createCompleteTransaction({
        tickets: ticketsArray,
        transactionData,
      });

      setTransaction(result);
      return result;
    } catch (error) {
      console.error("Erro ao registrar transação:", error);
      toast.error("Erro ao registrar os dados financeiros.");
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  return { registerTransaction, isSaving, transaction };
}
