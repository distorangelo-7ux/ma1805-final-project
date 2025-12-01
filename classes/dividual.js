class Dividual {
    constructor(origin, destination, time) {
        this.origin = origin;
        this.destination = destination;
        this.stepsTaken = 0;

        this.steps =  time * 60;

        this.diff = createVector(
            (this.destination.x - this.origin.x) / this.steps ,
            (this.destination.y - this.origin.y) / this.steps
        )
    }

    walk() {
        fill('#ff0000ff');
        circle(this.origin.x, this.origin.y, 4);
        if (this.stepsTaken < this.steps) {
            this.origin.x += this.diff.x;
            this.origin.y += this.diff.y;
            this.stepsTaken++;
            return true;
        } else {
            return false;
        }
    }
}