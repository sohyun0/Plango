import axios, { AxiosInstance } from "axios";

/**
 * BFF로 요청을 전달하는 axios 인스턴스
 * 클라이언트 환경에서는 /api로 호출하고, 서버 환경에서는 백엔드 URL을 사용합니다.
 */
const isBrowser = typeof window !== "undefined";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: isBrowser ? "/api" : process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
