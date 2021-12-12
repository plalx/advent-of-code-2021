export function solvePart1(measurements) {
    let previous = measurements[0];
    let increments = 0;

    for (let i = 1; i < measurements.length; i++) {
        const current = measurements[i];
        
        if (current > previous) increments++;

        previous = current;
    }

    return increments;
}