import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await serverFetch("/groups", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `POST /api/groups 오류: ${error}`,
      "그룹 생성 중 오류가 발생했습니다.",
      500,
    );
  }
}
