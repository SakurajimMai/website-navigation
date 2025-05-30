# 网站导航项目 (Website Navigation)

一个使用Next.js和React构建的多语言网站导航项目，提供分类展示、搜索、历史记录和语言切换功能。

![网站导航项目截图](https://via.placeholder.com/800x400?text=网站导航项目截图)

## 功能特点

- 📱 响应式设计，支持移动端和桌面端
- 🔍 实时搜索功能
- 📂 按类别分组展示网站
- 🌐 中英文双语支持
- 📜 浏览历史记录
- 🔄 网站跳转中间页，提供安全提示
- 🎨 现代化UI设计，使用Tailwind CSS和Shadcn UI组件

## 技术栈

- **前端框架**：[Next.js](https://nextjs.org/) 15.2.4
- **UI框架**：[React](https://reactjs.org/) 18.3.1
- **样式解决方案**：[Tailwind CSS](https://tailwindcss.com/) 3.4.17
- **UI组件库**：[Shadcn UI](https://ui.shadcn.com/) (基于Radix UI)
- **图标**：[Lucide React](https://lucide.dev/) 0.454.0
- **主题切换**：[next-themes](https://github.com/pacocoursey/next-themes) 0.4.4
- **表单处理**：[React Hook Form](https://react-hook-form.com/) 7.54.1
- **类型检查**：[TypeScript](https://www.typescriptlang.org/)

## 项目结构

```
navigation-website/
├── app/                  # Next.js应用页面
│   ├── history/          # 历史记录页面
│   ├── redirect/         # 重定向中间页
│   ├── globals.css       # 全局样式
│   ├── layout.tsx        # 布局组件
│   └── page.tsx          # 首页
├── components/           # React组件
│   └── ui/               # UI组件库
├── config/               # 配置文件
│   └── websites.ts       # 网站数据配置
├── contexts/             # React上下文
│   └── language-context.tsx # 语言上下文
├── hooks/                # 自定义钩子
│   └── use-history.ts    # 历史记录钩子
├── lib/                  # 工具函数库
├── public/               # 静态资源
└── styles/               # 样式文件
```

## 安装指南

### 前提条件

- Node.js 18.x 或更高版本
- npm 或 pnpm 或 yarn

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/SakurajimMai/website-navigation.git
cd website-navigation
```

2. 安装依赖

```bash
# 使用npm
npm install

# 或使用pnpm
pnpm install

# 或使用yarn
yarn
```

3. 运行开发服务器

```bash
# 使用npm
npm run dev

# 或使用pnpm
pnpm dev

# 或使用yarn
yarn dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 构建生产版本

```bash
# 使用npm
npm run build
npm start

# 或使用pnpm
pnpm build
pnpm start

# 或使用yarn
yarn build
yarn start
```

## 自定义网站数据

修改 `config/websites.ts` 文件来添加、删除或修改导航网站。网站按类别分组，每个网站需要提供中英文名称和描述。

```typescript
// 示例：添加新网站
{
  name: { zh: "网站名称", en: "Website Name" },
  url: "https://example.com",
  description: { 
    zh: "网站中文描述", 
    en: "Website description in English" 
  }
}
```

## 功能说明

### 多语言支持

项目支持中文和英文两种语言，使用 `contexts/language-context.tsx` 中的 `useLanguage` 钩子可以在组件中获取当前语言和翻译函数：

```typescript
const { language, setLanguage, t } = useLanguage();
```

### 历史记录

项目使用 `localStorage` 存储用户浏览历史，通过 `hooks/use-history.ts` 中的 `useHistory` 钩子进行管理：

```typescript
const { history, addHistoryItem, clearHistory } = useHistory();
```

### 网站搜索

首页实现了实时搜索功能，可以根据网站名称、描述或URL进行搜索。

## 贡献指南

欢迎提交问题和改进建议！请随时提交Pull Request或创建Issue。

## 许可证

本项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件。