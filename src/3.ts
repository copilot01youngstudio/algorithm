/**
 * 3. 无重复字符的最长子串
 * @param s 输入字符串
 * @returns 不含重复字符的最长子串长度
 */
export function lengthOfLongestSubstring(s: string): number {
  const lastIndex = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right += 1) {
    const ch = s[right];
    const prev = lastIndex.get(ch);

    // 如果字符在当前窗口内出现过，收缩左边界
    if (prev !== undefined && prev >= left) {
      left = prev + 1;
    }

    lastIndex.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
