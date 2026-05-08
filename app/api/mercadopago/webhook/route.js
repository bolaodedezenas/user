// export async function POST(req) {
//   try {
//     const body = await req.json();

//     console.log("🔥 WEBHOOK RECEBIDO:");

//     console.log(JSON.stringify(body, null, 2));

//     const type = body.type; // payment
//     const paymentId = body.data?.id;

//     if (type === "payment") {
//       console.log("💰 Pagamento atualizado:", paymentId);

//       // aqui você consulta o pagamento no Mercado Pago
//       // e atualiza seu banco (Supabase / DB)
//     }

//     return Response.json({ success: true });
//   } catch (error) {
//     console.error("Webhook error:", error);

//     return Response.json({ success: false }, { status: 500 });
//   }
// }

export const runtime = "nodejs";

import { redis } from "@/libs/redis";
import { Payment } from "mercadopago";
import { mercadopago } from "@/libs/mercadopago/client";

import { checkoutTicketsService } from "@/modules/pools/services/ticketsService";
import { registerTransactionServer } from "@/modules/checkout/services/registerTransactionServer";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("WEBHOOK:", body);

    const paymentId = body.data.id;

    const payment = new Payment(mercadopago);

    const paymentData = await payment.get({
      id: paymentId,
    });

    // ignora pagamentos não aprovados
    if (paymentData.status !== "approved") {
      return Response.json({
        success: true,
      });
    }

    const externalReference = paymentData.external_reference;

    // Busca dados temporários que foram salvos quando o PIX foi gerado no cliente.
    // Esse cache contém os tickets e o cliente selecionado para montar a transação.
    const tempData = await redis.get(`pix:${externalReference}`);

    if (!tempData) {
      return Response.json({
        success: false,
        error: "dados temporários não encontrados",
      });
    }

    const parsed =
      typeof tempData === "string" ? JSON.parse(tempData) : tempData;

    // atualiza tickets
    const updatedTickets = parsed.tickets.map((ticket) => ({
      ...ticket,
      status: "paid",
      customer_id: parsed.customer_id,
      payment_method: "pix",
      user_id: parsed.user_id || ticket.user_id,
    }));

    // salva tickets via serviço de checkout
    const registeredTickets = await checkoutTicketsService(updatedTickets);

    // salva transação
    const transaction = await registerTransactionServer({
      tickets: registeredTickets,
      paymentMethod: "pix",
      status: "paid",
      userId: parsed.user_id,
    });

    // marca finalizado no Redis para o cliente poder detectar
    await redis.set(
      `pix:complete:${externalReference}`,
      JSON.stringify({ transaction }),
      {
        ex: 60 * 30,
      },
    );

    // remove cache temporária dos dados do pagamento
    await redis.del(`pix:${externalReference}`);

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
