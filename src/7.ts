/**
 * 7. 整数反转
 * @param x 32 位有符号整数
 * @returns 反转后的整数；若溢出则返回 0
 */
export function reverse(x: number): number {
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  let value = Math.abs(x);
  let result = 0;

  while (value > 0) {
    const digit = value % 10;
    value = Math.trunc(value / 10);

    if (
      result > Math.trunc(INT_MAX / 10) ||
      (result === Math.trunc(INT_MAX / 10) &&
        digit > (x >= 0 ? INT_MAX % 10 : Math.abs(INT_MIN % 10)))
    ) {
      return 0;
    }

    result = result * 10 + digit;
  }

  return x < 0 ? -result : result;
}
