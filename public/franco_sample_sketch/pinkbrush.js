import kinectManager from '../utils/KinectManager.js'

let drawing = false;
let increasing = false;
let brushSize = 50;
let prevX, prevY, curX, curY; // Store the previous mouse position

function setup() {
    createCanvas(windowWidth, windowHeight)
    kinectManager.updateCanvasSize()
    kinectManager.pushThreshold = 30
    frameRate(60)
    background("white");
}
function draw() {
    if (!kinectManager.firstFrameReceived) return

    const coords = kinectManager.detectTouch()
    if (drawing) {
      if (!coords) {
        drawing = false
        return
      }
      if (!increasing) {
        brushSize = 50
        prevX = coords.x
        prevY = coords.y
        requestAnimationFrame(increaseBrushSize)
        increasing = true
      }
      curX = coords.x
      curY = coords.y
      // if (dist(curX, curY, prevX, prevY) > 200) return !!! this removes weird lerping problems, but you have to slow down drawing to not make the lines break. up to you
      fill(255, 192, 203, 100)
      noStroke()
      for (let i = 0; i < 1; i += 0.05) {
        let interX = lerp(prevX, curX, i);
        let interY = lerp(prevY, curY, i);
        circle(interX, interY, brushSize);
      }

      prevX = curX
      prevY = curY
    } else if (!drawing && coords) {
      drawing = true
    } else {
      increasing = false
    }
  }


function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    kinectManager.updateCanvasSize()
  }

function increaseBrushSize() {
  if (drawing) {
    brushSize += 0.5
    requestAnimationFrame(increaseBrushSize)
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    // Clear the canvas when the 'C' key is pressed
    background("white")
  }
}

window.setup = setup
window.draw = draw
window.windowResized = windowResized