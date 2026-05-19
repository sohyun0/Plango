import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const res = await serverFetch("/images/upload", {
      method: "POST",
      body: formData,
    });
    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(
      `POST /api/images/upload 오류: ${error}`,
      "이미지 업로드 중 오류가 발생했습니다.",
      500,
    );
  }
}
