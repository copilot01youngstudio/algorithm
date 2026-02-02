import {
  TreeNode,
  preorderTraversalRecursive,
  preorderTraversalIterative,
  preorderTraversalMorris,
  buildTreeFromArray,
} from '../preorder-traversal';

describe('TreeNode', () => {
  it('应该正确创建树节点', () => {
    const node = new TreeNode(1);
    expect(node.val).toBe(1);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });

  it('应该正确创建带子节点的树节点', () => {
    const left = new TreeNode(2);
    const right = new TreeNode(3);
    const root = new TreeNode(1, left, right);
    expect(root.val).toBe(1);
    expect(root.left).toBe(left);
    expect(root.right).toBe(right);
  });
});

describe('preorderTraversalRecursive', () => {
  it('应该正确遍历空树', () => {
    const result = preorderTraversalRecursive(null);
    expect(result).toEqual([]);
  });

  it('应该正确遍历只有一个节点的树', () => {
    const root = new TreeNode(1);
    const result = preorderTraversalRecursive(root);
    expect(result).toEqual([1]);
  });

  it('应该正确遍历完全二叉树', () => {
    // 树结构：
    //       1
    //      / \
    //     2   3
    //    / \
    //   4   5
    const root = buildTreeFromArray([1, 2, 3, 4, 5]);
    const result = preorderTraversalRecursive(root);
    expect(result).toEqual([1, 2, 4, 5, 3]);
  });

  it('应该正确遍历只有左子树的树', () => {
    // 树结构：
    //   1
    //  /
    // 2
    //  /
    //   3
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    const result = preorderTraversalRecursive(root);
    expect(result).toEqual([1, 2, 3]);
  });

  it('应该正确遍历只有右子树的树', () => {
    // 树结构：
    // 1
    //  \
    //   2
    //    \
    //     3
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    const result = preorderTraversalRecursive(root);
    expect(result).toEqual([1, 2, 3]);
  });

  it('应该支持字符串类型', () => {
    const root = new TreeNode('A', new TreeNode('B'), new TreeNode('C'));
    const result = preorderTraversalRecursive(root);
    expect(result).toEqual(['A', 'B', 'C']);
  });
});

describe('preorderTraversalIterative', () => {
  it('应该正确遍历空树', () => {
    const result = preorderTraversalIterative(null);
    expect(result).toEqual([]);
  });

  it('应该正确遍历只有一个节点的树', () => {
    const root = new TreeNode(1);
    const result = preorderTraversalIterative(root);
    expect(result).toEqual([1]);
  });

  it('应该正确遍历完全二叉树', () => {
    const root = buildTreeFromArray([1, 2, 3, 4, 5]);
    const result = preorderTraversalIterative(root);
    expect(result).toEqual([1, 2, 4, 5, 3]);
  });

  it('应该正确遍历只有左子树的树', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    const result = preorderTraversalIterative(root);
    expect(result).toEqual([1, 2, 3]);
  });

  it('应该正确遍历只有右子树的树', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    const result = preorderTraversalIterative(root);
    expect(result).toEqual([1, 2, 3]);
  });

  it('结果应该与递归实现相同', () => {
    const root = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
    const recursiveResult = preorderTraversalRecursive(root);
    const iterativeResult = preorderTraversalIterative(root);
    expect(iterativeResult).toEqual(recursiveResult);
  });
});

describe('preorderTraversalMorris', () => {
  it('应该正确遍历空树', () => {
    const result = preorderTraversalMorris(null);
    expect(result).toEqual([]);
  });

  it('应该正确遍历只有一个节点的树', () => {
    const root = new TreeNode(1);
    const result = preorderTraversalMorris(root);
    expect(result).toEqual([1]);
  });

  it('应该正确遍历完全二叉树', () => {
    const root = buildTreeFromArray([1, 2, 3, 4, 5]);
    const result = preorderTraversalMorris(root);
    expect(result).toEqual([1, 2, 4, 5, 3]);
  });

  it('应该正确遍历只有左子树的树', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    const result = preorderTraversalMorris(root);
    expect(result).toEqual([1, 2, 3]);
  });

  it('应该正确遍历只有右子树的树', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    const result = preorderTraversalMorris(root);
    expect(result).toEqual([1, 2, 3]);
  });

  it('结果应该与递归实现相同', () => {
    const root = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
    const recursiveResult = preorderTraversalRecursive(root);
    const morrisResult = preorderTraversalMorris(root);
    expect(morrisResult).toEqual(recursiveResult);
  });
});

describe('buildTreeFromArray', () => {
  it('应该正确构建空树', () => {
    const root = buildTreeFromArray([]);
    expect(root).toBeNull();
  });

  it('应该正确构建只有根节点的树', () => {
    const root = buildTreeFromArray([1]);
    expect(root?.val).toBe(1);
    expect(root?.left).toBeNull();
    expect(root?.right).toBeNull();
  });

  it('应该正确构建完全二叉树', () => {
    const root = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
    expect(root?.val).toBe(1);
    expect(root?.left?.val).toBe(2);
    expect(root?.right?.val).toBe(3);
    expect(root?.left?.left?.val).toBe(4);
    expect(root?.left?.right?.val).toBe(5);
    expect(root?.right?.left?.val).toBe(6);
    expect(root?.right?.right?.val).toBe(7);
  });

  it('应该正确处理包含 null 的数组', () => {
    const root = buildTreeFromArray([1, null, 2, 3]);
    expect(root?.val).toBe(1);
    expect(root?.left).toBeNull();
    expect(root?.right?.val).toBe(2);
    expect(root?.right?.left?.val).toBe(3);
  });

  it('应该正确处理以 null 开头的数组', () => {
    const root = buildTreeFromArray([null, 1, 2]);
    expect(root).toBeNull();
  });
});
