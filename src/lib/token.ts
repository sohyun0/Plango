/**
 * 토큰 관리(읽기, 재발급)
 * @author sohyun
 */

const isBrowser = typeof document !== "undefined";
// 쿠키에서 accessToken 가져오기

export const getAccessToken = (): string | null => {
  if (!isBrowser) return null;

  const cookies = document.cookie.split("; ");
  const match = cookies.find(c => c.startsWith("accessToken="));
  if (!match) return null;

  return decodeURIComponent(match.split("=")[1]);
};

// refreshToken을 이용해 accessToken 재발급
export const requestNewAccessToken = async (): Promise<string | null> => {
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return null;

    const { accessToken } = await res.json();
    return accessToken ?? null;
  } catch {
    return null;
  }
};
