import { parseLines } from './line-parser.mjs';

export function solvePart2(input) {
    const lines = parseLines(input);
    const [maxX, maxY] = maxOnEachAxisOf(lines);
    const ventDiagram = VentDiagram.ofSize(maxX + 1, maxY + 1);

    for (const line of lines) {
        ventDiagram.markLine(line);
    }
    
    return ventDiagram.countDangerPointsAbove(1);

}

class VentDiagram {
    #grid;
    
    constructor(xSize, ySize) {
        this.#grid = Array.from({ length: ySize }, _ => new Array(xSize).fill('.'));
    }

    static ofSize(xSize, ySize) {
        return new VentDiagram(xSize, ySize);
    }

    markLine(line) {

        if (isVertical(line)) {
            this.#drawVerticalLine(line);
            return;
        }

        if (isHorizontal(line)) {
            this.#drawHorizontalLine(line);
            return;
        }

        if (is45Deg(line)) {
            this.#draw45Deg(line);
            return;
        }

        throw new Error('Only supports vertical, horizontal or 45 deg. lines: ' + JSON.stringify(line));
    }

    countDangerPointsAbove(dangerLevelCriteria) {
        let count = 0;

        for (const row of this.#grid) {
            for (const dangerLevel of row) {
                if (dangerLevel > dangerLevelCriteria) count++;
            }
        }

        return count;
    }

    #drawVerticalLine(line) {
        const x = line[0][0];
        const [a, b] = [...line].sort((a, b) => a[1] - b[1]);

        for (let y = a[1]; y <= b[1]; y++) {
            this.#markPoint(x, y);
        }
    }

    #drawHorizontalLine(line) {
        const y = line[0][1];
        const [a, b] = [...line].sort((a, b) => a[0] - b[0]);

        for (let x = a[0]; x <= b[0]; x++) {
            this.#markPoint(x, y);
        }
    }

    #draw45Deg(line) {
        const [a, b] = [...line].sort((a, b) => a[0] - b[0]);
        
        let y = a[1];
        const yModifier = y < b[1]? 1 : -1;
        
        for (let x = a[0]; x <= b[0]; x++) {
            this.#markPoint(x, y);
            y = y + yModifier;
        }
    }

    #markPoint(x, y) {
        const val = this.#grid[y][x];
        this.#grid[y][x] = val === '.'? 1 : val + 1;
    }

    toString() {
        return this.#grid.join('\n');
    }
}

function maxOnEachAxisOf(lines) {
    let maxX = 0;
    let maxY = 0;

    for (const line of lines) {
        maxX = Math.max(maxX, line[0][0], line[1][0]);
        maxY = Math.max(maxY, line[0][1], line[1][1]);
    }

    return [maxX, maxY];
}

function isHorizontal(line) {
    return line[0][1] === line[1][1];
}

function isVertical(line) {
    return line[0][0] === line[1][0];
}

function is45Deg(line) {
    return Math.abs(line[0][0] - line[1][0]) === Math.abs(line[0][1] - line[1][1]);
}