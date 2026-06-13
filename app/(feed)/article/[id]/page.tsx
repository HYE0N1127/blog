import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import type { EditorState } from "@hyeon1127/text-editor-kit";
import ArticleViewer from "@/components/viewer/index";

type Props = {
  params: Promise<{ id: string }>;
};

const ArticlePage = async ({ params }: Props) => {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  const { data: article } = await supabase
    .from("articles")
    .select("id, title, subtitle, content, created_at")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (article == null) {
    notFound();
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <article className="max-w-190 mx-auto py-12 px-8">
      <header className="mb-10 pb-8 border-b border-blog-border">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-blog-fg font-mono leading-tight tracking-tight">
            {article.title}
          </h1>

          {isAdmin && (
            <Link
              href={`/editor/${article.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-blog-border-muted bg-blog-bg text-blog-fg-muted text-xs font-semibold font-mono rounded-md hover:bg-blog-bg-3 hover:text-blog-fg transition-colors shrink-0"
            >
              <Pencil className="h-3.5 w-3.5" />
              수정
            </Link>
          )}
        </div>

        {article.subtitle && (
          <p className="text-sm text-blog-fg-muted font-mono mb-3">
            {article.subtitle}
          </p>
        )}

        <time
          dateTime={article.created_at}
          className="text-[12px] text-blog-fg-subtle font-mono tracking-wide"
        >
          {formattedDate}
        </time>
      </header>

      <div className="text-blog-fg leading-relaxed">
        <ArticleViewer data={article.content as EditorState} />
      </div>
    </article>
  );
};

export default ArticlePage;
