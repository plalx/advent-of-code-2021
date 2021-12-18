
export class Board {
    #unmarkedNumbersPositions;
    #rowCount;
    #colCount;
    #unmarkedCountPerRow;
    #unmarkedCountPerCol;
    #unmarkedCountInDiag;
    #won;

    constructor(rows) {
        if (!rows.length) {
            throw new Error("Board can't be empty.");
        }

        this.#rowCount = rows[0].length;
        this.#colCount = rows.length;

        if (this.#rowCount !== this.#colCount) {
            throw new Error('Board must have same number of rows & cols');
        }

        this.#unmarkedNumbersPositions = this.#unmarkedNumbersPositionsFrom(rows);
        this.#unmarkedCountPerRow = AxisCountTracker.ofSize(this.#rowCount);
        this.#unmarkedCountPerCol = AxisCountTracker.ofSize(this.#colCount);
        this.#unmarkedCountInDiag = this.#rowCount;
        this.#won = false;
    }

    mark(number) {
        if (this.won) {
            throw new Error("Can't mark: already won!");
        }

        const positions = this.#unmarkedNumbersPositions.get(number);
        
        if (!positions || !positions.length) {
            return;
        }

        this.#unmarkedNumbersPositions.delete(number);

        for (const position of positions) {
            if (this.#markAndCheckIfWon(position)) {
                this.#won = true;
                return;
            }
        }
    }

    #markAndCheckIfWon(position) {
        return !this.#unmarkedCountPerRow.decreaseAt(position[0])
            || !this.#unmarkedCountPerCol.decreaseAt(position[1])
            || (this.#isDiagPosition(position) && !(--this.#unmarkedCountInDiag));
    }

    get won() { return this.#won; }

    get unmarkedNumbers() {
        return Array.from(this.#unmarkedNumbersPositions.keys());
    }

    #isDiagPosition(position) {
        return position[0] === position[1];
    }

    #unmarkedNumbersPositionsFrom(rows) {
        const positionsMap = new Map();

        for (let rowIndex = 0; rowIndex < this.#rowCount; rowIndex++) {
            for (let colIndex = 0; colIndex < this.#colCount; colIndex++) {
                const num = rows[rowIndex][colIndex];
                let positions = positionsMap.get(num);

                if (!positions) {
                    positions = [];
                    positionsMap.set(num, positions);
                }

                positions.push([rowIndex, colIndex]);
            }
        }

        return positionsMap;
    }
}

class AxisCountTracker {
    #countPerAxis;

    constructor(size) {
        this.#countPerAxis = new Array(size).fill(size);
    }

    decreaseAt(axisIndex) {
        return --this.#countPerAxis[axisIndex];
    }

    static ofSize(size) {
        return new AxisCountTracker(size);
    }
}