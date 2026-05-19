import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";

export async function GET(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const { articleId } = params;
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.toString()
      ? `/articles/${articleId}/comments?${searchParams.toString()}`
      : `/articles/${articleId}/comments`;

    const data = await serverFetch(endpoint);
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `GET /api/articles/${params.articleId}/comments 오류: ${error}`,
      "댓글을 가져오는 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const { articleId } = params;
    const body = await req.json();
    const data = await serverFetch(`/articles/${articleId}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `POST /api/articles/${params.articleId}/comments 오류: ${error}`,
      "댓글 작성 중 오류가 발생했습니다.",
      500,
    );
  }
}
