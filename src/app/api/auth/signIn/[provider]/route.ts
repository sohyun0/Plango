import { NextRequest } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";
import { createAuthResponse } from "@/lib/server/auth";
import type { AuthTokenPayload } from "@/types/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;

  try {
    const body = await req.json();
    const data = await serverFetch<AuthTokenPayload>(`/auth/signIn/${provider}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return createAuthResponse(data);
  } catch (error) {
    return createErrorResponse(
      `POST /api/auth/signIn/${provider} 오류: ${error}`,
      "소셜 로그인 중 오류가 발생했습니다.",
      500,
    );
  }
}
