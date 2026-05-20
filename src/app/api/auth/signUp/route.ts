import { NextRequest } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";
import { createAuthResponse } from "@/lib/server/auth";
import type { AuthTokenPayload } from "@/types/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await serverFetch<AuthTokenPayload>("/auth/signUp", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return createAuthResponse(data);
  } catch (error) {
    return createErrorResponse(
      `POST /api/auth/signUp 오류: ${error}`,
      "회원가입 중 오류가 발생했습니다.",
      500,
    );
  }
}
