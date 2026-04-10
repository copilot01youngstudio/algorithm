/**
 * 101. 对称二叉树
 * 给你一个二叉树的根节点 root ，检查它是否轴对称。
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export function isSymmetric(root: TreeNode | null): boolean {
  const isMirror = (left: TreeNode | null, right: TreeNode | null): boolean => {
    if (left === null && right === null) {
      return true;
    }

    if (left === null || right === null) {
      return false;
    }

    if (left.val !== right.val) {
      return false;
    }

    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  };

  if (root === null) {
    return true;
  }

  return isMirror(root.left, root.right);
}
