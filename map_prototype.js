let map;
let mapScale;
let originX;
let originY;

let translateX;
let magnitudeX;

let translateY;
let magnitudeY;

let recordedWidths;
let widthPercentages;

let recordedHeights;
let heightPercentages;

let personOrigin;
let personPath;
let pathDiff;
let steps;
let stepsTaken;

let dividual11 = [];

function preload() {
  map = loadImage('assets/waterloo_map.png');
}

function setup() {
  translateX = 0;
  mapScale = 1;

  setupData();
  frameRate(60);

  createCanvas(windowWidth, windowHeight);


    for (i = 0; i < 250 ; i++) {
      dividual11.push(
        new Dividual( 
      createVector(
        ( 255 + random(0, 46) ) * (mapScale) + originX,
        ( 144 + random(0, 295) ) * (mapScale) + originY
      ),

      int(random(3,20))

      ,
        random(5, 40) )
      )
    }
}

function draw() {

  magnitudeX = -25;
  
  if (translateX > -map.width) {
    originX = originX + magnitudeX;
    translateX += magnitudeX;
  }


  textAlign(CENTER);
  background(200);
  image(map,
    originX,
    originY,
    map.width * mapScale,
    map.height * mapScale
    );
  
  for (i = 0; i < recordedHeights.length; i++) {
    let platformWidthIndex;
    
    platformWidthIndex = 2;
    if (i < 3) platformWidthIndex = 1;
    if (i == 0) platformWidthIndex = 0;

    circle(
      recordedWidths[platformWidthIndex] * (mapScale) + originX, 
      recordedHeights[i] * (mapScale) + originY, 
      5);
  }

  for (i = 0; i < dividual11.length; i++) {
    dividual11[i].walk( translateX );
    if (!dividual11[i].walk()) {
      dividual11.splice(i, 1);
    }
  }

  textSize(25);
  fill(255)
  text(mouseX+', '+mouseY, mouseX, mouseY)
}

function setupData() {
  originX = (windowWidth / 2) - 0.5 * (map.width);
  originY = (windowHeight / 2) - 0.5 * (map.height);

  recordedWidths = [156, 183, 222];
  recordedHeights = [104, 128, 143, 163, 178, 197, 212, 232, 247, 276, 291, 312, 327, 345, 360, 380, 395, 415, 430, 450];
}