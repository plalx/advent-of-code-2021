import * as fs from 'fs';
import { solvePart1 } from './solve-part-1.mjs';
import { solvePart2 } from './solve-part-2.mjs';


withInput(input => {
    console.log(`Part 1 answer: ${solvePart1(input)}`);
    console.log(`Part 2 answer: ${solvePart2(input)}`);
});

function withInput(callback) {
    return fs.readFile(new URL('input.txt', import.meta.url), (err, rawInput) => {
        if (err) throw err;

        callback(parseLines(rawInput));
    });

    function parseLines(rawInput) {
        return rawInput.toString('utf8').split(/[\r\n]+/);
    }
}
