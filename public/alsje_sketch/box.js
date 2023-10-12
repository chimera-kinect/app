function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  let rectWidth = windowWidth / 4; // Half the width of the rectangle
  let rectHeight = windowHeight / 4; // Half the height of the rectangle

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
  noFill();
  stroke(0);
  rect(topLeft.x, topLeft.y, 2 * rectWidth, 2 * rectHeight);

  // Draw lines from rectangle's corners to canvas corners
  line(topLeft.x, topLeft.y, 0, 0);
  line(topRight.x, topRight.y, width, 0);
  line(bottomLeft.x, bottomLeft.y, 0, height);
  line(bottomRight.x, bottomRight.y, width, height);
}

window.setup = setup;
window.draw = draw;
