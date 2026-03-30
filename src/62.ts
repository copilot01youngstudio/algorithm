/**
 * 62. 不同路径
 * 机器人从左上角出发，每次只能向右或向下，求到达右下角的不同路径数。
 */
export function uniquePaths(m: number, n: number): number {
  if (!Number.isInteger(m) || !Number.isInteger(n) || m <= 0 || n <= 0) {
    return 0;
  }

  // dp[col] 表示当前行到达第 col 列的路径数
  const dp: number[] = Array.from({ length: n }, () => 1);

  for (let row = 1; row < m; row += 1) {
    for (let col = 1; col < n; col += 1) {
      dp[col] += dp[col - 1];
    }
  }

  return dp[n - 1];
}
