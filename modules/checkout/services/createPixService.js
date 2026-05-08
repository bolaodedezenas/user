import { Payment } from "mercadopago";
import { mercadopago } from "@/libs/mercadopago/client";

export async function createPixService(payload) {
  const payment = new Payment(mercadopago);

  const response = await payment.create({
    body: {
      transaction_amount: Number(payload.transaction_amount),
      description: payload.description,
      payment_method_id: payload.payment_method,
      payer: {
        email: payload.payer?.email,
        first_name: payload.payer?.name,
      },
      external_reference: String(payload.external_reference),
      date_of_expiration: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    },
    requestOptions: {
      idempotencyKey: String(payload.external_reference),
    },
  });

  console.log("PIX RESPONSE:", response);
  return response;
}
