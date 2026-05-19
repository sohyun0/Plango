import { createErrorResponse } from "@/lib/server/error";
import { setTokenCookies } from "@/lib/server/cookie";
import { NextRequest, NextResponse } from "next/server";

/**
 * 로그인 성공시 전달된 refreshToken을 쿠키로 저장하는 Route
 * @author sohyun
 */
export const POST = async (req: NextRequest) => {
  try {
    // 전달받은 refreshToken
    const { refreshToken, accessToken } = await req.json();

    if (!refreshToken) {
      // refreshToken이 정상적이지 않는 경우
      return createErrorResponse(
        "set-refresh router : refreshToken 없음",
        "로그인 과정에서 오류가 발생했습니다. 다시 로그인해주세요.",
        400,
      );
    }
    // 쿠키 설정 (accessToken도 httpOnly:true로 보안 강화)
    await setTokenCookies(accessToken, refreshToken);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return createErrorResponse(
      `쿠키 설정 중 오류가 발생했습니다 : ${error}`,
      "일시적인 오류가 발생했습니다. 다시 시도해주세요.",
      500,
    );
  }
};
