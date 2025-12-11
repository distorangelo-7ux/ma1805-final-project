class Controller {
    constructor() {
        this.squarePos = createVector( 
            (windowWidth / 2 ) + 160,
            (windowHeight / 2) - 120);
        this.initial = createVector(0,0);
        this.distance = createVector(0,0);

        createCanvas(windowWidth, windowHeight);
        //web cam capture
        this.capture = createCapture(VIDEO);
        this.capture.size(640, 480);
        this.capture.hide();
        //setup face tracker
        this.ctracker = new clm.tracker();
        this.ctracker.init(pModel);
        this.ctracker.start(this.capture.elt);
    }

    draw() {
        //draw the captured video on a screen with the image filter
        //image(capture, (windowWidth / 2 ) - 320 , (windowHeight / 2) - 240, 640, 480);

        this.positions = this.ctracker.getCurrentPosition();

        // Check the availability of web cam tracking
        if (this.positions.length) {
            //for (let i = 0; i < positions.length; i++) {
            //fill(255, 255, 255, 180);
            //if(i == 62) text(i, positions[i][0], positions[i][1])}

            // point 60 = mouth / 62 = nose
            this.facePoint = createVector(
                this.positions[62][0],
                this.positions[62][1]
            );

            if (!this.initialPosCreated) {
                this.initial.x = this.facePoint.x;
                this.initial.y = this.facePoint.y;
                this.initialPosCreated = true;
            }

            if (this.squarePos.x < windowWidth && this.squarePos.x > 0) {
                this.squarePos.x += this.distance.x;
            } else {
                if (this.squarePos.x >= windowWidth) this.squarePos.x -= 20;
                if (this.squarePos.x <= 0) this.squarePos.x += 20;
            }

            if (this.squarePos.y < windowHeight && this.squarePos.y > 0) {
                this.squarePos.y += this.distance.y;
            } else {
                if (this.squarePos.y >= windowHeight) this.squarePos.y -= 20;
                if (this.squarePos.y <= 0) this.squarePos.y += 20;
            }
        }

        if (this.initialPosCreated) {
            this.faceController();
        }
    }

    faceController() {
        this.distance = createVector(
        int(this.facePoint.x - this.initial.x) * 0.125,
        int(this.facePoint.y - this.initial.y) * -0.25
        )

        textSize(25);
        fill(255)
        text('[TRACKING FACE...]', windowWidth / 2, 0.8* (windowHeight / 2) );
        text(this.distance.x + ', ' + this.distance.y, windowWidth / 2,  windowHeight / 2);

        square(
            (windowWidth / 2) - 3,  
            (windowHeight / 2) * 1.25, 
            6);
        
        square(
            (windowWidth / 2) - 6 - (this.distance.x) * 3,  
            (windowHeight / 2) * 1.25 - (this.distance.y) * 3, 
            12);
    }

    returnDistance() {
        return this.distance;
    }
}