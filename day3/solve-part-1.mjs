export function solvePart1(binaryNumbers) {
    let gammaBits = '';
    let epsilonBits = '';

    for (const mostCommon of findMostCommonBitPerColumn(binaryNumbers)) {
        const leastCommon = +!mostCommon;

        gammaBits += mostCommon;
        epsilonBits += leastCommon;
    }

    const gammaRate = parseInt(gammaBits, 2);
    const epsilonRate = parseInt(epsilonBits, 2);

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