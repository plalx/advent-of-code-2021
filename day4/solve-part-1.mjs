import { parseFromString } from "./game-data-parser.mjs";

export function solvePart1(input) {
    const gameData = parseFromString(input);

    for (const drawnNumber of gameData.drawnNumbers) {
        for (const board of gameData.boards) {
            board.mark(drawnNumber);

            if (board.won) {
                return drawnNumber * sumOf(board.unmarkedNumbers);
            }
        }
    }

    throw new Error('No winning board!');
}

function sumOf(numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}