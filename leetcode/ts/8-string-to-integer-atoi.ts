function myAtoi(s: string): number {
    const regex = /^\s*[+|-]?\d+/,
        max = Math.pow(2, 31) - 1,
        min = Math.pow(-2, 31);
    let numStr = s.match(regex)?.[0];
    let num = 0;

    if (numStr) {
        num = Number(numStr);
    }

    if (num > max) {
        return max;
    }

    if (num < min) {
        return min;
    }

    return num;
}

myAtoi('42');
