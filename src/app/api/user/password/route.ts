import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await serverFetch("/user/password", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `PATCH /api/user/password 오류: ${error}`,
      "비밀번호 변경 중 오류가 발생했습니다.",
      500,
    );
  }
}
