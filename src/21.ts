/**
 * 21. 合并两个有序链表
 * 将两个升序链表合并为一个新的升序链表并返回。
 * 新链表是通过拼接给定的两个链表的所有节点组成的。
 */

// 定义链表节点
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * 合并两个升序链表
 * @param list1 第一个升序链表的头节点
 * @param list2 第二个升序链表的头节点
 * @returns 合并后的升序链表的头节点
 *
 * 时间复杂度: O(n + m)，其中 n 和 m 分别是两个链表的长度
 * 空间复杂度: O(1)，只使用了常数级的额外空间
 */
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  // 创建一个虚拟头节点，便于处理
  const dummyHead = new ListNode(0);
  let current = dummyHead;

  // 两个指针分别指向两个链表的当前节点
  let p1 = list1;
  let p2 = list2;

  // 比较两个链表中的节点，选择较小的节点添加到结果链表
  while (p1 !== null && p2 !== null) {
    if (p1.val <= p2.val) {
      current.next = p1;
      p1 = p1.next;
    } else {
      current.next = p2;
      p2 = p2.next;
    }
    current = current.next;
  }

  // 将剩余的节点添加到结果链表
  if (p1 !== null) {
    current.next = p1;
  } else {
    current.next = p2;
  }

  return dummyHead.next;
}

export { ListNode, mergeTwoLists };
