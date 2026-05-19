"use server";
import { isNoAuthURL } from "@/lib/utils";
import { ServerFetchError } from "./error";
import { notFound } from "next/navigation";
import { getAccessToken, getRefreshToken, setAccessTokenCookie } from "./cookie";

/**
 * server fetch 헬퍼 함수
 * @author sohyun
 * @param endpoint  백엔드 api url
 * @param option fetch api 옵션
 */

type Token = string | null;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const serverFetch = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  if (!BASE_URL) {
    throw new Error("API URL이 설정되지 않았습니다.");
  }

  const refreshToken = await getRefreshToken();
  const accessToken = await getAccessToken();

  const method = (options.method || "GET").toLowerCase();
  const noAuth = isNoAuthURL(endpoint, method);

  // fetch headers 옵션이 있으면 반영
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // fetch header 조합
  const request = async (token: Token) => {
    // 인증이 필요한 요청 처리
    if (!noAuth && token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const originRes = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    return originRes;
  };

  const initialToken = noAuth ? null : accessToken;
  const res = await request(initialToken);

  // 요청 성공
  if (res.ok) return res.json() as T;

  // accessToken 만료인데 refreshToken도 없음
  if (res.status === 401 && !refreshToken)
    throw new ServerFetchError("로그인이 필요합니다", res.status);

  // accessToken만 만료시 재발급
  if (res.status === 401 && refreshToken) {
    try {
      // 동적 import로 순환 참조 방지
      const { default: getNewAccessTokenFn } = await import("@/api/auth/get-new-access-token");
      const newAccessToken = await getNewAccessTokenFn(refreshToken);

      // 새 accessToken을 쿠키에 저장
      await setAccessTokenCookie(newAccessToken);

      // 재발급된 accessToken으로 기존 요청 재시도
      const retry = await request(newAccessToken);
      if (!retry.ok) {
        throw new ServerFetchError("요청 실패", retry.status);
      }

      // 토큰 재발급 성공 및 반환
      return retry.json();
    } catch (err) {
      if (err instanceof ServerFetchError) throw err;
      throw new ServerFetchError("refresh 토큰 재발급 실패", 401);
    }
  }

  if (!res.ok) {
    notFound();
  }

  throw new ServerFetchError("요청 실패", res.status);
};
