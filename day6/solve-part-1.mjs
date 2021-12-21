import { parseLanternfishes } from './lanternfish-parser.mjs';

export function solvePart1(input) {
    const lanterfishes = parseLanternfishes(input);
    let hatchedInDay;
    let simulationDaysLeft = 80;

    for (const fish of lanterfishes) {
        fish.onHatched = onHatched;
    }

    while (simulationDaysLeft--) {
        hatchedInDay = [];

        for (const fish of lanterfishes) {
            fish.notifyDayPassed();
        }

        for (const newFish of hatchedInDay) {
            lanterfishes.push(newFish);
        }
    }

    return lanterfishes.length;

    function onHatched(newFish) {
        newFish.onHatched = onHatched;
        hatchedInDay.push(newFish);
    }
}