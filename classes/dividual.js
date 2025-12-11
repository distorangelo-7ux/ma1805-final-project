class Dividual {
    constructor(origin, platform, time) {
        // Starting point
        this.origin = origin;

        // Platform
        this.platform = platform;
        this.platformWidthIndex;
    
        this.platformWidthIndex = 2;
        if (platform < 3) this.platformWidthIndex = 1;
        if (platform == 0) this.platformWidthIndex = 0;


        // Destination is calculated based on platform, using the data sent instantiated in the main sketch
        this.destination = createVector(
            recordedWidths[this.platformWidthIndex] * (mapScale) + originX, 
            recordedHeights[platform] * (mapScale) + originY
        )

        // Steps to determine how much the individual is moved per increment of time. This also helps with determining when the individual has finished walking.
        this.stepsTaken = 0;
        this.steps =  time * 60;

        this.diff = createVector(
            (this.destination.x - this.origin.x) / this.steps ,
            (this.destination.y - this.origin.y) / this.steps
        )

        this.markedNumber = int(random(0, 100))
    }

    walk( translateX , translateY) {
        // TranslateX + TranslateY are to apply the distance moved by the face controller
        this.translateX = translateX;
        this.translateY = translateY;

        // 10% (?) chance of being "marked"
        if (this.markedNumber >= 90) {
            this.indicatorScale = 5;
            fill('#ff0000ff');
        } else {
            this.indicatorScale = 3;
            fill('#dad0d0ff');
        }

        // Main draw function
        circle(this.origin.x + translateX, this.origin.y + translateY, this.indicatorScale *  mapScale);

        // Increment position or return false if all steps have been taken
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