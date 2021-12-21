import { parseLines } from './line-parser.mjs';
import { VentDiagram } from './vent-diagram.mjs';

export function solvePart1(input) {
    const lines = parseLines(input).filter(l => l.isHorizontal || l.isVertical);
    const ventDiagram = VentDiagram.ofLines(lines);
    
    return ventDiagram.countDangerPointsAbove(1);
}