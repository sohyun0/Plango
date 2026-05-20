import getUser from "@/api/user/get-user";
import patchUser from "@/api/user/patch-user";
import { devConsoleError } from "@/lib/error";
import { useToast } from "@/providers/toast-provider";
import { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import patchPassword from "@/api/user/patch-password";
import useLogout from "../auth/use-logout";
import deleteUser from "@/api/user/delete-user";
import { authQueryKeys } from "@/queryKeys/Auth";

export const useUserQuery = (options?: UseQueryOptions<User | null>) => {
  return useQuery<User | null>({
    queryKey: authQueryKeys.user,
    queryFn: getUser,
    staleTime: 1000 * 60 * 2,
    retry: false,
    ...options,
  });
};

export const useUser = () => {
  const { data: user, isPending, isError } = useUserQuery();
  return {
    user: user ?? null,
    isLoggedIn: !!user,
    isPending,
    isError,
  };
};

export const useUserUpdateQuery = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: patchUser,

    onMutate: async () => {
      const prevUser = queryClient.getQueryData<User | null>(authQueryKeys.user);
      return { prevUser };
    },

    onSuccess: () => {
      showToast("프로필이 변경되었습니다.", "success");
      queryClient.invalidateQueries({ queryKey: authQueryKeys.user });
    },

    onError: (error, _payload, context) => {
      devConsoleError(error);
      if (context?.prevUser) {
        queryClient.setQueryData(authQueryKeys.user, context.prevUser);
      }
      showToast("프로필 변경에 실패했습니다.\n 잠시 후 다시 시도해주세요", "error");
    },
  });
};

export const usePasswordChange = (onClose: () => void) => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: patchPassword,
    onSuccess: () => {
      showToast("비밀번호가 변경되었습니다.", "success");
      onClose();
    },
    onError: err => {
      devConsoleError(err);
      showToast("비밀번호 변경에 실패했습니다.\n 잠시 후 다시 시도해주세요", "error");
    },
  });
};

export const useUserDelete = () => {
  const { showToast } = useToast();
  const logout = useLogout();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      logout();
      showToast("회원 탈퇴가 완료되었습니다.", "success");
    },
    onError: err => {
      devConsoleError(err);
      showToast("회원 탈퇴에 실패했습니다.\n 잠시 후 다시 시도해주세요", "error");
    },
  });
};
