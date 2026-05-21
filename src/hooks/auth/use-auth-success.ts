"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useUIStore } from "@/store/auth.store";
import { useRouter, useSearchParams } from "next/navigation";
import useLogout from "./use-logout";
import { AuthSuccessPayload } from "@/types/auth";
import { authQueryKeys } from "@/queryKeys/Auth";
import getUser from "@/api/user/get-user";

/**
 * 로그인 / 회원가입 성공 이후 공통 처리 훅
 * @author sohyun
 */

const useAuthSuccess = () => {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect");

  const queryClient = useQueryClient();
  const setAuthError = useUIStore(state => state.setAuthError);
  const logout = useLogout();

  return async (authData: AuthSuccessPayload) => {
    const { user } = authData;

    try {
      // 로그인 응답의 user에는 memberships가 없기때문에 user 정보를 불러오기
      queryClient.setQueryData(authQueryKeys.user, user);
      await queryClient.fetchQuery({
        queryKey: authQueryKeys.user,
        queryFn: getUser,
        staleTime: 0,
      });

      // 쿼리 파라미터 이동
      router.replace(redirectTo ?? "/");
    } catch {
      await logout({ isRedirect: false });
      setAuthError("네트워크 오류가 발생했습니다");
    }
  };
};
export default useAuthSuccess;
