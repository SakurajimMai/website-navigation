import { useMemo } from "react"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface WebsiteIconProps {
  url: string
  icon?: string
  className?: string
  size?: "sm" | "md" | "lg"
  showFallback?: boolean
}

export function WebsiteIcon({ url, icon, className, size = "md", showFallback = true }: WebsiteIconProps) {
  const domain = useMemo(() => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname.replace(/^www\./, "") // Remove 'www.' if present
    } catch (e) {
      return url
    }
  }, [url])

  const faviconUrl = useMemo(() => {
    if (icon) return icon
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  }, [domain, icon])

  const sizeClasses = {
    sm: "h-5 w-5 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-12 w-12 text-lg",
  }

  const FallbackIcon = () => (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary/10 text-primary",
        sizeClasses[size],
        className
      )}
    >
      {domain.charAt(0).toUpperCase()}
    </div>
  )

  // Use onError to handle failed image loads
  return showFallback ? (
    <div className="relative inline-block overflow-hidden">
      <img
        src={faviconUrl}
        alt={`${domain} favicon`}
        className={cn("rounded-sm object-contain", sizeClasses[size], className)}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          // Replace with fallback icon or default globe icon
          target.style.display = "none"
          const fallback = target.nextElementSibling
          if (fallback) {
            fallback.classList.remove("hidden")
          }
        }}
      />
      <div className="hidden">
        <Globe className={cn("text-muted-foreground", sizeClasses[size], className)} />
      </div>
    </div>
  ) : (
    <img
      src={faviconUrl}
      alt={`${domain} favicon`}
      className={cn("rounded-sm object-contain", sizeClasses[size], className)}
    />
  )
}
