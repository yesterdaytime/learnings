class MediumLeetCode {
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
                    console.log(checkStr);
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
});

console.log(mleetCode.longestPalindrome('aacabdkacaa'));
