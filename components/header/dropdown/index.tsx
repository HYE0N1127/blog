"use client";

import Link from "next/link";
import { signOut } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProfileDropdownProps = {
  avatarUrl?: string;
  userHandle: string;
  fallback: string;
  isAdmin: boolean;
};

const ProfileDropdown = ({
  avatarUrl,
  userHandle,
  fallback,
  isAdmin,
}: ProfileDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full ring-[0.5px] ring-blog-border hover:cursor-pointer focus-visible:outline-none transition-all">
          <Avatar className="h-9 w-9 after:hidden">
            <AvatarImage
              suppressHydrationWarning
              src={avatarUrl}
              alt={`${userHandle} 프로필`}
            />
            <AvatarFallback className="text-[10px] bg-blog-bg-3 text-blog-fg-muted">
              {fallback}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">프로필 메뉴</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-47 bg-blog-bg-2 border-blog-border font-mono text-xs"
      >
        <DropdownMenuLabel className="font-normal py-2">
          <p className="text-blog-fg font-semibold">{userHandle}</p>
        </DropdownMenuLabel>

        {isAdmin && (
          <>
            <DropdownMenuSeparator className="bg-blog-border" />
            <DropdownMenuItem asChild>
              <Link
                href="/write"
                className="cursor-pointer text-blog-fg-muted hover:text-blog-fg"
              >
                새 글 작성
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className="bg-blog-border" />

        <DropdownMenuItem
          className="text-destructive focus:text-destructive cursor-pointer"
          onClick={async () => await signOut()}
        >
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
