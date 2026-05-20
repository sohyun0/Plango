import { QueryClient } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined = undefined;

function newQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

export function getQueryClient() {
  if (typeof window === "undefined") {
    return newQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = newQueryClient();
    return browserQueryClient;
  }
}
