import { useEffect } from "react";
import { getPoolsService } from "../services/poolsService";
import { usePoolsStore } from "../stores/usePoolsStore";

export function usePools() {
  const { pools, isLoading, error, setPools, setLoading, setError } =
    usePoolsStore();

  useEffect(() => {
    // Se já temos os bolões no estado global, não precisamos buscar novamente
    if (pools.length > 0) return;

    const fetchPools = async () => {
      try {
        setLoading(true);
        const data = await getPoolsService();
        setPools(data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPools();
  }, [pools.length, setPools, setLoading, setError]);

  return { pools, isLoading, error };
}
