import { createPixService } from "@/modules/checkout/server/services/createPixService";

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await createPixService(body);

    return Response.json({
      success: true,

      payment_id: response.id,

      qr_code: response.point_of_interaction?.transaction_data?.qr_code,

      qr_code_base64:
        response.point_of_interaction?.transaction_data?.qr_code_base64,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Erro ao gerar PIX",
      },
      { status: 500 },
    );
  }
}

