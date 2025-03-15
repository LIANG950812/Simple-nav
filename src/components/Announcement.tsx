'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type AnnouncementProps = {
  id: string;
  text: string;
};

type AnnouncementComponentProps = {
  announcements: AnnouncementProps[];
};

export default function Announcement({ announcements }: AnnouncementComponentProps) {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  
  // 在组件加载时检查localStorage中的公告关闭状态
  useEffect(() => {
    // 获取上次关闭的公告ID
    const lastClosedAnnouncementId = localStorage.getItem('lastClosedAnnouncementId');
    
    // 获取当前最新公告的ID（假设数组中的最后一个是最新的）
    const latestAnnouncementId = announcements[announcements.length - 1].id;
    
    // 如果有新公告或者从未关闭过公告，则显示公告栏
    if (!lastClosedAnnouncementId || lastClosedAnnouncementId !== latestAnnouncementId) {
      setShowAnnouncement(true);
    } else {
      setShowAnnouncement(false);
    }
  }, [announcements]);

  // 关闭公告栏
  const closeAnnouncement = () => {
    setShowAnnouncement(false);
    
    // 保存当前最新公告的ID到localStorage
    const latestAnnouncementId = announcements[announcements.length - 1].id;
    localStorage.setItem('lastClosedAnnouncementId', latestAnnouncementId);
  };

  // 自动切换公告
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) =>
        prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 每5秒切换一次

    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!showAnnouncement) return null;

  return (
    <div className="mb-4 bg-blue-50 rounded-lg p-3 flex items-center overflow-hidden">
      <div className="flex-shrink-0 mr-3 text-blue-500 animate-bounce">
        <Image src="/announcement.svg" alt="公告" width={24} height={24} />
      </div>
      <div className="overflow-hidden relative flex-1" style={{ height: '24px' }}>
        <div
          className="absolute w-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateY(-${currentAnnouncementIndex * 24}px)`
          }}
          suppressHydrationWarning
        >
          {announcements.map((announcement, index) => (
            <div key={index} className="py-0 h-6" style={{ height: '24px' }}>
              {announcement.text}
            </div>
          ))}
        </div>
      </div>
      {/* 关闭按钮 */}
      <button 
        onClick={closeAnnouncement}
        className="ml-2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="关闭公告"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}