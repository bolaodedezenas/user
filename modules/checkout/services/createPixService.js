import { Payment } from "mercadopago";
import { mercadopago } from "@/libs/mercadopago/client";
import crypto from "crypto";

export async function createPixService(payload) {
  const payment = new Payment(mercadopago);

  // Mercado Pago prefere nome e sobrenome separados
  const nameParts = (payload.name || "").trim().split(" ");
  const firstName = nameParts[0] || "Cliente";
  const lastName =
    nameParts.length > 1 ? nameParts.slice(1).join(" ") : "Consumidor";

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
        first_name: firstName,
        last_name: lastName,
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
      idempotencyKey: payload.ticketId
        ? `${payload.ticketId}-${Date.now()}`
        : crypto.randomUUID(),
    },
  });

  return response;
}
