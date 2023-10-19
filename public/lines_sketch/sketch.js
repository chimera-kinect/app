import VerticalLine from "./VerticalLine.js"
import kinectManager from '../utils/KinectManager.js'

let curveCheckbox
const lines = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  kinectManager.updateCanvasSize()
  kinectManager.pushThreshold = 40
  frameRate(60)
  curveCheckbox = createCheckbox('use curves', false)
  curveCheckbox.position(1012, 40)
  for (let x = 1; x < width; x += 20) {
    lines.push(new VerticalLine(x))
  }
  stroke(255)
  noFill()
}

function draw() {
  if (!kinectManager.firstFrameReceived) return
  background(0)
  lines.forEach(line => line.draw(curveCheckbox.checked(), kinectManager))
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  kinectManager.updateCanvasSize()
}


window.setup = setup
window.draw = draw
window.windowResized = windowResized