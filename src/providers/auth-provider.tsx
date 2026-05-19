"use client";

import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { User } from "@/types/user";

/**
 * 최초 렌더링 시 SSR 기반 로그인
 * @author sohyun
 */
type AuthProviderProps = {
  initialUser: User | null;
  children: ReactNode;
};
export default function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const { setUser, setInitialized } = useAuthStore(state => state.actions);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
      setInitialized(true);
      return;
    }

    const initializeUser = async () => {
      try {
        const response = await fetch("/api/user");

        if (!response.ok) return;

        const data = await response.json();
        if (data) {
          setUser(data);
        }
      } finally {
        setInitialized(true);
      }
    };

    initializeUser();
  }, [initialUser, setUser, setInitialized]);

  return <>{children}</>;
}
