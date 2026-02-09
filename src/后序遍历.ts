/**
 * 二叉树后序遍历
 * 后序遍历顺序：左子树 -> 右子树 -> 根节点
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
 * 后序遍历（递归实现）
 * @param root 二叉树根节点
 * @returns 后序遍历结果数组
 */
export function postorderTraversalRecursive<T>(root: TreeNode<T> | null): T[] {
  const result: T[] = [];

  function traverse(node: TreeNode<T> | null): void {
    if (node === null) {
      return;
    }

    traverse(node.left);          // 遍历左子树
    traverse(node.right);         // 遍历右子树
    result.push(node.val);        // 访问根节点
  }

  traverse(root);
  return result;
}

/**
 * 后序遍历（迭代实现，使用栈）
 * @param root 二叉树根节点
 * @returns 后序遍历结果数组
 */
export function postorderTraversalIterative<T>(root: TreeNode<T> | null): T[] {
  if (root === null) {
    return [];
  }

  const result: T[] = [];
  const stack: TreeNode<T>[] = [root];
  let lastVisited: TreeNode<T> | null = null;

  while (stack.length > 0) {
    const current = stack[stack.length - 1]!;

    // 如果当前节点是叶子节点，或者已经访问过其右子节点
    if ((current.left === null && current.right === null) || lastVisited === current.right) {
      result.push(current.val);
      lastVisited = current;
      stack.pop();
    } else {
      // 先压入右子节点，再压入左子节点
      if (current.right !== null) {
        stack.push(current.right);
      }
      if (current.left !== null) {
        stack.push(current.left);
      }
    }
  }

  return result;
}

/**
 * 后序遍历（Morris 遍历，空间复杂度 O(1)）
 * @param root 二叉树根节点
 * @returns 后序遍历结果数组
 */
export function postorderTraversalMorris<T>(root: TreeNode<T> | null): T[] {
  const result: T[] = [];
  
  if (root === null) {
    return result;
  }

  const DummyNode = new TreeNode<T>(null as unknown as T);
  DummyNode.left = root;
  let current: TreeNode<T> | null = DummyNode;

  while (current !== null) {
    if (current.left === null) {
      current = current.right ?? null;
    } else {
      let predecessor: TreeNode<T> | null = current.left;
      while (predecessor.right !== null && predecessor.right !== current) {
        predecessor = predecessor.right;
      }

      if (predecessor.right === null) {
        predecessor.right = current;
        current = current.left;
      } else {
        // 反向遍历从当前节点的左子树的右边界
        reverseAddPath(current.left, result);
        predecessor.right = null;
        current = current.right ?? null;
      }
    }
  }

  return result;
}

/**
 * 反向添加路径上的节点值
 */
function reverseAddPath<T>(node: TreeNode<T> | null, result: T[]): void {
  let current = node;
  let prev: TreeNode<T> | null = null;

  // 反向连接
  while (current !== null) {
    const next = current.right;
    current.right = prev;
    prev = current;
    current = next;
  }

  // 遍历反向链表并添加到结果
  let node2: TreeNode<T> | null = prev;
  while (node2 !== null) {
    result.push(node2.val);
    const next = node2.right;
    node2.right = prev;
    prev = node2;
    node2 = next;
  }
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
