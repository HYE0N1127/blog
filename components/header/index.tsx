import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { createClient } from "@/utils/supabase/server";
import { signInWithGithub } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import ProfileDropdown from "./dropdown/index";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const avatarUrl = user?.user_metadata?.avatar_url;
  const userName =
    user?.user_metadata?.full_name || user?.user_metadata?.user_name || "User";
  const userHandle = user?.user_metadata?.user_name
    ? `@${user.user_metadata.user_name}`
    : userName;
  const fallback = userName.substring(0, 2).toUpperCase();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blog-border bg-blog-bg/80 backdrop-blur supports-backdrop-filter:bg-blog-bg/60 transition-colors">
      <div className="mx-auto flex h-13 max-w-275 items-center justify-between px-8">
        {/* 로고 */}
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-blog-fg transition-colors hover:text-blog-fg-muted font-mono"
        >
          dev<span className="text-blog-fg-subtle">_</span>blog
        </Link>

        {/* Auth */}
        <div className="flex items-center gap-2">
          {user ? (
            <ProfileDropdown
              avatarUrl={avatarUrl}
              userHandle={userHandle}
              fallback={fallback}
              isAdmin={isAdmin}
            />
          ) : (
            <form action={signInWithGithub}>
              <Button
                size="sm"
                type="submit"
                variant="outline"
                className="h-8 gap-1.5 border-blog-border-muted bg-blog-bg text-blog-fg-muted text-[11px] tracking-wider font-semibold font-mono hover:bg-blog-bg-4 hover:text-blog-fg hover:border-blog-border-strong transition-colors"
              >
                <FaGithub className="h-3.5 w-3.5" />
                로그인
              </Button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
