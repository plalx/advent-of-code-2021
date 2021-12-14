export function solvePart1(binaryNumbers) {
    let gammaRate = 0;
    let epsilonRate = 0;
    let nextBit = 1;

    const mostCommonBits = findMostCommonBitPerColumn(binaryNumbers);

    for (let i = mostCommonBits.length - 1; i >= 0; i--) {
        const mostCommon = mostCommonBits[i];
        const leastCommon = +!mostCommon;

        gammaRate += mostCommon * nextBit;
        epsilonRate += leastCommon * nextBit;

        nextBit *= 2;
    }

    return gammaRate * epsilonRate;
}

function findMostCommonBitPerColumn(binaryNumbers) {
    const oneBitCountsPerCol = new Array(binaryNumbers[0].length);
    oneBitCountsPerCol.fill(0);

    for (let num of binaryNumbers) {
        for (let i = 0; i < num.length; i++) {
            if (num[i] === '1') oneBitCountsPerCol[i]++;
        }
    }

    return oneBitCountsPerCol.map(oneCount => Number(oneCount > binaryNumbers.length / 2));
}