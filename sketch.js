// Booleans controlling which part is shown
let displayBoard = true;
let surveillanceMap = false;

let travelData = [];

function preload() {
  // Preloading fonts + map image
  dotMatrixFont = loadFont('Dotrice-Condensed.otf');
  dotMatrixBold = loadFont('Dotrice-Bold-Condensed.otf');
  map = loadImage('assets/waterloo_map.png');

  // Preloading sounds
  soundFormats('mp3', 'wav');
  ambience = createAudio('assets/ambience.wav');
  buzz = createAudio('assets/buzz.mp3');
  crowd = createAudio('assets/crowd.wav');

  click = loadSound('assets/click.wav');
}

function setup() {
  // Audio-related
  ambience.volume(0.8);
  buzz.volume(0.02);
  crowd.volume(0.1);

  buzz.play();
  ambience.play();

  // Canvas-related
  frameRate(60);
  createCanvas(windowWidth, windowHeight);

  // Data for the map
  stationData();
  stationRenderer = new Station();

  // Timer for switching
  switchTimer = new Timer(1000);

  // Initialisation of billboard: Each row is a separate object
  fontSize = 25;
  travelData.push(new Row(fontSize, '11:27', 'Strawberry Hill', false, '', true,'5', true, '11:30'));

  travelData.push(new Row(fontSize, '11:30', 'Portsmouth Harbour', true, 'via Guildford', true, '6', true, '11:32'));

  travelData.push(new Row(fontSize, '11:33', 'Windsor & Eton Riv', false, '', true, '21', false, ''));

  travelData.push(new Row(fontSize, '11:36', 'Hampton Court', false, '', false, '', false, ''));
}

function draw() {
  background(0);
  // Reset glow effect
  glow( color(255, 255, 255), 0 );

    // Loop timer
    switchTimer.timerLoop();

    // At 4 seconds, switch to surveillance map
    if (switchTimer.timerAction(4)) {

      // Audio events
      if (!surveillanceMap) click.play();
      buzz.stop();
      ambience.stop();
      crowd.play();

      // Switch display
      surveillanceMap = true;
      displayBoard = false;
    }

    // At 8 seconds, switch back to billboard
    if (switchTimer.timerAction(8)) {

      // Audio events
      click.play();
      buzz.play();
      ambience.play();
      crowd.stop();

      // Reset surveillance
      surveillanceMap = false;
      stationRenderer.clearDividuals();
      stationRenderer.createDividuals();

      // Reset to billboard + reset timer
      displayBoard = true;
      switchTimer.timerReset();
    }
    
  // Choose what to render based on booleans
  if (surveillanceMap) stationRenderer.draw();
  if (displayBoard) displayUI();
}

function displayUI() {
  // Translation to set elements on center
  translate( 1 * (-0.25 * windowWidth / 2 ), -0.25 * windowHeight );
  noStroke();

  // Orange colour + glow effect
  glow( color(255, 204, 0), 8 );
  fill(241, 182, 18, 255);
  
  // Billboard information
  textSize(fontSize * 1.5);
  textFont(dotMatrixBold);
  textAlign(LEFT, CENTER);
  text('Departures', windowWidth / 2, windowHeight / 2);

  textSize(fontSize * 1);
  textAlign(RIGHT, CENTER);
  text('Page 1 of 1', (windowWidth / 2) + fontSize * 12, (windowHeight / 2) + fontSize * 0.2);
  
  rectMode(LEFT);
  rect(windowWidth / 2, (windowHeight / 2) + fontSize, fontSize * 12, 4);

  // Billboard contents: Loop through array of contents and display each one
  for (let i = 0;  i < travelData.length ; i++) {
    translate(0,fontSize*2.2);
    travelData[i].display();
  }
}

//  Glow-effect by Kazuki Umeda: https://youtu.be/iIWH3IUYHzM
function glow(glowColour, blurriness) {
  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColour;
}

// Data provided to the classes handling the surveillance map
function stationData() {
  recordedWidths = [156, 183, 222];
  recordedHeights = [104, 128, 143, 163, 178, 197, 212, 232, 247, 276, 291, 312, 327, 345, 360, 380, 395, 415, 430, 450];

  mapScale = 4;

  originX = (windowWidth / 2) - 0.5 * (map.width) - 750;
  originY = (windowHeight / 2) - 0.5 * (map.height) -750;
}