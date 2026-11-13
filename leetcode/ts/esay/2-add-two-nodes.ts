import { ListNode } from '../struct';

function addTwoNumbers(
    l1: ListNode | null,
    l2: ListNode | null,
): ListNode | null {
    if (!l1 || !l2) {
        return l1 || l2;
    }

    let rootNode = new ListNode(),
        carry = 0,
        currNode = null,
        pre = rootNode;

    while (l1 || l2 || carry) {
        currNode = new ListNode();
        const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        currNode.val = sum % 10;
        carry = sum > 9 ? 1 : 0;

        l1 = l1?.next || null;
        l2 = l2?.next || null;

        pre.next = currNode;
        pre = currNode;
    }

    return rootNode.next;
}
