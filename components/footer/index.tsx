import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import ThemeSwitcher from "./switcher/index";

const Footer = () => {
  return (
    <footer className="border-t border-blog-border bg-blog-bg">
      <div className="mx-auto flex max-w-275 items-center justify-between px-8 py-5.5 flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[11px] text-blog-fg-subtle font-mono tracking-wide">
            © 2025 · HYE0N1127 · All rights reserved
          </span>

          <div className="flex items-center">
            <Link
              href="https://github.com/HYE0N1127"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-7 h-7 rounded-md text-blog-fg-subtle hover:text-blog-fg-muted"
            >
              <FaGithub className="h-3.5 w-3.5" />
            </Link>
            <span className="text-blog-fg-subtle text-[10px] select-none">
              |
            </span>
            <Link
              href="mailto:dev.hyeonbin@gmail.com"
              aria-label="Email"
              className="flex items-center justify-center w-7 h-7 rounded-md text-blog-fg-subtle hover:text-blog-fg-muted"
            >
              <Mail className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <ThemeSwitcher />
      </div>
    </footer>
  );
};

export default Footer;
