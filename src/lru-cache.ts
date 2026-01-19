/**
 * LRU 缓存（最近最少使用缓存）
 * 当缓存达到最大容量时，删除最久未被访问的项
 */

export interface LRUCacheOptions {
  /** 缓存最大容量 */
  capacity: number;
}

export class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;

  constructor(options: LRUCacheOptions) {
    if (options.capacity <= 0) {
      throw new Error('Capacity must be greater than 0');
    }
    this.capacity = options.capacity;
    this.cache = new Map();
  }

  /**
   * 获取缓存中的值
   * @param key 缓存键
   * @returns 缓存的值，如果不存在则返回 undefined
   */
  public get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined;
    }

    // 将访问的项移到最后（最近使用）
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  /**
   * 将键值对放入缓存
   * 如果键已存在，更新其值并将其标记为最近使用
   * 如果缓存已满，删除最久未使用的项
   * @param key 缓存键
   * @param value 缓存值
   */
  public put(key: K, value: V): void {
    // 如果键已存在，删除它以便重新插入
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 缓存已满，删除第一个（最久未使用的）项
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    // 将新项添加到末尾（最近使用）
    this.cache.set(key, value);
  }

  /**
   * 删除指定键的缓存
   * @param key 缓存键
   * @returns 是否成功删除
   */
  public delete(key: K): boolean {
    return this.cache.delete(key);
  }

  /**
   * 清空所有缓存
   */
  public clear(): void {
    this.cache.clear();
  }

  /**
   * 获取缓存大小
   * @returns 当前缓存项数
   */
  public size(): number {
    return this.cache.size;
  }

  /**
   * 判断缓存是否为空
   * @returns 缓存是否为空
   */
  public isEmpty(): boolean {
    return this.cache.size === 0;
  }

  /**
   * 判断缓存是否满
   * @returns 缓存是否已满
   */
  public isFull(): boolean {
    return this.cache.size >= this.capacity;
  }

  /**
   * 获取所有缓存键（按访问顺序）
   * @returns 键的数组
   */
  public keys(): K[] {
    return Array.from(this.cache.keys());
  }

  /**
   * 获取所有缓存值（按访问顺序）
   * @returns 值的数组
   */
  public values(): V[] {
    return Array.from(this.cache.values());
  }
}
