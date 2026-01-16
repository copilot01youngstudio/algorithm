/**
 * 令牌桶算法（Token Bucket Algorithm）
 * 用于流量控制和速率限制
 */
export interface TokenBucketConfig {
  /** 令牌桶容量 */
  capacity: number;
  /** 每秒补充的令牌数 */
  refillRate: number;
}

export class TokenBucket {
  private capacity: number;
  private refillRate: number;
  private tokens: number;
  private lastRefillTime: number;

  constructor(config: TokenBucketConfig) {
    if (config.capacity <= 0) {
      throw new Error('Capacity must be greater than 0');
    }
    if (config.refillRate <= 0) {
      throw new Error('Refill rate must be greater than 0');
    }

    this.capacity = config.capacity;
    this.refillRate = config.refillRate;
    this.tokens = config.capacity;
    this.lastRefillTime = Date.now();
  }

  /**
   * 补充令牌
   */
  private refill(): void {
    const now = Date.now();
    const timePassed = (now - this.lastRefillTime) / 1000; // 转换为秒
    const tokensToAdd = timePassed * this.refillRate;

    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefillTime = now;
  }

  /**
   * 尝试获取指定数量的令牌
   * @param tokens 需要获取的令牌数
   * @returns 是否成功获取
   */
  public tryConsume(tokens: number = 1): boolean {
    if (tokens < 0) {
      throw new Error('Tokens to consume must be non-negative');
    }

    this.refill();

    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }

    return false;
  }

  /**
   * 异步方式等待并获取令牌（直到获取成功）
   * @param tokens 需要获取的令牌数
   * @param maxWaitTime 最大等待时间（毫秒），0 表示无限等待
   * @returns Promise，成功返回 true，超时返回 false
   */
  public async consume(
    tokens: number = 1,
    maxWaitTime: number = 0
  ): Promise<boolean> {
    const startTime = Date.now();

    while (true) {
      if (this.tryConsume(tokens)) {
        return true;
      }

      if (maxWaitTime > 0 && Date.now() - startTime > maxWaitTime) {
        return false;
      }

      // 计算等待时间：需要多少时间才能有足够的令牌
      const tokensNeeded = tokens - this.tokens;
      const waitTime = Math.min(
        (tokensNeeded / this.refillRate) * 1000,
        100 // 最多等待 100ms
      );

      await this.sleep(waitTime);
    }
  }

  /**
   * 休眠指定时间
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * 获取当前令牌数
   */
  public getTokens(): number {
    this.refill();
    return this.tokens;
  }

  /**
   * 获取令牌桶配置信息
   */
  public getInfo(): {
    capacity: number;
    refillRate: number;
    currentTokens: number;
    availablePercentage: number;
  } {
    return {
      capacity: this.capacity,
      refillRate: this.refillRate,
      currentTokens: this.getTokens(),
      availablePercentage: (this.getTokens() / this.capacity) * 100,
    };
  }
}
