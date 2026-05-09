export const runtime = "nodejs";

import { redis } from "@/libs/redis";

function getSearchParams(req) {
  const requestUrl = typeof req.url === "string" ? req.url : "";

  try {
    return new URL(requestUrl).searchParams;
  } catch {
    const host = req.headers.get("host") || "localhost";
    const protocol = req.headers.get("x-forwarded-proto") || "https";
    return new URL(requestUrl, `${protocol}://${host}`).searchParams;
  }
}

export async function GET(req) {
  try {
    const searchParams = getSearchParams(req);
    const externalReference = searchParams.get("external_reference");

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
    console.error("check-pix error:", error?.message || error, error);
    return Response.json(
      {
        success: false,
        error: error?.message || "Internal server error",
      },
      { status: 500 },
    );
  }
}
