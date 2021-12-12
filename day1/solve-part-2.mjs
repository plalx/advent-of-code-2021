export function solvePart2(measurements) {
    const windowSize = 3;

    if (measurements.length < windowSize) {
        return 0;
    }

    let increments = 0;
    let windowStart = 0;
    let previousWindowSum = 0;

    for (let i = 0; i < windowSize; i++) {
        const measurement = measurements[i];
        previousWindowSum += measurement;
    }

    for (let i = windowSize; i < measurements.length; i++) {
        let currentWindowSum = previousWindowSum;
        currentWindowSum -= measurements[windowStart++];
        currentWindowSum += measurements[i];

        if (currentWindowSum > previousWindowSum) increments++;
        
        previousWindowSum = currentWindowSum;
    }

    return increments;
}