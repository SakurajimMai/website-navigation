import type React from "react"
import "@/app/globals.css"
// Metadata is now dynamic, so we remove the static export here.
// It will be handled in app/page.tsx or through generateMetadata function if needed.

import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"

// export const metadata: Metadata = { // Removed static metadata
//   title: "网站导航 - 您的在线资源中心",
//   description: "发现并访问各类优质网站资源，包括社交媒体、购物、新闻、工具、学习和娱乐等多个分类。",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // The lang attribute will be set by LanguageProvider
    <html lang="zh" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
