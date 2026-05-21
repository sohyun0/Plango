import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string; commentId: string }> },
) {
  const { taskId, commentId } = await params;

  try {
    const body = await req.json();
    const data = await serverFetch(`/tasks/${taskId}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `PATCH /api/tasks/${taskId}/comments/${commentId} 오류: ${error}`,
      "태스크 댓글 수정 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ taskId: string; commentId: string }> },
) {
  const { taskId, commentId } = await params;

  try {
    const data = await serverFetch(`/tasks/${taskId}/comments/${commentId}`, {
      method: "DELETE",
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `DELETE /api/tasks/${taskId}/comments/${commentId} 오류: ${error}`,
      "태스크 댓글 삭제 중 오류가 발생했습니다.",
      500,
    );
  }
}
