/**
 * 6. 戳气球（Burst Balloons）
 * 区间动态规划：dp[left][right] 表示开区间 (left, right) 内所有气球戳完能获得的最大硬币数。
 */
export function maxCoins(nums: number[]): number {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }

  // 在两侧补 1，便于统一处理边界。
  const balloons = [1, ...nums, 1];
  const size = n + 2;

  // dp[left][right]：开区间 (left, right) 的最优解。
  const dp: number[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0),
  );

  // 区间长度至少为 2（开区间内至少有 1 个可戳气球）。
  for (let len = 2; len < size; len += 1) {
    for (let left = 0; left + len < size; left += 1) {
      const right = left + len;

      // 枚举 (left, right) 中最后一个被戳破的气球 k。
      for (let k = left + 1; k < right; k += 1) {
        const coins =
          dp[left][k] +
          dp[k][right] +
          balloons[left]! * balloons[k]! * balloons[right]!;

        if (coins > dp[left][right]!) {
          dp[left][right] = coins;
        }
      }
    }
  }

  return dp[0]![size - 1]!;
}
