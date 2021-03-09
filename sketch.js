/***********************************************************************************
  Plank Timer 

  This is a 30 second time that starts when the start button is pressed. The use will 
  hold their plank for 30 seconds until the progress bar is full.

------------------------------------------------------------------------------------
	To use:
	Add these lines to the index.html

  <script src="p5.timer.js"></script>
  <script src="p5.cliackable.js"></script>
***********************************************************************************/

//Array of images
var images =[];

//Image location
var imageX = 300;
var imageY = 300;

// Global timer variable, uninitialized
var simpleTimer;

// For creating the progress bar
var progBarWidth;   
var progBarHeight = 20;
var hMargin = 60;
var vMargin = 90;

//Instruction text location
var instructionX = 300;
var instructionY = 60;

// User interaction
var waitForButton = true;

// Button text to start
var textButton;

// Text button location
var textButtonX = 230;
var textButtonY = 520;

//load all iamges
function preload() {
  images[0] = loadImage('Assets/plank.png');
  images[1] = loadImage('Assets/thumb.png');
  images[2] = loadImage('Assets/training.png');
}

// Setup code goes here
function setup() {
  createCanvas(600, 600);

  // Allocate a 30-second timer
  simpleTimer = new Timer(30000);

  textAlign(CENTER);
  rectMode(CORNER);
  imageMode(CENTER);

// to space out the bar
  progBarWidth = width - (hMargin*2);   
 }

function draw() {
  background(0);

  //Draw button
  makeTextButton("Start", textButtonX, textButtonY).draw();

  //Before start button is pressed
  if( waitForButton ) {
    fill(255);
    textSize(22);
    text("Click the Start Button when you are ready to hold your plank", instructionX, instructionY );
    image(images[2], imageX, imageY);
  }
  
  //After timer expires
  else if( simpleTimer.expired() ) {
      fill(255);
      textSize(24);
      text("Great Job! You did it!", instructionX, instructionY );
      text("Press the start button to restart!", instructionX, instructionY + 50);
      image(images[1], imageX, imageY);
  }

  // After clicking the start button
  else {
    // wait for button === false
    drawProgressBar();
    drawTimerText();
    textSize(20);
    text("Hold your plank! You got this!", instructionX ,instructionY);
    text("Click the Start button anytime to restart", instructionX, instructionY + 25);
    image(images[0], imageX, imageY);
  }
}

// Looks for elapsed time
function drawTimerText() {
  fill(255);
  textSize(18);
  text( "Remaing time (s) = " + Math.round(simpleTimer.getRemainingTime()/1000), instructionX, instructionY+ 120);
}

// Draw the bar itself
function drawProgressBar() {
  // Draw a growing rectangle, from left to right
  noStroke();
  fill(100,100,0);
  rect( hMargin, vMargin + progBarHeight, progBarWidth*simpleTimer.getPercentageElapsed(), progBarHeight );
  
  // Draw an outline on top of the rect
  noFill();
  stroke(50);
  strokeWeight(1);
  rect( hMargin, vMargin + progBarHeight, progBarWidth, progBarHeight );
}

//Creat text button
function makeTextButton(label, x, y) {
  //Local var tb to create the cliackable object
  let tb = new Clickable();

  // Set the text to label
  tb.textSize = 20;
  tb.text = label;

  // Set width + height to label 
  tb.width = 100;
  tb.height = 50;

  // Location of the tb 
  tb.locate(textButtonX, textButtonY);

  //Clickable callback function for when it is pressed
  tb.onPress = textButtonPressed;

  return tb;
}

// When button is pressed
textButtonPressed = function () {
  simpleTimer.start(); 
  waitForButton =false;
}

