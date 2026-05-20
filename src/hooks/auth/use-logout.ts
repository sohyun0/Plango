import { authQueryKeys } from "@/queryKeys/Auth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
/**
 * 로그아웃 처리 훅, 필요시 메인 페이지 리다이렉트
 * @author sohyun
 */

const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return async ({ isRedirect = true } = {}) => {
    await fetch("/api/auth/logout", { method: "POST" });

    queryClient.setQueryData(authQueryKeys.user, null);
    queryClient.removeQueries({ queryKey: authQueryKeys.user });

    if (isRedirect) router.replace("/");
  };
};
export default useLogout;
