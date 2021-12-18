export function solvePart1(input) {
    return null;
}

function parseLines(input) {
    return input.split(/\r?\n/)
        .map(line => line.split(' -> '))
        .map(points => points.map(parsePoint));
}

function parsePoint(point) {
    return point.split(',').map(Number);
}