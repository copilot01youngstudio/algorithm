/**
 * 33. 搜索旋转排序数组
 * 给定一个按升序排列后被旋转且元素互不相同的数组，返回 target 的下标；不存在则返回 -1。
 * 要求时间复杂度 O(log n)。
 */
export function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const midValue = nums[mid];

    if (midValue === target) {
      return mid;
    }

    // 左半段有序
    if (nums[left] <= midValue) {
      if (nums[left] <= target && target < midValue) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // 右半段有序
      if (midValue < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}
