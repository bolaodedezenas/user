import { getContestsByPoolRepository } from "../repository/contestsRepository";

export const getContestsByPoolService = async (poolId) => {
  try {
    if (!poolId) return [];
    return await getContestsByPoolRepository(poolId);
  } catch (error) {
    console.error("Erro ao buscar concursos:", error);
    throw error;
  }
};