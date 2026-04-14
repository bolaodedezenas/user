import { fetchMyTickets } from "../repository/myBetsRepository";

export const getMyTicketsService = async (userId, poolId, contestId) => {
  try {
    if (!userId || !poolId || !contestId) return [];
    return await fetchMyTickets(userId, poolId, contestId);
  } catch (error) {
    console.error("Erro no serviço getMyTicketsService:", error);
    throw error;
  }
};
