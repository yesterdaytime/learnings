export class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

export function gNodesWithParams(...list: number[][]) {
    return list.map((item) => gNodeList(item));
}

export function gNodeList(list: number[]): ListNode | null {
    let result: ListNode | null = null,
        temp: ListNode | null = null;
    for (let item of list) {
        if (temp) {
            temp.next = new ListNode(item);
            temp = temp.next;
        } else {
            result = temp = new ListNode(item);
        }
    }

    return result;
}

export function tranListNode(l: ListNode | null) {
    let list = [];
    while (l) {
        list.push(l.val);
        l = l.next;
    }
    return list;
}
