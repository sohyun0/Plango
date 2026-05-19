import type { ReactNode } from "react";
import { Container } from "@/components/layout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Container className="full-scroll-h flex flex-col pb-6">
      <h2 className="text-heading-m font-bold tablet:text-heading-s">마이 히스토리</h2>
      {children}
    </Container>
  );
}
