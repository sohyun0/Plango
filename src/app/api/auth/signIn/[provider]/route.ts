import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function POST(req: NextRequest, { params }: { params: { provider: string } }) {
  try {
    const { provider } = params;
    const body = await req.json();
    const data = await serverFetch(`/auth/signIn/${provider}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `POST /api/auth/signIn/${params.provider} 오류: ${error}`,
      "소셜 로그인 중 오류가 발생했습니다.",
      500,
    );
  }
}
