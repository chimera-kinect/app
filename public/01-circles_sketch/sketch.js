import kinectManager from '../utils/KinectManager.js'

let world, prevX, prevY
const pointFieldPos = new c2.PointField(new c2.Point(0, 0), 1)
pointFieldPos.range(0, 300) // can set range of force!! deeper presses = more force
const pointFieldNeg = new c2.PointField(new c2.Point(0, 0), -1)
pointFieldNeg.range(0, 300)

function applyForceAtPosition(x, y, strength = pointFieldPos.strength, range = pointFieldPos._max) {
  world.forces = []
  pointFieldPos.point = new c2.Point(x, y)
  pointFieldPos.strength = strength
  pointFieldPos.range(0, range)
  world.addForce(pointFieldPos)
}

function applyNegativeTemporaryForceAtPosition(x, y, strength = pointFieldNeg.strength, range = pointFieldNeg._max) {
  world.forces = []
  pointFieldNeg.point = new c2.Point(x, y)
  pointFieldNeg.strength = strength
  pointFieldNeg.range(0, range)
  world.addForce(pointFieldNeg)
  setTimeout(() => {
    world.removeForce(pointFieldNeg)
  }, 300)
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  kinectManager.updateCanvasSize()
  kinectManager.pushThreshold = 40
  colorMode(HSL, 360, 100, 100)
  ellipseMode(RADIUS)

  world = new c2.World(new c2.Rect(0, 0, width, height))

  for(let i=0; i<100; i++){
    const p = new c2.Particle(random(width), random(height))
    p.radius = random(10, height/14)
    p.color = color(random(0, 30), random(30, 60), random(20, 100))

    world.addParticle(p)
  }

  world.addInteractionForce(new c2.Collision())
  world.friction = 1 // no drag... do i like it?
}

function draw() {
  if (!kinectManager.firstFrameReceived) return
  background(0)

  const coords = kinectManager.detectTouch()
  if (coords) {
    applyForceAtPosition(coords.x, coords.y, pointFieldPos.strength, map(coords.value, kinectManager.pushThreshold, 255, 300, 1000))
    prevX = coords.x
    prevY = coords.y
  }
  else if (!coords && world.forces.includes(pointFieldPos)) applyNegativeTemporaryForceAtPosition(prevX, prevY)
  world.update()

  for(let i=0; i<world.particles.length; i++){
    let p = world.particles[i]
    fill(p.color)
    circle(p.position.x, p.position.y, p.radius)
    strokeWeight(2)
  }
}

function mousePressed() {
  applyForceAtPosition(mouseX, mouseY)
}

function mouseDragged() {
  applyForceAtPosition(mouseX, mouseY)
}

function mouseReleased() {
  world.forces = []
  pointFieldNeg.point = new c2.Point(mouseX, mouseY)
  world.addForce(pointFieldNeg)
  setTimeout(() => {
    world.removeForce(pointFieldNeg)
  }, 300)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  kinectManager.updateCanvasSize()
}

window.setup = setup
window.draw = draw
window.mousePressed = mousePressed
window.mouseDragged = mouseDragged
window.mouseReleased = mouseReleased
window.windowResized = windowResized
