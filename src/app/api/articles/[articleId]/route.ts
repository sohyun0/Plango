import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server/server-fetch";
import { createErrorResponse } from "@/lib/server/error";
import { ArticleDetail } from "@/types/article";

export async function GET(_req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const { articleId } = params;
    const data = await serverFetch<ArticleDetail>(`/articles/${articleId}`);
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `GET /api/articles/${params.articleId} 오류: ${error}`,
      "게시글을 가져오는 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const { articleId } = params;
    const body = await req.json();
    const payload = {
      ...body,
      content: JSON.stringify(body.content),
    };

    const data = await serverFetch(`/articles/${articleId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `PATCH /api/articles/${params.articleId} 오류: ${error}`,
      "게시글 수정 중 오류가 발생했습니다.",
      500,
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const { articleId } = params;
    const data = await serverFetch(`/articles/${articleId}`, {
      method: "DELETE",
    });
    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(
      `DELETE /api/articles/${params.articleId} 오류: ${error}`,
      "게시글 삭제 중 오류가 발생했습니다.",
      500,
    );
  }
}
