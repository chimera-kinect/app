import kinectManager from '../utils/KinectManager.js'

let x = 0;
let y = 0;
let pressDuration = 0; // To keep track of how long the mouse is pressed
let scaleFactor = 1.0; // Initial scaling factor
let targetScaleFactor = 1.0;
let maxScaleFactor = 5.0; // Target scaling factor when the mouse is not pressed
let particleSize = 1.0

function Super_Tornado() {
  let ratio = frameCount * 0.01;
  let points = [];
  fill(255);
  for (let i = 0; i <= 360; i += 0.1) {
    let theta = radians(i * ratio);
    
    // Smoothly interpolate between the scaleFactor and targetScaleFactor
    scaleFactor = lerp(scaleFactor, targetScaleFactor, 0.05);
    
    // Modify x and y based on the interpolated scaleFactor
    x = cos(theta) * i * sin(theta) * tan(1) * scaleFactor;
    y = sin(1 / theta) * i * log(i) * tan(i) * scaleFactor;
    
    ellipse(x, y, 3, 3);
    points.push({
      'x': x,
      'y': y
    });
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize()
  kinectManager.pushThreshold = 40
  stroke(255)
  // noStroke();
}

function draw() {
  if (!kinectManager.firstFrameReceived) return
  strokeWeight(particleSize)
  background(30);
  translate(width / 2, height / 2);
  Super_Tornado();
  
  const coords = kinectManager.detectTouch()
  if (coords) {
    targetScaleFactor = map(coords.value, 0, 255, 1, maxScaleFactor);
    particleSize = map(coords.x, 0, width, 5, 1)
    console.log(coords.x, particleSize)
  }
//   // Check if the mouse is pressed and update pressDuration
//   if (mouseIsPressed) {
//     pressDuration += 1;
//     // Increase the targetScaleFactor when the mouse is pressed
//     targetScaleFactor = 1 + pressDuration * 0.01;
//   } else {
//     // Gradually decrease the targetScaleFactor when the mouse is released
//     targetScaleFactor = max(1, targetScaleFactor - 0.01);
//   }

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    kinectManager.updateCanvasSize()
  }


window.setup = setup
window.draw = draw
window.windowResized = windowResized