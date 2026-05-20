import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getSSRUser from "@/api/user/get-ssr-user";
import { getQueryClient } from "@/lib/getQueryClient";
import { authQueryKeys } from "@/queryKeys/Auth";

export type AuthProviderProps = {
  children: ReactNode;
};

export default async function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = getQueryClient();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    await queryClient.prefetchQuery({ queryKey: authQueryKeys.user, queryFn: getSSRUser });
  }

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
