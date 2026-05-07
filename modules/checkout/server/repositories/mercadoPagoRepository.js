import { Payment } from "mercadopago";

import { mpClient } from "@/libs/mercadopago/mpClient ";
export async function createMercadoPagoPix(payload) {
  const payment = new Payment(mpClient);

  return payment.create({
    body: payload,
  });
}

