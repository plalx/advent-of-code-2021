import { parseLines } from './line-parser.mjs';
import { VentDiagram } from './vent-diagram.mjs';

export function solvePart2(input) {
    const lines = parseLines(input);
    const ventDiagram = VentDiagram.ofLines(lines);

    return ventDiagram.countDangerPointsAbove(1);
}