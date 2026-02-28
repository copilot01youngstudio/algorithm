/**
 * 9. 回文数
 * @param x 整数
 * @returns 如果 x 是回文整数则返回 true，否则返回 false
 */
export function isPalindrome(x: number): boolean {
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  let original = x;
  let revertedHalf = 0;

  while (original > revertedHalf) {
    revertedHalf = revertedHalf * 10 + (original % 10);
    original = Math.trunc(original / 10);
  }

  return original === revertedHalf || original === Math.trunc(revertedHalf / 10);
}
