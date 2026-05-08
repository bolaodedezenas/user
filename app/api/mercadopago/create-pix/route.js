import { createPixService } from "@/modules/checkout/services/createPixService";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("🔥 PIX REQUEST:", body);

    const response = await createPixService(body);

    return Response.json({
      success: true,
      payment_id: response.id,
      qr_code: response.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64:
        response.point_of_interaction?.transaction_data?.qr_code_base64,
    });
  } catch (error) {
    // O SDK v2 esconde os detalhes em 'cause'. Vamos logar para debugar:
    const detailedError = error.cause || error;
    console.error(
      "🔥 PIX ERROR DETAILS:",
      JSON.stringify(detailedError, null, 2),
    );

    return Response.json(
      {
        success: false,
        error:
          error?.message === "internal_error"
            ? "Erro de validação no Mercado Pago"
            : error?.message || "Erro ao gerar PIX",
      },
      { status: 500 },
    );
  }
}

// Removido runtime: "edge" para garantir compatibilidade com o SDK do Mercado Pago
