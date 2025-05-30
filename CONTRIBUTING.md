# 贡献指南

感谢您考虑为网站导航项目做出贡献！以下是一些指导方针，帮助您参与项目开发。

## 如何贡献

1. Fork 仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m '添加了一些很棒的功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个 Pull Request

## 开发规范

### 代码风格

本项目使用ESLint和Prettier来保持代码风格的一致性。在提交代码前，请确保：

```bash
npm run lint
```

命令不会报错。

### 提交消息规范

请遵循以下提交消息格式：

- `feat`: 添加新功能
- `fix`: 修复Bug
- `docs`: 仅修改文档
- `style`: 不影响代码运行的格式修改（空格，格式化，等）
- `refactor`: 代码重构，既不修复错误也不添加功能
- `perf`: 性能优化
- `test`: 添加测试或修正现有测试
- `chore`: 构建过程或辅助工具的变动

例如：`feat: 添加多语言切换按钮`

### 分支命名规范

- `feature/*`: 新功能
- `bugfix/*`: 修复Bug
- `docs/*`: 文档更新
- `refactor/*`: 代码重构
- `test/*`: 测试相关

## 功能添加指南

### 添加新类别的网站

1. 修改 `config/websites.ts` 文件，添加新的网站类别：

```typescript
{
  id: "your-category-id",
  name: { zh: "类别中文名", en: "Category Name in English" },
  websites: [
    // 添加网站...
  ]
}
```

### 添加新语言支持

1. 修改 `contexts/language-context.tsx` 文件，在translations对象中添加新的语言支持。
2. 更新Language类型定义。

## 问题报告

如果您发现了Bug或有改进建议，请创建一个Issue。请包含以下信息：

- 问题的详细描述
- 重现步骤
- 预期行为
- 截图（如适用）
- 您的环境信息（操作系统，浏览器等）

## 开发环境设置

请参考README.md中的安装指南设置开发环境。

## 许可证

通过贡献您的代码，您同意您的贡献将受到项目MIT许可证的约束。