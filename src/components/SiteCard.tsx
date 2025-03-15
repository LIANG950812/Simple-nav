'use client';

import React from 'react';
import Image from 'next/image';

/**
 * 网站数据类型定义
 * @property {number} id - 网站唯一标识符
 * @property {string} name - 网站名称
 * @property {string} url - 网站链接地址
 * @property {string} description - 网站描述信息
 * @property {string} icon - 网站图标路径或Emoji字符
 */
type SiteProps = {
  id: number;
  name: string;
  url: string;
  description: string;
  icon: string;
};

/**
 * 网站卡片组件
 * 用于展示单个网站的信息卡片，包含图标、名称和描述
 * 支持图片图标和文本图标两种模式
 * 
 * @param {Object} props - 组件属性
 * @param {SiteProps} props.site - 网站数据对象
 * @returns {JSX.Element} 网站卡片组件
 */
export default function SiteCard({ site }: { site: SiteProps }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow bg-white h-full"
    >
      <div className="flex gap-3 items-center h-full">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0"
          style={{ backgroundColor: '#f0f0f0' }}
        >
          {site.icon.startsWith('/') ? (
            <Image 
              src={site.icon} 
              alt={site.name} 
              width={24} 
              height={24} 
              loading="lazy" // 添加懒加载属性
            />
          ) : (
            site.icon
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="font-bold text-sm text-gray-900 truncate">{site.name}</h3>
          <div className="relative group">
            <p className="text-xs text-gray-500 truncate">{site.description}</p>
            {/* 悬停时显示完整描述的提示框 */}
            <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-xs rounded p-2 mt-1 max-w-xs whitespace-normal">
              {site.description}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}