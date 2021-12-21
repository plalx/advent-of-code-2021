import { Lanternfish } from "./lanternfish.mjs";

export function parseLanternfishes(input) {
    return input.split(',').map(num => Lanternfish.withGestationDaysLeft(+num));
}