import { gNodeList, ListNode } from '../struct';

function mergeTListNode(node1: ListNode | null, node2: ListNode | null) {
    let node = new ListNode(),
        currentNode = node;
    while (node1 || node2) {
        if (!node1) {
            currentNode.val = node2?.val || 0;
            break;
        }

        if (!node2) {
            currentNode.val = node1.val;
            break;
        }

        if (node1.val > node2.val) {
            currentNode.val = node2.val;
            node2 = node2.next;
        } else {
            currentNode.val = node1.val;
            node1 = node1.next;
        }
        currentNode.next = new ListNode();
        currentNode = currentNode.next;
    }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    return null;
}

gNodeList([]);
