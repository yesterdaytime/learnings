function longestPalindrome(s: string): string {
    let left = 0,
        right = s.length - 1,
        rL = 0,
        rR = 0;
    let checkPalindrome = (l: number, r: number) => {
        let isPalindrome = true;
        while (l <= r) {
            if (!(s[l++] === s[r--])) {
                isPalindrome = false;
                break;
            }
        }

        return isPalindrome;
    };

    for (let i = 0; i < right; i++) {
        for (let j = s.length - 1; j > i; j--) {
            let max = rR - rL;
            if (max > j - i) {
                break;
            }
            if (checkPalindrome(i, j)) {
                if (rR - rL < j - i) {
                    rR = j;
                    rL = i;
                }
            }
        }
    }

    return s.substring(rL, rR + 1);
}

function longestPalindrome1(s: string): string {
    let dp: boolean[][] = [],
        rl = 0,
        rr = 0;
    for (let i = 0; i < s.length; i++) {
        dp[i] = [];
        dp[i][i] = true;
    }

    for (let j = 0; j < s.length; j++) {
        for (let i = 0; i < s.length; i++) {
            if (j <= i) {
                break;
            }
            if (j === i + 1) {
                dp[i][j] = s[i] === s[j];
            } else {
                dp[i][j] = dp[i + 1][j - 1] && s[i] === s[j];
            }

            if (j - i > rr - rl) {
                rr = j;
                rl = i;
            }
        }
    }

    return s.substring(rl, rr + 1);
}

let s = 'bb',
    start = Date.now();

console.log(longestPalindrome1(s), Date.now() - start);
