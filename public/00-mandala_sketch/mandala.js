import kinectManager from "../utils/KinectManager.js";

var baseCount, baseSize;
var n, off;
var p, c, x, y, px, py, theta;
let prevCoordsX, prevCoordsY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize();
  colorMode(HSB, 100);
  noFill();
  strokeWeight(2);
  frameRate(20);
  init();
}

function draw() {
  push();

  if (!kinectManager.firstFrameReceived) return;
  const coords = kinectManager.detectTouch();

  if (coords) {
    translate(width / 2, height / 2);

    x = width / 2 - coords.x;
    y = height / 2 - coords.y;
    px = width/2 - prevCoordsX;
    py = width/2 - prevCoordsY;
    c = floor(noise(n) * 4) * baseCount * 2;

    symmDraw(px, py, x, y, c, 3);

    prevCoordsX = coords.x;
    prevCoordsY = coords.y;
  }
  n += off;
  pop();
  init();
}

function symmDraw(a1, b1, a2, b2, c) {
  push();
  theta = TWO_PI / c;

  for (var i = 0; i < c; i++) {
    line(a1, b1, a2, b2);
    line(a1, -b1, a2, -b2);
    rotate(theta);
  }
  pop();
}

function init() {
  blendMode(BLEND);
  p = 0;
  n = random(10);
  off = 0.03;
  baseCount = floor(random(3, 9));

  if (!kinectManager.firstFrameReceived) return;
  // Get value from Kinect manager and scale it to the desired range
  let baseSize = kinectManager.detectTouch()?.value || 1; // Default to 0 if detectTouch() is undefined
  let scaledBaseSize = map(baseSize, 50, 190, 1, 100); // Scale to a range between 30 and 100

  stroke(floor(random(10)) * 10, 90, 90, 20);
  strokeWeight(floor(scaledBaseSize));

  if (scaledBaseSize > 30) {
    blendMode(MULTIPLY);
  } else {
    blendMode(SCREEN);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize();
}

window.setup = setup;
window.draw = draw;
window.symmDraw = symmDraw;
window.init = init;
window.windowResized = windowResized;
