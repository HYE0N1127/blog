import ArticleCard from "@/components/article-card/index";
import { createClient } from "@/utils/supabase/server";

const FeedPage = async () => {
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, subtitle, thumbnail_url, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (!articles || articles.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-sm text-blog-fg-subtle font-mono">
          아직 작성된 글이 없어요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          id={article.id}
          title={article.title}
          subtitle={article.subtitle}
          thumbnailUrl={article.thumbnail_url}
          createdAt={article.created_at}
        />
      ))}
    </div>
  );
};

export default FeedPage;
