import { myBetsRepository } from "../repository/myBetsRepository";
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

export const myBetsService = {
  async getTicketBets(ticketId) {
    try {
      return await myBetsRepository.getBetsByTicketId(ticketId);
    } catch (error) {
      console.error("Erro no serviço myBetsService:", error);
      throw error;
    }
  }
};
