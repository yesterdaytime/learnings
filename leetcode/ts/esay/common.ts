export function combination(n: number, m: number): number {
    let ans = 1;

    for (let i = 0; i < m; i++) {
        ans = (ans * (n - i)) / (m - i);
    }

    return ans;
}

export function arrangement(n: number, m: number) {
    let ans = 1;
    for (let i = 0; i < m; i++) {
        ans = ans * (n - i);
    }
    return ans;
}

var uniquePaths = function (m: number, n: number) {
    let ans = 1;
    for (let x = n, y = 1; y < m; x++, ++y) {
        console.log(x);

        ans = Math.floor((ans * x) / y);
    }
    return ans;
};

console.log(uniquePaths(7, 3));
