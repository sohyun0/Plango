import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";
import { ArticleListResponse } from "@/types/article";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.toString() ? `/articles?${searchParams.toString()}` : "/articles";
    const data = await serverFetch<ArticleListResponse>(endpoint);
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `GET /api/articles 오류: ${error}`,
      "게시글 목록을 가져오는 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = {
      ...body,
      content: JSON.stringify(body.content),
    };

    const data = await serverFetch("/articles", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `POST /api/articles 오류: ${error}`,
      "게시글 작성 중 오류가 발생했습니다.",
      500,
    );
  }
}
