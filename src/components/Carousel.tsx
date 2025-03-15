'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * 轮播图组件属性类型定义
 * @property {Array} images - 轮播图片数组
 * @property {boolean} autoPlay - 是否自动播放
 * @property {number} interval - 自动播放间隔时间(毫秒)
 * @property {number|string} height - 轮播图高度
 * @property {string} className - 额外的CSS类名
 */
type CarouselProps = {
  images: {
    src: string;    // 图片路径
    alt: string;    // 图片替代文本
    link?: string;  // 可选的点击跳转链接
  }[];
  autoPlay?: boolean;
  interval?: number;
  height?: number | string;
  className?: string;
};

/**
 * 轮播图组件
 * 实现图片轮播功能，支持自动播放、手动切换、指示器等功能
 * 
 * @param {CarouselProps} props - 组件属性
 * @returns {JSX.Element|null} 轮播图组件或空(无图片时)
 */
export default function Carousel({
  images,
  autoPlay = true,
  interval = 5000,
  height = '100px',
  className = '',
}: CarouselProps) {
  // 当前显示的图片索引
  const [currentIndex, setCurrentIndex] = useState(0);
  // 鼠标悬停状态
  const [isHovering, setIsHovering] = useState(false);
  // 定时器引用
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * 重置自动播放计时器
   * 清除现有计时器并根据条件设置新计时器
   */
  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (autoPlay && !isHovering) {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
    }
  };

  /**
   * 切换到下一张图片
   */
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  /**
   * 切换到上一张图片
   */
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  /**
   * 直接跳转到指定图片
   * @param {number} index - 目标图片索引
   */
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 监听自动播放状态变化，重置计时器
  useEffect(() => {
    resetTimer();
    // 组件卸载时清除计时器
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, autoPlay, isHovering]);

  // 如果没有图片，返回空
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ height }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 轮播图片容器 */}
      <div className="h-full w-full relative">
        {images.map((image, index) => {
          // 图片内容组件
          const content = (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px" // 响应式图片尺寸
                priority={index === currentIndex || index === (currentIndex + 1) % images.length} // 预加载当前和下一张图片
                className="object-cover"
              />
            </div>
          );

          // 如果有链接则包装在a标签中
          return image.link ? (
            <a
              key={index}
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full w-full"
            >
              {content}
            </a>
          ) : (
            content
          );
        })}
      </div>

      {/* 左右箭头导航按钮 */}
      <button
        className="absolute left-[calc(3rem)] top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="上一张"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <button
        className="absolute right-[calc(3rem)] top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="下一张"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>

      {/* 底部指示器 */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => goToSlide(index)}
            aria-label={`转到第${index + 1}张图片`}
          />
        ))}
      </div>
    </div>
  );
}