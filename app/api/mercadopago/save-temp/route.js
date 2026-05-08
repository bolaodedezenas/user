export const runtime = "nodejs";

import { redis } from "@/libs/redis";

export async function POST(req) {
  try {
    const body = await req.json();

    const key = `pix:${body.external_reference}`;

    // salva por 30 minutos
    await redis.set(key, JSON.stringify(body), {
      ex: 60 * 30,
    });

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

