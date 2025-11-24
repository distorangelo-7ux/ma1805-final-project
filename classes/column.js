class Column {
    constructor(fontSize, departingTime, destinationName, differentRoute, routeName, platformDefined, platformNo, isDelayed, delay) {
        this.fontSize = fontSize;
        this.departingTime = departingTime;
        this.destinationName = destinationName;
        this.destinationDisplay = destinationName;

        this.differentRoute = differentRoute;
        this.routeName = routeName;

        this.platformDefined = platformDefined;
        this.platformNo = platformNo;
        this.isDelayed = isDelayed;
        this.delay = delay;

        this.routeTimer = new Timer(1000);
    }

    display() {
        fill(241, 182, 18, 255);
        this.routeTimer.timerLoop();
        //this.routeTimer.display(0,0);

        if (this.routeTimer.timerAction(4)) {
            if (this.differentRoute) {
                this.destinationDisplay = this.routeName
            }
        }

        if (this.routeTimer.timerAction(8)) {
            this.destinationDisplay = this.destinationName
            this.routeTimer.timerReset();
        }

        rectMode(LEFT);
        rect(windowWidth / 2, (windowHeight / 2) + this.fontSize*1.5, this.fontSize*12, 2);
        
        textFont(dotMatrixFont);
        textSize(this.fontSize);

        textAlign(LEFT, CENTER);
        text(this.departingTime+' '+this.destinationDisplay, windowWidth / 2, windowHeight / 2);

        textAlign(LEFT, CENTER);

        if (this.platformDefined) {
            fill(241, 182, 18, 255 * sin(frameCount * 0.075));
            text('Plat '+this.platformNo, (windowWidth / 2) + (this.fontSize*2.6), (windowHeight / 2) + this.fontSize);
        } else {
            text('Plat --', (windowWidth / 2) + (this.fontSize*2.6), (windowHeight / 2) + this.fontSize);
        }

        textAlign(RIGHT, CENTER);
        fill(241, 182, 18, 255);
        if (this.isDelayed) {
            text('Expt '+this.delay, (windowWidth / 2) + this.fontSize*11.5, (windowHeight / 2) + this.fontSize);
        } else {
            text('On Time', (windowWidth / 2) + this.fontSize*11.5, (windowHeight / 2) + this.fontSize);
        }
    }
}