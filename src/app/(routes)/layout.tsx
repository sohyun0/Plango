"use client";
import { useUser } from "@/hooks/user/use-userQuery";
import { Header } from "@/components/layout";

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn } = useUser();

  return (
    <>
      <Header isLoginPage={false} user={user} isLogin={isLoggedIn} />
      {children}
    </>
  );
}
