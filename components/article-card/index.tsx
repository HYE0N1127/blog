import Link from "next/link";
import Image from "next/image";
import { DEFAULT_THUMBNAIL_URL } from "@/constants/thumbnail";

type Props = {
  id: string;
  title: string;
  subtitle: string | null;
  thumbnailUrl: string | null;
  createdAt: string;
};

const ArticleCard = ({
  id,
  title,
  subtitle,
  thumbnailUrl,
  createdAt,
}: Props) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/article/${id}`}
      className="group flex flex-col rounded-lg overflow-hidden border border-blog-border bg-blog-bg-2 hover:border-blog-border-muted hover:-translate-y-0.5 transition-all"
    >
      {/* 썸네일 */}
      <div className="relative w-full aspect-video bg-blog-bg-3 border-b border-blog-border overflow-hidden">
        <Image
          src={thumbnailUrl ?? DEFAULT_THUMBNAIL_URL}
          alt={title}
          fill
          unoptimized={thumbnailUrl == null}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-1.5 p-4">
        <h2 className="text-[13px] font-bold text-blog-fg font-mono leading-snug line-clamp-2">
          {title}
        </h2>

        {subtitle && (
          <p className="text-[11px] text-blog-fg-muted font-mono leading-relaxed line-clamp-2 font-light">
            {subtitle}
          </p>
        )}

        <time
          dateTime={createdAt}
          className="mt-1 text-[10px] text-blog-fg-subtle font-mono tracking-wide"
        >
          {formattedDate}
        </time>
      </div>
    </Link>
  );
};

export default ArticleCard;
