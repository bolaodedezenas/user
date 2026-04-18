import { useEffect, useCallback } from "react";
import { useContestsStore } from "../stores/useContestsStore";
import {
  getPoolContests,
  getContestByNumber,
} from "../services/contestsService";
import toast from "react-hot-toast";

export function useContests(poolId) {
  const {
    setContests,
    setLoading,
    setError,
    contests,
    isLoading,
    error,
    addContestToList,
  } = useContestsStore();

  useEffect(() => {
    if (!poolId) {
      setContests([]);
      return;
    }

    // Limpa a lista atual ao trocar de bolão para evitar inconsistência visual
    setContests([]);

    const fetchContests = async () => {
      try {
        setLoading(true);
        const data = await getPoolContests(poolId);
        setContests(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [poolId, setContests, setLoading, setError]);

  const searchContestByNumber = async (poolId, contestNumber) => {
    // 🛑 Evita busca e mensagem de erro se o campo estiver vazio (ao abrir o Select)
    if (!contestNumber) return null;

    try {
      setLoading(true);
      const data = await getContestByNumber(poolId, contestNumber);
      if (data) {
        addContestToList(data);
        return data;
      } else {
        toast.error("Concurso não encontrado.");
        return null;
      }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    contests,
    isLoading,
    setLoading,
    error,
    searchContestByNumber,
  };
}
