import { createPixService } from "@/modules/checkout/services/createPixService";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("🔥 PIX REQUEST:", body);

    // 👇 AQUI é onde o PIX realmente é criado no Mercado Pago
    const pix = await createPixService(body);

    console.log("✅ PIX RESPONSE:", pix);

    return Response.json({
      success: true,
      payment_id: pix.id, // ID oficial do pagamento no Mercado Pago
      external_reference: pix.external_reference, // Sua referência interna (ID da transação)
      qr_code: pix.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64:
        pix.point_of_interaction?.transaction_data?.qr_code_base64,
    });
  } catch (err) {
    // O SDK v2 do Mercado Pago coloca os detalhes do erro da API aqui:
    const apiError = err.apiResponse?.errors || err.cause || err;
    const message = err.apiResponse?.message || err.message;

    console.error("🔥 PIX ERROR DETAILS:", JSON.stringify(apiError, null, 2));

    // Extrai a mensagem de erro específica se houver (ex: email inválido)
    const errorMessage = Array.isArray(apiError)
      ? apiError.map((e) => e.description).join(", ")
      : message;

    return Response.json(
      {
        success: false,
        error: errorMessage || "Erro ao gerar PIX",
        details: apiError,
      },
      { status: 500 },
    );
  }
}
