// Facial capture code taken from the GIT coding-for-the-arts repository: 06-media-face-like
class Controller {
    constructor() {
        createCanvas(windowWidth, windowHeight);

        this.initial = createVector(0,0);
        this.distance = createVector(0,0);

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
        tint(255, 75);
        image(this.capture, (windowWidth / 2 ) - windowWidth / 2 , (windowHeight / 2) - windowHeight / 2, windowWidth, windowHeight);

        tint(255, 255);
        this.positions = this.ctracker.getCurrentPosition();

        // Check the availability of web cam tracking
        if (this.positions.length) {

            // point 60 = mouth / 62 = nose
            this.facePoint = createVector(
                this.positions[62][0],
                this.positions[62][1]
            );

            // Initial point is set-up to calculate off-set and distance needed to travel
            if (!this.initialPosCreated) {
                this.initial.x = this.facePoint.x;
                this.initial.y = this.facePoint.y;
                this.initialPosCreated = true;
            }
        }

        if (this.initialPosCreated) {
            this.faceController();
        }
    }

    faceController() {
        // Distance = current point - initial point, multiplied for easier navigation
        this.distance = createVector(
        int(this.facePoint.x - this.initial.x) * 0.125,
        int(this.facePoint.y - this.initial.y) * -0.25
        )

        // Purely aesthetic
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

    // For other functions also affected by distance travelled
    returnDistance() {
        return this.distance;
    }
}