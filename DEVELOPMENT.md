# 开发指南

这个文档提供了网站导航项目的详细开发指南，包括项目结构、关键组件和扩展功能的方法。

## 项目架构

该项目使用Next.js 15的App Router架构，主要文件和目录结构如下：

### 页面结构

- `app/page.tsx`: 首页，展示所有网站分类和内容
- `app/history/page.tsx`: 历史记录页面
- `app/redirect/page.tsx`: 网站跳转中间页

### 核心组件

- `components/website-icon.tsx`: 网站图标组件
- `components/mobile-bottom-nav.tsx`: 移动端底部导航栏
- `components/ui/`: Shadcn UI组件库

### 数据管理

- `config/websites.ts`: 网站数据配置
- `contexts/language-context.tsx`: 语言上下文，提供多语言支持
- `hooks/use-history.ts`: 历史记录钩子

## 开发工作流程

### 设置开发环境

1. 克隆仓库
2. 安装依赖: `npm install`
3. 启动开发服务器: `npm run dev`

### 添加新功能

1. 创建功能分支
2. 实现功能
3. 编写测试（如适用）
4. 确保代码通过lint检查
5. 提交Pull Request

## 主要功能实现

### 多语言支持

项目使用React Context实现多语言支持：

```tsx
// contexts/language-context.tsx
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh")

  // ...

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// 在组件中使用
const { language, setLanguage, t } = useLanguage()
```

要添加新的翻译文本，编辑`contexts/language-context.tsx`中的translations对象。

### 搜索功能

搜索功能在首页实现，使用React的useState和useEffect hooks：

```tsx
const [searchQuery, setSearchQuery] = useState("")
const [searchResults, setSearchResults] = useState<Website[]>([])

useEffect(() => {
  if (searchQuery.trim() === "") {
    setIsSearching(false)
    setSearchResults([])
    return
  }

  setIsSearching(true)
  const query = searchQuery.toLowerCase()
  const results: Website[] = []

  // 执行搜索逻辑...
  
  setSearchResults(results)
}, [searchQuery, language])
```

### 历史记录

历史记录功能使用localStorage存储用户访问过的网站：

```tsx
// hooks/use-history.ts
export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([])

  // 加载历史记录
  useEffect(() => {
    const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY)
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory))
    }
  }, [])

  // 添加历史记录项
  const addHistoryItem = useCallback(
    (item: Omit<HistoryEntry, "timestamp"> & { timestamp?: number }) => {
      // 实现逻辑...
    },
    [saveHistory],
  )

  // 清空历史记录
  const clearHistory = useCallback(() => {
    saveHistory([])
  }, [saveHistory])

  return { history, addHistoryItem, clearHistory }
}
```

## 扩展项目

### 添加新网站类别

在`config/websites.ts`中添加新的网站类别：

```typescript
const websiteCategories: WebsiteCategory[] = [
  // 现有类别...
  {
    id: "new-category",
    name: { zh: "新类别", en: "New Category" },
    websites: [
      {
        name: { zh: "网站名称", en: "Website Name" },
        url: "https://example.com",
        description: { 
          zh: "网站中文描述", 
          en: "Website description in English" 
        }
      },
      // 更多网站...
    ]
  }
]
```

### 添加新语言

1. 修改`contexts/language-context.tsx`中的Language类型：

```typescript
export type Language = "zh" | "en" | "ja" // 添加新语言
```

2. 在translations对象中添加新语言的翻译：

```typescript
const translations = {
  zh: { /* 中文翻译 */ },
  en: { /* 英文翻译 */ },
  ja: { /* 日语翻译 */ }
}
```

3. 更新语言切换功能。

### 添加新页面

1. 在`app`目录下创建新的目录和page.tsx文件
2. 实现页面组件
3. 添加导航链接

### UI定制

项目使用Tailwind CSS和Shadcn UI，可以通过以下方式定制UI：

1. 修改`tailwind.config.ts`配置主题颜色和样式
2. 更新`app/globals.css`添加全局样式
3. 定制Shadcn UI组件

## 性能优化

- 使用Next.js的Image组件优化图片加载
- 确保组件适当使用React.memo避免不必要的重渲染
- 使用Web Vitals监控性能指标