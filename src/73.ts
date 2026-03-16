/**
 * 73. 矩阵置零
 * 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0。
 * 要求使用原地算法（O(1) 额外空间）。
 */
export function setZeroes(matrix: number[][]): void {
  const m = matrix.length;
  if (m === 0) {
    return;
  }

  const n = matrix[0].length;

  // 记录第一行、第一列是否需要清零
  let firstRowZero = false;
  let firstColZero = false;

  for (let j = 0; j < n; j += 1) {
    if (matrix[0][j] === 0) {
      firstRowZero = true;
      break;
    }
  }

  for (let i = 0; i < m; i += 1) {
    if (matrix[i][0] === 0) {
      firstColZero = true;
      break;
    }
  }

  // 用第一行和第一列作为标记位
  for (let i = 1; i < m; i += 1) {
    for (let j = 1; j < n; j += 1) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // 根据标记将内部元素清零
  for (let i = 1; i < m; i += 1) {
    for (let j = 1; j < n; j += 1) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  if (firstRowZero) {
    for (let j = 0; j < n; j += 1) {
      matrix[0][j] = 0;
    }
  }

  if (firstColZero) {
    for (let i = 0; i < m; i += 1) {
      matrix[i][0] = 0;
    }
  }
}
