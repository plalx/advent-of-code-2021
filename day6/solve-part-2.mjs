import { parseLanternfishes } from './lanternfish-parser.mjs';

export function solvePart2(input) {
    const lanterfishes = parseLanternfishes(input);
    const simulation = new PopulationGrowthSimulation();
    
    for (const fish of lanterfishes) {
        simulation.addAtGestationDaysLeft(fish.gestationDaysLeft);
    }

    let simulationDaysLeft = 256;
    while (simulationDaysLeft--) {
        simulation.simulateDayPassed();
    }

    return simulation.totalFishCount;
}


export class PopulationGrowthSimulation {
    #fishCountAtDay;

    constructor() {
        this.#fishCountAtDay = new Array(9).fill(0);
    }

    addAtGestationDaysLeft(days) {
        this.#fishCountAtDay[days]++;
    }

    simulateDayPassed() {
        const hatchedCount = this.#fishCountAtDay[0];

        this.#fishCountAtDay[0] = this.#fishCountAtDay[1];
        this.#fishCountAtDay[1] = this.#fishCountAtDay[2];
        this.#fishCountAtDay[2] = this.#fishCountAtDay[3];
        this.#fishCountAtDay[3] = this.#fishCountAtDay[4];
        this.#fishCountAtDay[4] = this.#fishCountAtDay[5];
        this.#fishCountAtDay[5] = this.#fishCountAtDay[6];
        this.#fishCountAtDay[6] = this.#fishCountAtDay[7] + hatchedCount;
        this.#fishCountAtDay[7] = this.#fishCountAtDay[8];
        this.#fishCountAtDay[8] = hatchedCount;
    }

    get totalFishCount() {
        return this.#fishCountAtDay.reduce((a, b) => a + b, 0);
    }
}