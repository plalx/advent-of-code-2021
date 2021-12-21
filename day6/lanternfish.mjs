export class Lanternfish {
    #gestationDaysLeft;

    constructor(gestationDaysLeft) {
        this.#gestationDaysLeft = gestationDaysLeft;
    }

    static withGestationDaysLeft(gestationDaysLeft) {
        return new Lanternfish(gestationDaysLeft);
    }

    get gestationDaysLeft() { return this.#gestationDaysLeft; }

    notifyDayPassed() {
        if (--this.#gestationDaysLeft < 0) {
            this.#gestationDaysLeft = 6;
            this.onHatched(new Lanternfish(8));
        }
    }
}