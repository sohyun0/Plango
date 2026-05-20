"use client";

import { userMemberPermission } from "@/hooks/taskList/use-tasklist";
import { useAlert } from "@/providers/alert-provider";
import { useUser } from "@/hooks/user/use-userQuery";
import { Member } from "@/types/tasklist";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type TaskListProviderType = {
  isTeam: boolean;
  isLoading: boolean;
  memberInfo: Member | null;
  refresh: () => Promise<void>;
  permissionCheck: () => Promise<boolean>;
  currentISOStrDate: string;
  setCurrentISOStrDate: (date: string) => void;
  dateString: string;
};

const TaskListProviderContext = createContext<TaskListProviderType | undefined>(undefined);

export default function TaskListProvider({
  groupId,
  date,
  children,
}: {
  groupId: number;
  date: string;
  children: React.ReactNode;
}) {
  const { user, isPending: isUserLoading, isError } = useUser();
  const [memberInfo, setMemberInfo] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentISOStrDate, setCurrentISOStrDate] = useState(date);

  const { showAlert } = useAlert();

  const dateString = useMemo(() => {
    return currentISOStrDate.split("T")[0];
  }, [currentISOStrDate]);

  const permissionCheck = async () => {
    try {
      await refresh();

      if (isTeam) {
        return true;
      } else {
        await showAlert("팀 권한이 없습니다.");
        return false;
      }
    } catch (error) {
      console.error("권한 체크 중 에러 발생:", error);
      await showAlert("팀 권한 확인 중 오류가 발생했습니다.");
      return false;
    }
  };

  const {
    data,
    refetch,
    isLoading: queryLoading,
  } = userMemberPermission({
    groupId,
    userId: user?.id,
  });

  useEffect(() => {
    if (isUserLoading || isError) return;

    setIsLoading(queryLoading);
    setMemberInfo(data ?? null);
  }, [isUserLoading, isError, queryLoading, data]);

  const refresh = async () => {
    setIsLoading(true);
    const result = await refetch();
    setMemberInfo(result.data ?? null);
    setIsLoading(false);
  };

  if (isUserLoading || isError || !user) return null;

  const isTeam = !!memberInfo;

  return (
    <TaskListProviderContext.Provider
      value={{
        isTeam,
        isLoading,
        memberInfo,
        refresh,
        permissionCheck,
        currentISOStrDate,
        setCurrentISOStrDate,
        dateString,
      }}
    >
      {children}
    </TaskListProviderContext.Provider>
  );
}

export function useTaskListContext() {
  const context = useContext(TaskListProviderContext);
  if (!context) {
    throw new Error("team permission context error");
  }
  return context;
}
