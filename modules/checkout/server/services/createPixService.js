import { createMercadoPagoPix } from "../repositories/mercadoPagoRepository";

export async function createPixService(payload) {
  return createMercadoPagoPix({
    transaction_amount: Number(payload.amount),

    description: "Bolão Online",

    payment_method_id: "pix",

    payer: {
      email: payload.email,
      first_name: payload.name,
    },

    external_reference: payload.ticketId,
  });
}

