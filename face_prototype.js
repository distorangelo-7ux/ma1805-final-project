let faceController

function setup() {
    createCanvas(windowWidth, windowHeight);
    faceController = new Controller();
}

function draw() {
    background(0);
    faceController.draw();

    //let localDistance = faceController.returnDistance();

    //fill(255);
    //text(localDistance.x + ', ' + localDistance.y, 200, 200);
 }
