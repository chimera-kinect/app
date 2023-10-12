// import npyjs from 'https://cdn.jsdelivr.net/npm/npyjs@0.5/+esm'
// import KinectManager from '../utils/KinectManager.js'

const performanceElem = document.getElementById('perf')
// let myArray, nFrames, currentFrame
// const frameLength = 1024 * 1024

// function preload() {
//   const n = new npyjs()

//   n.load("../sample_data/recording2-5fr.npy", (array) => {
//     myArray = array
//     nFrames = array.shape[0]
//     currentFrame = 0
//   })
// }

function setup() {
  createCanvas(1002, 658)
  pixelDensity(1)
}

function draw() {

  // if (!KinectManager.currentFrame || this.KinectManager.isFrameRead) return;
  
  const startTime = performance.now();
  // const frame = KinectManager.currentFrame;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const pix = Math.floor(Math.random() * 256);
      set(x, y, pix);
      // if(frame[i]>= 240) {
      //   console.log('eheh')
      // }
    }
  }

  updatePixels();

  performanceElem.innerHTML = `Time to display frame: ${round(
    performance.now() - startTime
  )}ms`;
}

// this sketch is now a module. the browser doesn't know of the setup and draw functions existence
// let it know then by assigning the functions to the window object
window.setup = setup
window.draw = draw
