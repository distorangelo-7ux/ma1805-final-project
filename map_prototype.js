let map;
let originX;
let originY;

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
  setupData();
  frameRate(60);

  createCanvas(windowWidth, windowHeight);


    for (i = 0; i < 250 ; i++) {
      dividual11.push(
        new Dividual( 
      createVector(
        430 + random(-25, 10),
        360 + random(-175, 40)
      ),

      createVector(
        385,
        recordedHeights[ int(random(3,20)) ]
      ),
        random(5, 40) )
      )
    }
}

function draw() {

  textAlign(CENTER);
  background(200);
  image(map,
    originX,
    originY,
    map.width / 1.5,
    map.height / 1.5
    );
  
  for (i = 0; i < recordedHeights.length; i++) {
    let platformWidthIndex;
    
    platformWidthIndex = 0;
    if (i < 3) platformWidthIndex = 1;
    if (i == 0) platformWidthIndex = 2;

    circle(
      widthPercentages[platformWidthIndex] * (map.width) + originX, 
      heightPercentages[i] * (map.height) + originY, 
      5);
  }

  for (i = 0; i < dividual11.length; i++) {
    dividual11[i].walk();
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

  recordedHeights = [173, 190, 200, 212, 222, 235, 245, 258, 268, 288, 298, 310, 320, 335, 345, 357, 367, 380, 390, 404];
  heightPercentages = [];

  for (i = 0; i < recordedHeights.length; i++) {
    let translatedHeight = recordedHeights[i] - originY;
    heightPercentages.push( translatedHeight / map.height );
  }

  recordedWidths = [385, 358, 340];
  widthPercentages = [];

  for (i = 0; i < recordedWidths.length; i++) {
    let translatedWidth = recordedWidths[i] - originX;
    widthPercentages.push( translatedWidth / map.width );
  }
}