import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ groupId: string; taskListId: string; taskId: string }> },
) {
  const { groupId, taskListId, taskId } = await params;

  try {
    const data = await serverFetch(`/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`);
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `GET /api/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId} 오류: ${error}`,
      "태스크 상세를 가져오는 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ groupId: string; taskListId: string; taskId: string }> },
) {
  const { groupId, taskListId, taskId } = await params;

  try {
    const body = await req.json();
    const data = await serverFetch(`/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `PATCH /api/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId} 오류: ${error}`,
      "태스크 수정 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ groupId: string; taskListId: string; taskId: string }> },
) {
  const { groupId, taskListId, taskId } = await params;

  try {
    const data = await serverFetch(`/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`, {
      method: "DELETE",
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `DELETE /api/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId} 오류: ${error}`,
      "태스크 삭제 중 오류가 발생했습니다.",
      500,
    );
  }
}
