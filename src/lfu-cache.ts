/**
 * LFU 缓存（最不常用缓存）
 * 当缓存达到最大容量时，删除访问频率最低的项
 * 如果频率相同，删除最久未被访问的项
 */

export interface LFUCacheOptions {
  /** 缓存最大容量 */
  capacity: number;
}

export class LFUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;
  private frequency: Map<K, number>;
  private lastUsedTime: Map<K, number>;
  private timestamp: number;

  constructor(options: LFUCacheOptions) {
    if (options.capacity <= 0) {
      throw new Error('Capacity must be greater than 0');
    }
    this.capacity = options.capacity;
    this.cache = new Map();
    this.frequency = new Map();
    this.lastUsedTime = new Map();
    this.timestamp = 0;
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

    // 更新访问频率和时间戳
    const freq = this.frequency.get(key) || 0;
    this.frequency.set(key, freq + 1);
    this.lastUsedTime.set(key, this.timestamp++);

    return this.cache.get(key);
  }

  /**
   * 将键值对放入缓存
   * 如果键已存在，更新其值
   * 如果缓存已满，删除频率最低的项（如果相同则删除最久未使用的）
   * @param key 缓存键
   * @param value 缓存值
   */
  public put(key: K, value: V): void {
    if (this.cache.has(key)) {
      // 键已存在，更新值和频率
      this.cache.set(key, value);
      const freq = this.frequency.get(key) || 0;
      this.frequency.set(key, freq + 1);
      this.lastUsedTime.set(key, this.timestamp++);
      return;
    }

    // 缓存已满，删除最不常用的项
    if (this.cache.size >= this.capacity) {
      let minFreq = Infinity;
      let minTime = Infinity;
      let evictKey: K | null = null;

      for (const k of this.cache.keys()) {
        const freq = this.frequency.get(k) || 0;
        const time = this.lastUsedTime.get(k) || 0;

        // 优先按频率排序，再按时间排序
        if (freq < minFreq || (freq === minFreq && time < minTime)) {
          minFreq = freq;
          minTime = time;
          evictKey = k;
        }
      }

      if (evictKey !== null) {
        this.cache.delete(evictKey);
        this.frequency.delete(evictKey);
        this.lastUsedTime.delete(evictKey);
      }
    }

    // 插入新项
    this.cache.set(key, value);
    this.frequency.set(key, 1);
    this.lastUsedTime.set(key, this.timestamp++);
  }

  /**
   * 获取缓存大小
   */
  public size(): number {
    return this.cache.size;
  }
}
