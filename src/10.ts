/**
 * 盛水最多的容器
 * 给定一个长度为 n 的整数数组 height。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 返回容器可以储存的最大水量。
 */

function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxAreaValue = 0;

  while (left < right) {
    // 计算当前容器的容量
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const currentArea = width * minHeight;

    // 更新最大容量
    maxAreaValue = Math.max(maxAreaValue, currentArea);

    // 移动指向较短线的指针
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxAreaValue;
}

export { maxArea };
