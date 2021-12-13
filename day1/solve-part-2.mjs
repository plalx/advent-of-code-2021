export function solvePart2(measurements) {
    const windowSize = 3;

    if (measurements.length < windowSize) {
        return 0;
    }

    let increments = 0;
    const windowedSum = WindowedSum.over(measurements, windowSize);
    let previousSum = windowedSum.sum;

    while (windowedSum.hasNext()) {
        windowedSum.next();
        if (windowedSum.sum > previousSum) increments++;
        previousSum = windowedSum.sum;
    }

    return increments;
}

class WindowedSum {
    #items;
    #start;
    #end;
    #sum;

    constructor(items, size) {
        this.#items = items;
        this.#start = 0;
        this.#end = -1;
        
        this.#initializeSum(Math.min(size, items.length));
    }

    #initializeSum(size) {
        this.#sum = 0;
        for (let i = 1; i <= size; i++) {
            this.#addItem();
        }
    }

    #addItem() {
        this.#sum += this.#items[++this.#end];
    }

    #removeItem() {
        this.#sum -= this.#items[this.#start++];
    }

    hasNext() {
        return this.#end < this.#items.length;
    }

    next() {
        if (!this.hasNext()) {
            throw new Error("Can't slide window to next position: end reached.");
        }

        this.#removeItem();
        this.#addItem();
    }

    get sum() {
        return this.#sum;
    }

    static over(items, size) {
        return new WindowedSum(items, size);
    }
}