import kinectManager from '../utils/KinectManager.js'

let veins = [];
let isMousePressed = false;
let stars = [];

function setup() {
  createCanvas(1280, 720);
  kinectManager.updateCanvasSize()
  kinectManager.pushThreshold = 100
  frameRate(60);

  // Generate random stars
  for (let i = 0; i < 1000; i++) {
    stars.push(createVector(random(width), random(height)));
  }
}

function draw() {
  if (!kinectManager.firstFrameReceived) return
  background(0); // Set a dark background.

  // Display stars
  fill(255);
  noStroke();
  for (let star of stars) {
    ellipse(star.x, star.y, 5, 5);
  }
  checkPushes()
  // Update and display veins
  for (let i = veins.length - 1; i >= 0; i--) {
    if (kinectManager.isCoordinatePushed(veins[i].points[0].x, veins[i].points[0].y)) {
      // Find the nearest star-like particle and make the vein gravitate towards it.
      let nearestStar = findNearestStar(veins[i].points[veins[i].points.length - 1]);
      if (nearestStar) {
        veins[i].gravitate(nearestStar);
      }
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

function checkPushes () {
  if (veins.length === 2) return
  for (let x = 0; x <= width; x += random(10, 20)) {
    for (let y = 0; y <= height; y += random(10, 20)) {
      if (kinectManager.isCoordinatePushed(x, y)) {
        if (veins.length === 1) if (dist(x, y, veins[0].points[0].x, veins[0].points[0].y) < 300) continue
        if (veins.length < 2) {
          let vein = new Vein(x, y, 0);
          veins.push(vein)
          break
        }
      }
    }
    if (veins.length === 2) break
  }
}

class Vein {
  // (Your existing Vein class with some modifications for gravitation)
  constructor(x, y, branchCount) {
    this.points = [];
    this.numPoints = floor(random(500, 750));
    this.points.push(createVector(x, y));
    this.angle = random(TWO_PI);
    this.speed = random(3, 7);
    this.branchCount = branchCount;
    this.maxBranches = 3;
    this.branchChance = 0.3;
    this.lifespan = 60;
    this.retracting = false;
  }

  update() {
    if (this.lifespan <= 0 || this.lifespan > 90) {
      this.lifespan = 0;
    }

    if (this.branchCount >= this.maxBranches) {
      this.lifespan = 0;
    }
    // if (this.lifespan === 0) return this.reverse()

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
        branch.branchChance = this.branchChance * 0.3
        veins.push(branch);
      }

      this.angle += random(-PI / 6, PI / 6);
    }

    this.lifespan--;
  }
  reverse() {
    this.points.splice(this.points.length - 1, 1);
  }
  isFinished() {
    return this.lifespan <= 0 || this.points.length === 0;
  }

  display() {
    for (let i = 0; i < 10; i++) {
      let alpha = map(i, 0, 18, 190, 20);
      stroke(255, 255, 255, alpha); // Set the color to white
      noFill();
      beginShape();
      for (let j = 0; j < this.points.length; j++) {
        vertex(this.points[j].x, this.points[j].y);
      }
      endShape();
    }
  
    stroke(0, 191, 255, this.lifespan * 255 / 60); // Set the color to blue
    noFill();
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape();
  }


  gravitate(target) {
    if (this.points.length > 0) {
      // Calculate the direction vector from the last point to the target (star-like particle).
      let direction = createVector(target.x - this.points[this.points.length - 1].x, target.y - this.points[this.points.length - 1].y);
      direction.normalize(); // Normalize the vector to have a length of 1.
  
      // Adjust the angle based on the direction vector with an increased factor.
      let targetAngle = atan2(direction.y, direction.x);
      let factor = 0.2; // Increase this factor for a stronger pull
      this.angle = lerp(this.angle, targetAngle, factor);
  
      // Limit the length of the vein to avoid overextending.
      let maxVeinLength = 50;
      let currentLength = dist(this.points[0].x, this.points[0].y, this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
      if (currentLength < maxVeinLength) {
        let newPoint = createVector(this.points[this.points.length - 1].x + cos(this.angle) * this.speed, this.points[this.points.length - 1].y + sin(this.angle) * this.speed);
        this.points.push(newPoint);
      }
    }
  }  
}

function findNearestStar(point) {
  let nearestStar = null;
  let minDist = Infinity;
  for (let star of stars) {
    let d = dist(point.x, point.y, star.x, star.y);
    if (d < minDist) {
      minDist = d;
      nearestStar = star;
    }
  }
  return nearestStar;
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;
window.findNearestStar = findNearestStar;