/**
 *  dp[i][j] = s[i] === s[j] && dp[i+1][j-1]
 *
 * @param s
 * @returns
 */

export function longestPalindrome(s: string): string {
    let max = 0,
        dp: Array<Array<boolean>> = [],
        begin = 0;

    if (s.length < 2) {
        return s;
    }

    for (let j = 1; j < s.length; j++) {
        for (let i = 0; i <= j; i++) {
            if (i === j) {
                dp[i][j] = true;
            } else if (j - i === 1) {
                dp[i][j] = s[i] === s[j];
            } else {
                dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];
            }

            if (j - i > max && dp[i][j]) {
                max = j - i;
                begin = i;
            }
        }
    }

    return s.substring(begin, begin + max + 1);
}

function expandAroundCenter(s: string, left: number, right: number) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }

    return [left + 1, right - 1];
}

export function longestPalindrome1(s: string): string {
    let start = 0,
        end = 0;

    for (let i = 0; i < s.length; i++) {
        const [start1, end1] = expandAroundCenter(s, i, i);
        const [start2, end2] = expandAroundCenter(s, i, i + 1);
        [start, end] =
            end1 - start1 > end2 - start2 ? [start1, end1] : [start2, end2];
    }

    return s.substring(start, end + 1);
}
