"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Compass, History, Search } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function MobileBottomNav() {
  const { language } = useLanguage()
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [pathname, setPathname] = useState("/")

  useEffect(() => {
    setPathname(window.location.pathname)

    const handleSearch = () => {
      const searchForm = document.getElementById("mobile-search-form") as HTMLFormElement | null
      if (searchForm) {
        searchForm.classList.toggle("hidden")
        const isHidden = searchForm.classList.contains("hidden")
        setIsSearchActive(!isHidden)
        if (!isHidden) {
          const searchInput = searchForm.querySelector("input")
          searchInput?.focus()
        }
      }
    }

    const searchButton = document.getElementById("mobile-search-button")
    searchButton?.addEventListener("click", handleSearch)

    return () => {
      searchButton?.removeEventListener("click", handleSearch)
    }
  }, [])

  return (
    <div className="fixed bottom-0 left-0 z-40 flex h-16 w-full items-center justify-around border-t bg-background px-4 py-2 md:hidden">
      <Link href="/" className={`flex flex-col items-center ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}>
        <Compass className="h-6 w-6" />
        <span className="mt-1 text-xs">{language === "zh" ? "首页" : "Home"}</span>
      </Link>
      <button id="mobile-search-button" className="flex flex-col items-center text-muted-foreground">
        <Search className={`h-6 w-6 ${isSearchActive ? "text-primary" : ""}`} />
        <span className="mt-1 text-xs">{language === "zh" ? "搜索" : "Search"}</span>
      </button>
      <Link href="/history" className={`flex flex-col items-center ${pathname === "/history" ? "text-primary" : "text-muted-foreground"}`}>
        <History className="h-6 w-6" />
        <span className="mt-1 text-xs">{language === "zh" ? "历史" : "History"}</span>
      </Link>
    </div>
  )
}
