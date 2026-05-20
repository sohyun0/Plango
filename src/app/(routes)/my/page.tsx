"use client";

import {
  ProfileEmpty,
  ProfileUpdateFormField,
  UserDelete,
  UserPasswordChangeModal,
} from "@/components/features/my";
import { Container } from "@/components/layout";
import ProfileSkeleton from "@/components/skeleton-ui/profile-skeleton";
import { Button, Form } from "@/components/ui";
import { useToggle } from "@/hooks";
import { useUser, useUserUpdateQuery } from "@/hooks/user/use-userQuery";
import { nicknameErrorHandler } from "@/lib/error";
import { changeProfileSchema, ChangeProfileSchema } from "@/lib/schema";
import { useToast } from "@/providers/toast-provider";
import { zodResolver } from "@hookform/resolvers/zod";

export default function My() {
  const { user, isPending: isUserPending, isError } = useUser();
  const { mutate, isPending: isUpdatePending } = useUserUpdateQuery();
  const { isOpen, setOpen, setClose } = useToggle();
  const { showToast } = useToast();

  const handleSubmit = async (data: ChangeProfileSchema) => {
    const payload: ChangeProfileSchema = {};

    if (data.nickname !== user?.nickname) {
      payload.nickname = data.nickname;
    }
    if (data.image !== undefined && data.image !== user?.image) {
      payload.image = data.image;
    }
    if (Object.keys(payload).length === 0) {
      return showToast("변경된 내용이 없습니다.", "error");
    }
    console.log(payload);

    mutate(payload);
  };

  if (isUserPending) return <ProfileSkeleton />;

  if (isError) {
    return (
      <ProfileEmpty msg="계정 정보를 불러오지 못했습니다.">
        <Button className="mt-4" size="md" onClick={() => window.location.reload()}>
          다시 시도
        </Button>
      </ProfileEmpty>
    );
  }
  return (
    <Container as={"main"} className="max-w-[792px] pb-4">
      <section className="flex flex-col gap-6">
        <h2 className="text-heading-m tablet:text-heading-s">계정 설정</h2>
        <Form<ChangeProfileSchema>
          id="profileForm"
          onSubmit={handleSubmit}
          onServerError={nicknameErrorHandler}
          resolver={zodResolver(changeProfileSchema)}
          mode="onChange"
          reValidateMode="onChange"
          defaultValues={{
            nickname: user?.nickname,
            image: user?.image ?? undefined,
          }}
        >
          <ProfileUpdateFormField
            email={user?.email ?? "이메일은 변경할 수 없습니다"}
            onModalOpen={setOpen}
          />
        </Form>
        <div className="flex items-center justify-between gap-4">
          <UserDelete email={user?.email} />
          <Button
            form="profileForm"
            type="submit"
            className="ml-auto w-1/4 self-end"
            disabled={isUpdatePending}
          >
            프로필 변경
          </Button>
        </div>
      </section>
      {isOpen && <UserPasswordChangeModal isOpen onClose={setClose} />}
    </Container>
  );
}
