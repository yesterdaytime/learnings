// https://leetcode.cn/problems/reverse-integer/

function reverse(x: number): number {
    let ans = 0;

    while (x !== 0) {
        ans = (x % 10) + ans * 10;
        // js 的小数部分不能做位运算，所以在做位运算的时候会舍弃小数部分
        x = (x / 10) | 0;
    }

    if (ans > Math.pow(2, 31) - 1 || ans < Math.pow(-2, 31)) {
        return 0;
    }

    return ans;
}

reverse(123);
