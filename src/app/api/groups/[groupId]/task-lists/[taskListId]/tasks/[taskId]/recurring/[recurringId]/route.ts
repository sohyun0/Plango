import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function DELETE(
  _req: NextRequest,
  {
    params,
  }: { params: { groupId: string; taskListId: string; taskId: string; recurringId: string } },
) {
  try {
    const { groupId, taskListId, taskId, recurringId } = params;
    const data = await serverFetch(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
      {
        method: "DELETE",
      },
    );
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `DELETE /api/groups/${params.groupId}/task-lists/${params.taskListId}/tasks/${params.taskId}/recurring/${params.recurringId} 오류: ${error}`,
      "반복 태스크 삭제 중 오류가 발생했습니다.",
      500,
    );
  }
}
