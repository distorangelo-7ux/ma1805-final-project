let dotMatrixFont;
let fontSize;

let intHour = 0;
let intMinutes = 0;

let stringHour;
let stringMinutes;

let destinationName = 'Guildford'
let stringArrival = '11:30'
let isDelayed = false;
let intDelay = '11:32'

let intPlatform = 15;
let travelData = [];

function preload() {
  dotMatrixFont = loadFont('Dotrice-Condensed.otf');
  dotMatrixBold = loadFont('Dotrice-Bold-Condensed.otf')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fontSize = 25;
  travelData.push(new Column(fontSize, '11:27', 'Strawberry Hill', false, '', true,'5', true, '11:30'));

  travelData.push(new Column(fontSize, '11:30', 'Portsmouth Harbour', true, 'via Guildford', true, '6', true, '11:32'));

  travelData.push(new Column(fontSize, '11:33', 'Windsor & Eton Riv', false, '', true, '21', false, ''));

  travelData.push(new Column(fontSize, '11:36', 'Hampton Court', false, '', false, '', false, ''));
}

function draw() {
  background(0);

  noStroke();
  glow( color(255, 204, 0), 8 );
  
  translate( -0.25 * windowWidth / 2, -0.25 * windowHeight );

  textSize(fontSize * 1.5);
  textFont(dotMatrixBold);
  textAlign(LEFT, CENTER);
  text('Departures', windowWidth / 2, windowHeight / 2);

  textSize(fontSize * 1);
  textAlign(RIGHT, CENTER);
  text('Page 1 of 1', (windowWidth / 2) + fontSize * 12, (windowHeight / 2) + fontSize * 0.2);
  
  rectMode(LEFT);
  rect(windowWidth / 2, (windowHeight / 2) + fontSize, fontSize * 12, 4);

  for (let i = 0;  i < travelData.length ; i++) {
    translate(0,fontSize*2.2);
    travelData[i].display();
  }
}

function glow(glowColour, blurriness) {
  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColour;
}
