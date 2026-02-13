/**
 * 两数之和
 * @param nums 整数数组
 * @param target 目标值
 * @returns 和为 target 的两个下标
 */
export function twoSum(nums: number[], target: number): [number, number] {
  const indexByValue = new Map<number, number>();

  for (let i = 0; i < nums.length; i += 1) {
    const value = nums[i]!;
    const needed = target - value;

    const matchedIndex = indexByValue.get(needed);
    if (matchedIndex !== undefined) {
      return [matchedIndex, i];
    }

    indexByValue.set(value, i);
  }

  throw new Error('No valid pair found');
}
