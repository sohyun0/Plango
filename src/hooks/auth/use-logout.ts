import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
/**
 * 로그아웃 처리 훅, 필요시 메인 페이지 리다이렉트
 * @author sohyun
 */

const postLogout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return async ({ isRedirect = true } = {}) => {
    return useMutation({
      mutationFn: postLogout,
      onSettled: () => {
        queryClient.clear();
        router.refresh();

        if (isRedirect) {
          router.replace("/");
        }
      },
    });
  };
};
export default useLogout;
