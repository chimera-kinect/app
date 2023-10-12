function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  colorMode(HSL, 100);
  angleMode(DEGREES);
}

function draw() {
  background(100);

  stroke(0, 0, 0);

  let columns = 30; // Number of columns
  let rows = 30; // Number of rows

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let x = map(i, 0, columns - 1, 30, width - 30);
      let y = map(j, 0, rows - 1, 30, height - 30);
      // rotation
      let r = noise(x / 100, y / 100, frameCount / 250) * 150;
      // distance
      let d = dist(mouseX, mouseY, x+50, y+50);
      let w = map(d, 0, 1200, 0, 100) + 20;
      let h = map(d, 0, 1200, 0, 100) + 20;

      stroke(d, 100, d);
      strokeWeight(2);
      fill(r, 260, r, 50);
      push();
      translate(x, y);

      if (r > 60) {
        rect(0, 0, w, h);
      } else if (r > 50) {
        circle(0, 0, 20);
      } else {
        fill(0);
        stroke(0);
        rect(0, 0, 10, 10);
        rotate(r);
        rect(0, 0, 10, 10);
      }

      rotate(r);
      //rect(0, 0, 10, 10);
      pop();
    }
  }
}

window.setup = setup;
window.draw = draw;


