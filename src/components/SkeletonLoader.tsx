'use client';

import React from 'react';

/**
 * 骨架屏加载器组件属性类型定义
 * @property {string} type - 骨架屏类型，可选值为'card'或'search-card'
 */
interface SkeletonLoaderProps {
  type?: 'card' | 'search-card';
}

/**
 * 骨架屏加载器组件
 * 用于在内容加载过程中显示占位UI，提升用户体验
 * 支持两种不同尺寸的卡片样式
 * 
 * @param {SkeletonLoaderProps} props - 组件属性
 * @param {string} [props.type='card'] - 骨架屏类型，默认为'card'
 * @returns {JSX.Element} 骨架屏组件
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'card' }) => {
  // 搜索结果卡片样式的骨架屏
  if (type === 'search-card') {
    return (
      <div className="block p-3 rounded-lg border border-gray-200 bg-white h-full animate-pulse">
        <div className="flex gap-3 items-center h-full">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // 默认卡片样式的骨架屏
  return (
    <div className="block p-3 rounded-lg border border-gray-200 bg-white h-full animate-pulse">
      <div className="flex gap-3 items-center h-full">
        <div className="w-14 h-14 rounded-full bg-gray-200"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;