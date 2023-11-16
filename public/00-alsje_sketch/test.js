import kinectManager from "../utils/KinectManager.js";

function setup() {
    createCanvas(windowWidth, windowHeight)
    kinectManager.updateCanvasSize()
    kinectManager.pushThreshold = 30;
    frameRate(60);
}

function draw() {
  if (!kinectManager.firstFrameReceived) return;
  background(220);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;