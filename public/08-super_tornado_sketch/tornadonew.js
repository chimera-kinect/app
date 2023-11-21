import kinectManager from "../utils/KinectManager.js";

let x = 0;
let y = 0;
let scaleFactor = 1.0;
let targetScaleFactor = 1.0;
let maxScaleFactor = 5.0;
let particleSize = 4;
let particleColor = 255;
// let sound;

// function preload() {
//   soundFormats("ogg");
//   sound = loadSound("loud");
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize();
  kinectManager.pushThreshold = 40;
  colorMode(HSB);
  noStroke();
  // sound.loop();
}
function draw() {
  if (!kinectManager.firstFrameReceived) return;

  background(0);

  const coords = kinectManager.detectTouch();
  if (coords) {
    translate(coords.x, height / 2);
    let hueValue = map(coords.y, 0, height, 0, 360);
    particleColor = color(hueValue, 255, 255);
    targetScaleFactor = map(coords.value, 50, 190, 1, maxScaleFactor);

    let ratio = frameCount * 0.01;
    let points = [];

    for (let i = 0; i <= 360; i += 0.1) {
      let theta = radians(i * ratio);

      scaleFactor = lerp(scaleFactor, targetScaleFactor, 0.05);

      x = cos(theta) * i * sin(theta) * tan(1) * scaleFactor;
      y = sin(1 / theta) * i * log(i) * tan(i) * scaleFactor;

      fill(particleColor);
      ellipse(x, y, particleSize, particleSize);
      points.push({ x: x, y: y });
    }
  }
}

// function keyPressed() {
//   if (getAudioContext().state !== "running") {
//     getAudioContext().resume();
//   }
//}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize();
}

// window.preload = preload;
window.setup = setup;
// window.keyPressed = keyPressed;
window.draw = draw;
window.windowResized = windowResized;

