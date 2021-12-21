export class Line {
    #start;
    #end;

    constructor(start, end) {
        this.#start = start;
        this.#end = end;
    }

    get start() { return this.#start; }
    get end() { return this.#end; }

    get isHorizontal() {
        return this.#start.y === this.#end.y;
    }
    
    get isVertical() {
        return this.#start.x === this.#end.x;
    }

    get is45Deg() {
        return Math.abs(this.#start.x - this.#end.x) === Math.abs(this.#start.y - this.#end.y);
    }

    get maxX() {
        return Math.max(this.#start.x, this.#end.x);
    }

    get maxY() {
        return Math.max(this.#start.y, this.#end.y);
    }

    toString() {
        return `${this.#start} -> ${this.#end}`;
    }
}

export class Point {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() { return this.#x; }
    get y() { return this.#y; }

    toString() {
        return this.x + ',' + this.y;
    }
}

