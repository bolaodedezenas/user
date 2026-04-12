import { useEffect } from "react";
import { useContestsStore } from "../stores/useContestsStore";
import { getContestsByPoolService } from "../services/contestsService";

export function useContests(poolId) {
  const { setContests, setLoading, setError, contests, isLoading, error } = useContestsStore();

  useEffect(() => {
    if (!poolId) return;

    const fetchContests = async () => {
      try {
        setLoading(true);
        const data = await getContestsByPoolService(poolId);
        setContests(data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchContests();
  }, [poolId, setContests, setLoading, setError]);

  return {
    contests,
    isLoading,
    error
  };
}