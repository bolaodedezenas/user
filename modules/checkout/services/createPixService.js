import { Payment } from "mercadopago";
import { mpClient } from "@/libs/mercadopago/client";
 

export async function createPixService(payload) {
  const payment = new Payment(mpClient);

  const amount = Number(payload.amount);
  if (isNaN(amount) || amount <= 0) {
    throw new Error("O valor do pagamento deve ser maior que zero.");
  }

  const response = await payment.create({
    body: {
      transaction_amount: amount,
      description: "Bolão Online",
      payment_method_id: "pix",
      payer: {
        email: payload.email,
        name: payload.name,
        // Identificação (CPF) é OBRIGATÓRIA para PIX em muitos casos de produção
        ...(payload.cpf && {
          identification: {
            type: "CPF",
            number: payload.cpf.replace(/\D/g, ""), // Remove pontos e traços
          },
        }),
      },
      external_reference: String(payload.ticketId || ""),
    },
    requestOptions: {
      // Garante uma chave única por tentativa de pagamento
      idempotencyKey: `${payload.ticketId}`,
    },
  });

  return response;
}
