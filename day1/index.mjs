import * as fs from 'fs';
import { solvePart1 } from './solve-part-1.mjs';


withInput(input => {
    console.log(`Part 1 answer: ${solvePart1(input)}`);
});

function withInput(callback) {
    return fs.readFile(new URL('input.txt', import.meta.url), (err, rawInput) => {
        if (err) throw err;

        callback(parseRawInput(rawInput));
    });

    function parseRawInput(rawInput) {
        return rawInput.toString('utf8').split(/[\r\n]+/).map(Number);
    }
}
