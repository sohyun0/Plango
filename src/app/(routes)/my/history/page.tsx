import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import getSSRHistory from "@/api/user/get-ssr-history";
import HistoryListSkeleton from "@/components/skeleton-ui/history-list-skeleton";
import QueryErrorBoundary from "@/components/common/QueryErrorBoundary";
import HistoryClient from "./history-client";

export default async function MyHistoryPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["history"],
    queryFn: getSSRHistory,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary prefix="내 히스토리를 ">
        <Suspense fallback={<HistoryListSkeleton />}>
          <HistoryClient />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
