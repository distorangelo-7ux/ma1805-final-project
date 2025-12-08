/*Interacting with captured data: 
- Face tracking library: https://github.com/auduno/clmtrackr
- p5js + clmtracker.js: https://gist.github.com/lmccart/2273a047874939ad8ad1
See:  https://aesthetic-programming.net/pages/4-data-capture.html
*/
let ctracker;
let capture;

let initial;
let distance;

let facePoint;
let initialPosCreated;
let squarePos;

let captureX;
let captureY;

const d = new Date();

function setup() {
    squarePos = createVector( 
         (windowWidth / 2 ) + 160,
         (windowHeight / 2) - 120);
    initial = createVector(0,0);
    distance = createVector(0,0);

    createCanvas(windowWidth, windowHeight);
    //web cam capture
    capture = createCapture(VIDEO);
    capture.size(640, 480);
    capture.hide();
    //setup face tracker
    ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(capture.elt);
}

function draw() {
    background(0);
  //draw the captured video on a screen with the image filter
  //image(capture, (windowWidth / 2 ) - 320 , (windowHeight / 2) - 240, 640, 480);

  let positions = ctracker.getCurrentPosition();

  // Check the availability of web cam tracking
  if (positions.length) {
    for (let i = 0; i < positions.length; i++) {
       //fill(255, 255, 255, 180);
       //if(i == 62) text(i, positions[i][0], positions[i][1])}

    // point 60 = mouth / 62 = nose
    facePoint = createVector(
        positions[62][0],
        positions[62][1]
     );

     if (!initialPosCreated) {
        initial.x = facePoint.x;
        initial.y = facePoint.y;
        initialPosCreated = true;
    }

    if (squarePos.x < windowWidth && squarePos.x > 0) {
        squarePos.x += distance.x;
    } else {
        if (squarePos.x >= windowWidth) squarePos.x -= 20;
        if (squarePos.x <= 0) squarePos.x += 20;
    }

    if (squarePos.y < windowHeight && squarePos.y > 0) {
        squarePos.y += distance.y;
    } else {
        if (squarePos.y >= windowHeight) squarePos.y -= 20;
        if (squarePos.y <= 0) squarePos.y += 20;
    }
  }

  if (initialPosCreated) {
    faceController();
  }
}

function faceController() {
    distance = createVector(
        int(facePoint.x - initial.x) * -0.125,
        int(facePoint.y - initial.y) * 0.25
    )

    text(distance.x + ', ' + distance.y, 100, 100);
    
    square(squarePos.x, squarePos.y, 25);
}