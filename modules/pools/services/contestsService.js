import {
  fetchAllContestsByPool,
  fetchSingleContestByNumber,
} from "../repository/contestsRepository";

export const getPoolContests = async (poolId) => {
  try {
    if (!poolId) return [];
    return await fetchAllContestsByPool(poolId);
  } catch (error) {
    console.error("Erro ao buscar concursos:", error);
    throw error;
  }
};

export const getContestByNumber = async (poolId, contestNumber) => {
  try {
    if (!poolId || !contestNumber) return null;
    return await fetchSingleContestByNumber(poolId, contestNumber);
  } catch (error) {
    console.error("Erro ao buscar concurso por número:", error);
    throw error;
  }
};
