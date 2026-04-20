/**
 * 4. 寻找两个正序数组的中位数
 * 使用二分分割在较短数组上查找满足左右两侧有序的切分点。
 * 时间复杂度 O(log(min(m, n)))，空间复杂度 O(1)。
 */
export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  const leftSize = Math.floor((m + n + 1) / 2);

  let left = 0;
  let right = m;

  while (left <= right) {
    const partition1 = Math.floor((left + right) / 2);
    const partition2 = leftSize - partition1;

    const maxLeft1 = partition1 === 0 ? Number.NEGATIVE_INFINITY : nums1[partition1 - 1];
    const minRight1 = partition1 === m ? Number.POSITIVE_INFINITY : nums1[partition1];
    const maxLeft2 = partition2 === 0 ? Number.NEGATIVE_INFINITY : nums2[partition2 - 1];
    const minRight2 = partition2 === n ? Number.POSITIVE_INFINITY : nums2[partition2];

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if ((m + n) % 2 === 0) {
        return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
      }

      return Math.max(maxLeft1, maxLeft2);
    }

    if (maxLeft1 > minRight2) {
      right = partition1 - 1;
    } else {
      left = partition1 + 1;
    }
  }

  return Number.NaN;
}