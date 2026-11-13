// https://leetcode.cn/problems/minimum-distance-to-type-a-word-using-two-fingers/description/?envType=daily-question&envId=2026-09-08

type Point = [number, number];

function minimumDistance(word: string): number {
    word = word.toUpperCase();
    let result = 0,
        wArr: Point[] = [],
        arr1 = [],
        arr2 = [],
        index2 = 0,
        maxDistance = 0;
    let getPos = (index: number): Point => {
        return [Math.floor(index / 6), index % 6];
    };

    let getDistance = (p1: Point, p2: Point) => {
        return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
    };

    for (let i = 0; i < word.length; i++) {
        let pos = getPos(word.charCodeAt(i) - 65);

        wArr.push(pos);
    }

    arr1.push(wArr[0]);
    for (let i = 1; i < wArr.length; i++) {
        let distance = getDistance(wArr[i - 1], wArr[i]);
        if (distance > maxDistance) {
            maxDistance = distance;
            index2 = i;
        }
    }

    arr2.push(wArr[index2]);

    for (let i = 1; i < wArr.length; i++) {
        if (i === index2) {
            continue;
        }
        if (i < index2) {
            arr1.push(wArr[i]);
        } else {
            let d1 = getDistance(arr1[arr1.length - 1], wArr[i]);
            let d2 = getDistance(arr2[arr2.length - 1], wArr[i]);

            if (d1 < d2) {
                arr1.push(wArr[i]);
            } else {
                arr2.push(wArr[i]);
            }
        }
    }

    let getAllDistance = (arr: Point[]) =>
        arr
            .map((curr, index) =>
                index > 0 ? getDistance(curr, arr[index - 1]) : 0,
            )
            .reduce((pre, curr) => pre + curr, 0);

    result = getAllDistance(arr1) + getAllDistance(arr2);

    return result;
}

console.log(minimumDistance('YEAR'));
