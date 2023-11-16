let rectWidth;
let rectHeight;
let maxRectWidth;
let maxRectHeight;
let isMousePressed = false;
let isDecreasing = false;
let pressStartTime = 0;
let releaseTime = 0;
let isReleased = false;
let animationSpeed = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  maxRectWidth = windowWidth / 3;
  maxRectHeight = windowHeight / 3;
  rectWidth = maxRectWidth;
  rectHeight = maxRectHeight;

}

function draw() {
  background(220);

  // Gradually adjust the size of the inner rectangle based on mouse press duration
  if (isMousePressed) {
    let currentTime = millis();
    let elapsedTime = constrain(currentTime - pressStartTime, 0, 1000); // Constrain to a maximum of 1 second
    let targetWidth, targetHeight;

    if (isDecreasing) {
      targetWidth = map(elapsedTime, 0, 1000, rectWidth, maxRectWidth / 10);
      targetHeight = map(elapsedTime, 0, 1000, rectHeight, maxRectHeight / 10);
    } else {
      targetWidth = map(elapsedTime, 0, 1000, rectWidth, maxRectWidth);
      targetHeight = map(elapsedTime, 0, 1000, rectHeight, maxRectHeight);
    }

    // Adjust rectWidth and rectHeight relative to the current size with animationSpeed
    rectWidth += (targetWidth - rectWidth) * animationSpeed;
    rectHeight += (targetHeight - rectHeight) * animationSpeed;
  }

  // Check if the mouse has been released
  if (!isMousePressed && isReleased) {
    let currentTime = millis();
    let elapsedTime = constrain(currentTime - releaseTime, 0, 1000); // Constrain to a maximum of 1 second
    let targetWidth, targetHeight;

    targetWidth = map(elapsedTime, 0, 1000, rectWidth, maxRectWidth);
    targetHeight = map(elapsedTime, 0, 1000, rectHeight, maxRectHeight);

    // Adjust rectWidth and rectHeight relative to the current size with animationSpeed
    rectWidth += (targetWidth - rectWidth) * animationSpeed;
    rectHeight += (targetHeight - rectHeight) * animationSpeed;

    if (elapsedTime >= 1000) {
      // Reset the flag when the animation is complete
      isReleased = false;
    }
  }

  // Calculate the coordinates of the rectangle's corners
  let topLeft = createVector(width / 2 - rectWidth, height / 2 - rectHeight);
  let topRight = createVector(width / 2 + rectWidth, height / 2 - rectHeight);
  let bottomLeft = createVector(width / 2 - rectWidth, height / 2 + rectHeight);
  let bottomRight = createVector(
    width / 2 + rectWidth,
    height / 2 + rectHeight
  );

  // Draw the rectangle
  rectMode(CORNER);
  fill(0, 0, 175, 200);
  noStroke();
  rect(topLeft.x, topLeft.y, 2 * rectWidth, 2 * rectHeight);

 // Draw trapeziums
  fill(0, 0, 255, 100);
  beginShape();
  vertex(topLeft.x, topLeft.y);
  vertex(topRight.x, topRight.y);
  vertex(width, 0);
  vertex(0, 0);
  endShape(CLOSE);

  fill(0, 0, 255, 150);
  beginShape();
  vertex(topRight.x, topRight.y);
  vertex(bottomRight.x, bottomRight.y);
  vertex(width, height);
  vertex(width, 0);
  endShape(CLOSE);

  fill(0, 0, 255, 200);
  beginShape();
  vertex(bottomRight.x, bottomRight.y);
  vertex(bottomLeft.x, bottomLeft.y);
  vertex(0, height);
  vertex(width, height);
  endShape(CLOSE);

  fill(0, 0, 250, 140);
  beginShape();
  vertex(bottomLeft.x, bottomLeft.y);
  vertex(topLeft.x, topLeft.y);
  vertex(0, 0);
  vertex(0, height);
  endShape(CLOSE);
}

function mousePressed() {
  isMousePressed = true;
  pressStartTime = millis();
  isDecreasing = true;
}

function mouseReleased() {
  isMousePressed = false;
  isReleased = true;
  releaseTime = millis();
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;