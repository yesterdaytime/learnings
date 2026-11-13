import { gNodesWithParams, ListNode, tranListNode } from '../struct';

function addTwoNumbers(
    l1: ListNode | null,
    l2: ListNode | null,
): ListNode | null {
    let root = new ListNode(),
        current = root,
        remained = 0;

    while (l1 || l2 || remained) {
        current.next = new ListNode();
        current = current.next;

        let value = (l1?.val || 0) + (l2?.val || 0) + remained;
        current.val = value % 10;
        remained = (value / 10) | 0;

        l1 = l1?.next || null;
        l2 = l2?.next || null;
    }

    return root.next;
}

let l1 = [0],
    l2 = [7, 3];
let [n1, n2] = gNodesWithParams(l1, l2);

console.log(tranListNode(addTwoNumbers(n1, n2)));
