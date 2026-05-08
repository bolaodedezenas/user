// export async function POST(req) {
//   try {
//     let body;

//     try {
//       body = await req.json();
//     } catch (e) {
//       console.log("⚠️ JSON inválido, tentando texto...");
//       const text = await req.text();
//       console.log("RAW BODY:", text);
//       body = {};
//     }

//     console.log("🔥 WEBHOOK RECEBIDO:");
//     console.log(body);

//     const type = body?.type;
//     const paymentId = body?.data?.id;

//     if (type === "payment") {
//       console.log("💰 Pagamento atualizado:", paymentId);
//     }

//     return Response.json({ success: true });

//   } catch (error) {
//     console.error("Webhook error:", error);

//     return Response.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }
import { Payment } from "mercadopago";
import { mpClient } from "@/libs/mercadopago/client";
import { supabase } from "@/libs/supabase/client";

export async function POST(req) {
  try {
    const body = await req.json();

    // O Mercado Pago envia notificações de vários tipos, filtramos por 'payment'
    if (body?.type !== "payment") {
      return Response.json({ ok: true });
    }

    const payment = new Payment(mpClient);
    // Buscamos os detalhes do pagamento no Mercado Pago usando o ID recebido
    const result = await payment.get({ id: body.data.id });

    // Só prosseguimos se o status for 'approved'
    if (result.status !== "approved") {
      return Response.json({ ok: true });
    }

    // O external_reference que enviamos na criação do PIX é o ID da Transação no nosso banco
    const transactionId = result.external_reference;

    if (!transactionId) {
      console.error("⚠️ Webhook recebido sem external_reference");
      return Response.json({ ok: true });
    }

    console.log(`💰 Pagamento aprovado para transação: ${transactionId}`);

    // 1. Atualizar a Transação principal para 'paid'
    const { error: errorTx } = await supabase
      .from("transactions")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
      })
      .eq("id", transactionId);

    if (errorTx) throw errorTx;

    // 2. Buscar os IDs dos bilhetes (tickets) vinculados a essa transação
    const { data: relations } = await supabase
      .from("transaction_tickets")
      .select("ticket_id")
      .eq("transaction_id", transactionId);

    if (relations?.length) {
      const ticketIds = relations.map((r) => r.ticket_id);

      // 3. Atualizar todos os bilhetes vinculados para 'paid'
      await supabase
        .from("tickets")
        .update({ status: "paid" })
        .in("id", ticketIds);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("🔥 Webhook Error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
