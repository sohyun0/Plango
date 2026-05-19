import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function POST(
  req: NextRequest,
  { params }: { params: { groupId: string; taskListId: string } },
) {
  try {
    const { groupId, taskListId } = params;
    const body = await req.json();
    const data = await serverFetch(`/groups/${groupId}/task-lists/${taskListId}/recurring`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `POST /api/groups/${params.groupId}/task-lists/${params.taskListId}/recurring 오류: ${error}`,
      "반복 태스크 생성 중 오류가 발생했습니다.",
      500,
    );
  }
}
