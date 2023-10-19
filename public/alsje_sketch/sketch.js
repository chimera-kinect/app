import KinectManager from '../utils/KinectManager.js'

function setup() {

  createCanvas(1024, 1024);
  
}

function draw() {

  if (KinectManager.isFrameRead) {
    console.log('Already read current frame')
  } else {
    console.log(KinectManager.frame)
  }

  background(0)
}

window.setup = setup;
window.draw = draw;


//   if (!myArray?.data) return; // currently having issues with the data not being loaded in time

//   const startTime = performance.now();
//   // no need for a 2d array when we can do this lmao
//   let startIdx = currentFrame * frameLength;
//   let endIdx = (currentFrame + 1) * frameLength;

//   for (let i = startIdx; i < endIdx; i++) {
//     let val = myArray.data[i];
//     let x = (i - startIdx) % 1024; // Calculate x within the current frame
//     let y = Math.floor((i - startIdx) / 1024); // Calculate y within the current frame

//     set(x, y, val);
//   }

//   updatePixels();
//   currentFrame = (currentFrame + 1) % nFrames; // when currentFrame reaches nFrames, reset it to 0
//   performanceElem.innerHTML = `Time to display frame: ${round(performance.now() - startTime)}ms`
// }

// this sketch is now a module. the browser doesn't know of the setup and draw functions existence
// let it know then by assigning the functions to the window object
// window.preload = preload;