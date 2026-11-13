/**
 *  https://leetcode.cn/problems/minimum-changes-to-make-alternating-binary-string/?envType=daily-question&envId=2026-03-05
 * @param s
 *
 * @returns number
 */
function minOperations(s: string): number {
    let start0 = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === (i % 2 === 0 ? '1' : '0')) {
            start0++;
        }
    }

    return start0 > s.length / 2 ? s.length - start0 : start0;
}
