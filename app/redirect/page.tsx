"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, AlertTriangle, ChevronRight, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { WebsiteIcon } from "@/components/website-icon"
import { useLanguage } from "@/contexts/language-context"
import websiteCategories, { type Website } from "@/config/websites"

export default function RedirectPage() {
  const { language, t } = useLanguage()
  const searchParams = useSearchParams()
  const url = searchParams.get("url") || ""
  const ref = searchParams.get("ref") || "direct"
  const [countdown, setCountdown] = useState(5)
  const [website, setWebsite] = useState<Website | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(true)

  // Extract domain from URL
  const getDomain = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname.replace(/^www\./, "")
    } catch (e) {
      return url
    }
  }

  const domain = getDomain(url)

  // Find website info
  useEffect(() => {
    for (const category of websiteCategories) {
      const foundWebsite = category.websites.find((site) => site.url === url || getDomain(site.url) === domain)
      if (foundWebsite) {
        setWebsite(foundWebsite)
        break
      }
    }
  }, [url, domain])

  // Handle countdown and redirect
  useEffect(() => {
    if (!isRedirecting) return

    if (countdown <= 0) {
      window.location.href = url
      return
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, url, isRedirecting])

  const handleCancel = () => {
    setIsRedirecting(false)
  }

  const handleRedirect = () => {
    window.location.href = url
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4 px-4 md:h-16 md:px-8">
          <Button variant="ghost" size="icon" asChild onClick={handleCancel}>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-lg font-bold md:text-xl">{t("redirect.title")}</h1>
        </div>
      </header>

      <main className="container flex-1 px-4 py-6 md:px-8">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                <CardTitle>{t("redirect.title")}</CardTitle>
              </div>
              <CardDescription>{t("redirect.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">{t("redirect.info")}</h3>
                <div className="rounded-lg border p-4">
                  <div className="mb-3 flex items-center">
                    <WebsiteIcon url={url} size="sm" className="mr-2" />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{t("redirect.name")}</span>
                        <span className="text-sm">{website?.name[language] || domain}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-start">
                      <span className="mr-1 font-medium">{t("redirect.domain")}</span>
                      <span className="break-all">{domain}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-1 font-medium">{t("redirect.fullUrl")}</span>
                      <span className="break-all">{url}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-1 text-sm font-medium">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  {t("redirect.warning")}
                </h3>
                <p className="text-sm text-muted-foreground">{t("redirect.warningText")}</p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                {isRedirecting ? (
                  <p className="text-center text-sm">
                    {t("redirect.countdown").replace("{seconds}", countdown.toString())}
                  </p>
                ) : (
                  <p className="text-center text-sm">{t("redirect.noRedirect")}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("redirect.back")}
                </Link>
              </Button>
              <div className="flex w-full gap-2 sm:w-auto">
                {isRedirecting && (
                  <Button variant="outline" className="w-full sm:w-auto" onClick={handleCancel}>
                    {t("redirect.cancel")}
                  </Button>
                )}
                <Button className="w-full sm:w-auto" onClick={handleRedirect}>
                  {isRedirecting ? t("redirect.continue") : t("redirect.visit")}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

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
    </div>
  )
}
