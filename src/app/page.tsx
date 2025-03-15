'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// 动态导入组件，实现代码分割
const Announcement = dynamic(() => import('@/components/Announcement'), {
  loading: () => <div className="mb-4 h-12 bg-gray-100 rounded-lg animate-pulse"></div>,
  ssr: false
});

const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), {
  ssr: false
});

const Carousel = dynamic(() => import('@/components/Carousel'), {
  loading: () => <div className="mb-10 h-[100px] bg-gray-200 rounded-lg animate-pulse"></div>,
  ssr: false
});

// 导入数据服务
import { 
  categories, 
  announcements, 
  hotSites, 
  categorySites,
  filterSitesByQuery,
  SiteProps
} from '@/data/siteData';
import { adImages } from '@/data/adData';

// 导入缓存服务
import { CacheService } from '@/utils/cacheService';

// 导入骨架屏组件
import SkeletonLoader from '@/components/SkeletonLoader';

// 动态导入SiteCard组件
const SiteCard = dynamic(() => import('@/components/SiteCard'), {
  loading: () => <SkeletonLoader type="search-card" />
});

export default function Home() {
  // 从layout.tsx获取搜索查询
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // 创建分类引用对象，用于滚动定位
  const categoryRefs = useRef<Record<number, HTMLElement>>({});
  
  // 从layout.tsx获取搜索查询
  useEffect(() => {
    const handleSearchChange = (e: CustomEvent) => {
      setSearchQuery(e.detail);
    };
    
    // 监听自定义事件以获取搜索查询
    window.addEventListener('searchQueryChange', handleSearchChange as EventListener);
    return () => window.removeEventListener('searchQueryChange', handleSearchChange as EventListener);
  }, []);

  // 滚动到指定分类的函数
  const scrollToCategory = (categoryId: number) => {
    if (categoryRefs.current[categoryId]) {
      const element = categoryRefs.current[categoryId];
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 获取所有网站的扁平数组
  const getAllSites = () => {
    // 尝试从缓存获取所有网站数据
    const cachedAllSites = CacheService.getCache<SiteProps[]>('allSites');
    if (cachedAllSites) return cachedAllSites;
    
    const allSites: SiteProps[] = [...hotSites];
    
    // 将分类网站添加到扁平数组中
    Object.values(categorySites).forEach(sites => {
      allSites.push(...sites);
    });
    
    // 去重（基于URL）
    const uniqueSites = allSites.filter((site, index, self) => 
      index === self.findIndex(s => s.url === site.url)
    );
    
    // 缓存结果，设置1小时过期
    CacheService.setCache('allSites', uniqueSites, { expireTime: 3600000 });
    
    return uniqueSites;
  };
  
  // 根据搜索查询过滤的网站
  const getFilteredSites = () => {
    if (!searchQuery.trim()) return [];
    
    // 构建缓存键，包含查询内容
    const cacheKey = `search_${searchQuery.trim().toLowerCase()}`;
    
    // 尝试从缓存获取搜索结果
    const cachedResults = CacheService.getCache<SiteProps[]>(cacheKey);
    if (cachedResults) return cachedResults;
    
    // 缓存未命中，执行搜索
    const results = filterSitesByQuery(getAllSites(), searchQuery);
    
    // 缓存搜索结果，设置10分钟过期
    CacheService.setCache(cacheKey, results, { expireTime: 600000 });
    
    return results;
  };
  
  // 使用缓存服务获取过滤后的网站
  const filteredSites = searchQuery ? getFilteredSites() : [];
  
  // 是否显示搜索结果
  const showSearchResults = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-white">
      <header>
        <div className="max-w-7xl mx-auto p-4 md:p-6" style={{ paddingBottom: '0px' }}>
          {/* 公告栏组件 */}
          <Suspense fallback={<div className="mb-4 h-12 bg-gray-100 rounded-lg animate-pulse"></div>}>
            <Announcement announcements={announcements} />
          </Suspense>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6" style={{ paddingTop: '10px' }}>
        {/* 搜索结果 */}
        {showSearchResults && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-gray-900">搜索结果</h2>
            {filteredSites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSites.map((site) => (
                  <Suspense 
                    key={`search-${site.url}`}
                    fallback={<SkeletonLoader type="search-card" />}
                  >
                    <SiteCard site={site} />
                  </Suspense>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                未找到与 "{searchQuery}" 相关的网站
              </div>
            )}
          </section>
        )}
        
        {/* 只有在没有搜索时显示常规内容 */}
        {!showSearchResults && (
          <div className="flex-1">
            {/* 热门推荐 */}
            <section className="mb-10">
              <h2 className="text-lg font-bold mb-4 text-gray-900">热门推荐</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {hotSites.map((site) => (
                  <Suspense 
                    key={site.id}
                    fallback={<SkeletonLoader type="card" />}
                  >
                    <SiteCard site={site} />
                  </Suspense>
                ))}
              </div>
            </section>
            
            {/* 广告区域 - 轮播广告 */}
            <section className="mb-10">
              <Suspense fallback={<div className="mb-10 h-[100px] bg-gray-200 rounded-lg animate-pulse"></div>}>
                <Carousel 
                  images={adImages} 
                  height="100px" 
                  autoPlay={true} 
                  interval={3000} 
                  className="w-full"
                />
              </Suspense>
            </section>
            
            {/* 分类导航 - 垂直平铺所有分类 */}
            <div className="flex flex-col md:flex-row">
              <div 
                style={{ 
                  paddingBlockStart: '0px', 
                  paddingBlockEnd: '8px' 
                }}               
                className="w-full md:w-48 md:mr-4 mb-4 md:mb-0 md:sticky md:top-24 md:self-start bg-white dark:bg-gray-800 py-2 z-10 transition-all duration-200">
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center h-8">分类导航</h2>
                <div className="flex flex-row md:flex-col gap-2 max-h-[400px] overflow-x-auto md:overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => scrollToCategory(category.id)}
                      className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center whitespace-nowrap md:whitespace-normal"
                    >
                      <span className="mr-2">{category.icon}</span>
                      <span>{category.shortName}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1">
                {/* 垂直平铺所有分类网站 - 使用IntersectionObserver实现懒加载 */}
                {categories.map((category) => (
                  <section 
                    key={category.id} 
                    className="mb-8"
                    ref={(el: HTMLElement | null) => {
                      if (el) categoryRefs.current[category.id] = el;
                    }}
                  >
                    <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center justify-start h-8">
                      {category.name}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {categorySites[category.id]?.map((site) => (
                        <Suspense 
                          key={site.id}
                          fallback={<SkeletonLoader type="search-card" />}
                        >
                          <SiteCard site={site} />
                        </Suspense>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 返回顶部按钮组件 */}
        <ScrollToTop />
      </div>

      {/* 网站收录统计 & 页面底部版权声明 */}
      <footer className="py-4 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center text-gray-500 text-sm">
        <p>本站共收录 <span className="font-bold text-gray-800">{Object.values(categorySites).reduce((total, sites) => total + sites.length, 0)}</span> 个优质网站 </p>
          <p suppressHydrationWarning>© 2025-{new Date().getFullYear()} - Simple-nav 简单导航 丨 版权所有</p>
        </div>
      </footer>
    </div>
  );
}
