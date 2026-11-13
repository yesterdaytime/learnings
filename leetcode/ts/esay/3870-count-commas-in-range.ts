function countCommas(n: number): number {
    if (n < 10000) {
        return 0;
    }

    if (n > Math.pow(10, 5)) {
        return Math.pow(10, 5) - 999;
    }

    return n - 999;
}
