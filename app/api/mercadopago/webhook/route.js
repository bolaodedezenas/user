export async function POST(req) {
  try {
    let body;

    try {
      body = await req.json();
    } catch (e) {
      console.log("⚠️ JSON inválido, tentando texto...");
      const text = await req.text();
      console.log("RAW BODY:", text);
      body = {};
    }

    console.log("🔥 WEBHOOK RECEBIDO:");
    console.log(body);

    const type = body?.type;
    const paymentId = body?.data?.id;

    if (type === "payment") {
      console.log("💰 Pagamento atualizado:", paymentId);
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error("Webhook error:", error);

    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

