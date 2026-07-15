import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PreferencesProvider } from "./components/Preferences";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PIXORA — сайти, застосунки, автоматизація",
  description:
    "PIXORA створює цифрові продукти для бізнесів і стартапів — від ідеї до запуску.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('pixora-theme');var l=localStorage.getItem('pixora-language');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;if(l==='uk'||l==='en'){document.documentElement.lang=l;document.documentElement.dataset.language=l}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}
