import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getArticleDetail from "@/api/article/get-article-detail";
import ArticleEditForm from "@/components/features/article/article-form/article-edit-form";
import { getQueryClient } from "@/lib/getQueryClient";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  const articleIdNum = Number(articleId);

  const queryClient = getQueryClient();
  const article = await getArticleDetail({ articleId: articleIdNum });
  queryClient.setQueryData(["getArticleDetail", articleIdNum], article);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticleEditForm articleId={articleIdNum} />
    </HydrationBoundary>
  );
}
