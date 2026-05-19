import { clearTokenCookies } from "@/lib/server/cookie";
import { NextResponse } from "next/server";

/**
 * 로그아웃으로 쿠키 삭제
 * @author sohyun
 */
export const POST = async () => {
  await clearTokenCookies();
  return NextResponse.json({ success: true }, { status: 200 });
};
