let veins = [];
let isMousePressed = false;

function setup() {
  createCanvas(1280, 720);
  frameRate(60);
}

function draw() {

background(255);

// Display veins
  for (let i = veins.length - 1; i >= 0; i--) {
    if (isMousePressed) {
      veins[i].update();
    } else {
      veins[i].reverse();
    }
    veins[i].display();

    if (veins[i].isFinished()) {
      veins.splice(i, 1);
    }
  }
}

function mousePressed() {
  isMousePressed = true;

  // Create veins
  let numVeins = floor(random(3, 6));
  for (let i = 0; i < numVeins; i++) {
    let vein = new Vein(mouseX, mouseY, 0);
    veins.push(vein);
  }
}

function mouseReleased() {
  isMousePressed = false;
}

class Vein {
  constructor(x, y, branchCount) {
    this.points = [];
    this.numPoints = floor(random(10, 20));
    this.points.push(createVector(x, y));
    this.angle = random(TWO_PI);
    this.speed = random(5, 10);
    this.branchCount = branchCount;
    this.maxBranches = 10;
    this.branchChance = 0.3;
    this.lifespan = 60;
    this.retracting = false;
  }

  update() {
    if (this.lifespan < 0) {
      this.lifespan = 0;
    }

    if (this.branchCount >= this.maxBranches) {
      this.lifespan = 0;
    }

    if (this.points.length < this.numPoints) {
      let lastPoint = this.points[this.points.length - 1];
      let newPoint = createVector(lastPoint.x + cos(this.angle) * this.speed, lastPoint.y + sin(this.angle) * this.speed);
      this.points.push(newPoint);

      if (random(1) < this.branchChance && this.branchCount < this.maxBranches) {
        let branchAngle = random(-PI / 3, PI / 3);
        let branchSpeed = random(0.5, 0.9) * this.speed;
        let branch = new Vein(lastPoint.x, lastPoint.y, this.branchCount + 1);
        branch.angle = this.angle + branchAngle;
        branch.speed = branchSpeed;
        branch.lifespan = this.lifespan
        branch.branchChance = this.branchChance / 2
        veins.push(branch);
      }

      this.angle += random(-PI / 6, PI / 6);
    }

    this.lifespan--;
  }

  reverse() {
    console.log('reversing')
    this.points.splice(this.points.length - 1, 1);
  }

  display() {
    for (let i = 0; i < 10; i++) {
      let alpha = map(i, 0, 18, 190, 20);
      stroke(150, 0, 255, alpha);
      noFill();
      beginShape();
      for (let j = 0; j < this.points.length; j++) {
        vertex(this.points[j].x, this.points[j].y);
      }
      endShape();
    }

    stroke(235, 215, 99, this.lifespan * 255 / 60);
    noFill();
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape();
  }

  isFinished() {
    return this.lifespan <= 0 || this.points.length === 0;
  }

  retract() {
    if (!this.retracting && this.points.length > 1) {
      this.points.pop();
    }
    this.retracting = true;
  }
}

// Define preload, setup, draw, mousePressed, and mouseReleased as window global functions
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;