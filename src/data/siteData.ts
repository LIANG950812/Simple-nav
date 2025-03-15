// 网站数据服务，将数据与UI分离，便于实现缓存策略

export type SiteProps = {
  id: number;
  name: string;
  url: string;
  description: string;
  icon: string;
};

export type CategoryProps = {
  id: number;
  name: string;
  icon: string;
  shortName: string;
};

export type AnnouncementProps = {
  id: string;
  text: string;
};

// 分类数据
export const categories: CategoryProps[] = [
  { id: 1, name: '科技', icon: '🔧', shortName: '科技' },
  { id: 2, name: '教育', icon: '📚', shortName: '教育' },
  { id: 3, name: '设计', icon: '🎨', shortName: '设计' },
  { id: 4, name: 'AI资源', icon: '🤖', shortName: 'AI资源' },
  { id: 5, name: '开发工具', icon: '💻', shortName: '开发工具' },
  { id: 6, name: '实用工具', icon: '💻', shortName: '实用工具' },
];

// 公告数据
export const announcements: AnnouncementProps[] = [
  { id: 'ann1', text: '欢迎访问导航站点！这里收集了最实用的开发资源和工具' },
  { id: 'ann2', text: '新增AI资源导航专区，持续更新中...' },
  { id: 'ann3', text: '这是一个导航网站，欢迎大家收藏！' },
  { id: 'ann4', text: '这是新增加的一个公告，欢迎大家阅读提出意见！' },
];

// 热门网站数据
export const hotSites: SiteProps[] = [
  { id: 1, name: 'GitHub', url: 'https://github.com', description: '全球最大的代码托管平台，你的编程协同平台', icon: '/icons/Github.svg' },
  { id: 2, name: 'Stack Overflow', url: 'https://stackoverflow.com', description: '程序员问答社区', icon: '/icons/deepseek.svg' },
  { id: 3, name: 'Dribbble', url: 'https://dribbble.com', description: '设计师作品展示平台', icon: '/icons/deepseek.svg' },
  { id: 4, name: 'Google', url: 'https://www.google.com', description: '全球最大的搜索引擎', icon: '/icons/google.svg' },
  { id: 5, name: 'YouTube', url: 'https://www.youtube.com', description: '全球最大的视频分享平台', icon: '/icons/youtube.svg' },
  { id: 6, name: 'ChatGPT', url: 'https://chat.openai.com', description: 'OpenAI开发的AI对话平台', icon: '/icons/openai.svg' },
  { id: 7, name: 'MDN', url: 'https://developer.mozilla.org', description: 'Web开发技术文档', icon: '/icons/deepseek.svg' },
  { id: 8, name: 'Figma', url: 'https://www.figma.com', description: '专业的在线设计工具', icon: '/icons/figma.svg' },
  { id: 9, name: 'LeetCode', url: 'https://leetcode.com', description: '程序员刷题平台', icon: '/icons/deepseek.svg' },
  { id: 10, name: 'ProductHunt', url: 'https://www.producthunt.com', description: '新产品发布平台', icon: '/icons/producthunt.svg' }
];

