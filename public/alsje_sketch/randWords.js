import kinectManager from "../utils/KinectManager.js"

var words = ["Alsje", "Franco", "Massi", "Markus"];
var fonts = [
  "Times",
  "Arial",
  "Courier New",
  "Georgia",
  "Verdana",
  "Arial Black",
  "Tahoma",
  "Trebuchet MS",
  "Helvetica",
  "Impact",
  "Gill Sans",
  "Times New Roman",
  "Palatino",
  "Baskerville",
  "Andalé Mono",
  "Courier",
  "Lucida",
  "Monaco",
  "Bradley Hand",
  "Brush Script MT",
  "Luminari",
];

var r;
var g;
var b;
var a;

function setup() {
  colorMode(HSB, 360, 100, 100);
  createCanvas(windowWidth, windowHeight);
  background(255);
  textSize(24);
  noStroke();
  kinectManager.pushThreshold = 30
}

function draw() {

  if (!kinectManager.firstFrameReceived) return;

  const coords = kinectManager.detectTouch()
  if (coords) {
    console.log("yep");
    fill(0);
    noStroke();
    circle(coords.x, coords.y, kinectManager.pushThreshold);
    loop();
   } else {
    console.log("nope");
   }

  var wordGenerationSpeed = 5; // Initial word generation speed
  var generationCounter = 0; // Counter to track the number of generations

  r = random(360); // Random hue value between 0 and 360
  g = 100; // Set saturation to a constant value
  b = 100; // Set brightness to a constant value
  a = random(200, 255);

  if (frameCount % wordGenerationSpeed === 0) {
    for (let i = 0; i < 10; i++) {
      const rand = int(random(0, words.length));
      fill(r, g, b, a);
      textSize(random(5, 80));
      let randomFont = random(fonts);
      textFont(randomFont);
      text(words[rand], random(width), random(height));
    }
  }


  generationCounter++;
  if (generationCounter >= 100) {
    // Increase speed every 100 frames
    wordGenerationSpeed--; // Decrease word generation speed
    generationCounter = 0; // Reset the counter
  }
}

window.setup = setup;
window.draw = draw;

