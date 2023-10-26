import kinectManager from '../utils/KinectManager.js'

let world;
let pointFieldPos;
let pointFieldNeg;
let followMouse = false;

function applyForceAtPosition(x, y, strength = pointFieldPos.strength, range = pointFieldPos._max) {
  world.forces = [];
  pointFieldPos.point = new c2.Point(x, y);
  pointFieldPos.strength = strength;
  pointFieldPos.range(0, range);
  world.addForce(pointFieldPos);
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    kinectManager.updateCanvasSize()
    kinectManager.pushThreshold = 40 
  colorMode(HSL, 360, 100, 100);
  noFill();

  world = new c2.World(new c2.Rect(0, 0, width, height));

  pointFieldPos = new c2.PointField(new c2.Point(width / 2, height / 2), 1);
  pointFieldPos.range(0, 300);
  pointFieldNeg = new c2.PointField(new c2.Point(width / 2, height / 2), -1);
  pointFieldNeg.range(0, 300);

  for (let i = 0; i < 100; i++) {
    const p = new c2.Particle(width / 2, height / 2);
    p.radius = random(10, height / 14);
    p.color = color(random(0, 30), random(30, 60), random(20, 100));
    world.addParticle(p);
  }

  world.addInteractionForce(new c2.Collision());
  world.friction = 1; // no drag... do I like it?
}

function draw() {
    if (!kinectManager.firstFrameReceived) return
  background(0);
  const coords = kinectManager.detectTouch()
  if (coords) {
    applyForceAtPosition(coords.x, coords.y, pointFieldPos.strength, map(coords.value, kinectManager.pushThreshold, 255, 300, 1000))
  }
  //else if (!coords && world.forces.includes(pointFieldPos)) applyNegativeTemporaryForceAtPosition(prevX, prevY)
  world.update();

  for (let i = 0; i < world.particles.length; i++) {
    let p = world.particles[i];
    stroke(p.color);

    // Calculate the angle and distance to the point of force
    const angle = atan2(pointFieldPos.point.y - p.position.y, pointFieldPos.point.x - p.position.x);
    const distance = dist(p.position.x, p.position.y, pointFieldPos.point.x, pointFieldPos.point.y);

    // Calculate the control point for the curve
    const controlX = p.position.x + cos(angle) * distance / 2;
    const controlY = p.position.y + sin(angle) * distance / 2;

    // Draw a Bezier curve
    beginShape();
    vertex(p.position.x, p.position.y);
    bezierVertex(p.position.x, p.position.y, controlX, controlY, pointFieldPos.point.x, pointFieldPos.point.y);
    endShape();
  }
}

function mousePressed() {
  applyForceAtPosition(mouseX, mouseY);
  followMouse = true; // Enable following the mouse
}

function mouseReleased() {
  world.forces = [];
  pointFieldNeg.point = new c2.Point(mouseX, mouseY);
  world.addForce(pointFieldNeg);
  setTimeout(() => {
    world.removeForce(pointFieldNeg);
    followMouse = false; // Disable following the mouse
  }, 300);
}

function mouseDragged() {
  if (followMouse) {
    applyForceAtPosition(mouseX, mouseY);
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    kinectManager.updateCanvasSize()
  }

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;
window.mouseDragged = mouseDragged;
window.windowResized = windowResized

