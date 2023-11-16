import KinectManager from '../utils/KinectManager.js'

let frame = null

function setup() {
  createCanvas(1002, 658)
}

function draw() {
  if (!KinectManager.firstFrameReceived || KinectManager.isRead) return
  frame = KinectManager.frame

  for (let y = 0; y < KinectManager.frameHeight; y++) {
    for (let x = 0; x < KinectManager.frameWidth; x++) {
      let pix = frame[y * KinectManager.frameWidth + x];
      set(x, y, pix);
    }
  }
  updatePixels()
}


window.setup = setup
window.draw = draw