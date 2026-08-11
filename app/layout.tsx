import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/index";
import Footer from "@/components/footer";
import { THEME_STORAGE_KEY } from "@/constants/key";
import { ThemeProvider } from "@/components/theme/index";

export const metadata: Metadata = {
  metadataBase: new URL("https://domain.com"), // TODO: 실제 배포 도메인으로 교체
  title: {
    default: "h_log",
    template: "%s",
  },
  description: "개발 과정에서 배운 것들을 기록하는 블로그입니다.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "h_log",
    description: "개발 과정에서 배운 것들을 기록하는 블로그입니다.",
    url: "/",
    siteName: "h_log",
    images: ["/og-image.png"],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "h_log",
    description: "개발 과정에서 배운 것들을 기록하는 블로그입니다.",
    images: ["/og-image.png"],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('${THEME_STORAGE_KEY}') ?? 'dark';
                const isDark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.classList.toggle('dark', isDark);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col bg-blog-bg text-blog-fg font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1 w-full max-w-275 mx-auto px-8 py-10 pt-4 pb-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
