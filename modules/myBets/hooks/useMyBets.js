import { useEffect } from "react";
import { useMyBetsStore } from "../stores/useMyBetsStore";
import { getMyTicketsService } from "../services/myBetsService";
import { useAuthStore } from "@/modules/auth/stores/auth.store";

export function useMyTickets(poolId, contestId) {
  const { setMyTickets, setLoading, setError, myTickets, isLoading, error } =
    useMyBetsStore();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user?.id || !poolId || !contestId) return;

      try {
        setLoading(true);
        const data = await getMyTicketsService(user.id, poolId, contestId);
        setMyTickets(data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTickets();
  }, [user?.id, poolId, contestId, setMyTickets, setLoading, setError]);

  return { myTickets, isLoading, error };
}
