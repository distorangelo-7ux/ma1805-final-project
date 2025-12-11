class Dividual {
    constructor(origin, platform, time) {
        this.origin = origin;

        this.platform = platform;
        this.platformWidthIndex;
    
        this.platformWidthIndex = 2;
        if (platform < 3) this.platformWidthIndex = 1;
        if (platform == 0) this.platformWidthIndex = 0;


        this.destination = createVector(
            recordedWidths[this.platformWidthIndex] * (mapScale) + originX, 
            recordedHeights[platform] * (mapScale) + originY
        )

        this.stepsTaken = 0;

        this.steps =  time * 60;

        this.diff = createVector(
            (this.destination.x - this.origin.x) / this.steps ,
            (this.destination.y - this.origin.y) / this.steps
        )

        this.markedNumber = int(random(0, 100))
    }

    walk( translateX , translateY) {
        this.translateX = translateX;
        this.translateY = translateY;

        if (this.markedNumber >= 90) {
            this.indicatorScale = 5;
            fill('#ff0000ff');
        } else {
            this.indicatorScale = 3;
            fill('#dad0d0ff');
        }

        circle(this.origin.x + translateX, this.origin.y + translateY, this.indicatorScale *  mapScale);

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