import { Line, Point } from "./line.mjs";

export function parseLines(input) {
    return input.split(/\r?\n/)
        .map(line => line.split(' -> '))
        .map(points => {
            const [start, end] = points.map(parsePoint);
            return new Line(start, end);
        });
}

function parsePoint(point) {
    const [x, y] = point.split(',').map(Number);

    return new Point(x, y);
}