/**
 * 198. 打家劫舍
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，
 * 影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 
 * 给定一个代表每个房屋存放金额的非负整数数组，
 * 计算你不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。
 */

/**
 * 方案一：动态规划 - 使用数组
 * 时间复杂度: O(n)
 * 空间复杂度: O(n)
 */
export function rob1(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const dp: number[] = [];
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    // 第 i 间房屋有两种选择：
    // 1. 偷第 i 间房屋：不能偷 i-1 间，加上 i-2 间的最大值
    // 2. 不偷第 i 间房屋：取 i-1 间的最大值
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[nums.length - 1];
}

/**
 * 方案二：动态规划 - 空间优化
 * 由于只需要前两个状态，可以用两个变量替代数组
 * 时间复杂度: O(n)
 * 空间复杂度: O(1)
 */
export function rob2(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = nums[0]; // dp[i-2]
  let prev1 = Math.max(nums[0], nums[1]); // dp[i-1]

  for (let i = 2; i < nums.length; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

/**
 * 方案三：递归 + 记忆化
 * 时间复杂度: O(n)
 * 空间复杂度: O(n) - 递归栈 + 记忆化表
 */
export function rob3(nums: number[]): number {
  const memo: Map<number, number> = new Map();

  const helper = (index: number): number => {
    if (index < 0) return 0;
    if (index === 0) return nums[0];

    if (memo.has(index)) {
      return memo.get(index)!;
    }

    // 选择偷或不偷当前房屋
    const result = Math.max(
      helper(index - 1), // 不偷当前房屋
      helper(index - 2) + nums[index] // 偷当前房屋
    );

    memo.set(index, result);
    return result;
  };

  return helper(nums.length - 1);
}

// 默认导出第二个方案（空间最优）
export default rob2;
