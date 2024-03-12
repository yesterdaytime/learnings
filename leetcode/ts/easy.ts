class LeetCode {
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

    singleNumber(nums: number[]): number {
        let resObj: any = {};
        let res = 0;

        for (let i = 0; i < nums.length; i++) {
            let key = nums[i];
            resObj[key] = (resObj[key] || 0) + 1;
        }

        Object.keys(resObj).forEach((key) => {
            if (resObj[key] === 1) {
                res = Number(key);
                return;
            }
        });

        return res;
    }

    /**
     *
     * @param nums
     * @returns
     *
     * 几个定理：
     *      a ^ b ^ c  = a ^ (b ^ c)
     *      a ^ a = 0
     *      0 ^ a = a
     *  所以对数组中的值进行位运算，相同的两个抵消掉了，为0，最后剩余的就是最后的结果
     */
    singleNumber1(nums: number[]): number {
        let res = 0;
        for (let i of nums) {
            res ^= i;
            console.log(res);
        }
        return res;
    }

    /**
     *  数组中只有一个数字是只有一个，其他都是3个重复的
     * @param nums
     * @returns
     */
    singleNumber2(nums: number[]): number {
        let cnt = new Array(32).fill(0);
        for (let i = 0; i < nums.length; i++) {
            for (let j = 0; j < 32; j++) {
                cnt[j] += (nums[i] >> j) & 1;
            }
        }

        let res = 0;
        for (let i = 0; i < cnt.length; i++) {
            res += cnt[i] % 3 << i;
        }

        return res;
    }

    /**
     * 数组中有两个是单独的， 其他都是有2个
     * @param nums
     */
    singleNumber3(nums: number[]): number[] {
        let resObj: any = {};
        for (let i = 0; i < nums.length; i++) {
            let key = nums[i];
            if (!resObj[key]) {
                resObj[key] = 1;
            } else {
                delete resObj[key];
            }
        }

        return Object.keys(resObj).map(Number);
    }

    /**
     * 数组中有两个是单独的， 其他都是有2个
     * @param nums
     *
     * 1. 找到 a ^ b 的值
     * 2. 根据 mid & (-mid) 找出第一个为1的位
     * 3，根据为1的位将数组分成两组，可以用之前的方法取或求值
     *
     */
    singleNumber4(nums: number[]): number[] {
        let mid = 0;
        let a = 0;
        let b = 0;

        for (let i = 0; i < nums.length; i++) {
            mid = mid ^ nums[i];
        }

        mid = mid & -mid;

        for (let m of nums) {
            if ((m & mid) === 0) {
                a = a ^ m;
            } else {
                b = b ^ m;
            }
        }

        return [a, b];
    }

    sumOfMultiples(n: number): number {
        let sum = 0;
        for (let i = 0; i < n + 1; i++) {
            if (i % 7 === 0 || i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }

        return sum;
    }

    sumOfMultiples1(n: number): number {
        let sum = 0;

        // let n = Math.floor(num / m)
        // (m*n + m)*n / 2 => (m*n*n + m*n) / 2
        let cal = (n: number, m: number) => {
            let k = Math.floor(n / m);
            return (m * (k + 1) * k) / 2;
        };

        return (
            cal(n, 3) +
            cal(n, 5) +
            cal(n, 7) -
            cal(n, 3 * 5) -
            cal(n, 3 * 7) -
            cal(n, 5 * 7) +
            cal(n, 3 * 5 * 7)
        );
    }

    /**
     *
     * @param nums
     * @param k
     * @returns
     *  超时解法
     */
    maxKelements(nums: number[], k: number): number {
        let score = 0;

        nums.sort((a, b) => b - a);

        for (let i = 0; i < k; i++) {
            score += nums[0];
            nums[0] = Math.ceil(nums[0] / 3);

            for (let j = 1; j < k + 1 && j < nums.length; j++) {
                if (nums[j - 1] < nums[j]) {
                    let temp = nums[j - 1];
                    nums[j - 1] = nums[j];
                    nums[j] = temp;
                }
            }
        }

        return score;
    }

    /**
     *
     * @param nums
     * @param k
     * @returns
     *  将计算过的值放在另一个list中， 这样就能保证前面的都大于后面的
     */
    maxKelements1(nums: number[], k: number): number {
        let list: number[] = [];
        let score = 0;
        nums.sort((a, b) => b - a);

        for (let i = 0, j = 0; k--; ) {
            if (j >= list.length || (nums[i] > list[j] && i < nums.length)) {
                score += nums[i];
                list.push(Math.ceil(nums[i++] / 3));
            } else {
                score += list[j];
                list.push(Math.ceil(list[j++] / 3));
            }
        }

        return score;
    }

    tupleSameProduct(nums: number[]): number {
        nums.sort((a, b) => a - b);

        console.log(nums);

        let i = 0;
        let j = nums.length - 1;
        let list = [];

        while (i < j) {
            let k = i + 1;
            let l = j - 1;

            while (k < l) {
                let result = nums[i] * nums[j];

                if (result === nums[k] * nums[l]) {
                    list.push([nums[i], nums[k], nums[l], nums[j]]);
                    k++;
                    l--;
                } else if (result < nums[k] * nums[l] && k < l - 1) {
                    if (nums[k + 1] * nums[l] > nums[k] * nums[l - 1]) {
                        k++;
                    } else {
                        l--;
                    }
                } else {
                    break;
                }
            }

            if (nums[i + 1] * nums[j] > nums[i] * nums[j - 1]) {
                i++;
            } else {
                j--;
            }
        }

        console.log(list);

        return list.length * 8;
    }
}

const leetCode = new LeetCode();

(function () {
    console.log(leetCode.splitNum(4325));
    console.log(leetCode.splitNum(687));
});
let nums = [2, 3, 4, 6, 8, 12];

//
console.log(leetCode.tupleSameProduct(nums));
