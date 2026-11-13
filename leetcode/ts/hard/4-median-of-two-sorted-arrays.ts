export function findMedianSortedArrays(
    nums1: number[],
    nums2: number[],
): number {
    let i = 0,
        j = 0,
        nums = [],
        r = 0,
        l = 0;

    while (i < nums1.length || j < nums2.length) {
        if (i < nums1.length && j < nums2.length) {
            if (nums1[i] < nums2[j]) {
                nums.push(nums1[i]);
                i++;
            } else {
                nums.push(nums2[j]);
                j++;
            }
        } else if (i < nums1.length) {
            nums.push(nums1[i]);
            i++;
        } else {
            nums.push(nums2[j]);
            j++;
        }
    }

    if (nums.length % 2 === 0) {
        r = nums.length / 2 - 1;
        l = nums.length / 2;
    } else {
        r = l = Number.parseInt(`${nums.length / 2}`);
    }

    return (nums[r] + nums[l]) / 2;
}

export function findMedianSortedArrays1(
    nums1: number[],
    nums2: number[],
): number {
    let r = 0,
        l = 0,
        len = nums1.length + nums2.length,
        i = 0;

    while (i <= (len % 2 === 0 ? len / 2 : (len - 1) / 2)) {
        l = r;
        if (nums1.length && nums2.length) {
            if (nums2[0] > nums1[0]) {
                r = nums1.shift() || 0;
            } else {
                r = nums2.shift() || 0;
            }
        } else if (nums1.length) {
            r = nums1.shift() || 0;
        } else {
            r = nums2.shift() || 0;
        }
        i++;
    }

    return len % 2 === 0 ? (l + r) / 2 : r;
}
