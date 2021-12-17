export function solvePart1(input) {
    return null;
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
        
        do { numbers.push(matchNumber()); }
        while (consumeIf(COMMA));

        return numbers;
    }

    function matchNumber() {
        return match(NUMBER).value;
    }

    function parseBoards() {
        const boards = [];

        do { boards.push(parseBoard()); }
        while (consumeIf(LINE_BREAK) && lookahead.type !== EOS);

        return boards;
    }
    
    function parseBoard() {
        const board = [];

        do { board.push(parseBoardRow()); }
        while (consumeIf(LINE_BREAK) && lookahead.type === NUMBER);

        return board;
    }

    function parseBoardRow() {
        const row = [];

        do { row.push(matchNumber()); }
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