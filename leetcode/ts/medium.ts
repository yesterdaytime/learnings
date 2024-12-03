/**
 Definition for singly-linked list.
 */
export class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}
class MediumLeetCode {
    //#region worked and tested function
    addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
        let val = 0,
            carry = 0,
            result: ListNode | null = new ListNode(0);
        while (l1 || l2 || carry) {
            let total = (l1?.val || 0) + (l2?.val || 0) + carry;
            val = total % 10;
            carry = total > 9 ? 1 : 0;
            result.val = val;

            console.log(carry, total);

            let temp = result;
            result = new ListNode(0);
            result.next = temp;

            l1 = l1?.next || null;
            l2 = l2?.next || null;
        }

        return result.next;
    }

    splitNum(num: number): number {
        let sortedStr = String(num)
            .split('')
            .map((n) => Number(n))
            .sort();
        let num1 = '';
        let num2 = '';

        for (let m = 0; m < sortedStr.length; m++) {
            if (m % 2 === 0) {
                num1 += String(sortedStr[m]);
            } else {
                num2 += String(sortedStr[m]);
            }
        }

        return Number(num1) + Number(num2);
    }

    sumDistance(nums: number[], s: string, d: number): number {
        for (let i = 0; i < nums.length; i++) {
            nums[i] = s[i] === 'R' ? nums[i] + d : nums[i] - d;
        }
        let res = 0;
        // TODO 需要优化
        for (let i = 0; i < nums.length - 1; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                res += Math.abs(nums[i] - nums[j]) % (1e9 + 7);
            }
        }

        return res;
    }

    topStudents(
        positive_feedback: string[],
        negative_feedback: string[],
        report: string[],
        student_id: number[],
        k: number
    ): number[] {
        let students = new Array(report.length);
        let positive_feedbacks = new Set(positive_feedback);
        let negative_feedbacks = new Set(negative_feedback);

        for (let i = 0; i < report.length; i++) {
            students[i] = [student_id[i], 0];
            let sorce = students[i][1];
            for (let str of report[i].split(' ')) {
                if (positive_feedbacks.has(str)) {
                    sorce = sorce + 3;
                }
                if (negative_feedbacks.has(str)) {
                    sorce = sorce - 1;
                }
            }
            students[i][1] = sorce;
        }

        console.log(students);
        students.sort((a, b) =>
            b[1] - a[1] === 0 ? a[0] - b[0] : b[1] - a[1]
        );

        return students.slice(0, k).map((s) => s[0]);
    }

    findTheArrayConcVal(nums: number[]): number {
        let res = 0;
        for (let i = 0, j = nums.length - 1; i <= j; i++, j--) {
            if (i === j) {
                res += nums[i];
            } else {
                res += Number(`${nums[i]}${nums[j]}`);
            }
        }

        return res;
    }

    findMedianSortedArrays(nums1: number[], nums2: number[]): number {
        let i = 0;
        let j = 0;
        let list = [];
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] <= nums2[j]) {
                list.push(nums1[i]);
                i++;
            } else {
                list.push(nums2[j]);
                j++;
            }
        }

        if (i < nums1.length) {
            list = list.concat(nums1.slice(i));
        }

        if (j < nums2.length) {
            list = list.concat(nums2.slice(j));
        }
        let mid = Math.floor(list.length / 2);
        return list.length % 2 === 0
            ? (list[mid] + list[mid - 1]) / 2
            : list[mid];
    }

    longestPalindrome(s: string): string {
        let longStr = '';

        for (let i = 0; i < s.length; i++) {
            for (let j = s.length - 1; j - i >= longStr.length; j--) {
                if (s[i] === s[j]) {
                    let checkStr = s.slice(i, j + 1);
                    if (this.isLongestPalindrome(checkStr)) {
                        console.log('isLongest', checkStr);
                        longStr = checkStr;
                        break;
                    }
                }
            }
        }

        return longStr.length === 0 ? s[0] : longStr;
    }

    private isLongestPalindrome(str: string) {
        let isLongestPalindrome = true;
        for (let i = 0, j = str.length - 1; i < j; i++, j--) {
            if (str[i] !== str[j]) {
                isLongestPalindrome = false;
                break;
            }
        }
        return isLongestPalindrome;
    }

    longestPalindrome1(s: string): string {
        const len = s.length;
        if (len < 2) return s;
        let maxlen = 1;
        let ml = 0,
            mr = 0;

        for (let i = 0; i < len - maxlen / 2; ++i) {
            let l = i - 1,
                r = i + 1;
            while (l >= 0 && r < len && s[l] === s[r]) {
                --l;
                ++r;
            }
            ++l;
            --r;
            if (r - l + 1 > maxlen) {
                maxlen = r - l + 1;
                ml = l;
                mr = r;
            }
        }

        for (let i = 1; i < len - maxlen / 2; ++i) {
            if (s[i] !== s[i - 1]) continue;
            let l = i - 1,
                r = i;
            while (l >= 0 && r < len && s[l] === s[r]) {
                --l;
                ++r;
            }
            ++l;
            --r;
            if (r - l + 1 > maxlen) {
                maxlen = Math.max(maxlen, r - l + 1);
                ml = l;
                mr = r;
            }
        }

        return s.slice(ml, mr + 1);
    }

    reverse(x: number): number {
        let res = 0;
        let isNegative = x < 0;
        x = Math.abs(x);

        while (x > 0) {
            res = res + (x % 10) * 10;
            x = Math.floor(x / 10);
        }

        res = isNegative ? -res : res;

        if (Math.pow(-2, 31) <= res || res <= Math.pow(2, 31) - 1) {
            return res;
        }

        return 0;
    }

    isMatch(s: string, p: string): boolean {
        let indexP = 0;
        let res = true;

        if (s === p) {
            return res;
        }

        return res;
    }

    maxArea(height: number[]): number {
        let max = 0;
        let area = 0;
        for (let i = 0, j = height.length - 1; i < j; ) {
            area = Math.min(height[i], height[j]) * (j - i);
            if (max < area) {
                max = area;
            }

            if (height[i] < height[j]) {
                i++;
            } else {
                j++;
            }
        }

        return max;
    }

    minimumPossibleSum(n: number, target: number): number {
        let list = [];
        let negativeList = new Set();
        let i = 0;
        let sum = 0;
        while (list.length < n) {
            i++;
            if (!negativeList.has(i)) {
                if (target - i !== i) {
                    list.push(i);
                    sum = sum + i;
                    negativeList.add(target - i);
                }
            }
        }

        return sum;
    }

    /**
     * 
     * @param plants 
     * @param capacity 
     * @returns 
     * 
     * 你打算用一个水罐给花园里的 n 株植物浇水。植物排成一行，从左到右进行标记，编号从 0 到 n - 1 。其中，第 i 株植物的位置是 x = i 。x = -1 处有一条河，你可以在那里重新灌满你的水罐。

        每一株植物都需要浇特定量的水。你将会按下面描述的方式完成浇水：

        按从左到右的顺序给植物浇水。
        在给当前植物浇完水之后，如果你没有足够的水 完全 浇灌下一株植物，那么你就需要返回河边重新装满水罐。
        你 不能 提前重新灌满水罐。
        最初，你在河边（也就是，x = -1），在 x 轴上每移动 一个单位 都需要 一步 。

        给你一个下标从 0 开始的整数数组 plants ，数组由 n 个整数组成。其中，plants[i] 为第 i 株植物需要的水量。另有一个整数 capacity 表示水罐的容量，返回浇灌所有植物需要的 步数 。

        

        示例 1：

        输入：plants = [2,2,3,3], capacity = 5
        输出：14
        解释：从河边开始，此时水罐是装满的：
        - 走到植物 0 (1 步) ，浇水。水罐中还有 3 单位的水。
        - 走到植物 1 (1 步) ，浇水。水罐中还有 1 单位的水。
        - 由于不能完全浇灌植物 2 ，回到河边取水 (2 步)。
        - 走到植物 2 (3 步) ，浇水。水罐中还有 2 单位的水。
        - 由于不能完全浇灌植物 3 ，回到河边取水 (3 步)。
        - 走到植物 3 (4 步) ，浇水。
        需要的步数是 = 1 + 1 + 2 + 3 + 3 + 4 = 14 。
        示例 2：

        输入：plants = [1,1,1,4,2,3], capacity = 4
        输出：30
        解释：从河边开始，此时水罐是装满的：
        - 走到植物 0，1，2 (3 步) ，浇水。回到河边取水 (3 步)。
        - 走到植物 3 (4 步) ，浇水。回到河边取水 (4 步)。
        - 走到植物 4 (5 步) ，浇水。回到河边取水 (5 步)。
        - 走到植物 5 (6 步) ，浇水。
        需要的步数是 = 3 + 3 + 4 + 4 + 5 + 5 + 6 = 30 。
        示例 3：

        输入：plants = [7,7,7,7,7,7,7], capacity = 8
        输出：49
        解释：每次浇水都需要重新灌满水罐。
        需要的步数是 = 1 + 1 + 2 + 2 + 3 + 3 + 4 + 4 + 5 + 5 + 6 + 6 + 7 = 49 。

     */
    wateringPlants(plants: number[], capacity: number): number {
        let surplus = capacity;
        let steps = 0;

        for (let i = 0; i < plants.length; i++) {
            if (plants[i] > capacity) {
                continue;
            }
            if (surplus >= plants[i]) {
                steps += 1;
            } else {
                surplus = capacity;
                steps = 2 * i + 1 + steps;
            }

            surplus = surplus - plants[i];

            console.log(steps);
        }

        return steps;
    }

    // TODO I can't solve this problem
    minimumEffortPath(heights: number[][]): number {
        let dp: number[][] = [],
            abs: number[][] = [];

        if (!heights[0]) {
            return 0;
        }

        let minAbs = (i: number, j: number) => {
            const left = i > 0 ? heights[i - 1][j] : Number.MAX_SAFE_INTEGER;
            const up = j > 0 ? heights[i][j - 1] : Number.MAX_SAFE_INTEGER;
            const right =
                i < heights.length - 1
                    ? heights[i + 1][j]
                    : Number.MAX_SAFE_INTEGER;
            const down =
                j < (heights[0].length || 0)
                    ? heights[i][j + 1]
                    : Number.MAX_SAFE_INTEGER;
            return Math.min(
                Math.abs(heights[i][j] - left),
                Math.abs(heights[i][j] - right),
                Math.abs(heights[i][j] - up),
                Math.abs(heights[i][j] - down)
            );
        };

        for (let i = 0; i < heights.length; i++) {
            abs[i] = [];
            for (let j = 0; j < heights[0].length; j++) {
                abs[i][j] = minAbs(i, j);
            }
        }

        for (let k = 0; k < abs.length; k++) {
            dp[k] = [];
            for (let l = 0; l < abs[0].length; l++) {}
        }

        return dp[heights.length - 1][heights[0].length - 1];
    }

    wordPuzzle(grid: string[][], target: string): boolean {
        let book: boolean[][] = [];
        let words: { [index in string]: number[][] } = {};
        for (let i = 0; i < grid.length; i++) {
            book[i] = [];
            for (let j = 0; j < grid[i].length; j++) {
                words[grid[i][j]] = (words[grid[i][j]] || []).concat([i, j]);
                book[i][j] = false;
            }
        }

        let dfs = (x: number, y: number) => {
            book[x][y] = true;
            dfs(x, y);
            book[x][y] = false;
        };

        for (let j = 0; j < target.length; j++) {}

        return false;
    }

    longestPalindrome2(s: string) {
        let dp: Array<boolean>[] = Array.from(s).map(() => []),
            maxStr = '';

        for (let j = 0; j < s.length; j++) {
            for (let i = 0; i <= j; i++) {
                if (i === j) {
                    dp[i][j] = true;
                } else if (j - i === 1) {
                    dp[i][j] = s[i] === s[j];
                } else {
                    dp[i][j] = dp[i + 1][j - 1] && s[i] === s[j];
                }

                if (j - i >= maxStr.length && dp[i][j]) {
                    console.log(i, j);
                    maxStr = s.substring(i, j + 1);
                }
            }
        }

        return maxStr;
    }
    gNodeList(list: number[]): ListNode | null {
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

    dListNode(l: ListNode | null) {
        let list = [];
        while (l) {
            list.push(l.val);
            l = l.next;
        }
        return list;
    }
    //#endregion

    //#region  Working function

    longestPalindromeSubseq(s: string): number {
        const dp: number[][] = Array.from(s).map(() =>
            Array.from(s).map(() => 1)
        );
        let max = s.length ? 1 : 0;

        for (let j = 0; j < s.length; j++) {
            for (let i = 0; i < j; i++) {
                if (j - i === 1) {
                    dp[i][j] = s[i] === s[j] ? 2 : 0;
                } else if (s[i] === s[j]) {
                    dp[i][j] = dp[i + 1][j - 1] + 2;
                } else {
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                }

                if (dp[i][j] > max) {
                    max = dp[i][j];
                }
            }
        }

        console.log(dp);

        return max;
    }
    //#endregion
}

