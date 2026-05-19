import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function GET() {
  try {
    const data = await serverFetch("/user");
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `GET /api/user 오류: ${error}`,
      "회원 정보를 가져오는 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await serverFetch("/user", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `PATCH /api/user 오류: ${error}`,
      "회원 정보 수정 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function DELETE() {
  try {
    const data = await serverFetch("/user", {
      method: "DELETE",
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `DELETE /api/user 오류: ${error}`,
      "회원 탈퇴 중 오류가 발생했습니다.",
      500,
    );
  }
}