// 分类网站数据
export const categorySites: Record<number, SiteProps[]> = {
  // 科技类网站
  1: [
    { id: 1, name: 'TechCrunch', url: 'https://techcrunch.com', description: '科技新闻和创业公司报道，值得一看', icon: '/icons/deepseek.svg' },
    { id: 2, name: 'Wired', url: 'https://www.wired.com', description: '前沿科技和数字文化', icon: '/icons/deepseek.svg' },
    { id: 3, name: 'The Verge', url: 'https://www.theverge.com', description: '科技、科学、艺术和文化', icon: '/icons/deepseek.svg' },
    { id: 4, name: 'Engadget', url: 'https://www.engadget.com', description: '消费电子产品评测', icon: '/icons/deepseek.svg' },
    { id: 5, name: 'CNET', url: 'https://www.cnet.com', description: '科技产品评测和新闻', icon: '/icons/deepseek.svg' },
    { id: 6, name: 'Ars Technica', url: 'https://arstechnica.com', description: '深度科技分析', icon: '/icons/deepseek.svg' },
    { id: 7, name: 'MIT Tech Review', url: 'https://www.technologyreview.com', description: '麻省理工科技评论', icon: '/icons/deepseek.svg' },
    { id: 8, name: 'Digital Trends', url: 'https://www.digitaltrends.com', description: '科技产品趋势和评测', icon: '/icons/deepseek.svg' },
    { id: 9, name: 'Gizmodo', url: 'https://gizmodo.com', description: '设计、科技和科学文化', icon: '/icons/deepseek.svg' },
    { id: 10, name: 'Mashable', url: 'https://mashable.com', description: '科技、数字文化和娱乐', icon: '/icons/deepseek.svg' }
  ],
  // 教育类网站
  2: [
    { id: 1, name: 'Coursera', url: 'https://www.coursera.org', description: '顶尖大学在线课程', icon: '/icons/deepseek.svg' },
    { id: 2, name: 'edX', url: 'https://www.edx.org', description: '哈佛、麻省理工等名校课程', icon: '/icons/deepseek.svg' },
    { id: 3, name: 'Khan Academy', url: 'https://www.khanacademy.org', description: '免费教育平台', icon: '/icons/deepseek.svg' },
    { id: 4, name: 'Udemy', url: 'https://www.udemy.com', description: '技能学习平台', icon: '/icons/deepseek.svg' },
    { id: 5, name: 'Duolingo', url: 'https://www.duolingo.com', description: '语言学习应用', icon: '/icons/deepseek.svg' },
    { id: 6, name: 'Brilliant', url: 'https://brilliant.org', description: '数学和科学互动课程', icon: '/icons/deepseek.svg' },
    { id: 7, name: 'Quizlet', url: 'https://quizlet.com', description: '学习工具和闪卡', icon: '/icons/deepseek.svg' },
    { id: 8, name: 'TED-Ed', url: 'https://ed.ted.com', description: 'TED教育视频', icon: '/icons/deepseek.svg' },
    { id: 9, name: 'Codecademy', url: 'https://www.codecademy.com', description: '编程学习平台', icon: '/icons/deepseek.svg' },
    { id: 10, name: 'Crash Course', url: 'https://thecrashcourse.com', description: '各学科速成课程', icon: '/icons/deepseek.svg' }
  ],
  // 设计类网站
  3: [
    { id: 1, name: 'Behance', url: 'https://www.behance.net', description: '创意作品展示平台', icon: '/icons/deepseek.svg' },
    { id: 2, name: 'Dribbble', url: 'https://dribbble.com', description: '设计师作品展示平台', icon: '/icons/deepseek.svg' },
    { id: 3, name: 'Awwwards', url: 'https://www.awwwards.com', description: '网页设计奖项', icon: '/icons/deepseek.svg' },
    { id: 4, name: 'Pinterest', url: 'https://www.pinterest.com', description: '创意灵感收集', icon: '/icons/deepseek.svg' },
    { id: 5, name: 'Canva', url: 'https://www.canva.com', description: '在线平面设计工具', icon: '/icons/deepseek.svg' },
    { id: 6, name: 'Adobe Color', url: 'https://color.adobe.com', description: '色彩搭配工具', icon: '/icons/deepseek.svg' },
    { id: 7, name: 'Figma', url: 'https://www.figma.com', description: '协作设计工具', icon: '/icons/deepseek.svg' },
    { id: 8, name: 'Unsplash', url: 'https://unsplash.com', description: '免费高质量图片', icon: '/icons/deepseek.svg' },
    { id: 9, name: 'Coolors', url: 'https://coolors.co', description: '配色方案生成器', icon: '/icons/deepseek.svg' },
    { id: 10, name: 'Sketch', url: 'https://www.sketch.com', description: 'Mac设计工具', icon: '/icons/deepseek.svg' }
  ],
  // AI资源类网站
  4: [
    { id: 1, name: 'OpenAI', url: 'https://openai.com', description: 'ChatGPT和DALL-E开发商', icon: '/icons/deepseek.svg' },
    { id: 2, name: 'Hugging Face', url: 'https://huggingface.co', description: 'AI模型和数据集社区', icon: '/icons/deepseek.svg' },
    { id: 3, name: 'Midjourney', url: 'https://www.midjourney.com', description: 'AI图像生成', icon: '/icons/deepseek.svg' },
    { id: 4, name: 'Anthropic', url: 'https://www.anthropic.com', description: 'Claude AI助手开发商', icon: '/icons/deepseek.svg' },
    { id: 5, name: 'Runway', url: 'https://runwayml.com', description: 'AI创意工具', icon: '/icons/deepseek.svg' },
    { id: 6, name: 'Stability AI', url: 'https://stability.ai', description: 'Stable Diffusion开发商', icon: '/icons/deepseek.svg' },
    { id: 7, name: 'Perplexity AI', url: 'https://www.perplexity.ai', description: 'AI搜索引擎', icon: '/icons/deepseek.svg' },
    { id: 8, name: 'Replicate', url: 'https://replicate.com', description: 'AI模型运行平台', icon: '/icons/deepseek.svg' },
    { id: 9, name: 'Cohere', url: 'https://cohere.com', description: 'NLP API服务', icon: '/icons/deepseek.svg' },
    { id: 10, name: 'AI Dungeon', url: 'https://play.aidungeon.io', description: 'AI文字冒险游戏', icon: '/icons/deepseek.svg' }
  ],
  // 开发工具类网站
  5: [
    { id: 1, name: 'GitHub', url: 'https://github.com', description: '代码托管平台', icon: '/icons/Github.svg' },
    { id: 2, name: 'Stack Overflow', url: 'https://stackoverflow.com', description: '程序员问答社区', icon: '/icons/deepseek.svg' },
    { id: 3, name: 'VS Code', url: 'https://code.visualstudio.com', description: '微软代码编辑器', icon: '/icons/deepseek.svg' },
    { id: 4, name: 'CodePen', url: 'https://codepen.io', description: '前端代码分享平台', icon: '/icons/deepseek.svg' },
    { id: 5, name: 'Vercel', url: 'https://vercel.com', description: '前端部署平台', icon: '/icons/deepseek.svg' },
    { id: 6, name: 'MDN Web Docs', url: 'https://developer.mozilla.org', description: 'Web开发文档', icon: '/icons/deepseek.svg' },
    { id: 7, name: 'Netlify', url: 'https://www.netlify.com', description: '静态网站托管', icon: '/icons/deepseek.svg' },
    { id: 8, name: 'Postman', url: 'https://www.postman.com', description: 'API测试工具', icon: '/icons/deepseek.svg' },
    { id: 9, name: 'Docker', url: 'https://www.docker.com', description: '容器化平台', icon: '/icons/deepseek.svg' },
    { id: 10, name: 'GitLab', url: 'https://gitlab.com', description: 'DevOps平台', icon: '/icons/deepseek.svg' }
  ]
};

// 辅助函数：根据搜索关键词过滤网站
export function filterSitesByQuery(sites: SiteProps[], query: string): SiteProps[] {
  if (!query.trim()) return sites;
  
  const lowerCaseQuery = query.toLowerCase().trim();
  
  return sites.filter(site => {
    const nameLower = site.name.toLowerCase();
    const descriptionLower = site.description.toLowerCase();
    const urlLower = site.url.toLowerCase();
    
    return (
      nameLower.includes(lowerCaseQuery) ||
      descriptionLower.includes(lowerCaseQuery) ||
      urlLower.includes(lowerCaseQuery)
    );
  });
}