const mleetCode = new MediumLeetCode();
(function () {
    console.log(mleetCode.splitNum(4325));
    console.log(mleetCode.splitNum(687));

    console.log(mleetCode.sumDistance([-2, 0, 2], 'RLL', 3));

    let positive_feedback = ['smart', 'brilliant', 'studious'],
        negative_feedback = ['not'],
        report = ['this student is not studious', 'the student is smart'],
        student_id = [1, 2],
        k = 2;
    console.log(
        mleetCode.topStudents(
            positive_feedback,
            negative_feedback,
            report,
            student_id,
            k
        )
    );

    console.log(mleetCode.findTheArrayConcVal([5, 14, 13, 8, 12]));

    let nums1 = [1, 3],
        nums2 = [2, 4];
    console.log(mleetCode.findMedianSortedArrays(nums1, nums2));

    console.log(mleetCode.longestPalindrome('aacabdkacaa'));

    console.log(mleetCode.wateringPlants([3, 2, 4, 2, 1], 6));
    console.log(
        mleetCode.minimumEffortPath([
            [1, 2, 1, 1, 1],
            [1, 2, 1, 2, 1],
            [1, 2, 1, 2, 1],
            [1, 2, 1, 2, 1],
            [1, 1, 1, 2, 1],
        ])
    );
    console.log(
        mleetCode.dListNode(
            mleetCode.addTwoNumbers(
                mleetCode.gNodeList([9, 9, 9, 9, 9, 9, 9]),
                mleetCode.gNodeList([9, 9, 9, 9])
            )
        )
    );

    console.log(mleetCode.longestPalindrome('aacabdkacaa'));
    console.log(mleetCode.longestPalindrome2('cbbd'));
});

console.log(mleetCode.longestPalindromeSubseq('abcabcabcabc'));
