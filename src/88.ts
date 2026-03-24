/**
 * 88. 合并两个有序数组
 * 将 nums2 合并到 nums1 中，结果保存在 nums1 内部。
 */
export function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let i = m - 1;
  let j = n - 1;
  let write = m + n - 1;

  // 从尾部开始填充，避免覆盖 nums1 中尚未处理的元素
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[write] = nums1[i];
      i -= 1;
    } else {
      nums1[write] = nums2[j];
      j -= 1;
    }
    write -= 1;
  }
}