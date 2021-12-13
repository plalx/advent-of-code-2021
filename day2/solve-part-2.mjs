export function solvePart2(commandLines) {
    const submarine = new Submarine();

    parseCommands(commandLines).forEach(c => c(submarine));

    return submarine.depth * submarine.horizontalPos;
}

function parseCommands(commandLines) {
    return commandLines.map(command => {
        const [commandName, units] = command.split(' ');
        return submarine => submarine[commandName](Number(units));
    });
}

class Submarine {
    #aim = 0;
    #depth = 0;
    #horizontalPos = 0;

    get depth() { return this.#depth; }
    get horizontalPos() { return this.#horizontalPos; }

    forward(units) {
        this.#horizontalPos += units;
        this.#depth += this.#aim * units;
    }

    up(units) {
        this.#aim -= units; 
    }

    down(units) {
        this.#aim += units;
    }
}