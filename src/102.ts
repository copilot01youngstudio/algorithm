/**
 * 102. 二叉树的层序遍历
 * 给你二叉树的根节点 root ，返回其节点值的层序遍历。
 * （即逐层地，从左到右访问所有节点）。
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

export function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) {
    return [];
  }

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelValues: number[] = [];

    for (let i = 0; i < levelSize; i += 1) {
      const node = queue.shift();
      if (node === undefined) {
        continue;
      }

      levelValues.push(node.val);

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    result.push(levelValues);
  }

  return result;
}
