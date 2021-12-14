export function solvePart2(binaryNumbers) {
    return oxygenGeneratorRatingFrom(binaryNumbers) * co2ScrubberRatingFrom(binaryNumbers);
}

function oxygenGeneratorRatingFrom(binaryNumbers) {
    return calculateRating(binaryNumbers, bit => bit !== -1? bit : 1);
}


function co2ScrubberRatingFrom(binaryNumbers) {
    return calculateRating(binaryNumbers, bit => bit !== -1? +!bit : 0);
}

function calculateRating(binaryNumbers, bitToMatchFromMostCommonBit) {
    const colCount = binaryNumbers[0].length;
    let colIndex = 0;
    let numbers = binaryNumbers;

    while (numbers.length > 1 && colIndex < colCount) {
        const mostCommonBit = mostCommonBitInCol(numbers, colIndex);
        const bitToMatch = bitToMatchFromMostCommonBit(mostCommonBit).toString();
        const matchedNumbers = [];

        for (let i = 0; i < numbers.length; i++) {
            const num = numbers[i];
            if (num[colIndex] === bitToMatch) matchedNumbers.push(num);
        }

        numbers = matchedNumbers;
        colIndex++;
    }
    
    return parseInt(numbers[0], 2);
}

function mostCommonBitInCol(binaryNumbers, colIndex) {
    const colCount = binaryNumbers[0].length;
    const halfLength = binaryNumbers.length / 2;
    let oneBitCount = 0;

    for (const num of binaryNumbers) {
        if (num[colIndex] === '1') oneBitCount++;
    }

    return oneBitCount === halfLength? -1 : +(oneBitCount > halfLength);
}