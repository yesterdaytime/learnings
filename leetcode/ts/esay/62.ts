function uniquePaths(m: number, n: number): number {
    return combination(m + n - 2, m - 1);
}

function combination(m: number, n: number) {
    let ans = 1;
    for (let i = 0; i < n; i++) {
        ans = (ans * (m - i)) / (n - i);
    }

    return ans;
}

console.log(uniquePaths(7, 3));
