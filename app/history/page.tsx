"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WebsiteIcon } from "@/components/website-icon"
import { useLanguage } from "@/contexts/language-context"
import { useHistory } from "@/hooks/use-history"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function HistoryPage() {
  const { language, t } = useLanguage()
  const { history, clearHistory, addHistoryItem } = useHistory()
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const handleVisit = (website: any) => {
    addHistoryItem(website)
    window.location.href = `/redirect?url=${encodeURIComponent(website.url)}&ref=${website.ref || "direct"}`
  }

  const handleClearHistory = () => {
    clearHistory()
    setIsAlertOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4 px-4 md:h-16 md:px-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-lg font-bold md:text-xl">{t("history.title")}</h1>
          <div className="flex-1" />
          {history.length > 0 && (
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Trash className="h-4 w-4" />
                  <span className="hidden md:inline">{t("history.clear")}</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("history.clear")}</AlertDialogTitle>
                  <AlertDialogDescription>{t("history.confirmClear")}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{language === "zh" ? "取消" : "Cancel"}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearHistory}>
                    {language === "zh" ? "确认" : "Confirm"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </header>

      <main className="container flex-1 px-4 py-6 md:px-8">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-8 text-center">
            <p className="text-muted-foreground">{t("history.empty")}</p>
            <Button asChild>
              <Link href="/">{language === "zh" ? "返回首页" : "Back to Home"}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {history.map((entry) => (
              <Card key={`${entry.url}-${entry.timestamp}`} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <WebsiteIcon url={entry.url} icon={entry.icon} />
                    <CardTitle className="text-base">{entry.name[language]}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <CardDescription className="line-clamp-2 min-h-[40px]">
                    {entry.description[language]}
                  </CardDescription>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {t("history.visitedOn")}{" "}
                    {format(new Date(entry.timestamp), language === "zh" ? "yyyy年MM月dd日 HH:mm" : "MMM dd, yyyy HH:mm")}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleVisit(entry)}
                  >
                    {t("card.visit")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
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
