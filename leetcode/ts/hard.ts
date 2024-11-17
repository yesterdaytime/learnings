class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

class HardLeetCode {
    //  Definition for singly-linked list.

    mergeKLists(lists: Array<ListNode | null>): ListNode | null {
        let list = new Array();
        let node = null;

        for (let node of lists) {
            let newNode = node;
            while (newNode) {
                list.push(newNode);
                newNode = newNode.next;
            }
        }

        list.sort((a, b) => a.val - b.val);

        for (let i = 0; i < list.length; i++) {
            if (node === null) {
                node = list[0];
            } else {
                node.next = list[i];
            }
        }

        return list[0];
    }

    //  ((()())())
    //
    longestValidParentheses(s: string): number {
        let list = [];
        // left 需记录前一位第一个有效括号的前以为
        let left = -1;
        let res = 0;

        for (let i = 0; i < s.length; i++) {
            if (s[i] === '(') {
                list.push(i);
            } else {
                if (list.length > 0) {
                    list.pop();
                    if (list.length === 0) {
                        res = Math.max(res, i - left);
                    }

                    if (i === s.length - 1) {
                        res = Math.max(res, i - left - list.length);
                    }
                } else {
                    left = i;
                }
            }
        }

        return res;
    }

    maxSatisfaction(satisfaction: number[]): number {
        satisfaction.sort((a, b) => a - b);

        let firstLtZeroIndex = -1;
        let start = 0;
        let sum = 0;

        if (satisfaction[satisfaction.length - 1] <= 0) {
            return 0;
        }

        for (let i = 0; i < satisfaction.length; i++) {
            if (satisfaction[i] >= 0) {
                if (i > 0 && firstLtZeroIndex === -1) {
                    firstLtZeroIndex = i;
                }

                sum = satisfaction[i] + sum;
            }
        }

        for (let i = firstLtZeroIndex - 1; i > -1; i--) {
            if (satisfaction[i] + sum > 0) {
                sum = sum + satisfaction[i];
            } else {
                start = i + 1;
                break;
            }
        }

        let k = 0;
        let result = 0;
        for (let i = start; i < satisfaction.length; i++) {
            k++;
            result = satisfaction[i] * k + result;
        }

        return result;
    }

    // [2,2,1,2]
    /**
     *
     * @param favorite
     * @returns
     */
    maximumInvitations(favorite: number[]): number {
        let deps = [];
        let favorites = new Array(favorite.length).fill([]);

        for (let i = 0; i < favorite.length; i++) {
            favorites[favorite[i]].push(i);
        }

        return 0;
    }

    minOperationsQueries(
        n: number,
        edges: number[][],
        queries: number[][]
    ): number[] {
        return queries.map((query) => {
            let [start, end] = query;
            if (start < 0 || end > n - 1) {
                return 0;
            }

            let selected: number[][] = [],
                weights: number[] = [];
            const findLeft = (current: number) => {
                let left = edges.find(
                    (edge) =>
                        edge[1] === current &&
                        !selected.some((select) => select === edge)
                );
                if (left) {
                    selected.push(left);
                    weights.push(left[2]);

                    if (left[1] === end) {
                        weights.push(left[2]);
                    } else {
                        findLeft(left[0]);
                    }
                }
            };

            findLeft(start);

            return 0;
        });
    }
}

const hleetCode = new HardLeetCode();

console.log(hleetCode.longestValidParentheses('(()'));

let maxSatisfactionTestData = [-1, -8, 0, 5, -9];
console.log(hleetCode.maxSatisfaction(maxSatisfactionTestData));
