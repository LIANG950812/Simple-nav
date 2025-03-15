'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from 'next/image';
import "./globals.css";

// 使用系统字体代替Google字体，避免网络连接问题
const geistSans = localFont({
  variable: "--font-geist-sans",
  src: [
    {
      path: "../../public/fonts/system-sans.woff2",
      weight: "400",
      style: "normal",
    }
  ],
  fallback: ["Arial", "Helvetica", "system-ui", "sans-serif"],
});

const geistMono = localFont({
  variable: "--font-geist-mono",
  src: [
    {
      path: "../../public/fonts/system-mono.woff2",
      weight: "400",
      style: "normal",
    }
  ],
  fallback: ["Consolas", "Monaco", "monospace"],
});

// 元数据需要导出为一个常量，因为'use client'后不能直接导出服务器组件特有的内容
const metadata = {
  title: "Simple-nav 简单导航",
  description: "实用的网站导航工具，创建于2025年",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 添加暗黑模式状态
  const [darkMode, setDarkMode] = useState(false);
  // 添加搜索状态
  const [searchQuery, setSearchQuery] = useState('');
  const [isMac, setIsMac] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 在客户端初始化时检查系统偏好
  useEffect(() => {
    // 检查系统偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);

    // 从localStorage读取用户设置
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
    
    // 检测操作系统类型
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  // 当暗黑模式状态改变时更新body类名和localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);
  
  // 添加键盘快捷键监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 检测 Ctrl+K 或 Command+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault(); // 阻止默认行为
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // 当搜索查询改变时，通过自定义事件通知page组件
  useEffect(() => {
    // 创建自定义事件并传递搜索查询
    const event = new CustomEvent('searchQueryChange', { detail: searchQuery });
    window.dispatchEvent(event);
  }, [searchQuery]);

  return (
    <html lang="zh-CN" className={darkMode ? 'dark' : ''}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 顶部栏 */}
        <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#1f1f2f' }}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center">
                <Image src="/nav.svg" alt="网站导航" width={40} height={40} className="text-white" />
              </div>
              
              {/* 搜索框 */}
              <div className="relative flex-1 max-w-lg">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
                  <Image src="/search.svg" alt="搜索" width={16} height={16} />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  id="search"
                  name="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索网站..."
                  className="w-full pl-9 pr-16 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                  <span className="text-xs text-gray-400 bg-gray-600 px-1.5 py-0.5 rounded">
                    {isMac ? '⌘K' : 'Ctrl+K'}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
              aria-label={darkMode ? '切换到亮色模式' : '切换到暗色模式'}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* 添加顶部间距，避免内容被固定顶部栏遮挡 */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}

// 在'use client'组件中不能导出generateMetadata
// 元数据已在metadata常量中定义
