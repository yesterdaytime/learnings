function isMatch(s: string, p: string): boolean {
    let m = s.length,
        n = p.length;

    let f: boolean[][] = [];
    for (let i = 0; i <= m; i++) {
        f[i] = [];
        for (let j = 0; j <= n; j++) {
            f[i][j] = false;
        }
    }
    f[0][0] = true;

    function matches(s: string, p: string, i: number, j: number) {
        if (i == 0) {
            return false;
        }
        if (p.charAt(j - 1) == '.') {
            return true;
        }
        return s.charAt(i - 1) == p.charAt(j - 1);
    }

    for (let i = 0; i <= m; ++i) {
        for (let j = 1; j <= n; ++j) {
            if (p.charAt(j - 1) == '*') {
                f[i][j] = f[i][j - 2];
                if (matches(s, p, i, j - 1)) {
                    f[i][j] = f[i][j] || f[i - 1][j];
                }
            } else {
                if (matches(s, p, i, j)) {
                    f[i][j] = f[i - 1][j - 1];
                }
            }
        }
    }
    console.log(f);

    return f[m][n];
}

function isMatch1(s: string, p: string) {
    let dp: boolean[][] = [];

    let matchers = (i: number, j: number) => {
        return s[i - 1] === p[j - 1] || p[j - 1] === '.';
    };

    for (let i = 0; i <= s.length; i++) {
        dp[i] = [];
        for (let j = 0; j <= p.length; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = i === 0 && j === 0;
            } else if (matchers(i, j)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j] === '*') {
                if (p[j - 1] === s[i]) {
                    dp[i][j] = dp[i - 1][j] || dp[i - 1][j - 1];
                } else {
                    dp[i][j] = dp[i - 1][j - 2];
                }
            }
        }
    }
}

console.log(isMatch('abbbbc', 'ab*d*c'));
