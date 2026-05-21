import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;

  try {
    const data = await serverFetch(`/tasks/${taskId}/comments`);
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `GET /api/tasks/${taskId}/comments 오류: ${error}`,
      "태스크 댓글을 가져오는 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;

  try {
    const body = await req.json();
    const data = await serverFetch(`/tasks/${taskId}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `POST /api/tasks/${taskId}/comments 오류: ${error}`,
      "태스크 댓글 작성 중 오류가 발생했습니다.",
      500,
    );
  }
}
