// 广告数据服务，用于存储轮播广告的图片数据

export type AdImageProps = {
  id: number;
  src: string;
  alt: string;
  link?: string;
};

// 广告轮播图数据
export const adImages: AdImageProps[] = [
  {
    id: 1,
    src: '/ads/ad1.jpg', // 广告图片路径，实际使用时需替换为真实图片
    alt: '广告图片1',
    link: 'https://example.com/ad1' // 广告链接
  },
  {
    id: 2,
    src: '/ads/ad2.jpg',
    alt: '广告图片2',
    link: 'https://example.com/ad2'
  },
  {
    id: 3,
    src: '/ads/ad3.jpg',
    alt: '广告图片3',
    link: 'https://example.com/ad3'
  }
];