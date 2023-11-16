import kinectManager from "../utils/KinectManager.js";

let pixelSize = 20;
let xOffset = 0;
let yOffset = 0;
let noiseScale = 0.02;
let pixelData = [];

function generatePixelData() {
  pixelData = [];
  for (let x = 0; x < width; x += pixelSize) {
    for (let y = 0; y < height; y += pixelSize) {
      let r = random(50, 255);
      let g = random(50, 255);
      let b = random(50, 255);
      pixelData.push({ x, y, r, g, b, activated: false });
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
 // noSmooth();
  kinectManager.updateCanvasSize();
  kinectManager.pushThreshold = 30;
  // TEST IRL TO SEE IF IT IS DELAYED
  frameRate(10);
  generatePixelData();
}

function draw() {
  background(220);

  // Draw the stored pixel data
  for (const pixel of pixelData) {
    if (pixel.activated) {
      fill(0); // Activated pixels stay black
    } else {
      pixel.r = random(50, 255);
      pixel.g = random(50, 255);
      pixel.b = random(50, 255);
      fill(pixel.r, pixel.g, pixel.b);
    }
    noStroke();
    rect(pixel.x, pixel.y, pixelSize, pixelSize);
  }

  if (!kinectManager.firstFrameReceived) return;
  const coords = kinectManager.detectTouch();

  if (coords) {
    let xIndex = floor(coords.x / pixelSize);
    let yIndex = floor(coords.y / pixelSize);
    
    // Check if the pixel is not already activated
    if (
      pixelData[yIndex * (width / pixelSize) + xIndex] &&
      !pixelData[yIndex * (width / pixelSize) + xIndex].activated
    ) {
      pixelData[yIndex * (width / pixelSize) + xIndex].activated = true;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
window.generatePixelData = generatePixelData;
