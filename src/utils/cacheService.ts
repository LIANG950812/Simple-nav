/**
 * 缓存服务 - 提供本地存储缓存功能
 * 用于缓存网站数据，减少不必要的数据重新获取
 */

type CacheOptions = {
  /** 缓存过期时间（毫秒） */
  expireTime?: number;
};

type CacheItem<T> = {
  /** 缓存的数据 */
  data: T;
  /** 缓存时间戳 */
  timestamp: number;
  /** 过期时间（毫秒） */
  expireTime?: number;
};

/**
 * 缓存服务类
 */
export class CacheService {
  /**
   * 设置缓存
   * @param key 缓存键
   * @param data 缓存数据
   * @param options 缓存选项
   */
  static setCache<T>(key: string, data: T, options: CacheOptions = {}): void {
    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        expireTime: options.expireTime,
      };
      localStorage.setItem(key, JSON.stringify(cacheItem));
    } catch (error) {
      console.error('缓存数据失败:', error);
    }
  }

  /**
   * 获取缓存
   * @param key 缓存键
   * @returns 缓存数据，如果缓存不存在或已过期则返回null
   */
  static getCache<T>(key: string): T | null {
    try {
      const cacheJson = localStorage.getItem(key);
      if (!cacheJson) return null;

      const cache: CacheItem<T> = JSON.parse(cacheJson);
      
      // 检查缓存是否过期
      if (cache.expireTime && Date.now() - cache.timestamp > cache.expireTime) {
        localStorage.removeItem(key); // 删除过期缓存
        return null;
      }
      
      return cache.data;
    } catch (error) {
      console.error('获取缓存数据失败:', error);
      return null;
    }
  }

  /**
   * 删除缓存
   * @param key 缓存键
   */
  static removeCache(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('删除缓存数据失败:', error);
    }
  }

  /**
   * 清除所有缓存
   */
  static clearCache(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('清除缓存数据失败:', error);
    }
  }

  /**
   * 获取缓存数据，如果缓存不存在或已过期则通过回调函数获取新数据并缓存
   * @param key 缓存键
   * @param callback 获取新数据的回调函数
   * @param options 缓存选项
   * @returns 缓存数据或新获取的数据
   */
  static async getCacheOrFetch<T>(
    key: string, 
    callback: () => Promise<T>, 
    options: CacheOptions = {}
  ): Promise<T> {
    // 尝试从缓存获取数据
    const cachedData = this.getCache<T>(key);
    if (cachedData !== null) {
      return cachedData;
    }

    // 缓存不存在或已过期，获取新数据
    try {
      const newData = await callback();
      this.setCache(key, newData, options);
      return newData;
    } catch (error) {
      console.error('获取新数据失败:', error);
      throw error;
    }
  }
}