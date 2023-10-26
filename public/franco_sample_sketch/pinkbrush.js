import kinectManager from '../utils/KinectManager.js'

let drawing = false;
let brushSize = 10;
let prevX, prevY, curX, curY; // Store the previous mouse position

function setup() {
    createCanvas(windowWidth, windowHeight)
    kinectManager.updateCanvasSize()
    kinectManager.pushThreshold = 60
    frameRate(60)
    background("white");
}

function draw() {
    if (!kinectManager.firstFrameReceived) return
    // if (drawing) {
    let found = false
    for (let x = 0; x <= width; x += random(10, 20)) {    
        for (let y = 0; y <= height; y += random(10, 20)) {
            if (kinectManager.isCoordinatePushed(x, y)) {
                curX = x
                curY = y
                found = true
                fill(255, 192, 203, 100);
                noStroke();
                break
            }
        }
        if (found) break
    }

    // Interpolate between previous and current mouse positions
    for (let i = 0; i < 1; i += 0.05) {
        let interX = lerp(prevX, curX, i);
        let interY = lerp(prevY, curY, i);
        circle(interX, interY, brushSize);
    }

    // Update the previous mouse positions
    prevX = curX
    prevY = curY
    // prevX = mouseX;
    // prevY = mouseY;
  }


function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    kinectManager.updateCanvasSize()
  }

function mousePressed() {
  drawing = true;
  brushSize = 10;
  prevX = mouseX;
  prevY = mouseY;
  increaseBrushSize();
}

function mouseReleased() {
  drawing = false;
}

function increaseBrushSize() {
  if (drawing) {
    brushSize += 2;
    requestAnimationFrame(increaseBrushSize);
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    // Clear the canvas when the 'C' key is pressed
    background("white");
  }
}

window.setup = setup
window.draw = draw
window.windowResized = windowResized