"use client";

import { useEffect, useState } from "react";
import { myBetsService } from "../services/myBetsService";

export function useTicketBets(ticketId) {
  
  const [bets, setBets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticketId) {
      setBets([]);
      return;
    }

    const fetchBets = async () => {
      try {
        setIsLoading(true);
        const getBets = await myBetsService.getTicketBets(ticketId);
        setBets(getBets);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBets();
  }, [ticketId]);

  return { bets, isLoading, error };
}
