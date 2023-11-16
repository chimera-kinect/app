import kinectManager from "../utils/KinectManager.js"

var words = [
  "Blockchain",
  "Artificial Intelligence",
  "Machine Learning",
  "Big Data",
  "Internet of Things",
  "Cybersecurity",
  "Cloud Computing",
  "Data Science",
  "Startup",
  "Agile",
  "Disruptive",
  "Innovation",
  "Virtual Reality",
  "Augmented Reality",
  "Cryptocurrency",
  "Fintech",
  "SaaS",
  "Unicorn",
  "Scalability",
  "User Experience",
];

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

let erasing = false;
let increasing = false;
let depth = 50;
let prevX, prevY, curX, curY;


function setup() {
  colorMode(HSB, 360, 100, 100);
  createCanvas(windowWidth, windowHeight);
  background(255);
  textSize(24);
  noStroke();
  frameRate(60);
  kinectManager.updateCanvasSize();
  kinectManager.pushThreshold = 30;
}

function draw() {

  var wordGenerationSpeed = 10; // Initial word generation speed
  var generationCounter = 0; // Counter to track the number of generations

  r = random(360); // Random hue value between 0 and 360
  g = random(50, 80); // Set saturation to a constant value
  b = random(100, 120); // Set brightness to a constant value
  a = random(200, 255);

  if (frameCount % wordGenerationSpeed === 0) {
    for (let i = 0; i < 10; i++) {
      text(this.word, this.x, this.y);
      const rand = int(random(0, words.length));
      fill(r, g, b, a);
      textSize(random(5, 80));
      let randomFont = random(fonts);
      textFont(randomFont);
      text(words[rand], random(width, width-2000), random(height));
    }
  }

  generationCounter++;
  if (generationCounter >= 100) {
    // Increase speed every 100 frames
    wordGenerationSpeed--; // Decrease word generation speed
    generationCounter = 0; // Reset the counter
  }

  if (!kinectManager.firstFrameReceived) return;

  const coords = kinectManager.detectTouch();

  if (erasing) {
    if (!coords) {
      erasing = false;
      return;
    }
    if (!increasing) {
      depth = 50;
      prevX = coords.x;
      prevY = coords.y;
      requestAnimationFrame(increaseSize);
      increasing = true;
    }
    curX = coords.x;
    curY = coords.y;

    fill(255);

    for (let i = 0; i < 1; i += 0.05) {
      let interX = lerp(prevX, curX, i);
      let interY = lerp(prevY, curY, i);
      ellipse(interX, interY, depth);
    }

    prevX = curX;
    prevY = curY;
  } else if (!erasing && coords) {
    erasing = true;
  } else {
    increasing = false;
  }
}

function increaseSize() {
  if (erasing) {
    depth += 0.5
    requestAnimationFrame(increaseSize);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
window.increaseSize = increaseSize;

