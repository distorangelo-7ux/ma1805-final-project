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
        for (this.i = 0; this.i < 250 ; this.i++) {
        this.dividual11.push(
            new Dividual( 
            createVector(
                ( 255 + random(0, 46) ) * (this.mapScale) + this.originX,
                ( 144 + random(0, 295) ) * (this.mapScale) + this.originY
            ),
                int(random(3,20))
            ,
                random(5, 40) )
            )
        }
    }

    draw() {
        this.controllerMovement();
        this.renderStation();
        
        this.walkDividuals();
        this.faceController.draw();
    }

    clearDividuals() {
        for (this.i = 0; this.i < this.dividual11.length; this.i++) {
            this.dividual11.splice(this.i, 1);
        }
    }

    walkDividuals() {
        for (this.i = 0; this.i < this.dividual11.length; this.i++) {
        this.dividual11[this.i].walk( this.translateX , this.translateY );

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
            (this.translateX > -map.width * this.mapScale && this.magnitudeX < 0) ||
            (this.translateX < map.width * this.mapScale && this.magnitudeX > 0) ) {
            this.originX += this.magnitudeX;
            this.translateX += this.magnitudeX;
        }

        if ( 
            (this.translateY > -map.height * this.mapScale && this.magnitudeY < 0) ||
            (this.translateY < map.height * this.mapScale && this.magnitudeY > 0) ) {
            this.originY += this.magnitudeY;
            this.translateY += this.magnitudeY;
        }
    }
}