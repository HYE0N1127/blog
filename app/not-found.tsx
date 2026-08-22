import Link from "next/link";

const NotFound = () => {
  return (
    <div className="py-24 text-center">
      <p className="text-sm text-blog-fg-subtle font-mono mb-4">
        404 · 페이지를 찾을 수 없어요.
      </p>
      <Link
        href="/"
        className="inline-block px-4 py-2 border border-blog-border-muted bg-blog-bg text-blog-fg-muted text-xs font-semibold font-mono rounded-md hover:bg-blog-bg-3 hover:text-blog-fg transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
