export function solvePart2(input) {
    const { drawnNumbers, boards } = parseGameData(tokenizeGameData(input));
    const lastWinningInfo = lastWinningBoardInfoFor(drawnNumbers, boards);

    return lastWinningInfo.drawnNumber * sumOf(lastWinningInfo.board.unmarkedNumbers);
}

function lastWinningBoardInfoFor(drawnNumbers, boards) {
    const remainingBoards = new Set(boards);

    for (const drawnNumber of drawnNumbers) {
        for (const board of remainingBoards) {
            board.mark(drawnNumber);

            if (board.won) {
                if (remainingBoards.size === 1) {
                    return { drawnNumber, board };
                }

                remainingBoards.delete(board);
            }
        }
    }

    throw new Error('No winning board!');
}

function sumOf(numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}

const NUMBER = Symbol('number');
const COMMA = Symbol(',');
const LINE_BREAK = Symbol('break');
const WHITESPACE = Symbol('whitespace');
const EOS = Symbol('EOS');

function parseGameData(tokenGenerator) {
    let lookahead;

    consume();

    const drawnNumbers = parseDrawnNumbers();
    
    match(LINE_BREAK);
    match(LINE_BREAK);

    const boards = parseBoards();

    return { drawnNumbers, boards };
    
    function parseDrawnNumbers() {
        const numbers = [];
        
        do { numbers.push(parseNumber()); }
        while (consumeIf(COMMA));

        return numbers;
    }

    function parseNumber() {
        return match(NUMBER).value;
    }

    function parseBoards() {
        const boards = [];

        do { boards.push(parseBoard()); }
        while (consumeIf(LINE_BREAK) && lookahead.type !== EOS);

        return boards;
    }
    
    function parseBoard() {
        const rows = [];

        do { rows.push(parseBoardRow()); }
        while (consumeIf(LINE_BREAK) && lookahead.type === NUMBER);

        return new Board(rows);
    }

    function parseBoardRow() {
        const row = [];

        do { row.push(parseNumber()); }
        while (consumeIf(WHITESPACE));

        return row;
    }

    function consumeIf(tokenType) {
        if (lookahead.type === tokenType) {
            consume();
            return true;
        }

        return false;
    }

    function match(tokenType) {
        if (lookahead.type !== tokenType) {
            throw new Error(
                `${tokenType.toString()} expected but instead got ${lookahead.type.toString()}: `
                + JSON.stringify(lookahead) + '.'
            );
        }
        const current = lookahead;
        consume();
        return current;
    }

    function consume() {
        lookahead = tokenGenerator.next().value;
        return lookahead;
    }
}

function *tokenizeGameData(input) {
    const tokenPattern = /(\d+)|(,)|(\r?\n)|([\t\v\f ]+)|./g;
    const matchIndex = {
        [NUMBER]: 1,
        [COMMA]: 2,
        [LINE_BREAK]: 3,
        [WHITESPACE]: 4
    };

    let line = 1;
    let match;
    let previousToken;
    let colOffset = 0;

    while (match = tokenPattern.exec(input)) {
        if (matchFor(NUMBER)) {
            yield emit(NUMBER, +matchFor(NUMBER));
            continue;
        }

        if (matchFor(COMMA)) {
            yield emit(COMMA);
            continue;
        }

        if (matchFor(LINE_BREAK)) {
            const breakSize = matchFor(LINE_BREAK).length;

            yield emit(LINE_BREAK);
            line++;
            colOffset = match.index + breakSize;
            continue;
        }

        if (matchFor(WHITESPACE)) {
            if (!previousWasLineBreak()) {
                yield emit(WHITESPACE);
            }
            continue;
        }

        throw new Error(`Invalid char '${input[match.index]}' at line ${line} and col ${col()}.`);
    }

    yield { type: EOS, line: -1, col: -1 };

    function previousWasLineBreak() {
        return previousToken && previousToken.type === LINE_BREAK;
    }

    function matchFor(type) {
        return match[matchIndex[type]];
    }

    function emit(type, value) {
        return previousToken = { type, value, line, col: col() };
    }

    function col() {
        return (match.index - colOffset) + 1;
    }
}

class Board {
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