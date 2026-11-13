function makesquare(matchsticks: number[]): boolean {
    let sum = matchsticks.reduce((pre, curr) => pre + curr, 0),
        map: { [index: number]: number } = {},
        remainder = sum % 4,
        average = Math.floor(sum / 4);
    if (remainder === 0) {
        for (let len of matchsticks) {
            map[len] = (map[len] || 0) + 1;
        }

        for (let len of matchsticks) {
            if (average === len) {
                map[len] = 0;
            } else if (map[average - len]) {
                map[average - len] -= 1;
            } else {
                break;
            }
        }

        return Object.values(map).filter(Boolean).length === 0;
    }
    return false;
}

let matchsticks = [1, 1, 2, 2, 2];
console.log(makesquare(matchsticks));
