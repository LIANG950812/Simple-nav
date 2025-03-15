# Simple-nav 简单导航项目说明文档

## 项目概述

这是一个基于 Next.js 构建的现代化网站导航工具，创建于2025年，旨在提供一个简洁、美观且功能丰富的网站导航平台。项目集成了暗黑模式切换、搜索功能、分类导航等特性，为用户提供便捷的网站资源访问体验。

## 功能特点

- **响应式设计**：适配各种设备屏幕尺寸，从移动设备到桌面显示器
- **暗黑模式**：支持亮色/暗色主题切换，并记住用户偏好
- **快捷搜索**：支持键盘快捷键(Ctrl+K/⌘+K)快速聚焦搜索框
- **分类导航**：网站资源按类别组织，包括科技、教育、设计、AI资源、开发工具等
- **公告系统**：支持轮播公告，并记住用户关闭状态
- **返回顶部**：长页面滚动时提供便捷的返回顶部按钮

## 技术栈

- **前端框架**：Next.js 15.2.1
- **UI库**：React 19.0.0
- **样式方案**：Tailwind CSS 4
- **开发语言**：TypeScript
- **字体**：Geist Sans/Mono
- **构建工具**：Turbopack

## 本地开发环境配置

### 前置要求

- Node.js 18.x 或更高版本
- npm 9.x 或 yarn 1.22.x 或更高版本

### 安装步骤

1. 克隆项目代码

```bash
git clone <repository address>
cd nav
```

2. 安装依赖

```bash
npm install
# or use yarn
yarn install
```

3. 启动开发服务器

```bash
npm run dev
# or use yarn
yarn dev
```

4. 在浏览器中访问 [http://localhost:3000](http://localhost:3000) 查看项目

## 项目结构

```
├── public/               # 静态资源目录
│   ├── icons/            # 网站图标资源
│   └── ...               # 其他静态资源
├── src/                  # 源代码目录
│   ├── app/              # Next.js App Router 目录
│   │   ├── layout.tsx    # 应用布局组件
│   │   ├── page.tsx      # 主页面组件
│   │   └── globals.css   # 全局样式
├── next.config.ts        # Next.js 配置文件
├── postcss.config.mjs    # PostCSS 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 项目依赖和脚本
```

## 自定义与扩展

### 添加新的网站分类

在 `src/app/page.tsx` 文件中找到 `categories` 数组，按照现有格式添加新的分类：

```typescript
const categories = [
  // 现有分类...
  { id: 7, name: '新分类名称', icon: '图标', shortName: '简称' },
];
```

### 添加新的网站

在 `src/app/page.tsx` 文件中找到 `categorySites` 对象，在对应分类ID下添加新网站：

```typescript
categorySites: {
  // 其他分类...
  7: [
    { id: 1, name: '网站名称', url: 'https://example.com', description: '网站描述', icon: '/icons/example.svg' },
    // 添加更多网站...
  ]
}
```

### 添加网站图标

1. 准备SVG格式的网站图标（推荐）
2. 将图标文件放入 `public/icons/` 目录
3. 在网站数据中引用图标路径 `/icons/图标文件名.svg`

## 构建与部署

### 生产环境构建

```bash
npm run build
# or use yarn
yarn build
```

构建完成后，生成的静态文件将位于 `.next` 目录中。

### 本地预览生产版本

```bash
npm run start
# or use yarn
yarn start
```

### 部署到 Vercel 平台

这个 Next.js 项目最适合部署到 Vercel 平台，部署步骤如下：

1. 创建 [Vercel 账户](https://vercel.com/signup)
2. 安装 Vercel CLI 或直接使用 Vercel 网页界面

   ```bash
   npm install -g vercel
   ```

3. 登录 Vercel

   ```bash
   vercel login
   ```

4. 在项目根目录下执行部署命令

   ```bash
   vercel
   ```

5. 按照提示完成部署配置

6. 部署完成后，Vercel 会提供一个可访问的 URL

### 自定义域名配置

1. 在 Vercel 控制台中找到已部署的项目
2. 进入 "Settings" > "Domains"
3. 添加您的自定义域名
4. 按照 Vercel 提供的说明配置 DNS 记录

## 性能优化建议

1. **图片优化**：使用 SVG 格式的图标，或通过 Next.js 的 Image 组件优化其他格式的图片
2. **代码分割**：利用 Next.js 的自动代码分割特性，减少初始加载时间
3. **静态生成**：尽可能使用静态生成（SSG）而非服务器端渲染（SSR）
4. **缓存策略**：配置适当的缓存头，提高重复访问性能

## 常见问题解决

### 开发环境启动失败

- 检查 Node.js 版本是否满足要求
- 确保所有依赖已正确安装
- 检查端口 3000 是否被其他应用占用

### 图标无法显示

- 确认图标文件已放置在正确的目录 (`public/icons/`)
- 检查图标路径引用是否正确
- 验证图标文件格式是否受支持

### 部署后样式丢失

- 确保构建过程正确完成
- 检查 CSS 导入语句
- 验证 Tailwind 配置是否正确

## 维护与更新

### 依赖更新

定期更新项目依赖以获取最新功能和安全修复：

```bash
npm update
# or use yarn
yarn upgrade
```

### 代码质量检查

运行 ESLint 检查代码质量：

```bash
npm run lint
# or use yarn
yarn lint
```

## 联系与支持

如有问题或建议，请通过以下方式联系项目维护者