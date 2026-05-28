import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { signInWithGithub, signOut } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // GitHub에서 받아온 유저 메타데이터 추출
  const avatarUrl = user?.user_metadata?.avatar_url;
  const userName =
    user?.user_metadata?.full_name || user?.user_metadata?.user_name || "User";
  const fallbackText = userName.substring(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-[1260px] items-center justify-between px-4 sm:px-6">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <BookOpen className="h-5 w-5" />
          <span className="font-bold tracking-tight">DevBlog</span>
        </Link>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/profile"
                className="hidden sm:flex transition-opacity hover:opacity-80 rounded-full ring-2 ring-transparent hover:ring-border"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatarUrl} alt={`${userName}의 프로필`} />
                  <AvatarFallback className="text-xs bg-primary/10">
                    {fallbackText}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">프로필</span>
              </Link>

              <form action={signOut}>
                <Button
                  variant="outline"
                  size="sm"
                  type="submit"
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">로그아웃</span>
                </Button>
              </form>
            </>
          ) : (
            <form action={signInWithGithub}>
              <Button size="sm" type="submit" className="gap-2">
                <span className="hidden sm:inline">로그인</span>
              </Button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
