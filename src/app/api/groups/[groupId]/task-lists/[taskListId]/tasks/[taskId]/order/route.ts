import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ groupId: string; taskListId: string; taskId: string }> },
) {
  const { groupId, taskListId, taskId } = await params;

  try {
    const body = await req.json();
    const data = await serverFetch(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/order`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
      },
    );
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `PATCH /api/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/order 오류: ${error}`,
      "태스크 순서 변경 중 오류가 발생했습니다.",
      500,
    );
  }
}
