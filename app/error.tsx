"use client";

import { useEffect } from "react";

const Error = ({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-24 text-center">
      <p className="text-sm text-blog-fg-subtle font-mono mb-4">
        문제가 발생했어요.
      </p>
      <button
        onClick={() => retry()}
        className="px-4 py-2 border border-blog-border-muted bg-blog-bg text-blog-fg-muted text-xs font-semibold font-mono rounded-md hover:bg-blog-bg-3 hover:text-blog-fg transition-colors cursor-pointer"
      >
        다시 시도
      </button>
    </div>
  );
};

export default Error;
