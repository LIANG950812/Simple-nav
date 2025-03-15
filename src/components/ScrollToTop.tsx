'use client';

import React, { useState, useEffect } from 'react';

/**
 * 返回顶部组件
 * 当页面滚动超过一定距离时显示返回顶部按钮
 * 点击按钮可平滑滚动回页面顶部
 * 
 * @returns {JSX.Element|null} 返回顶部按钮组件或null(不显示时)
 */
export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // 监听滚动事件，控制返回顶部按钮的显示
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 滚动到页面顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!showScrollTop) return null;
  
  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-15 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white hover:opacity-90 transition-colors"
      style={{ backgroundColor: '#1f1f2f' }}
      aria-label="返回顶部"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}