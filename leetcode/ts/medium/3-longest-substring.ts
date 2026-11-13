// https://leetcode.cn/problems/longest-substring-without-repeating-characters/

/**
 *
 * Set save the
 *
 *
 *
 *
 *
 *
 */
export function lengthOfLongestSubstring(s: string): number {
    let occ = new Set(),
        max = 0,
        rk = -1;

    for (let i = 0; i < s.length; i++) {
        while (rk + 1 < s.length && !occ.has(s.charAt(rk + 1))) {
            occ.add(s.charAt(rk + 1));
            rk++;
        }

        max = Math.max(max, rk - i + 1);

        occ.delete(s.charAt(i));
    }
    return max;
}
