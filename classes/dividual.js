class Dividual {
    constructor(origin, platform, time) {
        this.origin = origin;

        this.platform = platform;
        let platformWidthIndex;
    
        platformWidthIndex = 2;
        if (platform < 3) platformWidthIndex = 1;
        if (platform == 0) platformWidthIndex = 0;


        this.destination = createVector(
            recordedWidths[platformWidthIndex] * (mapScale) + originX, 
            recordedHeights[platform] * (mapScale) + originY
        )

        this.stepsTaken = 0;

        this.steps =  time * 60;

        this.diff = createVector(
            (this.destination.x - this.origin.x) / this.steps ,
            (this.destination.y - this.origin.y) / this.steps
        )
    }

    walk( translateX ) {
        this.translateX = translateX;
        fill('#ff0000ff');
        circle(this.origin.x + translateX, this.origin.y, 4);

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