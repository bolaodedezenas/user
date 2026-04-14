import { getPoolsRepository } from "../repository/poolsRepository";


export const getPoolsService = async () => {
  try {
    return await getPoolsRepository();
  } catch (error) {
    console.error("Erro ao processar getPoolsService:", error);
    throw error;
  }
};
