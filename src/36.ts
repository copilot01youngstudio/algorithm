/**
 * 36. 有效的数独
 * 只校验当前已填入数字是否满足行、列、3x3 宫内不重复。
 */
export function isValidSudoku(board: string[][]): boolean {
  if (board.length !== 9 || board.some((row) => row.length !== 9)) {
    return false;
  }

  const rows: Array<Set<string>> = Array.from({ length: 9 }, () => new Set<string>());
  const cols: Array<Set<string>> = Array.from({ length: 9 }, () => new Set<string>());
  const boxes: Array<Set<string>> = Array.from({ length: 9 }, () => new Set<string>());

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const cell = board[row][col];

      if (cell === '.') {
        continue;
      }

      if (cell < '1' || cell > '9') {
        return false;
      }

      const boxIndex = Math.trunc(row / 3) * 3 + Math.trunc(col / 3);

      if (rows[row].has(cell) || cols[col].has(cell) || boxes[boxIndex].has(cell)) {
        return false;
      }

      rows[row].add(cell);
      cols[col].add(cell);
      boxes[boxIndex].add(cell);
    }
  }

  return true;
}
