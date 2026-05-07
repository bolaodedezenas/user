import { createPixRepository } from "../repository/paymentRepository.js";

export async function createPixService(payload) {
  const data = await createPixRepository(payload);

  if (!data.success) {
    throw new Error(data.error);
  }

  return data;
}
