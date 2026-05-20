import type { Metadata } from "next";
import "../styles/fonts.css";
import "../styles/globals.css";
import "../styles/custom-react-datepicker.css";
import { AlertProvider } from "@/providers/alert-provider";
import AuthProvider from "@/providers/auth-provider";
import { ToastProvider } from "@/providers/toast-provider";

export const metadata: Metadata = {
  title: "Plango",
  description: "Plango",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <AlertProvider>
            <ToastProvider>{children}</ToastProvider>
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
