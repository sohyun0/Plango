"use client";

import { ReactNode } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui";

interface ErrorFallbackProps extends FallbackProps {
  prefix?: string;
  title?: string;
  description?: string;
}

interface QueryErrorBoundaryProps {
  prefix: string;
  title?: string;
  children: ReactNode;
  description?: string;
}

function ErrorFallback({
  resetErrorBoundary,
  prefix,
  title = "불러오지 못했습니다.",
  description = "잠시 후 다시 시도해주세요.",
}: ErrorFallbackProps) {
  return (
    <div className="mt-5 text-center text-sm text-gray-500 md:mt-6 md:text-base">
      <p>
        {prefix}
        {title}
      </p>
      <p>{description}</p>
      <Button className="w-30 mx-auto mt-4" onClick={resetErrorBoundary}>
        다시 시도
      </Button>
    </div>
  );
}

export default function QueryErrorBoundary({
  prefix,
  title,
  description,
  children,
}: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={props => (
            <ErrorFallback {...props} prefix={prefix} title={title} description={description} />
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
