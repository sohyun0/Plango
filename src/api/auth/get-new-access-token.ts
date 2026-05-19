"use server";

import { devConsoleError } from "@/lib/error";
import { ServerFetchError } from "@/lib/server/error";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 백엔드에서 새로운 accessToken 재발급
 * @param refreshToken 리프레시 토큰
 * @returns 새로운 accessToken
 * @throws ServerFetchError 토큰 재발급 실패
 */
interface RefreshTokenResponse {
  accessToken: string;
  [key: string]: unknown;
}

const getNewAccessToken = async (refreshToken: string): Promise<string> => {
  if (!refreshToken) {
    throw new ServerFetchError("refreshToken이 없습니다", 401);
  }

  if (!BASE_URL) {
    throw new ServerFetchError("API URL이 설정되지 않았습니다", 500);
  }

  try {
    // 서버에서 백엔드로 refresh 요청
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new ServerFetchError(`토큰 재발급 실패: ${res.status}`, res.status);
    }

    const data = (await res.json()) as RefreshTokenResponse;
    const newAccessToken = data.accessToken;

    if (!newAccessToken || typeof newAccessToken !== "string") {
      throw new ServerFetchError("유효하지 않은 accessToken 응답", 500);
    }

    return newAccessToken;
  } catch (err) {
    if (err instanceof ServerFetchError) {
      throw err;
    }
    devConsoleError(err);
    throw new ServerFetchError("토큰 재발급 중 오류 발생", 500);
  }
};

export default getNewAccessToken;
