import { parseFromString } from "./game-data-parser.mjs";

export function solvePart2(input) {
    const { drawnNumbers, boards } = parseFromString(input);
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