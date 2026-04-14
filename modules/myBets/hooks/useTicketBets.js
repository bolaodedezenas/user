"use client";

import { useEffect, useState } from "react";
import { myBetsService } from "../services/myBetsService";

export function useTicketBets(ticketId) {
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticketId) {
      setData([]);
      return;
    }

    const fetchBets = async () => {
      try {
        setIsLoading(true);
        const bets = await myBetsService.getTicketBets(ticketId);
        setData(bets);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBets();
  }, [ticketId]);

  return { data, isLoading, error };
}
