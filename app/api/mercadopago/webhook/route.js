// export const runtime = "nodejs";

// import { redis } from "@/libs/redis";
// import { Payment } from "mercadopago";
// import { mercadopago } from "@/libs/mercadopago/client";

// import { checkoutTicketsServiceServerAdimin } from "@/modules/pools/services/ticketsServiceAdmin";

// import { registerTransactionServerAdmin } from "@/modules/checkout/services/registerTransactionServerAdmin";

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     console.log("WEBHOOK:", body);

//     const paymentId = body.data?.id;
//     if (!paymentId) {
//       console.log("WEBHOOK: payment id não encontrado no body", body);
//       return Response.json(
//         {
//           success: false,
//           error: "missing payment id",
//         },
//         { status: 400 },
//       );
//     }

//     const payment = new Payment(mercadopago);
//     const paymentData = await payment.get({ id: paymentId });

//     console.log(
//       "WEBHOOK: paymentData status=",
//       paymentData.status,
//       "external_reference=",
//       paymentData.external_reference,
//     );

//     if (paymentData.status !== "approved") {
//       console.log(
//         "WEBHOOK: pagamento não aprovado ainda, status=",
//         paymentData.status,
//       );
//       return Response.json({ success: true });
//     }

//     const externalReference = paymentData.external_reference;
//     if (!externalReference) {
//       console.log(
//         "WEBHOOK: external_reference faltando no pagamento",
//         paymentData,
//       );
//       return Response.json(
//         {
//           success: false,
//           error: "external_reference missing",
//         },
//         { status: 400 },
//       );
//     }

//     const tempData = await redis.get(`pix:${externalReference}`);
//     if (!tempData) {
//       console.log(
//         "WEBHOOK: dados temporários não encontrados para chave",
//         `pix:${externalReference}`,
//       );
//       return Response.json({
//         success: false,
//         error: "dados temporários não encontrados",
//       });
//     }

//     const parsed =
//       typeof tempData === "string" ? JSON.parse(tempData) : tempData;

//     // atualiza tickets
//     const updatedTickets = parsed.tickets.map((ticket) => ({
//       ...ticket,
//       status: "paid",
//       customer_id: parsed.customer_id,
//       payment_method: "pix",
//       user_id: parsed.user_id || ticket.user_id,
//     }));

//     // salva tickets via serviço de checkout
//     const registeredTickets =
//       await checkoutTicketsServiceServerAdimin(updatedTickets);

//     // salva transação
//     const transaction = await registerTransactionServerAdmin({
//       tickets: registeredTickets,
//       paymentMethod: "pix",
//       status: "paid",
//       userId: parsed.user_id,
//     });

//     // marca finalizado no Redis para o cliente poder detectar
//     await redis.set(
//       `pix:complete:${externalReference}`,
//       JSON.stringify({ transaction }),
//       {
//         ex: 60 * 30,
//       },
//     );

//     // remove cache temporária dos dados do pagamento
//     await redis.del(`pix:${externalReference}`);

//     return Response.json({
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);

//     return Response.json(
//       {
//         success: false,
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }





export const runtime = "nodejs";

import { redis } from "@/libs/redis";
import { Payment } from "mercadopago";
import { mercadopago } from "@/libs/mercadopago/client";

import { checkoutTicketsServiceServerAdimin } from "@/modules/pools/services/ticketsServiceAdmin";

import { registerTransactionServerAdmin } from "@/modules/checkout/services/registerTransactionServerAdmin";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("WEBHOOK:", body);

    const paymentId = body.data?.id;

    if (!paymentId) {
      console.log("WEBHOOK: payment id não encontrado no body", body);

      return Response.json(
        {
          success: false,
          error: "missing payment id",
        },
        {
          status: 400,
        },
      );
    }

    // busca pagamento no Mercado Pago
    const payment = new Payment(mercadopago);

    const paymentData = await payment.get({
      id: paymentId,
    });

    console.log(
      "WEBHOOK: paymentData status=",
      paymentData.status,
      "external_reference=",
      paymentData.external_reference,
    );

    // só processa se aprovado
    if (paymentData.status !== "approved") {
      console.log(
        "WEBHOOK: pagamento não aprovado ainda, status=",
        paymentData.status,
      );

      return Response.json({
        success: true,
      });
    }

    const externalReference = paymentData.external_reference;

    if (!externalReference) {
      console.log(
        "WEBHOOK: external_reference faltando no pagamento",
        paymentData,
      );

      return Response.json(
        {
          success: false,
          error: "external_reference missing",
        },
        {
          status: 400,
        },
      );
    }

    // evita duplicação do webhook
    const alreadyProcessed = await redis.get(
      `pix:processed:${externalReference}`,
    );

    if (alreadyProcessed) {
      console.log("WEBHOOK: pagamento já processado", externalReference);

      return Response.json({
        success: true,
        duplicated: true,
      });
    }

    // busca payload temporário
    const tempData = await redis.get(`pix:${externalReference}`);

    if (!tempData) {
      console.log(
        "WEBHOOK: dados temporários não encontrados para chave",
        `pix:${externalReference}`,
      );

      return Response.json({
        success: false,
        error: "dados temporários não encontrados",
      });
    }

    const parsed =
      typeof tempData === "string" ? JSON.parse(tempData) : tempData;

    // valida tickets
    if (!parsed.tickets || parsed.tickets.length === 0) {
      return Response.json(
        {
          success: false,
          error: "tickets inválidos",
        },
        {
          status: 400,
        },
      );
    }

    // atualiza tickets para pago
    const updatedTickets = parsed.tickets.map((ticket) => ({
      ...ticket,

      status: "paid",

      customer_id: parsed.customer_id,

      payment_method: "pix",

      user_id: parsed.user_id || ticket.user_id,
    }));

    // salva tickets + bets
    const registeredTickets =
      await checkoutTicketsServiceServerAdimin(updatedTickets);

    // cria transação
    const transaction = await registerTransactionServerAdmin({
      tickets: registeredTickets,

      paymentMethod: "pix",

      status: "paid",

      userId: parsed.user_id,
    });

    // marca finalizado para frontend detectar
    await redis.set(
      `pix:complete:${externalReference}`,
      JSON.stringify({
        transaction,
      }),
      {
        ex: 60 * 30,
      },
    );

    // marca webhook como processado
    await redis.set(`pix:processed:${externalReference}`, "true", {
      ex: 60 * 60 * 24,
    });

    // remove payload temporário
    await redis.del(`pix:${externalReference}`);

    console.log("WEBHOOK: pagamento processado com sucesso", externalReference);

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.log("WEBHOOK ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}