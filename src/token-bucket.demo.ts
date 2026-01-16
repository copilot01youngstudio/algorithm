import { TokenBucket } from './token-bucket';

/**
 * 令牌桶算法使用示例
 */
async function main(): Promise<void> {
  console.log('=== 令牌桶算法演示 ===\n');

  // 创建一个令牌桶：容量为 10，每秒补充 2 个令牌
  const bucket = new TokenBucket({
    capacity: 10,
    refillRate: 2,
  });

  console.log('初始状态:', bucket.getInfo());
  console.log();

  // 示例 1：快速消费（可能失败）
  console.log('--- 示例 1：快速消费 ---');
  for (let i = 1; i <= 12; i++) {
    const success = bucket.tryConsume(1);
    console.log(`请求 ${i}: ${success ? '✓ 成功' : '✗ 失败'} - 剩余令牌: ${bucket.getTokens().toFixed(2)}`);
  }
  console.log();

  // 示例 2：异步等待消费
  console.log('--- 示例 2：异步等待消费（等待 3 秒后重试）---');
  const bucket2 = new TokenBucket({
    capacity: 5,
    refillRate: 1,
  });

  // 消费完所有令牌
  for (let i = 0; i < 5; i++) {
    bucket2.tryConsume(1);
  }
  console.log(`当前令牌: ${bucket2.getTokens().toFixed(2)}`);

  // 异步等待
  console.log('开始等待令牌...');
  const start = Date.now();
  const success = await bucket2.consume(3, 5000);
  const elapsed = Date.now() - start;
  console.log(`等待结果: ${success ? '✓ 成功' : '✗ 超时'} - 耗时: ${elapsed}ms`);
  console.log(`最终令牌数: ${bucket2.getTokens().toFixed(2)}`);
  console.log();

  // 示例 3：模拟 API 速率限制
  console.log('--- 示例 3：模拟 API 速率限制 ---');
  const rateLimiter = new TokenBucket({
    capacity: 10,
    refillRate: 5, // 每秒 5 个请求
  });

  console.log('初始配置:', rateLimiter.getInfo());
  console.log('模拟 15 个请求：');

  for (let i = 1; i <= 15; i++) {
    const allowed = rateLimiter.tryConsume(1);
    console.log(`请求 ${i}: ${allowed ? '✓ 通过' : '✗ 限制'}`);
  }
}

main().catch(console.error);
