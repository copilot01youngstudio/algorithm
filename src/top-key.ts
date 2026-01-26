/**
 * Top-K 算法
 * 找出数组中出现频率最高的 k 个元素
 */

export interface TopKeyOptions {
  /** 返回的元素数量 */
  k: number;
}

/**
 * 找出数组中出现频率最高的 k 个元素
 * @param nums 输入数组
 * @param options 配置选项
 * @returns 频率最高的 k 个元素
 */
export function topKFrequent<T>(nums: T[], options: TopKeyOptions): T[] {
  const { k } = options;

  if (k <= 0) {
    throw new Error('k must be greater than 0');
  }

  if (nums.length === 0) {
    return [];
  }

  // 统计每个元素的出现频率
  const frequencyMap = new Map<T, number>();
  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // 按频率排序，频率相同时保持原有顺序
  const sorted = Array.from(frequencyMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([key]) => key);

  return sorted;
}

/**
 * Top-K 类实现（支持动态添加元素）
 */
export class TopK<T> {
  private k: number;
  private frequencyMap: Map<T, number>;

  constructor(options: TopKeyOptions) {
    if (options.k <= 0) {
      throw new Error('k must be greater than 0');
    }
    this.k = options.k;
    this.frequencyMap = new Map();
  }

  /**
   * 添加一个元素
   */
  add(element: T): void {
    this.frequencyMap.set(element, (this.frequencyMap.get(element) || 0) + 1);
  }

  /**
   * 批量添加元素
   */
  addAll(elements: T[]): void {
    for (const element of elements) {
      this.add(element);
    }
  }

  /**
   * 获取当前频率最高的 k 个元素
   */
  getTopK(): T[] {
    if (this.frequencyMap.size === 0) {
      return [];
    }

    return Array.from(this.frequencyMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, this.k)
      .map(([key]) => key);
  }

  /**
   * 获取指定元素的频率
   */
  getFrequency(element: T): number {
    return this.frequencyMap.get(element) || 0;
  }

  /**
   * 清空所有数据
   */
  clear(): void {
    this.frequencyMap.clear();
  }

  /**
   * 获取当前元素总数
   */
  size(): number {
    return this.frequencyMap.size;
  }
}
