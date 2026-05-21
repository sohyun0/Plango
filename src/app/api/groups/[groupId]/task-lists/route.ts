import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function POST(req: NextRequest, { params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;

  try {
    const body = await req.json();
    const data = await serverFetch(`/groups/${groupId}/task-lists`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `POST /api/groups/${groupId}/task-lists 오류: ${error}`,
      "태스크 생성 중 오류가 발생했습니다.",
      500,
    );
  }
}
