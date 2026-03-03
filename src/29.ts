/**
 * 29. 两数相除
 * 不使用乘法、除法和取余运算，返回向零截断后的商。
 */
export function divide(dividend: number, divisor: number): number {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  if (divisor === 0) {
    throw new Error('Divisor cannot be zero');
  }

  if (dividend === 0) {
    return 0;
  }

  // 唯一会溢出的情况：-2^31 / -1 = 2^31
  if (dividend === INT_MIN && divisor === -1) {
    return INT_MAX;
  }

  // 统一转为负数计算，避免 INT_MIN 取反溢出
  let negatives = 2;
  let dividendNeg = dividend;
  let divisorNeg = divisor;

  if (dividend > 0) {
    dividendNeg = -dividend;
    negatives -= 1;
  }

  if (divisor > 0) {
    divisorNeg = -divisor;
    negatives -= 1;
  }

  // 商保持为负数，最后再根据符号决定是否取反
  let quotient = 0;

  while (dividendNeg <= divisorNeg) {
    let value = divisorNeg;
    let powerOfTwo = -1;

    // 倍增 value（value += value），同时倍增对应商（powerOfTwo += powerOfTwo）
    while (value >= INT_MIN - value && dividendNeg <= value + value) {
      value += value;
      powerOfTwo += powerOfTwo;
    }

    dividendNeg -= value;
    quotient += powerOfTwo;
  }

  // negatives === 1 说明最终结果为负；否则为正
  if (negatives !== 1) {
    return -quotient;
  }

  return quotient;
}
