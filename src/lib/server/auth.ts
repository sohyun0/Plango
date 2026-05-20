import type { AuthTokenPayload } from "@/types/auth";
import { NextResponse } from "next/server";
import { setTokenCookies } from "./cookie";

/**
 *
 * 백엔드가 반환한 accessToken, refreshToken은 서버에서 HttpOnly 쿠키로 저장하고,
 * 클라이언트 응답 본문에는 화면 상태 갱신에 필요한 user 정보만 내려줍니다.
 *
 * @param data 백엔드 로그인/회원가입 응답 토큰과 사용자 정보
 * @returns 토큰을 제외한 사용자 정보 응답
 */
export const createAuthResponse = async (data: AuthTokenPayload) => {
  await setTokenCookies(data.accessToken, data.refreshToken);

  const response = NextResponse.json({ user: data.user }, { status: 200 });
  return response;
};
