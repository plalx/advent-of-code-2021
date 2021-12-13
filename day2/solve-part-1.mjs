export function solvePart1(commandLines) {
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
    #depth = 0;
    #horizontalPos = 0;

    get depth() { return this.#depth; }
    get horizontalPos() { return this.#horizontalPos; }

    forward(units) {
        this.#horizontalPos += units;
    }

    up(units) {
        this.#depth -= units; 
    }

    down(units) {
        this.#depth += units;
    }
}