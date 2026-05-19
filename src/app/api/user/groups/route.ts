import { serverFetch } from "@/lib/server/server-fetch";
import { NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/server/error";

export async function GET() {
  try {
    const data = await serverFetch("/user/groups");
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `GET /api/user/groups 오류: ${error}`,
      "사용자 그룹 목록을 가져오는 중 오류가 발생했습니다.",
      500,
    );
  }
}
