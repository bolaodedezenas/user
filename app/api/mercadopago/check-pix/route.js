export const runtime = "nodejs";

import { redis } from "@/libs/redis";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const externalReference = url.searchParams.get("external_reference");

    if (!externalReference) {
      return Response.json(
        {
          success: false,
          error: "external_reference is required",
        },
        { status: 400 },
      );
    }

    const key = `pix:complete:${externalReference}`;
    const data = await redis.get(key);

    if (!data) {
      return Response.json({ success: true, completed: false });
    }

    const parsed = typeof data === "string" ? JSON.parse(data) : data;

    return Response.json({
      success: true,
      completed: true,
      transaction: parsed.transaction,
    });
  } catch (error) {
    console.error("check-pix error:", error);
    return Response.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
