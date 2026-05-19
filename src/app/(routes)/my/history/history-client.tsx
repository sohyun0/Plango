"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import HistoryList, { HistoryEmpty } from "@/components/features/my/history-list";
import { UserHistoryResponse } from "@/types/user";
import getHistory from "@/api/user/get-history";

export default function HistoryClient() {
  const { data: historyItems } = useSuspenseQuery<UserHistoryResponse>({
    queryKey: ["history"],
    queryFn: getHistory,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const historyDone = historyItems.tasksDone ?? [];

  if (historyDone.length === 0) {
    return <HistoryEmpty msg="아직 히스토리가 없습니다." />;
  }

  return <HistoryList tasksDone={historyDone} />;
}
