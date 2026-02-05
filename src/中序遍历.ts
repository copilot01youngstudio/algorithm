/**
 * 二叉树中序遍历
 * 中序遍历顺序：左子树 -> 根节点 -> 右子树
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
 * 中序遍历（递归实现）
 * @param root 二叉树根节点
 * @returns 中序遍历结果数组
 */
export function inorderTraversalRecursive<T>(root: TreeNode<T> | null): T[] {
  const result: T[] = [];

  function traverse(node: TreeNode<T> | null): void {
    if (node === null) {
      return;
    }

    traverse(node.left);          // 遍历左子树
    result.push(node.val);        // 访问根节点
    traverse(node.right);         // 遍历右子树
  }

  traverse(root);
  return result;
}

/**
 * 中序遍历（迭代实现，使用栈）
 * @param root 二叉树根节点
 * @returns 中序遍历结果数组
 */
export function inorderTraversalIterative<T>(root: TreeNode<T> | null): T[] {
  if (root === null) {
    return [];
  }

  const result: T[] = [];
  const stack: TreeNode<T>[] = [];
  let current: TreeNode<T> | null = root;

  while (current !== null || stack.length > 0) {
    // 一直往左走，将节点压入栈中
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    // 弹出栈顶节点并访问
    current = stack.pop()!;
    result.push(current.val);

    // 转向右子树
    current = current.right;
  }

  return result;
}

/**
 * 中序遍历（Morris 遍历，空间复杂度 O(1)）
 * @param root 二叉树根节点
 * @returns 中序遍历结果数组
 */
export function inorderTraversalMorris<T>(root: TreeNode<T> | null): T[] {
  const result: T[] = [];
  let current = root;

  while (current !== null) {
    if (current.left === null) {
      // 没有左子树，直接访问当前节点并移动到右子树
      result.push(current.val);
      current = current.right;
    } else {
      // 找到左子树的最右节点（前驱节点）
      let predecessor = current.left;
      while (predecessor.right !== null && predecessor.right !== current) {
        predecessor = predecessor.right;
      }

      if (predecessor.right === null) {
        // 建立线索，指向当前节点
        predecessor.right = current;
        current = current.left;
      } else {
        // 恢复树结构，访问当前节点
        predecessor.right = null;
        result.push(current.val);
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
