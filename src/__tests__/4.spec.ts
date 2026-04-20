import { findMedianSortedArrays } from '../4';

describe('findMedianSortedArrays', () => {
  it('应该正确处理奇数长度的合并数组', () => {
    expect(findMedianSortedArrays([1, 3], [2])).toBe(2);
  });

  it('应该正确处理偶数长度的合并数组', () => {
    expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5);
  });

  it('应该正确处理其中一个数组为空', () => {
    expect(findMedianSortedArrays([], [1])).toBe(1);
    expect(findMedianSortedArrays([2], [])).toBe(2);
  });

  it('应该正确处理数组长度差异较大的情况', () => {
    expect(findMedianSortedArrays([1, 2, 3, 4, 5, 6], [7, 8, 9])).toBe(5);
  });

  it('应该正确处理分割点落在边界的情况', () => {
    expect(findMedianSortedArrays([1, 2, 3], [4, 5, 6, 7])).toBe(4);
  });
});