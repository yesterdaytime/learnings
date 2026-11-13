function isPalindrome(x: number): boolean {
    if (x < 0) {
        return false;
    }

    const xStr = `${x}`;
    let ans = true;

    for (let i = 0, j = xStr.length - 1; i <= j; i++, j--) {
        if (xStr[i] !== xStr[j]) {
            ans = false;
            break;
        }
    }

    return ans;
}
function isPalindrome1(x: number): boolean {
    if (x < 0) {
        return false;
    }
    let reverseNum = 0;

    while (x > reverseNum) {
        reverseNum = reverseNum * 10 + (x % 10);
        x = (x / 10) | 0;
    }

    return reverseNum === x || x < 10;
}
