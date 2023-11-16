import VerticalLine from "./VerticalLine.js"
import kinectManager from '../utils/KinectManager.js'

let filter, noise
const lines = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  kinectManager.updateCanvasSize()
  kinectManager.pushThreshold = 40
  frameRate(60)
  for (let x = 1; x < width; x += random(15, 35)) {
    lines.push(new VerticalLine(x))
  }
  stroke(255)
  noFill()
  filter = new p5.LowPass()
  noise = new p5.Noise('brown')
  noise.amp(0.2)
  noise.disconnect()
  noise.connect(filter)
  filter.freq(1000)
  noise.start()
}

function draw() {
  if (!kinectManager.firstFrameReceived) return
  background(0)
  lines.forEach(line => line.draw(kinectManager))
  const touchVal = kinectManager.detectTouch(true)?.value
  touchVal ? filter.freq(map(touchVal, 0, 255, 1000, 200), 0.1) : filter.freq(1000, 0.1)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  kinectManager.updateCanvasSize()
}

window.setup = setup
window.draw = draw
window.windowResized = windowResized