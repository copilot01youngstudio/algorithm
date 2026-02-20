export class ListNode {
  val: number;

  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * 两数相加（链表逆序存储）
 * @param l1 第一个非空链表
 * @param l2 第二个非空链表
 * @returns 表示和的逆序链表
 */
export function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  const dummyHead = new ListNode();
  let current: ListNode = dummyHead;

  let p: ListNode | null = l1;
  let q: ListNode | null = l2;
  let carry = 0;

  while (p !== null || q !== null || carry > 0) {
    const x = p?.val ?? 0;
    const y = q?.val ?? 0;

    const sum = x + y + carry;
    carry = Math.floor(sum / 10);

    current.next = new ListNode(sum % 10);
    current = current.next;

    p = p?.next ?? null;
    q = q?.next ?? null;
  }

  return dummyHead.next;
}
