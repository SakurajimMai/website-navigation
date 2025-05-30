"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Globe, Search, Menu, X, History } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { WebsiteIcon } from "@/components/website-icon"
import { useLanguage } from "@/contexts/language-context"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import websiteCategories, { type Website } from "@/config/websites"
import { useHistory } from "@/hooks/use-history"

export default function HomePage() {
  const { language, setLanguage, t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Website[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setIsSearching(false)
      setSearchResults([])
      return
    }

    setIsSearching(true)
    const query = searchQuery.toLowerCase()
    const results: Website[] = []

    websiteCategories.forEach((category) => {
      category.websites.forEach((website) => {
        const nameMatch = website.name[language].toLowerCase().includes(query)
        const descMatch = website.description[language].toLowerCase().includes(query)
        const urlMatch = website.url.toLowerCase().includes(query)

        if (nameMatch || descMatch || urlMatch) {
          if (!results.some((site) => site.url === website.url)) {
            results.push(website)
          }
        }
      })
    })
    setSearchResults(results)
  }, [searchQuery, language])

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh")
  }

  useEffect(() => {
    document.title = t("nav.title") + " - " + (language === "zh" ? "您的在线资源中心" : "Your Online Resource Hub")
  }, [language, t])

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
    setSearchResults([])
  }

  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      {/* 头部 */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 md:h-16 md:px-8">
          {/* 移动端菜单按钮 */}
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-lg font-semibold">{t("nav.title")}</h2>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-auto p-4">
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          const mainContent = document.getElementById("main-content-area")
                          mainContent?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        {language === "zh" ? "首页" : "Home"}
                      </Button>
                      {websiteCategories.map((category) => (
                        <Button
                          key={category.id}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            const element = document.getElementById(`category-${category.id}`)
                            element?.scrollIntoView({ behavior: "smooth" })
                          }}
                        >
                          {category.name[language]}
                        </Button>
                      ))}
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href="/history">{language === "zh" ? "历史记录" : "History"}</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <Button variant="outline" className="w-full" onClick={toggleLanguage}>
                      <Globe className="mr-2 h-4 w-4" />
                      {t("nav.language")}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* 标题 */}
          <div className="flex flex-1 items-center justify-center md:flex-none">
            <Link href="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-primary"
              >
                <path d="M12.378 1.602a.75.75 0 00-.756 0L3.366 6.026A.75.75 0 003 6.695V18.75a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75V6.695a.75.75 0 00-.366-.669L12.378 1.602zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
              </svg>
              <h1 className="text-lg font-bold md:text-xl">{t("nav.title")}</h1>
            </Link>
          </div>

          {/* 桌面端搜索栏和历史记录 */}
          <div className="hidden flex-1 justify-center md:flex">
            <div className="flex items-center gap-2 w-full max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("nav.search")}
                  className="w-full rounded-full bg-muted pl-9 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button variant="outline" size="icon" asChild>
                <Link href="/history">
                  <History className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* 桌面端语言切换 */}
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="outline" size="sm" onClick={toggleLanguage}>
              <Globe className="mr-2 h-4 w-4" />
              {t("nav.language")}
            </Button>
          </div>

          {/* 移动端语言切换按钮 */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleLanguage} className="h-9 w-9">
              <Globe className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* 移动端搜索栏 */}
        <div className="border-t bg-background/50 px-4 py-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="mobile-search-form"
              type="search"
              placeholder={t("nav.search")}
              className="w-full rounded-full bg-muted pl-9 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* 搜索结果 */}
      {isSearching && (
        <div className="container px-4 py-6 md:px-8">
          <h2 className="mb-4 text-xl font-bold">{t("search.results")}</h2>
          {searchResults.length === 0 ? (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">{t("search.noResults")}</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {searchResults.map((website) => (
                <WebsiteCard key={website.url} website={website} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 主要内容区域 */}
      {!isSearching && (
        <main id="main-content-area" className="container flex-1 px-4 py-6 md:px-8">
          <div className="space-y-8">
            {websiteCategories.map((category) => (
              <section key={category.id} id={`category-${category.id}`} className="scroll-mt-20">
                <h2 className="mb-4 text-xl font-bold">{category.name[language]}</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {category.websites.map((website) => (
                    <WebsiteCard key={website.url} website={website} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      )}

      {/* 页脚 */}
      <footer className="border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-8">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path d="M12.378 1.602a.75.75 0 00-.756 0L3.366 6.026A.75.75 0 003 6.695V18.75a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75V6.695a.75.75 0 00-.366-.669L12.378 1.602zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
            </svg>
            <span className="text-sm font-medium">{t("nav.title")}</span>
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} {t("footer.rights")}</span>
          </div>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              {t("footer.about")}
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              {t("footer.contact")}
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              {t("footer.privacy")}
            </Link>
          </nav>
        </div>
      </footer>

      {/* 移动端底部导航 */}
      <MobileBottomNav />
    </div>
  )
}

function WebsiteCard({ website }: { website: Website }) {
  const { language, t } = useLanguage()
  const { addHistoryItem } = useHistory()

  const handleVisit = () => {
    addHistoryItem(website)
    // 重定向到中间页面
    window.location.href = `/redirect?url=${encodeURIComponent(website.url)}&ref=${website.ref || "direct"}`
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <WebsiteIcon url={website.url} icon={website.icon} />
          <CardTitle className="text-base">{website.name[language]}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <CardDescription className="line-clamp-2 min-h-[40px]">{website.description[language]}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={handleVisit}>
          {t("card.visit")}
        </Button>
      </CardFooter>
    </Card>
  )
}
