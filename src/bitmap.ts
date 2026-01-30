/**
 * Bitmap（位图）实现
 * 用于高效存储和查询大量整数（如42亿QQ号去重）
 * 每个bit代表一个数字是否存在，空间效率高
 */

export interface BitmapOptions {
  /** 最大数值范围（不包含），默认42亿 */
  maxSize?: number;
}

export class Bitmap {
  private bits: Uint8Array;
  private maxSize: number;

  constructor(options: BitmapOptions = {}) {
    // 默认支持42亿个数字（QQ号最大约42亿）
    this.maxSize = options.maxSize || 4_200_000_000;
    
    // 每个字节8位，计算需要多少字节
    const byteSize = Math.ceil(this.maxSize / 8);
    this.bits = new Uint8Array(byteSize);
  }

  /**
   * 添加一个数字
   * @param num 要添加的数字
   */
  public add(num: number): void {
    this.validateNumber(num);
    
    const byteIndex = Math.floor(num / 8);
    const bitIndex = num % 8;
    
    // 设置对应的bit为1
    this.bits[byteIndex] |= (1 << bitIndex);
  }

  /**
   * 检查数字是否存在
   * @param num 要检查的数字
   * @returns 如果存在返回true，否则返回false
   */
  public has(num: number): boolean {
    this.validateNumber(num);
    
    const byteIndex = Math.floor(num / 8);
    const bitIndex = num % 8;
    
    // 检查对应的bit是否为1
    return (this.bits[byteIndex] & (1 << bitIndex)) !== 0;
  }

  /**
   * 删除一个数字
   * @param num 要删除的数字
   */
  public remove(num: number): void {
    this.validateNumber(num);
    
    const byteIndex = Math.floor(num / 8);
    const bitIndex = num % 8;
    
    // 设置对应的bit为0
    this.bits[byteIndex] &= ~(1 << bitIndex);
  }

  /**
   * 清空所有数据
   */
  public clear(): void {
    this.bits.fill(0);
  }

  /**
   * 获取已存储的数字数量（近似值，需要遍历所有bit）
   */
  public count(): number {
    let count = 0;
    
    for (let i = 0; i < this.bits.length; i++) {
      let byte = this.bits[i];
      // Brian Kernighan算法：快速计算字节中1的个数
      while (byte) {
        byte &= byte - 1;
        count++;
      }
    }
    
    return count;
  }

  /**
   * 获取bitmap占用的内存大小（字节）
   */
  public getMemorySize(): number {
    return this.bits.byteLength;
  }

  /**
   * 批量添加数字
   * @param nums 数字数组
   */
  public addBatch(nums: number[]): void {
    for (const num of nums) {
      this.add(num);
    }
  }

  /**
   * 导出所有存在的数字
   * 注意：对于大量数据可能会很慢
   */
  public toArray(): number[] {
    const result: number[] = [];
    
    for (let i = 0; i < this.maxSize; i++) {
      if (this.has(i)) {
        result.push(i);
      }
    }
    
    return result;
  }

  private validateNumber(num: number): void {
    if (!Number.isInteger(num)) {
      throw new Error('Number must be an integer');
    }
    if (num < 0 || num >= this.maxSize) {
      throw new Error(`Number must be between 0 and ${this.maxSize - 1}`);
    }
  }
}
