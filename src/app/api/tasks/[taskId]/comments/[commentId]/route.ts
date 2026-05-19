import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { taskId: string; commentId: string } },
) {
  try {
    const { commentId } = params;
    const body = await req.json();
    const data = await serverFetch(`/tasks/${params.taskId}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `PATCH /api/tasks/${params.taskId}/comments/${params.commentId} 오류: ${error}`,
      "태스크 댓글 수정 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { taskId: string; commentId: string } },
) {
  try {
    const { taskId, commentId } = params;
    const data = await serverFetch(`/tasks/${taskId}/comments/${commentId}`, {
      method: "DELETE",
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `DELETE /api/tasks/${params.taskId}/comments/${params.commentId} 오류: ${error}`,
      "태스크 댓글 삭제 중 오류가 발생했습니다.",
      500,
    );
  }
}
