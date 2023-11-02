import kinectManager from '../utils/KinectManager.js'
import Particle from './Particle.js'

const PARTICLES_AMOUNT = 2500

const particles = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  kinectManager.updateCanvasSize()
  kinectManager.pushThreshold = 40

  for(let i = 0; i < PARTICLES_AMOUNT; i ++) {
    particles.push(new Particle(random(width), random(height)))
  }

  setInterval(() => {
    noiseSeed(millis())
  }, 30000) // change things up every 30 seconds

  strokeWeight(2)
}

function draw() {
  if (!kinectManager.firstFrameReceived) return
  background(0, 30)
  particles.forEach(p => {
    p.update(kinectManager)
    p.draw()
  })
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  kinectManager.updateCanvasSize()
}

window.setup = setup
window.draw = draw
window.windowResized = windowResized
