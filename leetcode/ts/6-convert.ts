function convert(s: string, numRows: number): string {
    let sArr: string[] = [],
        direct = 1,
        index = 0;

    for (let i = 0; i < s.length; i++) {
        sArr[index] = (sArr[index] || '') + s[i];

        if ((i !== 0 && index === 0) || index === numRows) {
            direct = -direct;
        }

        index += direct;
    }

    return s;
}
