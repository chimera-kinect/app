import kinectManager from "../utils/KinectManager.js";

let angle = 0;
let r = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize();
  kinectManager.pushThreshold = 40;
}

function draw() {

  if (!kinectManager.firstFrameReceived) return;
  const coords = kinectManager.detectTouch();

  setCenter(windowWidth / 2, windowHeight / 2);
  background(0, 10);
  stroke(255);
  noFill();
  strokeWeight(4);

  let increment = map(mouseX, 0, windowWidth, 0.01, PI);

  beginShape();
  for (let i = 0; i < TWO_PI; i += increment) {
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;

// want to change stroke with y axis and color with depth
