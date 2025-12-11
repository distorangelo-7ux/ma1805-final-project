let displayBoard = true;
let surveillanceMap = false;

let travelData = [];

function preload() {
  dotMatrixFont = loadFont('Dotrice-Condensed.otf');
  dotMatrixBold = loadFont('Dotrice-Bold-Condensed.otf');
  map = loadImage('assets/waterloo_map.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  stationData();

  stationRenderer = new Station();
  switchTimer = new Timer(1000);
  frameRate(60);

  fontSize = 25;
  travelData.push(new Column(fontSize, '11:27', 'Strawberry Hill', false, '', true,'5', true, '11:30'));

  travelData.push(new Column(fontSize, '11:30', 'Portsmouth Harbour', true, 'via Guildford', true, '6', true, '11:32'));

  travelData.push(new Column(fontSize, '11:33', 'Windsor & Eton Riv', false, '', true, '21', false, ''));

  travelData.push(new Column(fontSize, '11:36', 'Hampton Court', false, '', false, '', false, ''));
}

function draw() {
  background(0);
  glow( color(255, 255, 255), 0 );

    switchTimer.timerLoop();

    if (switchTimer.timerAction(4)) {
      surveillanceMap = true;
      displayBoard = false;
    }

    if (switchTimer.timerAction(8)) {
      surveillanceMap = false;
      stationRenderer.clearDividuals();
      stationRenderer.createDividuals();
      displayBoard = true;
      switchTimer.timerReset();
    }

  if (surveillanceMap) stationRenderer.draw();
  if (displayBoard) displayUI();
}

function displayUI() {
  translate( 1 * (-0.25 * windowWidth / 2 ), -0.25 * windowHeight );
  noStroke();
  glow( color(255, 204, 0), 8 );
  fill(241, 182, 18, 255);
  
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

function stationData() {
  recordedWidths = [156, 183, 222];
  recordedHeights = [104, 128, 143, 163, 178, 197, 212, 232, 247, 276, 291, 312, 327, 345, 360, 380, 395, 415, 430, 450];

  mapScale = 4;

  originX = (windowWidth / 2) - 0.5 * (map.width) - 750;
  originY = (windowHeight / 2) - 0.5 * (map.height) -750;
}