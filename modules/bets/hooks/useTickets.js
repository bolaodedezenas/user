import { useEffect, useCallback } from "react";
import { useTicketsStore } from "../stores/useTicketsStore";
import { betsService } from "../services/bets.service";
import toast from "react-hot-toast";

export const useTickets = (
  contestId,
  page = 1,
  limit = 30,
  searchTerm = "",
) => {
  const {
    tickets,
    totalCount,
    isLoading,
    setTickets,
    setTotalCount,
    setLoading,
    setError,
  } = useTicketsStore();

  const fetchTickets = useCallback(async () => {
    // Proteção para evitar chamadas com IDs inválidos ou a string "undefined"
    if (!contestId || contestId === "undefined" || contestId === "null") return;

    setLoading(true);
    try {
      const { tickets, totalCount } = await betsService.getTicketsByContest(
        contestId,
        page,
        limit,
        searchTerm,
      );
      setTickets(tickets);
      setTotalCount(totalCount);
    } catch (err) {
      console.error("Erro ao buscar tickets:", err);
      setError(err.message);
      // Evita mostrar erro caso seja apenas um cancelamento de query ou termo vazio
      if (searchTerm) toast.error("Erro ao realizar busca no servidor");
    } finally {
      setTimeout(() => setLoading(false), 1000); // Aguarda 1 segundo para evitar o flash de loading
    }
  }, [
    contestId,
    page,
    limit,
    searchTerm,
    setTickets,
    setTotalCount,
    setLoading,
    setError,
  ]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return {
    tickets,
    totalCount,
    isLoading,
    refetch: fetchTickets,
  };
};
