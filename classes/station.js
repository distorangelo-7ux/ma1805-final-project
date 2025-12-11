class Station {
    constructor() {
        this.faceController = new Controller();

        this.translateX = 0;
        this.translateY = 0;
        this.mapScale = mapScale;

        this.originX = originX;
        this.originY = originY;

        this.recordedWidths = recordedWidths;
        this.recordedHeights = recordedHeights;
        
        this.dividual11 = [];
        this.createDividuals();
    }

    createDividuals() {
        // 250 times: Create an individual with:
        for (this.i = 0; this.i < 250 ; this.i++) {
        this.dividual11.push(
            new Dividual( 
            // A random starting point
            createVector(
                ( 255 + random(0, 46) ) * (this.mapScale) + this.originX,
                ( 144 + random(0, 295) ) * (this.mapScale) + this.originY
            ),
            // A random platform
                int(random(3,20))
            ,
            // A random time (in seconds)
                random(5, 40) )
            )
            // Then push to array of individuals
        }
    }

    draw() {
        this.controllerMovement();
        this.renderStation();
        
        this.walkDividuals();
        this.faceController.draw();
    }

    clearDividuals() {
        // Run through list of individuals and remove
        for (this.i = 0; this.i < this.dividual11.length; this.i++) {
            this.dividual11.splice(this.i, 1);
        }
    }

    walkDividuals() {
        // For every invidiaul, walk while passing controller offset to the function so the objects will move as well
        for (this.i = 0; this.i < this.dividual11.length; this.i++) {
        this.dividual11[this.i].walk( this.translateX , this.translateY );

        // If no longer walking, delete
        if (!this.dividual11[this.i].walk()) {
        this.dividual11.splice(this.i, 1);
        }
        } 
    }

    renderStation() {
        textAlign(CENTER);
        background(0);
        image(map,
            this.originX,
            this.originY,
            map.width * this.mapScale,
            map.height * this.mapScale
            );
        
        // This was mostly for debugging and figuring out the positioning of each platform
        for (this.i = 0; this.i < this.recordedHeights.length; this.i++) {
            this.platformWidthIndex;
            
            this.platformWidthIndex = 2;
            if (this.i < 3) this.platformWidthIndex = 1;
            if (this.i == 0) this.platformWidthIndex = 0;

            circle(
            this.recordedWidths[this.platformWidthIndex] * (this.mapScale) + this.originX, 
            this.recordedHeights[this.i] * (this.mapScale) + this.originY, 
            5);
        }
    }

    controllerMovement() {
        this.magnitudeX = this.faceController.distance.x;
        this.magnitudeY = this.faceController.distance.y;
        
        if ( 
            // Defining confines of the distance that can be travelled in X-axis
            (this.translateX > -map.width * this.mapScale && this.magnitudeX < 0) ||
            (this.translateX < map.width * this.mapScale && this.magnitudeX > 0) ) {
            this.originX += this.magnitudeX;
            this.translateX += this.magnitudeX;
        }

        if ( 
            // Defining confines of the distance that can be travelled in Y-axis
            (this.translateY > -map.height * this.mapScale && this.magnitudeY < 0) ||
            (this.translateY < map.height * this.mapScale && this.magnitudeY > 0) ) {
            this.originY += this.magnitudeY;
            this.translateY += this.magnitudeY;
        }
    }
}