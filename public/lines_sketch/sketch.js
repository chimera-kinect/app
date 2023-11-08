import VerticalLine from "./VerticalLine.js"
import kinectManager from '../utils/KinectManager.js'

let osc
const lines = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  kinectManager.updateCanvasSize()
  kinectManager.pushThreshold = 40
  frameRate(60)
  for (let x = 1; x < width; x += 20) {
    lines.push(new VerticalLine(x))
  }
  stroke(255)
  noFill()
  osc = new p5.SawOsc(90)
  osc.start()
}

function draw() {
  if (!kinectManager.firstFrameReceived) return
  background(0)
  lines.forEach(line => line.draw(kinectManager))
  const touchVal = kinectManager.detectTouch()?.value
  touchVal ? osc.freq(map(touchVal, 0, 255, 90, 150), 0.1) : osc.freq(90, 0.1)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  kinectManager.updateCanvasSize()
}

window.setup = setup
window.draw = draw
window.windowResized = windowResized