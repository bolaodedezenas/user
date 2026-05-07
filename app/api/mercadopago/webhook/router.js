export async function POST(req) {
  try {
    const body = await req.json();

    console.log("🔥 WEBHOOK RECEBIDO:");

    console.log(JSON.stringify(body, null, 2));

    const type = body.type; // payment
    const paymentId = body.data?.id;

    if (type === "payment") {
      console.log("💰 Pagamento atualizado:", paymentId);

      // aqui você consulta o pagamento no Mercado Pago
      // e atualiza seu banco (Supabase / DB)
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);

    return Response.json({ success: false }, { status: 500 });
  }
}
