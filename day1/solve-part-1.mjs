export function solvePart1(measurements) {
    let increments = 0;

    for (let i = 1; i < measurements.length; i++) {        
        if (measurements[i] > measurements[i - 1]) increments++;
    }

    return increments;
}