import { cookies } from "next/headers";

/**
 * 서버사이드 쿠키 관리 유틸
 * @author sohyun
 * 모든 토큰 관련 쿠키 설정을 중앙에서 관리
 */

type CookieOptions = {
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "lax" | "strict" | "none";
  path?: string;
};

const DEFAULT_COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
} satisfies CookieOptions;

/**
 * 쿠키 저장 (기본값: httpOnly=true)
 */
export const setCookie = async (name: string, value: string, options: CookieOptions = {}) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value,
    ...DEFAULT_COOKIE_OPTIONS,
    ...options,
  });
};

/**
 * accessToken 저장 (httpOnly=true)
 */
export const setAccessTokenCookie = async (
  accessToken: string,
  maxAge: number = 60 * 60, // 기본 1시간
) => {
  await setCookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge,
  });
};

/**
 * refreshToken 저장 (httpOnly=true)
 */
export const setRefreshTokenCookie = async (
  refreshToken: string,
  maxAge: number = 60 * 60 * 24 * 7, // 기본 7일
) => {
  await setCookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge,
  });
};

/**
 * 토큰 쌍 저장
 */
export const setTokenCookies = async (
  accessToken: string,
  refreshToken: string,
  accessTokenMaxAge: number = 60 * 60,
  refreshTokenMaxAge: number = 60 * 60 * 24 * 7,
) => {
  await setAccessTokenCookie(accessToken, accessTokenMaxAge);
  await setRefreshTokenCookie(refreshToken, refreshTokenMaxAge);
};

/**
 * 쿠키 삭제
 */
export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value: "",
    maxAge: 0,
    path: "/",
  });
};

/**
 * 모든 토큰 쿠키 삭제 (로그아웃)
 */
export const clearTokenCookies = async () => {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
};

/**
 * 쿠키 값 읽기
 */
export const getCookie = async (name: string): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

/**
 * accessToken 읽기
 */
export const getAccessToken = async (): Promise<string | null> => {
  const token = await getCookie("accessToken");
  return token ?? null;
};

/**
 * refreshToken 읽기
 */
export const getRefreshToken = async (): Promise<string | null> => {
  const token = await getCookie("refreshToken");
  return token ?? null;
};
