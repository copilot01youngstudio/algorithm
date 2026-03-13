/**
 * 90. 子集 II
 * 给你一个可能包含重复元素的整数数组 nums，返回所有可能的子集（幂集），且不能包含重复子集。
 */
export function subsetsWithDup(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  // 排序后，同一层递归中相同数字只取第一次，避免重复子集
  nums.sort((a, b) => a - b);

  const backtrack = (start: number): void => {
    result.push([...path]);

    for (let i = start; i < nums.length; i += 1) {
      if (i > start && nums[i] === nums[i - 1]) {
        continue;
      }

      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  };

  backtrack(0);
  return result;
}
