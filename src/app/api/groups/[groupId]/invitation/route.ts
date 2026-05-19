import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function GET(_req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const { groupId } = params;
    const data = await serverFetch(`/groups/${groupId}/invitation`);
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `GET /api/groups/${params.groupId}/invitation 오류: ${error}`,
      "초대 토큰을 가져오는 중 오류가 발생했습니다.",
      500,
    );
  }
}
