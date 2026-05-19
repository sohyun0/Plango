import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";
import { ArticleDetail } from "@/types/article";

export async function POST(_req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const { articleId } = params;
    const data = await serverFetch<ArticleDetail>(`/articles/${articleId}/like`, {
      method: "POST",
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `POST /api/articles/${params.articleId}/like 오류: ${error}`,
      "좋아요 처리 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const { articleId } = params;
    const data = await serverFetch<ArticleDetail>(`/articles/${articleId}/like`, {
      method: "DELETE",
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `DELETE /api/articles/${params.articleId}/like 오류: ${error}`,
      "좋아요 취소 중 오류가 발생했습니다.",
      500,
    );
  }
}
