import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/**
 * 로그아웃 처리 훅, 필요시 메인 페이지 리다이렉트
 * @author sohyun
 */

type LogoutOptions = {
  isRedirect?: boolean;
};

const postLogout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logoutMutation = useMutation<unknown, Error, LogoutOptions>({
    mutationFn: postLogout,
    onSettled: (_data, _error, options) => {
      const isRedirect = options?.isRedirect ?? true;

      queryClient.clear();

      if (isRedirect) {
        router.replace("/");
      }

      router.refresh();
    },
  });

  return (options: LogoutOptions = {}) => {
    return logoutMutation.mutateAsync(options);
  };
};
export default useLogout;
