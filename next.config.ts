import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 优化开发体验配置
  reactStrictMode: true,
  
  // 图像优化配置
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  experimental: {
    // 移除了不支持的 turbo.enabled 配置
    // Next.js 13+ 默认启用了 Turbo
    optimizeCss: true,      // 优化CSS
    scrollRestoration: true, // 滚动恢复
    serverActions: {
      bodySizeLimit: '2mb',  // 设置服务器操作的请求体大小限制
      allowedOrigins: ['*']  // 允许的源域名
    },     // 启用服务器操作
  },
  
  // 添加错误处理和日志配置
  onDemandEntries: {
    // 开发服务器将保持页面在内存中的时间（毫秒）
    maxInactiveAge: 60 * 1000,
    // 同时保持在内存中的页面数
    pagesBufferLength: 5,
  },
  
  // 禁用.next/trace文件生成，解决权限问题
  generateEtags: true,
  poweredByHeader: false,
  
  // 压缩配置
  compress: true,
  
  // 开发服务器配置
  devIndicators: {
    position: 'bottom-right',
  },
  
  // 静态优化
  output: 'standalone',
};

export default nextConfig;
