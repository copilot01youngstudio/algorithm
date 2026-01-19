// 主入口文件
export function hello(): string {
  return 'Hello, Algorithm!';
}

export { TokenBucket, TokenBucketConfig } from './token-bucket';
export { LRUCache, LRUCacheOptions } from './lru-cache';

console.log(hello());
