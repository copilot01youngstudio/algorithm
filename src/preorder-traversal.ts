/**
 * 二叉树前序遍历
 * 前序遍历顺序：根节点 -> 左子树 -> 右子树
 */

/**
 * 二叉树节点
 */
export class TreeNode<T> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(val: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * 前序遍历（递归实现）
 * @param root 二叉树根节点
 * @returns 前序遍历结果数组
 */
export function preorderTraversalRecursive<T>(root: TreeNode<T> | null): T[] {
  const result: T[] = [];

  function traverse(node: TreeNode<T> | null): void {
    if (node === null) {
      return;
    }

    result.push(node.val);       // 访问根节点
    traverse(node.left);          // 遍历左子树
    traverse(node.right);         // 遍历右子树
  }

  traverse(root);
  return result;
}

/**
 * 前序遍历（迭代实现，使用栈）
 * @param root 二叉树根节点
 * @returns 前序遍历结果数组
 */
export function preorderTraversalIterative<T>(root: TreeNode<T> | null): T[] {
  if (root === null) {
    return [];
  }

  const result: T[] = [];
  const stack: TreeNode<T>[] = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;
    result.push(node.val);

    // 先压入右子节点，后压入左子节点
    // 这样栈弹出时就是先左后右的顺序
    if (node.right !== null) {
      stack.push(node.right);
    }
    if (node.left !== null) {
      stack.push(node.left);
    }
  }

  return result;
}

/**
 * 前序遍历（Morris 遍历，空间复杂度 O(1)）
 * @param root 二叉树根节点
 * @returns 前序遍历结果数组
 */
export function preorderTraversalMorris<T>(root: TreeNode<T> | null): T[] {
  const result: T[] = [];
  let current = root;

  while (current !== null) {
    if (current.left === null) {
      // 没有左子树，直接访问当前节点并移动到右子树
      result.push(current.val);
      current = current.right;
    } else {
      // 找到左子树的最右节点
      let predecessor = current.left;
      while (predecessor.right !== null && predecessor.right !== current) {
        predecessor = predecessor.right;
      }

      if (predecessor.right === null) {
        // 建立线索
        result.push(current.val);
        predecessor.right = current;
        current = current.left;
      } else {
        // 恢复树结构
        predecessor.right = null;
        current = current.right;
      }
    }
  }

  return result;
}

/**
 * 从数组构建二叉树（层序遍历方式）
 * @param arr 数组，null 表示空节点
 * @returns 二叉树根节点
 */
export function buildTreeFromArray<T>(arr: (T | null)[]): TreeNode<T> | null {
  if (arr.length === 0 || arr[0] === null) {
    return null;
  }

  const root = new TreeNode(arr[0] as T);
  const queue: TreeNode<T>[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift()!;

    // 左子节点
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i] as T);
      queue.push(node.left);
    }
    i++;

    // 右子节点
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i] as T);
      queue.push(node.right);
    }
    i++;
  }

  return root;
}
