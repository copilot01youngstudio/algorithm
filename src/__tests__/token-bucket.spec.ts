import { TokenBucket } from './token-bucket';

describe('TokenBucket', () => {
  describe('初始化', () => {
    it('应该成功创建令牌桶', () => {
      const bucket = new TokenBucket({ capacity: 10, refillRate: 1 });
      expect(bucket.getTokens()).toBeCloseTo(10, 1);
    });

    it('容量不能为 0 或负数', () => {
      expect(() => {
        new TokenBucket({ capacity: 0, refillRate: 1 });
      }).toThrow('Capacity must be greater than 0');

      expect(() => {
        new TokenBucket({ capacity: -1, refillRate: 1 });
      }).toThrow('Capacity must be greater than 0');
    });

    it('补充速率不能为 0 或负数', () => {
      expect(() => {
        new TokenBucket({ capacity: 10, refillRate: 0 });
      }).toThrow('Refill rate must be greater than 0');

      expect(() => {
        new TokenBucket({ capacity: 10, refillRate: -1 });
      }).toThrow('Refill rate must be greater than 0');
    });
  });

  describe('tryConsume', () => {
    it('应该能消费令牌', () => {
      const bucket = new TokenBucket({ capacity: 10, refillRate: 1 });
      expect(bucket.tryConsume(5)).toBe(true);
      expect(bucket.getTokens()).toBeCloseTo(5, 1);
    });

    it('令牌不足时应该消费失败', () => {
      const bucket = new TokenBucket({ capacity: 5, refillRate: 1 });
      expect(bucket.tryConsume(10)).toBe(false);
      expect(bucket.getTokens()).toBeCloseTo(5, 1);
    });

    it('消费 0 个令牌应该成功', () => {
      const bucket = new TokenBucket({ capacity: 5, refillRate: 1 });
      expect(bucket.tryConsume(0)).toBe(true);
    });

    it('消费负数令牌应该抛出错误', () => {
      const bucket = new TokenBucket({ capacity: 5, refillRate: 1 });
      expect(() => {
        bucket.tryConsume(-1);
      }).toThrow('Tokens to consume must be non-negative');
    });
  });

  describe('令牌补充', () => {
    it('应该在时间流逝后补充令牌', async () => {
      const bucket = new TokenBucket({ capacity: 10, refillRate: 10 });
      bucket.tryConsume(5); // 消费 5 个

      await new Promise((resolve) => setTimeout(resolve, 100));
      const tokens = bucket.getTokens();
      expect(tokens).toBeGreaterThan(5);
    });

    it('令牌数不应该超过容量', async () => {
      const bucket = new TokenBucket({ capacity: 5, refillRate: 10 });
      bucket.tryConsume(1);

      await new Promise((resolve) => setTimeout(resolve, 200));
      const tokens = bucket.getTokens();
      expect(tokens).toBeLessThanOrEqual(5);
    });
  });

  describe('getInfo', () => {
    it('应该返回正确的桶信息', () => {
      const bucket = new TokenBucket({ capacity: 10, refillRate: 5 });
      const info = bucket.getInfo();

      expect(info.capacity).toBe(10);
      expect(info.refillRate).toBe(5);
      expect(info.currentTokens).toBeCloseTo(10, 1);
      expect(info.availablePercentage).toBeCloseTo(100, 1);
    });
  });

  describe('consume (异步)', () => {
    it('立即消费成功时应该返回 true', async () => {
      const bucket = new TokenBucket({ capacity: 10, refillRate: 1 });
      const result = await bucket.consume(5);
      expect(result).toBe(true);
    });

    it('超时时应该返回 false', async () => {
      const bucket = new TokenBucket({ capacity: 1, refillRate: 1 });
      bucket.tryConsume(1);

      const result = await bucket.consume(10, 100);
      expect(result).toBe(false);
    });
  });
});
