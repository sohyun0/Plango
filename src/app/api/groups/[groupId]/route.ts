import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function GET(_req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const { groupId } = params;
    const data = await serverFetch(`/groups/${groupId}`);
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `GET /api/groups/${params.groupId} 오류: ${error}`,
      "그룹 태스크 목록을 가져오는 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const { groupId } = params;
    const body = await req.json();
    const data = await serverFetch(`/groups/${groupId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `PATCH /api/groups/${params.groupId} 오류: ${error}`,
      "그룹 정보 수정 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const { groupId } = params;
    const data = await serverFetch(`/groups/${groupId}`, {
      method: "DELETE",
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `DELETE /api/groups/${params.groupId} 오류: ${error}`,
      "그룹 삭제 중 오류가 발생했습니다.",
      500,
    );
  }
}
