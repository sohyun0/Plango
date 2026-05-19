import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function GET(
  _req: NextRequest,
  { params }: { params: { groupId: string; userId: string } },
) {
  try {
    const { groupId, userId } = params;
    const data = await serverFetch(`/groups/${groupId}/member/${userId}`);
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `GET /api/groups/${params.groupId}/member/${params.userId} 오류: ${error}`,
      "멤버 정보를 가져오는 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { groupId: string; userId: string } },
) {
  try {
    const { groupId, userId } = params;
    const data = await serverFetch(`/groups/${groupId}/member/${userId}`, {
      method: "DELETE",
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `DELETE /api/groups/${params.groupId}/member/${params.userId} 오류: ${error}`,
      "멤버 삭제 중 오류가 발생했습니다.",
      500,
    );
  }
}
