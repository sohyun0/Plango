import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await serverFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `POST /api/auth/signIn 오류: ${error}`,
      "로그인 중 오류가 발생했습니다.",
      500,
    );
  }
}
