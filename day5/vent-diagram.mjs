
export class VentDiagram {
    #grid;
    
    constructor(xSize, ySize) {
        this.#grid = Array.from({ length: ySize }, _ => new Array(xSize).fill('.'));
    }

    static ofSize(xSize, ySize) {
        return new VentDiagram(xSize, ySize);
    }

    static ofLines(lines) {
        const [xSize, ySize] = maxOnEachAxisOf(lines).map(n => n + 1);
        
        const diagram = VentDiagram.ofSize(xSize, ySize);

        for (const line of lines) {
            diagram.markLine(line);
        }

        return diagram;
    }

    markLine(line) {
        
        if (line.isVertical) {
            this.#drawVerticalLine(line);
            return;
        }

        if (line.isHorizontal) {
            this.#drawHorizontalLine(line);
            return;
        }

        if (line.is45Deg) {
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
        const x = line.start.x;
        const [a, b] = [line.start, line.end].sort((a, b) => a.y - b.y);

        for (let y = a.y; y <= b.y; y++) {
            this.#markPoint(x, y);
        }
    }

    #drawHorizontalLine(line) {
        const y = line.start.y;
        const [a, b] = [line.start, line.end].sort((a, b) => a.x - b.x);
        
        for (let x = a.x; x <= b.x; x++) {
            this.#markPoint(x, y);
        }
    }

    #draw45Deg(line) {
        const [a, b] = [line.start, line.end].sort((a, b) => a.x - b.x);
        
        let y = a.y;
        const yModifier = y < b.y? 1 : -1;
        
        for (let x = a.x; x <= b.x; x++) {
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
        maxX = Math.max(maxX, line.maxX);
        maxY = Math.max(maxY, line.maxY);
    }

    return [maxX, maxY];
}