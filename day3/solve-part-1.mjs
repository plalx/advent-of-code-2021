export function solvePart1(binaryNumbers) {
    let gammaRate = 0;
    let epsilonRate = 0;
    let nextBit = 1;

    for (const mostCommon of mostCommonBitPerCol(binaryNumbers)) {
        const leastCommon = +!mostCommon;

        gammaRate += mostCommon * nextBit;
        epsilonRate += leastCommon * nextBit;

        nextBit *= 2;
    }

    return gammaRate * epsilonRate;
}

function *mostCommonBitPerCol(binaryNumbers) {
    const colCount = binaryNumbers[0].length;
    const halfLength = binaryNumbers.length / 2;
    
    for (let colIndex = colCount - 1; colIndex >= 0; colIndex--) {
        let oneBitCount = 0;

        for (const num of binaryNumbers) {
            if (num[colIndex] === '1') oneBitCount++;
        }

        yield +(oneBitCount > halfLength);
    }
}