"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "zh" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  zh: {
    "nav.title": "网站导航",
    "nav.search": "搜索网站...",
    "nav.language": "English",
    "footer.rights": "保留所有权利",
    "footer.about": "关于我们",
    "footer.contact": "联系我们",
    "footer.privacy": "隐私政策",
    "card.visit": "访问网站",
    "redirect.title": "即将访问外部网站",
    "redirect.subtitle": "您即将离开网站导航，访问第三方网站",
    "redirect.info": "目标网站信息",
    "redirect.name": "网站名称：",
    "redirect.domain": "网站地址：",
    "redirect.fullUrl": "完整链接：",
    "redirect.warning": "安全提示",
    "redirect.warningText":
      "请确认您要访问的网站地址是否正确。我们不对外部网站的内容负责。请注意保护您的个人信息和账户安全。",
    "redirect.countdown": "将在 {seconds} 秒后自动跳转...",
    "redirect.back": "返回首页",
    "redirect.cancel": "取消跳转",
    "redirect.continue": "继续跳转",
    "redirect.visit": "立即访问",
    "redirect.noRedirect": '如果您的浏览器没有自动跳转，请点击"立即访问"按钮',
    "search.noResults": "未找到匹配的网站",
    "search.results": "搜索结果",
    "history.title": "浏览历史",
    "history.empty": "您的浏览历史为空。",
    "history.clear": "清空历史记录",
    "history.visitedOn": "访问于",
    "history.confirmClear": "确认清空所有历史记录吗？此操作无法撤销。",
  },
  en: {
    "nav.title": "Website Navigation",
    "nav.search": "Search websites...",
    "nav.language": "中文",
    "footer.rights": "All rights reserved",
    "footer.about": "About Us",
    "footer.contact": "Contact Us",
    "footer.privacy": "Privacy Policy",
    "card.visit": "Visit Website",
    "redirect.title": "Visiting External Website",
    "redirect.subtitle": "You are about to leave the navigation site and visit a third-party website",
    "redirect.info": "Target Website Information",
    "redirect.name": "Website Name: ",
    "redirect.domain": "Website Domain: ",
    "redirect.fullUrl": "Full URL: ",
    "redirect.warning": "Security Notice",
    "redirect.warningText":
      "Please confirm the website address you are visiting is correct. We are not responsible for the content of external websites. Please protect your personal information and account security.",
    "redirect.countdown": "Redirecting in {seconds} seconds...",
    "redirect.back": "Back to Home",
    "redirect.cancel": "Cancel Redirect",
    "redirect.continue": "Continue Redirect",
    "redirect.visit": "Visit Now",
    "redirect.noRedirect": "If your browser doesn't redirect automatically, please click the 'Visit Now' button",
    "search.noResults": "No matching websites found",
    "search.results": "Search Results",
    "history.title": "Browsing History",
    "history.empty": "Your browsing history is empty.",
    "history.clear": "Clear History",
    "history.visitedOn": "Visited on",
    "history.confirmClear": "Are you sure you want to clear all history? This action cannot be undone.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage && (savedLanguage === "zh" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
    }
    // Set HTML lang attribute
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    const langTranslations = translations[language]
    return langTranslations[key as keyof typeof langTranslations] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
