// https://leetcode.cn/problems/two-sum/

function twoSum(nums: number[], target: number): number[] {
    let sumObj: { [index: number]: number } = {},
        ans: number[] = [];

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (Object.hasOwn(sumObj, num)) {
            ans = [sumObj[num], i];
            break;
        }
        sumObj[target - num] = i;
    }

    return ans;
}
